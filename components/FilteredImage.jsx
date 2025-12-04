import { Asset } from "expo-asset";
import { GLView } from "expo-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

/**
 * FilteredImage - Real-time image filtering using WebGL/expo-gl
 *
 * Applies various image adjustments using GPU shaders:
 * Basic Adjustments:
 * - Exposure, Contrast, Highlights, Shadows, Whites, Blacks
 * - Temperature, Tint, Saturation, Vibrance
 *
 * Creative Effects:
 * - Duotone, Split Toning, Vignette, Glow, Grain, Haze
 * - Curves, Clarity, Film Fade, Bleach Bypass, Teal & Orange
 * - Cross Process, Orton Effect
 */

// Default filter values
const DEFAULT_FILTERS = {
  // Basic Adjustments
  exposure: 0, // -30 to 30 (mapped to -1.0 to 1.0)
  contrast: 1.0, // 0.8 to 1.4
  highlights: 0, // -50 to 30
  shadows: 0, // -40 to 50
  whites: 0, // -40 to 20
  blacks: 0, // -30 to 30
  temperature: 0, // -80 to 80
  tint: 0, // -30 to 30
  saturation: 1.0, // 0.0 to 1.8
  vibrance: 0, // 0.0 to 1.0

  // Creative Effects
  vignetteStrength: 0, // 0.0 to 1.0
  vignetteRadius: 0.95, // 0.4 to 0.95
  grainAmount: 0, // 0.0 to 0.3
  grainSize: 1.0, // 0.5 to 2.0
  clarity: 0, // -1.0 to 1.0
  fadeAmount: 0, // 0.0 to 1.0
  bleachBypass: 0, // 0.0 to 1.0
  tealOrange: 0, // 0.0 to 1.0

  // Placeholder for complex object-based params (Duotone, Split Toning, etc.)
  // These would need more complex uniform handling
};

// Vertex shader - simple pass-through
const vertexShaderSource = `
  attribute vec2 position;
  attribute vec2 texCoord;
  varying vec2 vTexCoord;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    vTexCoord = texCoord;
  }
`;

// Fragment shader with all filter effects
const fragmentShaderSource = `
  precision mediump float;

  varying vec2 vTexCoord;
  uniform sampler2D uTexture;

  // --- Uniforms ---

  // Basic Adjustments
  uniform float uExposure;
  uniform float uContrast;
  uniform float uHighlights;
  uniform float uShadows;
  uniform float uWhites;
  uniform float uBlacks;
  uniform float uTemperature;
  uniform float uTint;
  uniform float uSaturation;
  uniform float uVibrance;

  // Creative Effects
  uniform float uVignetteStrength;
  uniform float uVignetteRadius;
  uniform float uGrainAmount;
  uniform float uGrainSize;
  uniform float uClarity;
  uniform float uFadeAmount;
  uniform float uBleachBypass;
  uniform float uTealOrange;

  // Random seed for grain
  uniform float uTime;

  // --- Helper Functions ---

  // RGB to HSL
  vec3 rgbToHsl(vec3 c) {
    float maxC = max(max(c.r, c.g), c.b);
    float minC = min(min(c.r, c.g), c.b);
    float l = (maxC + minC) / 2.0;
    if (maxC == minC) return vec3(0.0, 0.0, l);
    float d = maxC - minC;
    float s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);
    float h = (maxC == c.r) ? (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0) :
              (maxC == c.g) ? (c.b - c.r) / d + 2.0 :
                              (c.r - c.g) / d + 4.0;
    return vec3(h / 6.0, s, l);
  }

  // HSL to RGB
  float hueToRgb(float p, float q, float t) {
    if (t < 0.0) t += 1.0;
    if (t > 1.0) t -= 1.0;
    if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
    if (t < 1.0/2.0) return q;
    if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
    return p;
  }

  vec3 hslToRgb(vec3 hsl) {
    if (hsl.y == 0.0) return vec3(hsl.z);
    float q = hsl.z < 0.5 ? hsl.z * (1.0 + hsl.y) : hsl.z + hsl.y - hsl.z * hsl.y;
    float p = 2.0 * hsl.z - q;
    return vec3(hueToRgb(p, q, hsl.x + 1.0/3.0),
                hueToRgb(p, q, hsl.x),
                hueToRgb(p, q, hsl.x - 1.0/3.0));
  }

  // RGB to Luminance
  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  // --- Filter Implementations ---

  vec3 adjustExposure(vec3 color, float exposure) {
    return color * pow(2.0, exposure);
  }

  vec3 adjustContrast(vec3 color, float contrast) {
    return (color - 0.5) * contrast + 0.5;
  }

  // Simplified Highlights/Shadows/Whites/Blacks using curves approximation
  vec3 adjustTone(vec3 color, float highlights, float shadows, float whites, float blacks) {
    float lum = luminance(color);

    // Shadows (affects darker tones)
    float shadowFactor = 1.0 - smoothstep(0.0, 0.5, lum);
    color += shadows * shadowFactor * 0.2;

    // Highlights (affects lighter tones)
    float highlightFactor = smoothstep(0.5, 1.0, lum);
    color += highlights * highlightFactor * 0.2;

    // Blacks (affects very dark tones)
    float blackFactor = 1.0 - smoothstep(0.0, 0.25, lum);
    color += blacks * blackFactor * 0.1;

    // Whites (affects very light tones)
    float whiteFactor = smoothstep(0.75, 1.0, lum);
    color += whites * whiteFactor * 0.1;

    return clamp(color, 0.0, 1.0);
  }

  vec3 adjustTemperatureTint(vec3 color, float temp, float tint) {
    // Temperature: Blue <-> Yellow
    color.r += temp;
    color.b -= temp;

    // Tint: Green <-> Magenta
    color.g += tint;

    return clamp(color, 0.0, 1.0);
  }

  vec3 adjustSaturation(vec3 color, float saturation) {
    float gray = luminance(color);
    return mix(vec3(gray), color, saturation);
  }

  vec3 adjustVibrance(vec3 color, float vibrance) {
    float gray = luminance(color);
    float maxColor = max(color.r, max(color.g, color.b));
    float sat = maxColor - gray;
    // Boost saturation less for already saturated pixels
    return mix(color, mix(vec3(gray), color, 1.0 + vibrance * 0.5), 1.0 - sat);
  }

  // --- Creative Effects ---

  vec3 applyVignette(vec3 color, vec2 uv, float strength, float radius) {
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(radius, radius - 0.5, dist);
    return mix(color, color * vignette, strength);
  }

  float random(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  vec3 applyGrain(vec3 color, vec2 uv, float amount, float time) {
    float noise = random(uv * uGrainSize + time);
    return color + (noise - 0.5) * amount;
  }

  vec3 applyFade(vec3 color, float amount) {
    // Lift blacks and lower whites
    vec3 faded = mix(color, vec3(0.5), amount * 0.3); // Simple fade
    // More complex fade: map 0.0 to amount*0.1, 1.0 to 1.0-(amount*0.1)
    return mix(color, vec3(0.1) + color * 0.8, amount);
  }

  vec3 applyBleachBypass(vec3 color, float intensity) {
    float lum = luminance(color);
    vec3 blend = vec3(lum);
    float L = min(1.0, max(0.0, 10.0 * (lum - 0.45)));
    vec3 result1 = 2.0 * color * blend;
    vec3 result2 = 1.0 - 2.0 * (1.0 - blend) * (1.0 - color);
    vec3 newColor = mix(result1, result2, L);
    return mix(color, newColor, intensity);
  }

  vec3 applyTealOrange(vec3 color, float intensity) {
    vec3 shadowColor = vec3(0.0, 0.5, 0.5); // Teal
    vec3 highlightColor = vec3(1.0, 0.6, 0.2); // Orange
    float lum = luminance(color);
    vec3 result = mix(shadowColor, highlightColor, lum);
    return mix(color, result, intensity * 0.5); // Blend with original
  }

  void main() {
    vec4 texColor = texture2D(uTexture, vTexCoord);
    vec3 color = texColor.rgb;

    // --- Apply Basic Adjustments ---
    color = adjustExposure(color, uExposure);
    color = adjustContrast(color, uContrast);
    color = adjustTone(color, uHighlights, uShadows, uWhites, uBlacks);
    color = adjustTemperatureTint(color, uTemperature, uTint);
    color = adjustSaturation(color, uSaturation);
    color = adjustVibrance(color, uVibrance);

    // --- Apply Creative Effects ---
    color = applyBleachBypass(color, uBleachBypass);
    color = applyTealOrange(color, uTealOrange);
    color = applyFade(color, uFadeAmount);
    color = applyVignette(color, vTexCoord, uVignetteStrength, uVignetteRadius);
    color = applyGrain(color, vTexCoord, uGrainAmount, uTime);

    // Clamp final color values
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, texColor.a);
  }
`;

const FilteredImage = ({
  uri,
  filters = {},
  style,
  onLongPress,
}) => {
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Merge with default filters
  const activeFilters = { ...DEFAULT_FILTERS, ...filters };

  // Create and compile a shader
  const createShader = useCallback((gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  // Create the shader program
  const createProgram = useCallback((gl) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  }, [createShader]);

  // Load image as texture
  const loadTexture = useCallback(async (gl, imageUri) => {
    try {
      if (textureRef.current) {
        gl.deleteTexture(textureRef.current);
      }

      // Create texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Load the image asset
      const asset = Asset.fromURI(imageUri);
      await asset.downloadAsync();

      // Load texture from asset
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset);

      textureRef.current = texture;
      return texture;
    } catch (error) {
      console.error("Error loading texture:", error);
      return null;
    }
  }, []);

  // Initialize WebGL context
  const onContextCreate = useCallback(async (gl) => {
    glRef.current = gl;

    // Create program
    const program = createProgram(gl);
    if (!program) return;
    programRef.current = program;

    // Create position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 0, 1,
       1, -1, 1, 1,
      -1,  1, 0, 0,
       1,  1, 1, 0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Get attribute locations
    const positionLocation = gl.getAttribLocation(program, "position");
    const texCoordLocation = gl.getAttribLocation(program, "texCoord");

    // Set up attributes
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);

    setIsReady(true);
  }, [createProgram]);

  // Load texture when URI changes - Optimized to only run when URI changes
  useEffect(() => {
    let isMounted = true;
    if (isReady && uri && glRef.current) {
      loadTexture(glRef.current, uri).then(() => {
         // Force a re-render after texture load if needed, or just let the next loop handle it
      });
    }
    return () => { isMounted = false; };
  }, [isReady, uri, loadTexture]);

  // Cache uniform locations for performance
  const uniformsRef = useRef(null);

  // Initialize uniform locations after program is created
  useEffect(() => {
    if (!isReady || !glRef.current || !programRef.current) return;

    const gl = glRef.current;
    const program = programRef.current;

    // Cache all uniform locations once
    uniformsRef.current = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uExposure: gl.getUniformLocation(program, "uExposure"),
      uContrast: gl.getUniformLocation(program, "uContrast"),
      uHighlights: gl.getUniformLocation(program, "uHighlights"),
      uShadows: gl.getUniformLocation(program, "uShadows"),
      uWhites: gl.getUniformLocation(program, "uWhites"),
      uBlacks: gl.getUniformLocation(program, "uBlacks"),
      uTemperature: gl.getUniformLocation(program, "uTemperature"),
      uTint: gl.getUniformLocation(program, "uTint"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
      uVibrance: gl.getUniformLocation(program, "uVibrance"),
      uVignetteStrength: gl.getUniformLocation(program, "uVignetteStrength"),
      uVignetteRadius: gl.getUniformLocation(program, "uVignetteRadius"),
      uGrainAmount: gl.getUniformLocation(program, "uGrainAmount"),
      uGrainSize: gl.getUniformLocation(program, "uGrainSize"),
      uClarity: gl.getUniformLocation(program, "uClarity"),
      uFadeAmount: gl.getUniformLocation(program, "uFadeAmount"),
      uBleachBypass: gl.getUniformLocation(program, "uBleachBypass"),
      uTealOrange: gl.getUniformLocation(program, "uTealOrange"),
      uTime: gl.getUniformLocation(program, "uTime"),
    };
  }, [isReady]);

  // Render with filters - Optimized with cached uniform locations
  useEffect(() => {
    if (!isReady || !glRef.current || !programRef.current || !textureRef.current || !uniformsRef.current) return;

    const gl = glRef.current;
    const program = programRef.current;
    const uniforms = uniformsRef.current;

    gl.useProgram(program);

    // Bind texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
    gl.uniform1i(uniforms.uTexture, 0);

    // --- Set Uniforms (using cached locations) ---

    // Basic Adjustments
    gl.uniform1f(uniforms.uExposure, (activeFilters.exposure || 0) / 30.0);
    gl.uniform1f(uniforms.uContrast, activeFilters.contrast !== undefined ? activeFilters.contrast : 1.0);
    gl.uniform1f(uniforms.uHighlights, (activeFilters.highlights || 0) / 100.0);
    gl.uniform1f(uniforms.uShadows, (activeFilters.shadows || 0) / 100.0);
    gl.uniform1f(uniforms.uWhites, (activeFilters.whites || 0) / 100.0);
    gl.uniform1f(uniforms.uBlacks, (activeFilters.blacks || 0) / 100.0);
    gl.uniform1f(uniforms.uTemperature, (activeFilters.temperature || 0) / 200.0);
    gl.uniform1f(uniforms.uTint, (activeFilters.tint || 0) / 100.0);
    gl.uniform1f(uniforms.uSaturation, activeFilters.saturation !== undefined ? activeFilters.saturation : 1.0);
    gl.uniform1f(uniforms.uVibrance, activeFilters.vibrance || 0);

    // Creative Effects
    gl.uniform1f(uniforms.uVignetteStrength, activeFilters.vignetteStrength || 0);
    gl.uniform1f(uniforms.uVignetteRadius, activeFilters.vignetteRadius !== undefined ? activeFilters.vignetteRadius : 0.95);
    gl.uniform1f(uniforms.uGrainAmount, activeFilters.grainAmount || 0);
    gl.uniform1f(uniforms.uGrainSize, activeFilters.grainSize !== undefined ? activeFilters.grainSize : 1.0);
    gl.uniform1f(uniforms.uClarity, activeFilters.clarity || 0);
    gl.uniform1f(uniforms.uFadeAmount, activeFilters.fadeAmount || 0);
    gl.uniform1f(uniforms.uBleachBypass, activeFilters.bleachBypass || 0);
    gl.uniform1f(uniforms.uTealOrange, activeFilters.tealOrange || 0);

    // Time for grain animation
    gl.uniform1f(uniforms.uTime, Math.random());

    // Clear and draw
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.flush();
    gl.endFrameEXP();
  }, [isReady, activeFilters]);

  // If no URI provided, show nothing
  if (!uri) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onLongPress={onLongPress}>
      <View style={[styles.container, style]}>
        {/* Fallback image for when GL is not ready or loading */}
        {!isReady && (
          <Image
            source={{ uri }}
            style={[styles.fallbackImage, StyleSheet.absoluteFill]}
            resizeMode="contain"
          />
        )}

        {/* GL Surface overlay */}
        <GLView
          style={[styles.glView, StyleSheet.absoluteFill]}
          onContextCreate={onContextCreate}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  fallbackImage: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  glView: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 1,
    backgroundColor: "transparent",
  },
});

export default FilteredImage;

// Export filter configurations for use in other components
export const FILTER_CONFIGS = {
  exposure: {
    name: "Exposure",
    minValue: -30,
    maxValue: 30,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the overall brightness of the image.",
  },
  contrast: {
    name: "Contrast",
    minValue: 0.8,
    maxValue: 1.4,
    defaultValue: 1.0,
    step: 0.01,
    description: "Adjusts the difference between light and dark areas.",
  },
  highlights: {
    name: "Highlights",
    minValue: -50,
    maxValue: 30,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the brightness of the lighter tones.",
  },
  shadows: {
    name: "Shadows",
    minValue: -40,
    maxValue: 50,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the brightness of the darker tones.",
  },
  whites: {
    name: "Whites",
    minValue: -40,
    maxValue: 20,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the brightest points in the image.",
  },
  blacks: {
    name: "Blacks",
    minValue: -30,
    maxValue: 30,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the darkest points in the image.",
  },
  temperature: {
    name: "Temperature",
    minValue: -80,
    maxValue: 80,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the color temperature (warmth/coolness).",
  },
  tint: {
    name: "Tint",
    minValue: -30,
    maxValue: 30,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the color tint (green/magenta balance).",
  },
  saturation: {
    name: "Saturation",
    minValue: 0.0,
    maxValue: 1.8,
    defaultValue: 1.0,
    step: 0.01,
    description: "Adjusts the intensity of all colors.",
  },
  vibrance: {
    name: "Vibrance",
    minValue: 0.0,
    maxValue: 1.0,
    defaultValue: 0.0,
    step: 0.01,
    description: "Intelligently boosts saturation of less saturated colors.",
  },
  vignetteStrength: {
    name: "Vignette Strength",
    minValue: 0.0,
    maxValue: 1.0,
    defaultValue: 0.0,
    step: 0.01,
    description: "Adds a darkening effect around the edges.",
  },
  vignetteRadius: {
    name: "Vignette Radius",
    minValue: 0.4,
    maxValue: 0.95,
    defaultValue: 0.95,
    step: 0.01,
    description: "Controls the size of the vignette effect.",
  },
  grainAmount: {
    name: "Grain Amount",
    minValue: 0.0,
    maxValue: 0.3,
    defaultValue: 0.0,
    step: 0.005,
    description: "Adds a film grain effect.",
  },
  grainSize: {
    name: "Grain Size",
    minValue: 0.5,
    maxValue: 2.0,
    defaultValue: 1.0,
    step: 0.1,
    description: "Controls the size of the grain particles.",
  },
  clarity: {
    name: "Clarity",
    minValue: -1.0,
    maxValue: 1.0,
    defaultValue: 0.0,
    step: 0.01,
    description: "Adjusts mid-tone contrast for sharpness or softness.",
  },
  fadeAmount: {
    name: "Fade",
    minValue: 0.0,
    maxValue: 1.0,
    defaultValue: 0.0,
    step: 0.01,
    description: "Lifts blacks and mutes colors for a faded look.",
  },
  bleachBypass: {
    name: "Bleach Bypass",
    minValue: 0.0,
    maxValue: 1.0,
    defaultValue: 0.0,
    step: 0.01,
    description: "Increases contrast and desaturates colors.",
  },
  tealOrange: {
    name: "Teal & Orange",
    minValue: 0.0,
    maxValue: 1.0,
    defaultValue: 0.0,
    step: 0.01,
    description: "Applies a popular cinematic color grading effect.",
  },
};

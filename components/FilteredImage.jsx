import { Asset } from "expo-asset";
import { GLView } from "expo-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

/**
 * FilteredImage - Real-time image filtering using WebGL/expo-gl
 *
 * Applies various image adjustments using GPU shaders:
 * - Saturation (0-2, default 1)
 * - Brightness (0-5, default 1)
 * - Contrast (-10 to 10, default 1)
 * - Hue (0-6.3 radians, default 0)
 * - Exposure (-2 to 2, default 0)
 *
 * Props:
 * - uri: Image URI to display
 * - filters: Object containing filter values { saturation, brightness, contrast, hue, exposure }
 * - style: Container style
 * - width: Image width
 * - height: Image height
 */

// Default filter values
const DEFAULT_FILTERS = {
  saturation: 0,
  brightness: 0,
  contrast: 0,
  hue: 0,
  exposure: 0,
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

  // Filter uniforms
  uniform float uSaturation;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uHue;
  uniform float uExposure;

  // Convert RGB to HSL
  vec3 rgbToHsl(vec3 c) {
    float maxC = max(max(c.r, c.g), c.b);
    float minC = min(min(c.r, c.g), c.b);
    float l = (maxC + minC) / 2.0;
    float h = 0.0;
    float s = 0.0;

    if (maxC != minC) {
      float d = maxC - minC;
      s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);

      if (maxC == c.r) {
        h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
      } else if (maxC == c.g) {
        h = (c.b - c.r) / d + 2.0;
      } else {
        h = (c.r - c.g) / d + 4.0;
      }
      h /= 6.0;
    }

    return vec3(h, s, l);
  }

  // Helper function for HSL to RGB conversion
  float hueToRgb(float p, float q, float t) {
    if (t < 0.0) t += 1.0;
    if (t > 1.0) t -= 1.0;
    if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
    if (t < 1.0/2.0) return q;
    if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
    return p;
  }

  // Convert HSL to RGB
  vec3 hslToRgb(vec3 hsl) {
    float h = hsl.x;
    float s = hsl.y;
    float l = hsl.z;

    vec3 rgb;

    if (s == 0.0) {
      rgb = vec3(l);
    } else {
      float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
      float p = 2.0 * l - q;
      rgb.r = hueToRgb(p, q, h + 1.0/3.0);
      rgb.g = hueToRgb(p, q, h);
      rgb.b = hueToRgb(p, q, h - 1.0/3.0);
    }

    return rgb;
  }

  // Apply saturation adjustment
  vec3 applySaturation(vec3 color, float saturation) {
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    return mix(vec3(gray), color, saturation);
  }

  // Apply brightness adjustment
  vec3 applyBrightness(vec3 color, float brightness) {
    return color * brightness;
  }

  // Apply contrast adjustment
  vec3 applyContrast(vec3 color, float contrast) {
    return (color - 0.5) * contrast + 0.5;
  }

  // Apply hue rotation
  vec3 applyHue(vec3 color, float hueShift) {
    vec3 hsl = rgbToHsl(color);
    hsl.x = fract(hsl.x + hueShift / 6.28318530718); // Divide by 2*PI
    return hslToRgb(hsl);
  }

  // Apply exposure adjustment
  vec3 applyExposure(vec3 color, float exposure) {
    return color * pow(2.0, exposure);
  }

  void main() {
    vec4 texColor = texture2D(uTexture, vTexCoord);
    vec3 color = texColor.rgb;

    // Apply filters in order
    color = applySaturation(color, uSaturation);
    color = applyBrightness(color, uBrightness);
    color = applyContrast(color, uContrast);
    color = applyHue(color, uHue);
    color = applyExposure(color, uExposure);

    // Clamp final color values
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, texColor.a);
  }
`;

const FilteredImage = ({
  uri,
  filters = {},
  style,
}) => {
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);

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
      setTextureLoaded(true);
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

  // Load texture when URI changes
  useEffect(() => {
    if (isReady && uri && glRef.current) {
      loadTexture(glRef.current, uri);
    }
  }, [isReady, uri, loadTexture]);

  // Render with filters
  useEffect(() => {
    if (!isReady || !glRef.current || !programRef.current) return;

    const gl = glRef.current;
    const program = programRef.current;

    gl.useProgram(program);

    // Set filter uniforms
    const saturationLoc = gl.getUniformLocation(program, "uSaturation");
    const brightnessLoc = gl.getUniformLocation(program, "uBrightness");
    const contrastLoc = gl.getUniformLocation(program, "uContrast");
    const hueLoc = gl.getUniformLocation(program, "uHue");
    const exposureLoc = gl.getUniformLocation(program, "uExposure");

    // Map UI values (-100 to 100) to Shader values
    // Saturation: -100 -> 0.0, 0 -> 1.0, 100 -> 2.0
    const saturationVal = 1.0 + activeFilters.saturation / 100.0;

    // Brightness: -100 -> 0.5, 0 -> 1.0, 100 -> 1.5
    const brightnessVal = 1.0 + (activeFilters.brightness / 100.0) * 0.5;

    // Contrast: -100 -> 0.5, 0 -> 1.0, 100 -> 1.8
    const contrastVal =
      activeFilters.contrast < 0
        ? 1.0 + (activeFilters.contrast / 100.0) * 0.5
        : 1.0 + (activeFilters.contrast / 100.0) * 0.8;

    // Hue: 0 -> 0, 100 -> 2PI
    const hueVal = (activeFilters.hue / 100.0) * 6.28318530718;

    gl.uniform1f(saturationLoc, saturationVal);
    gl.uniform1f(brightnessLoc, brightnessVal);
    gl.uniform1f(contrastLoc, contrastVal);
    gl.uniform1f(hueLoc, hueVal);
    gl.uniform1f(exposureLoc, activeFilters.exposure);

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
    <View style={[styles.container, style]}>
      {/* Fallback image for when GL is not ready or loading */}
      <Image
        source={{ uri }}
        style={[styles.fallbackImage, StyleSheet.absoluteFill]}
        resizeMode="contain"
      />

      {/* GL Surface overlay */}
      <GLView
        style={[styles.glView, StyleSheet.absoluteFill]}
        onContextCreate={onContextCreate}
      />
    </View>
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
  saturation: {
    name: "Saturation",
    minValue: -100,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Controls the intensity of colors",
  },
  brightness: {
    name: "Brightness",
    minValue: -100,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Adjusts the overall lightness",
  },
  contrast: {
    name: "Contrast",
    minValue: -100,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Difference between light/dark areas",
  },
  hue: {
    name: "Hue",
    minValue: 0,
    maxValue: 100,
    defaultValue: 0,
    step: 1,
    description: "Rotates color colors (tint)",
  },
  exposure: {
    name: "Exposure",
    minValue: -2,
    maxValue: 2,
    defaultValue: 0,
    step: 0.05,
    description: "Adjusts overall exposure",
  },
};

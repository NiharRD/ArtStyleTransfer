# Star Icon Usage Guide

Two versions of the Star icon are available from the Figma design (node-id: 123:1084).

## StarImageIcon (Recommended)

Uses the actual star image from Figma for pixel-perfect accuracy.

```jsx
import { StarImageIcon } from '../components/icons/IconComponents';

// Basic usage
<StarImageIcon size={50} />

// Custom size
<StarImageIcon size={80} />

// With custom styling
<StarImageIcon
  size={60}
  style={{ opacity: 0.8 }}
/>
```

## StarIcon (Gradient Version)

Uses React Native gradients to create the star programmatically.

```jsx
import { StarIcon } from '../components/icons/IconComponents';

// Basic usage (purple to blue gradient)
<StarIcon size={50} />

// Custom colors
<StarIcon
  size={50}
  colors={["#FF1493", "#8A2BE2", "#0080FF"]}
/>

// Different gradient
<StarIcon
  size={60}
  colors={["#FFD700", "#FFA500", "#FF6347"]}
/>
```

## Usage in AI Prompt Button

You can enhance the AI Prompt Button with star decorations:

```jsx
import { StarImageIcon } from "../components/icons/IconComponents";

// In AIPromptButton.jsx
<View style={styles.decorationContainer}>
  <StarImageIcon size={30} style={styles.star1} />
  <StarImageIcon size={25} style={styles.star2} />
  <StarImageIcon size={20} style={styles.star3} />
</View>;
```

## Props

### StarImageIcon

- `size` (number): Width and height of the star (default: 50)
- `style` (object): Additional React Native styles

### StarIcon

- `size` (number): Width and height of the star (default: 50)
- `colors` (array): Array of gradient colors (default: ["#FF1493", "#8A2BE2", "#0080FF"])

## Design Details

- Source: Figma design node-id: 123:1084
- Style: Gradient star with rounded edges
- Colors: Purple (#FF1493) to Blue (#0080FF)
- Shape: 4-pointed diamond star

## Examples

### Decorative Elements

```jsx
<View style={styles.header}>
  <Text style={styles.title}>Premium Feature</Text>
  <StarImageIcon size={24} />
</View>
```

### Loading Indicators

```jsx
<View style={styles.loading}>
  <Animated.View style={{ transform: [{ rotate: rotateAnim }] }}>
    <StarIcon size={60} />
  </Animated.View>
  <Text>Processing...</Text>
</View>
```

### Button Decorations

```jsx
<TouchableOpacity style={styles.premiumButton}>
  <StarImageIcon size={20} />
  <Text>Upgrade to Premium</Text>
  <StarImageIcon size={20} />
</TouchableOpacity>
```

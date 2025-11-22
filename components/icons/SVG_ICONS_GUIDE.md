# SVG Icons Guide

All icons in this project have been upgraded to use SVG-based components via `react-native-svg` for better quality, scalability, and customization.

## Why SVG Icons?

✅ **Scalable** - No pixelation at any size
✅ **Lightweight** - Small bundle size
✅ **Customizable** - Easy to change colors and sizes
✅ **Consistent** - Same rendering across iOS, Android, and Web
✅ **Professional** - Clean, modern appearance

## Available Icons

### Main Action Icons

#### AddIcon

Add new items or create content.

```jsx
import { AddIcon } from "../components/icons/IconComponents";

<AddIcon size={28} color="#E6E6E6" />;
```

#### BrushIcon

Art style transfer or painting functionality.

```jsx
import { BrushIcon } from "../components/icons/IconComponents";

<BrushIcon size={28} color="#E6E6E6" />;
```

#### TShirtIcon

Mockup generation for apparel.

```jsx
import { TShirtIcon } from "../components/icons/IconComponents";

<TShirtIcon size={28} color="#E6E6E6" />;
```

#### CameraIcon

Photo capture or image selection.

```jsx
import { CameraIcon } from "../components/icons/IconComponents";

<CameraIcon size={28} color="#E6E6E6" />;
```

### UI Control Icons

#### MasterIcon

Primary state indicator or bullet point.

```jsx
import { MasterIcon } from "../components/icons/IconComponents";

<MasterIcon size={16} color="#E6E6E6" />;
```

#### BranchIcon

Branching options or version control.

```jsx
import { BranchIcon } from "../components/icons/IconComponents";

<BranchIcon size={16} color="#E6E6E6" />;
```

#### DropdownIcon

Expandable menus or dropdowns.

```jsx
import { DropdownIcon } from "../components/icons/IconComponents";

<DropdownIcon size={15} color="#E6E6E6" />;
```

#### DotsIcon

More options or settings menu.

```jsx
import { DotsIcon } from "../components/icons/IconComponents";

<DotsIcon size={20} color="#E6E6E6" />;
```

#### BackIcon

Back navigation.

```jsx
import { BackIcon } from "../components/icons/IconComponents";

<BackIcon size={20} color="#BFBFBF" />;
```

### Decorative Icons

#### StarIcon & StarImageIcon

See [STAR_USAGE.md](./STAR_USAGE.md) for detailed usage.

## Icon Props

All icons support these props:

- **size** (number): Width and height of the icon
  - Default varies by icon (16-28px)
  - Can be any positive number
- **color** (string): Color of the icon
  - Default: `"#E6E6E6"` (light gray)
  - Accepts any valid color: hex, rgb, rgba, named colors

## Usage Examples

### Basic Usage

```jsx
import { BrushIcon, CameraIcon } from "../components/icons/IconComponents";

function MyComponent() {
  return (
    <View>
      <BrushIcon />
      <CameraIcon size={40} color="#FF6B6B" />
    </View>
  );
}
```

### In Buttons

```jsx
import { TouchableOpacity, Text } from "react-native";
import { AddIcon } from "../components/icons/IconComponents";

function AddButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AddIcon size={24} color="#007AFF" />
      <Text>Add Item</Text>
    </TouchableOpacity>
  );
}
```

### Dynamic Colors

```jsx
import { BrushIcon } from "../components/icons/IconComponents";

function ThemedIcon({ isActive }) {
  return <BrushIcon size={28} color={isActive ? "#007AFF" : "#8E8E93"} />;
}
```

### With Themes

```jsx
import { useColorScheme } from "react-native";
import { CameraIcon } from "../components/icons/IconComponents";

function ThemedCamera() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return <CameraIcon size={28} color={iconColor} />;
}
```

## File Structure

```
components/icons/
├── IconComponents.jsx      # Central export file
├── AddIcon.jsx             # Individual icon files
├── BrushIcon.jsx
├── TShirtIcon.jsx
├── CameraIcon.jsx
├── MasterIcon.jsx
├── BranchIcon.jsx
├── DropdownIcon.jsx
├── DotsIcon.jsx
├── BackIcon.jsx
├── StarIcon.jsx
├── StarImageIcon.jsx
├── SVG_ICONS_GUIDE.md      # This file
└── STAR_USAGE.md           # Star icons documentation
```

## Customization

### Creating New Icons

To add a new SVG icon:

1. Create a new file: `components/icons/MyIcon.jsx`
2. Use the template:

```jsx
import React from "react";
import Svg, { Path } from "react-native-svg";

const MyIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="your SVG path data here"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MyIcon;
```

3. Export it in `IconComponents.jsx`:

```jsx
export { default as MyIcon } from "./MyIcon";
```

### Converting Figma Icons to SVG

1. Select icon in Figma
2. Right-click → "Copy/Paste as" → "Copy as SVG"
3. Use [react-svgr playground](https://react-svgr.com/playground/?native=true)
4. Set "React Native" mode
5. Paste SVG and get React Native component code
6. Create new icon file with the generated code
7. Add size and color props

## Performance Tips

- SVG icons are already optimized
- No need to lazy load - they're very lightweight
- Icons are tree-shakeable - only imported ones are bundled
- Use memo for icons in lists if needed

## Troubleshooting

### Icons not showing

Make sure `react-native-svg` is installed:

```bash
npx expo install react-native-svg
```

### Wrong size or color

Check default values and ensure props are passed correctly:

```jsx
<BrushIcon size={28} color="#E6E6E6" />
```

### Icons look blurry on Android

SVG icons should never be blurry. If they are, check:

- Correct viewBox is set (0 0 24 24)
- strokeWidth is appropriate for the size

## Migration Notes

All geometric icons have been replaced with SVG versions:

- ✅ Better visual quality
- ✅ More detailed designs
- ✅ Easier to customize
- ✅ Professional appearance
- ✅ No breaking changes to API

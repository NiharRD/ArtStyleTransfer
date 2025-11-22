# Component Guide

This guide explains all the modular components in the Art Style Transfer app and how to use them.

## 📦 Icon Components

Location: `components/icons/IconComponents.jsx`

### Available Icons

#### AddIcon

```jsx
import { AddIcon } from "../components/icons/IconComponents";
<AddIcon size={28} color="#CACACA" />;
```

- **Props**: `size` (number), `color` (string)
- **Use**: Create/add actions

#### BrushIcon

```jsx
<BrushIcon size={28} color="#CCCCCC" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Art/painting related features

#### TShirtIcon

```jsx
<TShirtIcon size={28} color="#CCCCCC" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Mockup generation features

#### CameraIcon

```jsx
<CameraIcon size={28} color="#CCCCCC" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Photo/camera related features

#### MasterIcon

```jsx
<MasterIcon size={16} color="#E6E6E6" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Master branch indicator

#### BranchIcon

```jsx
<BranchIcon size={16} color="#E6E6E6" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Branch indicator

#### DropdownIcon

```jsx
<DropdownIcon size={15} color="#E6E6E6" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Dropdown indicators

#### DotsIcon

```jsx
<DotsIcon size={20} color="#E6E6E6" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Menu/more options

#### BackIcon

```jsx
<BackIcon size={20} color="#BFBFBF" />
```

- **Props**: `size` (number), `color` (string)
- **Use**: Back navigation

#### StarImageIcon

```jsx
<StarImageIcon size={50} />
```

- **Props**: `size` (number), `style` (object)
- **Use**: Decorative gradient star (from Figma)
- **Note**: Uses actual image from Figma for pixel-perfect accuracy

#### StarIcon

```jsx
<StarIcon size={50} colors={["#FF1493", "#8A2BE2", "#0080FF"]} />
```

- **Props**: `size` (number), `colors` (array of strings)
- **Use**: Programmatic gradient star
- **Note**: Requires `expo-linear-gradient`

## 🎨 UI Components

### Header Component

Location: `components/ui/Header.jsx`

The main navigation header with project info and actions.

```jsx
import Header from "../components/ui/Header";

<Header
  title="Untitled Project 1"
  subtitle="Synced just now"
  onBackPress={() => console.log("Back")}
  onMenuPress={() => console.log("Menu")}
/>;
```

**Props:**

- `title` (string): Project title
- `subtitle` (string): Sync status or subtitle
- `onBackPress` (function): Back button callback
- `onMenuPress` (function): Menu button callback

**Styling:**

- Dark background with white text
- Fixed height with safe area padding
- Responsive to status bar

---

### ControlBar Component

Location: `components/ui/ControlBar.jsx`

Displays Master/Branch switcher and AI/Expert mode toggle.

```jsx
import ControlBar from "../components/ui/ControlBar";

<ControlBar />;
```

**Features:**

- Master/Branch switcher on left
- AI/Expert toggle on right
- Glass morphism effect

**Customization:**
To add more controls, edit the component and add new buttons in the `leftSection` or `rightSection`.

---

### QuickActionsBar Component

Location: `components/ui/QuickActionsBar.jsx`

Horizontal scrollable bar with quick action buttons.

```jsx
import QuickActionsBar from "../components/ui/QuickActionsBar";

<QuickActionsBar />;
```

**Features:**

- Horizontal scroll
- Snap to interval
- Supports multiple action types
- Configurable actions array

**Adding New Actions:**
Edit the `quickActions` array in the component:

```jsx
const quickActions = [
  {
    id: "your-action",
    icon: <YourIcon size={28} color="#CCCCCC" />,
    label: "Your\nAction",
    isActive: true, // or false
    isDashed: false, // true for dashed border
  },
  // ... more actions
];
```

---

### QuickActionButton Component

Location: `components/ui/QuickActionButton.jsx`

Individual button for quick actions.

```jsx
import QuickActionButton from "../components/ui/QuickActionButton";
import { BrushIcon } from "../components/icons/IconComponents";

<QuickActionButton
  icon={<BrushIcon size={28} color="#CCCCCC" />}
  label="Art Style\nTransfer"
  isActive={true}
  isDashed={false}
  onPress={() => console.log("Pressed")}
/>;
```

**Props:**

- `icon` (ReactNode): Icon component
- `label` (string): Button label (supports \n for line breaks)
- `isActive` (boolean): Active state styling
- `isDashed` (boolean): Dashed border style
- `onPress` (function): Press callback

**States:**

- **Default**: Transparent background
- **Active**: Light background with glass effect
- **Dashed**: Dashed border for "create" actions

---

### Button Component

Location: `components/ui/Button.jsx`

Generic button with icon and/or label.

```jsx
import Button from '../components/ui/Button';
import { BranchIcon } from '../components/icons/IconComponents';

// With icon and label
<Button
  icon={<BranchIcon size={16} color="#E6E6E6" />}
  label="Branch"
  onPress={() => console.log('Pressed')}
/>

// Icon only
<Button
  icon={<BranchIcon size={16} color="#E6E6E6" />}
  iconOnly={true}
  onPress={() => console.log('Pressed')}
/>
```

**Props:**

- `icon` (ReactNode): Icon component
- `label` (string): Button label
- `iconOnly` (boolean): Show only icon
- `onPress` (function): Press callback

**Variants:**

- **Text + Icon**: Default pill-shaped button
- **Icon Only**: Circular button

---

### Switcher Component

Location: `components/ui/Switcher.jsx`

Dropdown switcher for Master/Branch selection.

```jsx
import Switcher from "../components/ui/Switcher";

<Switcher label="Master" onPress={() => console.log("Open dropdown")} />;
```

**Props:**

- `label` (string): Current selection
- `onPress` (function): Press callback

**Features:**

- Shows current selection
- Dropdown indicator
- Glass morphism effect

---

### AIPromptButton Component

Location: `components/ui/AIPromptButton.jsx`

Animated AI prompt button with gradient effect.

```jsx
import AIPromptButton from "../components/ui/AIPromptButton";

<AIPromptButton onPress={() => console.log("AI Prompt")} />;
```

**Props:**

- `onPress` (function): Press callback

**Features:**

- Continuous rotation animation
- Pulse effect
- Gradient glow
- Multi-layer star effects

**Customization:**
Edit the `styles` object to change:

- Colors: `star1`, `star2`, `star3`, `innerCircle`
- Animation speed: `duration` in `useEffect`
- Size: Container dimensions

---

### DrawerToggle Component

Location: `components/ui/DrawerToggle.jsx`

Bottom drawer handle/toggle.

```jsx
import DrawerToggle from "../components/ui/DrawerToggle";

<DrawerToggle onPress={() => console.log("Toggle drawer")} />;
```

**Props:**

- `onPress` (function): Press callback

**Features:**

- iOS-style handle
- Centered alignment
- Smooth touch feedback

---

## 🎯 Usage Examples

### Example 1: Creating a New Feature Screen

```jsx
// app/style-transfer.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import { BrushIcon } from "../components/icons/IconComponents";

export default function StyleTransferScreen() {
  return (
    <View style={styles.container}>
      <Header
        title="Art Style Transfer"
        subtitle="Select a style"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Style</Text>
        {/* Add your feature content here */}
      </View>

      <Button
        icon={<BrushIcon size={20} color="#FFF" />}
        label="Apply Style"
        onPress={() => console.log("Apply")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191816",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 16,
  },
});
```

### Example 2: Adding a Custom Quick Action

```jsx
// In QuickActionsBar.jsx, add to quickActions array:
{
  id: 'filters',
  icon: <FilterIcon size={28} color="#CCCCCC" />,
  label: 'Photo\nFilters',
  isActive: true,
}

// Create the icon in IconComponents.jsx:
export const FilterIcon = ({ size = 28, color = '#E6E6E6' }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    <View style={[styles.filterIcon, { borderColor: color }]} />
  </View>
);
```

### Example 3: Custom Header Configuration

```jsx
<Header
  title="My Custom Project"
  subtitle="Last edited 5 mins ago"
  onBackPress={() => {
    // Custom back logic
    if (hasUnsavedChanges) {
      Alert.alert("Unsaved Changes", "Do you want to save?");
    } else {
      router.back();
    }
  }}
  onMenuPress={() => {
    // Open custom menu
    setMenuVisible(true);
  }}
/>
```

## 🎨 Styling Guidelines

### Color Palette

```javascript
const colors = {
  background: "#191816",
  surface: "#2A2A28",
  surfaceLight: "#3A3A38",

  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC",
  textTertiary: "#999999",
  textMuted: "#CACACA",

  accent: "#E6E6E6",

  glassBackground: "rgba(118, 118, 128, 0.12)",
  glassBorder: "rgba(120, 120, 128, 0.16)",
  glassActive: "rgba(118, 118, 128, 0.24)",

  aiPrimary: "#8A2BE2",
  aiSecondary: "#FF1493",
  aiTertiary: "#00BFFF",
};
```

### Typography Scale

```javascript
const typography = {
  title: {
    fontSize: 16,
    letterSpacing: -0.23,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 14,
  },
  body: {
    fontSize: 13,
    lineHeight: 17,
  },
  button: {
    fontSize: 16,
    letterSpacing: -0.16,
  },
};
```

### Spacing System

```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};
```

### Border Radius

```javascript
const borderRadius = {
  small: 12,
  medium: 22,
  large: 70,
  full: 100,
};
```

## 🔧 Best Practices

1. **Component Reusability**: Always create reusable components in `components/` directory
2. **Prop Types**: Document all props with comments or TypeScript
3. **Styling**: Use StyleSheet.create() for all styles
4. **Icons**: Keep icons in IconComponents.jsx for consistency
5. **Callbacks**: Always provide onPress handlers for interactive elements
6. **Accessibility**: Add accessible labels where needed
7. **Performance**: Use React.memo() for expensive components
8. **Testing**: Test components in isolation before integration

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [Expo Vector Icons](https://icons.expo.fyi/)

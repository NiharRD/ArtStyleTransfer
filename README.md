# Art Style Transfer - Photo Editor App

A modular React Native photo editor app with Art Style Transfer as the main feature. Built with Expo Router and designed for easy feature expansion.

## 🏗️ Architecture

The app follows a modular component-based architecture that makes it easy to add new features:

### Component Structure

```
app/
├── index.jsx                 # Main home screen
│
components/
├── icons/
│   └── IconComponents.jsx    # Reusable icon components
│
└── ui/
    ├── Header.jsx            # Top navigation header
    ├── ControlBar.jsx        # Master/Branch switcher and AI/Expert toggle
    ├── QuickActionsBar.jsx   # Horizontal scrollable action buttons
    ├── QuickActionButton.jsx # Individual quick action button
    ├── Button.jsx            # Generic button component
    ├── Switcher.jsx          # Dropdown switcher component
    ├── AIPromptButton.jsx    # Animated AI prompt button
    └── DrawerToggle.jsx      # Bottom drawer handle
```

## 🎨 Features

### Current Implementation

1. **Home Screen** - Main canvas for photo editing

   - Image display area (450px height)
   - Responsive layout
   - Dark theme (#191816 background)

2. **Header Component**

   - Project title and sync status
   - Back navigation
   - Menu options

3. **Control Bar**

   - Master/Branch switcher
   - AI/Expert mode toggle

4. **Quick Actions Bar**

   - Horizontal scrollable actions
   - Smooth snap scrolling
   - Multiple action types:
     - Create a shortcut (dashed border)
     - Art Style Transfer (main feature)
     - Generate Mockup
     - Product Mockup
     - Global Editing

5. **AI Prompt Button**
   - Animated gradient effect
   - Continuous rotation
   - Pulse animation
   - Positioned on the right side

### Main Feature: Art Style Transfer

The primary feature of this app. Currently displays as a quick action button. Ready for implementation of:

- Style selection
- Image processing
- Preview generation
- Style intensity controls

## 🔧 Adding New Features

The modular structure makes it easy to extend functionality:

### Adding a New Quick Action

1. Create a new icon in `components/icons/IconComponents.jsx`:

```javascript
export const YourIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    {/* Your icon design */}
  </View>
);
```

2. Add to `QuickActionsBar.jsx`:

```javascript
{
  id: 'your-feature',
  icon: <YourIcon size={28} color="#CCCCCC" />,
  label: 'Your\nFeature',
  isActive: true,
}
```

### Adding a New Screen

1. Create a new file in `app/` directory:

```javascript
// app/your-feature.jsx
import React from "react";
import { View, Text } from "react-native";

export default function YourFeature() {
  return (
    <View>
      <Text>Your Feature Screen</Text>
    </View>
  );
}
```

2. Navigate using Expo Router:

```javascript
import { router } from "expo-router";
router.push("/your-feature");
```

### Adding a New UI Component

Create reusable components in `components/ui/`:

```javascript
// components/ui/YourComponent.jsx
import React from "react";
import { View, StyleSheet } from "react-native";

const YourComponent = ({ ...props }) => {
  return <View style={styles.container}>{/* ... */}</View>;
};

const styles = StyleSheet.create({
  container: {
    // Your styles
  },
});

export default YourComponent;
```

## 🎯 Design System

### Colors

- Background: `#191816`
- Primary Text: `#FFFFFF`
- Secondary Text: `#999999`, `#CCCCCC`, `#CACACA`
- Accent: `#E6E6E6`
- Glass Effect: `rgba(118, 118, 128, 0.12)`
- Border: `rgba(120, 120, 128, 0.16)`

### Typography

- Font Family: System (SF Pro on iOS, Roboto on Android)
- Sizes: 12px, 13px, 16px, 17px

### Spacing

- Standard padding: 16px
- Component gaps: 4px, 5px, 8px, 10px
- Border radius: 22px (buttons), 70px (pills), 100px (circles)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📱 Screens Overview

### Home Screen (`app/index.jsx`)

The main screen featuring:

- Header with project info
- Control bar for mode switching
- Large image display area (ready for photo editing)
- Scrollable quick actions
- AI prompt button for style transfer
- Bottom drawer toggle

## 🔮 Future Enhancements

Ready to implement:

- [ ] Image picker integration
- [ ] Art style transfer ML model
- [ ] Style library/gallery
- [ ] Image filters and adjustments
- [ ] Export and sharing
- [ ] Project management
- [ ] Cloud sync
- [ ] Collaborative editing

## 📄 License

This project is part of the Art Style Transfer application.

## 🤝 Contributing

The modular architecture makes contributions straightforward:

1. Create components in appropriate directories
2. Follow existing naming conventions
3. Use StyleSheet for styling (no inline styles)
4. Keep components focused and reusable

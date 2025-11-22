# Quick Start Guide

Get your Art Style Transfer app running in minutes!

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will open the Expo Dev Tools in your browser.

### 3. Run on Device/Simulator

**iOS (Mac only):**

```bash
npm run ios
```

**Android:**

```bash
npm run android
```

**Or scan QR code with Expo Go app:**

- iOS: Use Camera app
- Android: Use Expo Go app

## 📱 Testing the App

### Home Screen Features

1. **Header**:

   - Tap back arrow → See "Back to projects" alert
   - Tap three dots → See "Project options" alert

2. **Control Bar**:

   - "Master" button → Dropdown (placeholder)
   - "Branch" button → Branch options (placeholder)
   - "AI/Expert" toggle → Switch modes (placeholder)

3. **Quick Actions** (scroll horizontally):

   - **Create a shortcut** → Alert dialog
   - **Art Style Transfer** → Navigate to style selection screen ✨
   - **Generate Mockup** → Navigate to mockup screen
   - **Product Mockup** → Navigate to mockup screen
   - **Global Editing** → Coming soon alert

4. **AI Prompt Button** (animated purple button):

   - Tap → See AI assistant alert
   - Watch the rotation and pulse animations

5. **Drawer Toggle** (bottom handle):
   - Tap → See drawer alert

### Feature Screens

**Art Style Transfer** (`/art-style-transfer`):

- Select from 6 art styles
- Tap "Apply Style" button
- Returns to home screen

**Generate Mockup** (`/generate-mockup`):

- Select from 6 mockup templates
- Tap "Generate Mockup" button
- Returns to home screen

## 🎨 Customization Quick Tips

### Change Colors

Edit `constants/Theme.js`:

```javascript
export const Colors = {
  background: "#191816", // Change app background
  aiPrimary: "#8A2BE2", // Change AI button color
  // ... more colors
};
```

### Add a New Quick Action

1. Add icon to `components/icons/IconComponents.jsx`:

```javascript
export const YourIcon = ({ size = 28, color = "#E6E6E6" }) => (
  <View style={[styles.iconContainer, { width: size, height: size }]}>
    {/* Your icon design */}
  </View>
);
```

2. Add to `components/ui/QuickActionsBar.jsx`:

```javascript
const quickActions = [
  // ... existing actions
  {
    id: "your-feature",
    icon: <YourIcon size={28} color="#CCCCCC" />,
    label: "Your\nFeature",
    isActive: true,
  },
];
```

3. Add navigation in `handleActionPress`:

```javascript
case 'your-feature':
  router.push('/your-feature');
  break;
```

4. Create screen `app/your-feature.jsx`:

```javascript
import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import Header from "../components/ui/Header";
import { Colors } from "../constants/Theme";

export default function YourFeatureScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Your Feature"
        subtitle="Description"
        onBackPress={() => router.back()}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Your feature content here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
});
```

### Modify AI Button Animation

Edit `components/ui/AIPromptButton.jsx`:

```javascript
// Change rotation speed (milliseconds)
duration: 8000,  // Slower = higher number

// Change pulse scale
aiScale: {
  min: 1,
  max: 1.05,  // Increase for more dramatic pulse
},

// Change colors
const styles = StyleSheet.create({
  innerCircle: {
    backgroundColor: '#8A2BE2',  // Change main color
  },
  star1: {
    backgroundColor: 'rgba(138, 43, 226, 0.3)',  // Change glow color
  },
});
```

## 🔧 Common Tasks

### Add Image Picker

1. Install package:

```bash
npx expo install expo-image-picker
```

2. Add to home screen (`app/index.jsx`):

```javascript
import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};

// Add button to trigger pickImage()
```

### Add Loading State

```javascript
const [isLoading, setIsLoading] = useState(false);

// In your component:
{isLoading ? (
  <ActivityIndicator size="large" color={Colors.aiPrimary} />
) : (
  // Your content
)}
```

### Add Toast Notifications

1. Install:

```bash
npm install react-native-toast-message
```

2. Use in components:

```javascript
import Toast from "react-native-toast-message";

Toast.show({
  type: "success",
  text1: "Style Applied!",
  text2: "Your image has been transformed",
});
```

## 📚 File Structure Reference

```
app/
├── index.jsx                 # Home screen - START HERE
├── art-style-transfer.jsx    # Style selection screen
└── generate-mockup.jsx       # Mockup generation screen

components/
├── icons/
│   └── IconComponents.jsx    # All icons - ADD NEW ICONS HERE
└── ui/
    ├── Header.jsx            # Top navigation
    ├── ControlBar.jsx        # Master/Branch controls
    ├── QuickActionsBar.jsx   # Scrollable actions - ADD ACTIONS HERE
    ├── QuickActionButton.jsx # Individual button
    ├── Button.jsx            # Generic button
    ├── Switcher.jsx          # Dropdown switcher
    ├── AIPromptButton.jsx    # Animated AI button
    └── DrawerToggle.jsx      # Bottom drawer

constants/
└── Theme.js                  # Design tokens - CUSTOMIZE COLORS HERE
```

## 🐛 Troubleshooting

### App won't start

```bash
# Clear cache
npx expo start -c

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Navigation not working

- Make sure you're using `router.push()` from `expo-router`
- Check that screen files are in the `app/` directory
- Verify file names match route paths

### Icons not showing

- Check import paths in component files
- Verify icon component is exported from `IconComponents.jsx`
- Ensure size and color props are passed correctly

### Animations laggy

- Run on physical device instead of simulator
- Reduce animation duration in `Theme.js`
- Check for console warnings

## 🎯 Next Steps

1. **Test the app** - Run on device and try all interactions
2. **Add image picker** - Let users select photos
3. **Implement style transfer** - Add ML model
4. **Add more features** - Use the modular structure
5. **Customize design** - Modify colors and spacing in Theme.js

## 📖 Documentation

- **README.md** - Project overview and architecture
- **COMPONENT_GUIDE.md** - Detailed component documentation
- **IMPLEMENTATION_SUMMARY.md** - What was built and why
- **QUICK_START.md** - This file

## 💡 Tips

1. **Use Theme constants** - Don't hardcode colors/spacing
2. **Keep components small** - One responsibility per component
3. **Test on real device** - Animations perform better
4. **Use Expo Go** - Fast development iteration
5. **Check console** - Warnings often reveal issues

## 🚀 Ready to Build!

Your app is ready to go. Start by:

1. Running `npm start`
2. Testing all screens and interactions
3. Adding your custom features
4. Implementing the ML model for style transfer

Happy coding! 🎨

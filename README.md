# Art Style Transfer App

A React Native app built with Expo that allows users to apply artistic styles to images and generate product mockups.

## 🚀 Features

- 🎨 **Art Style Transfer** - Apply famous art styles to your images
- 👕 **Mockup Generation** - Create product mockups for apparel and accessories
- ✨ **Beautiful UI** - Modern, animated interface with gradient effects
- 📱 **Cross-Platform** - Works on iOS, Android, and Web

## 📁 Project Structure

```
ArtStyleTransfer/
├── app/                          # Expo Router screens
│   ├── _layout.jsx              # Root navigation layout
│   ├── index.jsx                # Home screen
│   ├── (features)/              # Feature screens route group
│   │   ├── _layout.jsx
│   │   ├── art-style-transfer.jsx
│   │   └── generate-mockup.jsx
│   └── (demo)/                  # Demo screens route group
│       ├── _layout.jsx
│       └── star-demo.jsx
├── components/                   # Reusable components
│   ├── icons/                   # SVG icon components
│   │   ├── IconComponents.jsx  # Icon exports
│   │   ├── AddIcon.jsx
│   │   ├── BrushIcon.jsx
│   │   ├── CameraIcon.jsx
│   │   ├── TShirtIcon.jsx
│   │   └── ... (more icons)
│   └── ui/                      # UI components
│       ├── AIPromptButton.jsx   # Animated AI button
│       ├── Button.jsx
│       ├── Header.jsx
│       ├── QuickActionsBar.jsx
│       └── ... (more components)
├── constants/                    # App constants
│   ├── Colors.ts
│   └── Theme.js
└── assets/                       # Images and fonts
    ├── images/
    └── fonts/
```

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) ~54.0
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) v6
- **UI**: React Native 0.81.5
- **Icons**: react-native-svg 15.12.1
- **Gradients**: expo-linear-gradient 15.0.7
- **Animations**: react-native-reanimated 4.1.1

## 📦 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ArtStyleTransfer
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

4. **Run on your platform**

```bash
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For Web
```

## 🎯 Navigation Structure

This app uses **Expo Router** with file-based navigation and route groups:

```
/                          → Home screen
/art-style-transfer       → Art style transfer feature
/generate-mockup          → Mockup generation feature
/star-demo                → Icon demo (modal)
```

See [NAVIGATION_STRUCTURE.md](./NAVIGATION_STRUCTURE.md) for detailed navigation guide.

## 🎨 Components

### Icons

All icons are SVG-based for perfect scaling and customization:

```jsx
import { BrushIcon, CameraIcon, TShirtIcon } from './components/icons/IconComponents';

<BrushIcon size={28} color="#E6E6E6" />
<CameraIcon size={40} color="#007AFF" />
<TShirtIcon size={32} color="#FF6B6B" />
```

See [SVG_ICONS_GUIDE.md](./components/icons/SVG_ICONS_GUIDE.md) for icon documentation.

### UI Components

#### AIPromptButton

Beautiful animated button with diamond shape and sparkles:

```jsx
import AIPromptButton from "./components/ui/AIPromptButton";

<AIPromptButton onPress={handleAIPrompt} />;
```

#### QuickActionsBar

Horizontal scrollable action buttons:

```jsx
import QuickActionsBar from "./components/ui/QuickActionsBar";

<QuickActionsBar />;
```

#### Header

Consistent header with back button and menu:

```jsx
import Header from "./components/ui/Header";

<Header
  title="My Screen"
  subtitle="Description"
  onBackPress={() => router.back()}
  onMenuPress={() => console.log("Menu")}
/>;
```

## 🎨 Theming

The app uses a consistent dark theme defined in `constants/Theme.js`:

```javascript
const Colors = {
  background: "#191816",
  surface: "#2A2A28",
  textPrimary: "#E6E6E6",
  aiPrimary: "#8A2BE2",
  // ... more colors
};
```

## 📱 Screens

### Home Screen (`app/index.jsx`)

- Main workspace
- Image display area
- Quick actions bar
- AI prompt button

### Art Style Transfer (`app/(features)/art-style-transfer.jsx`)

- Style gallery selection
- Preview generation (coming soon)
- Style intensity controls (coming soon)

### Generate Mockup (`app/(features)/generate-mockup.jsx`)

- Mockup template selection
- Product categories
- Export options (coming soon)

### Star Demo (`app/(demo)/star-demo.jsx`)

- Icon showcase
- Usage examples
- Implementation guide

## 🔧 Configuration

### App Configuration (`app.json`)

- App name, slug, version
- Expo Router enabled
- Deep linking configured
- Platform-specific settings

### TypeScript

TypeScript is configured with strict mode. Type definitions are in `expo-env.d.ts`.

## 🚦 Development

### Start Development Server

```bash
npm start
```

Opens Expo Dev Tools where you can:

- Scan QR code with Expo Go
- Open in iOS Simulator
- Open in Android Emulator
- Open in web browser

### Clear Cache

If you encounter issues:

```bash
npx expo start -c
```

### Build for Production

```bash
# iOS
npx expo build:ios

# Android
npx expo build:android

# EAS Build (recommended)
eas build --platform ios
eas build --platform android
```

## 📚 Documentation

- [NAVIGATION_STRUCTURE.md](./NAVIGATION_STRUCTURE.md) - Navigation guide
- [EXPO_ROUTER_SETUP.md](./EXPO_ROUTER_SETUP.md) - Expo Router setup
- [SVG_ICONS_GUIDE.md](./components/icons/SVG_ICONS_GUIDE.md) - Icon usage
- [ICONS_AND_BUTTON_UPDATE.md](./ICONS_AND_BUTTON_UPDATE.md) - Recent updates
- [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md) - Component documentation

## 🎓 Key Concepts

### Expo Router

File-based routing system where file structure = route structure:

- `app/index.jsx` → `/`
- `app/(features)/art-style-transfer.jsx` → `/art-style-transfer`

Route groups (parentheses) organize files without affecting URLs.

### SVG Icons

All icons use `react-native-svg` for:

- Perfect scaling at any size
- Easy color customization
- Small bundle size
- Consistent rendering

### Animations

Smooth animations using:

- `Animated` API for interpolations
- `react-native-reanimated` for complex gestures
- `expo-linear-gradient` for gradient effects

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache and restart
npx expo start -c

# Reset Metro bundler
rm -rf node_modules .expo
npm install
npx expo start
```

### Navigation Not Working

1. Check file exports are default exports
2. Verify paths include route groups
3. Restart dev server

### Icons Not Showing

1. Ensure `react-native-svg` is installed
2. Check imports are correct
3. Clear cache

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

[Your License Here]

## 👥 Authors

[Your Name/Team]

## 🙏 Acknowledgments

- Expo team for amazing tools
- Figma for design resources
- React Native community

---

**Happy Coding! 🎨✨**

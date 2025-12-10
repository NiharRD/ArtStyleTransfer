# ArtStyleTransfer

A React Native mobile application for AI-powered image editing with art style transfer, smart adjustments, and intelligent prompt autocomplete.

![Expo](https://img.shields.io/badge/Expo-54-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-green)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-orange)

## 🎨 Features

### Core Features

- **Art Style Transfer** - Apply artistic styles to your photos using AI
- **Smart Adjust (Global Editing)** - AI-powered image adjustments with natural language prompts
- **Background Reconstruction** - Intelligent background editing and generation
- **Mockup Generation** - Create product mockups with your images

### AI-Powered Text Input

- **Ghost Text Autocomplete** - Real-time AI suggestions as you type prompts
- **Prompt Refinement** - One-click enhancement of your prompts using AI
- **Smart Suggestions** - Context-aware suggestions based on image analysis (powered by Google Gemini)
- **Cycling Suggestions** - Animated placeholder suggestions for inspiration

### UI/UX

- **Infinite Canvas** - Zoomable and pannable image view
- **Full-Screen Preview** - Distraction-free image viewing
- **Onboarding Overlay** - Guided tour for new users
- **Quick Actions Bar** - Fast access to common editing tools

## 🏗️ Architecture

```
ArtStyleTransfer/
├── app/                          # Expo Router screens
│   ├── index.jsx                 # Main editing workspace
│   ├── _layout.jsx              # Root layout
│   ├── (demo)/                  # Demo screens
│   └── (features)/              # Feature screens
├── components/
│   ├── modals/                  # Modal components
│   │   ├── GlobalEditingModal.jsx
│   │   ├── ArtStyleTransferModal.jsx
│   │   ├── GenerateMockupModal.jsx
│   │   └── GeneralPromptModal.jsx
│   ├── ui/                      # UI components
│   │   ├── GhostTextInput.jsx   # AI autocomplete text input
│   │   ├── SmartSuggestions.jsx # Gemini-powered suggestions
│   │   └── ...
│   ├── icons/                   # SVG icon components
│   └── FilteredImage.jsx        # GL-based image filters
├── hooks/
│   ├── useGhostSuggestion.js    # Ghost text autocomplete hook
│   └── useRefinePrompt.js       # Prompt refinement hook
├── constants/
│   ├── Theme.js                 # Design system
│   └── Colors.ts                # Color palette
├── context/
│   └── OnboardingContext.jsx    # Onboarding state
└── assets/                      # Images, fonts, icons
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ArtStyleTransfer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Run on device/emulator**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

## 🤖 AI Backend Setup

### Local LLM Server (for Ghost Text & Refine)

The app connects to a local FastAPI server for text autocomplete and refinement.

1. **Server Requirements**

   - Python 3.8+
   - FastAPI
   - Llama 3.2 3B model (or compatible)

2. **Server Endpoints**

   | Endpoint        | Method | Description                     |
   | --------------- | ------ | ------------------------------- |
   | `/autocomplete` | POST   | Generate ghost text suggestions |
   | `/refine`       | POST   | Refine and enhance prompts      |

3. **Request Format**

   ```json
   {
     "sentence": "Make the image look",
     "suggestions": ["cinematic", "warm", "vintage"]
   }
   ```

4. **Response Format**

   ```json
   {
     "completion": " more dramatic with deeper shadows",
     "full_text": "Make the image look more dramatic with deeper shadows"
   }
   ```

5. **Configure Server IP**

   Update the IP address in:

   - `hooks/useGhostSuggestion.js`
   - `hooks/useRefinePrompt.js`

   ```javascript
   const response = await fetch("http://YOUR_IP:8000/autocomplete", ...);
   ```

### Cloud AI Services

The app also uses cloud-based AI services defined in `endPoints.js`:

- **PhotoArt Backend** - Image processing operations
- **SDXL Img2Img API** - Art style transfer

## 📱 Target Device Optimization

The app is optimized for mid-range devices like **OnePlus Nord CE 4** with:

- Reduced context window (128 tokens) for on-device LLM
- Debounced API calls (1000ms) for autocomplete
- Efficient animations using native driver
- Memory-conscious image handling

## 🔧 Key Dependencies

| Package                   | Version  | Purpose                   |
| ------------------------- | -------- | ------------------------- |
| `expo`                    | ~54.0.25 | Core framework            |
| `react-native`            | 0.81.5   | Mobile framework          |
| `expo-router`             | ~6.0.15  | File-based navigation     |
| `expo-gl`                 | ~16.0.7  | OpenGL image processing   |
| `gl-react`                | ^5.2.0   | GL-based filters          |
| `@google/generative-ai`   | ^0.24.1  | Gemini AI for suggestions |
| `react-native-executorch` | ^0.5.15  | On-device LLM (optional)  |
| `react-native-reanimated` | ~4.1.1   | Animations                |
| `axios`                   | ^1.13.2  | HTTP client               |

## 🎯 Usage Guide

### Smart Adjust (Global Editing)

1. Select an image from your gallery
2. Tap the "Smart Adjust" button
3. Type a natural language prompt (e.g., "Make it look cinematic")
4. Ghost text will suggest completions as you type
5. Press Tab/Enter to accept suggestions
6. Tap "Refine" to enhance your prompt using AI
7. Apply the adjustment

### Art Style Transfer

1. Select a source image
2. Choose a reference style from the gallery
3. Optionally add a custom prompt
4. Apply the style transfer

### Ghost Text Features

- **Autocomplete**: Suggestions appear as you type (gray overlay text)
- **Accept**: Press Tab or tap the suggestion area
- **Dismiss**: Continue typing to ignore suggestions
- **Skip after Refine**: Autocomplete is automatically disabled after using the refine feature

## 🛠️ Development

### Scripts

```bash
npm start       # Start Expo dev server
npm run android # Run on Android
npm run ios     # Run on iOS
npm run web     # Run in web browser
```

### Adding New Modals

All modals should accept and pass `suggestions` prop to `GhostTextInput`:

```jsx
<GhostTextInput
  value={promptText}
  onChangeText={handleTextChange}
  llm={llm}
  modelReady={modelReady}
  suggestions={suggestions} // Pass suggestions for context-aware autocomplete
  skipAutocomplete={wasRefined} // Skip autocomplete after refine
/>
```

### Project Structure Conventions

- **Screens**: `app/` directory (Expo Router)
- **Components**: `components/` with subdirectories for organization
- **Hooks**: `hooks/` for custom React hooks
- **Constants**: `constants/` for theme and configuration

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Internal development only.

---

Built with ❤️ using React Native and Expo

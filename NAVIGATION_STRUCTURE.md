# Navigation Structure - Expo Router

## Overview

This app uses **Expo Router** for file-based navigation. The routing structure is organized using route groups for better code organization and maintainability.

## File Structure

```
app/
├── _layout.jsx                    # Root layout with Stack navigation
├── index.jsx                      # Home screen (/)
├── (features)/                    # Route group for app features
│   ├── _layout.jsx               # Features layout
│   ├── art-style-transfer.jsx    # Art style transfer screen
│   └── generate-mockup.jsx       # Mockup generation screen
└── (demo)/                        # Route group for demo screens
    ├── _layout.jsx               # Demo layout
    └── star-demo.jsx             # Star icon demo screen
```

## Route Groups Explanation

Route groups use parentheses `()` to organize files without affecting the URL structure.

### Benefits:

- 🗂️ **Organization**: Group related screens together
- 🔗 **Clean URLs**: Parentheses don't appear in URLs
- 🎨 **Shared Layouts**: Each group can have its own layout
- 📱 **Better Structure**: Easier to maintain and navigate codebase

### Example:

- File: `app/(features)/art-style-transfer.jsx`
- URL: `/art-style-transfer` (not `/features/art-style-transfer`)

## Routes

### Main Routes

| Route                 | File                                    | Description                     |
| --------------------- | --------------------------------------- | ------------------------------- |
| `/`                   | `app/index.jsx`                         | Home screen with main workspace |
| `/art-style-transfer` | `app/(features)/art-style-transfer.jsx` | Art style transfer feature      |
| `/generate-mockup`    | `app/(features)/generate-mockup.jsx`    | Mockup generation feature       |
| `/star-demo`          | `app/(demo)/star-demo.jsx`              | Star icon demo (modal)          |

## Navigation Methods

### 1. Using `router.push()`

```jsx
import { router } from "expo-router";

// Navigate to a screen
router.push("/(features)/art-style-transfer");
router.push("/(features)/generate-mockup");
router.push("/(demo)/star-demo");

// Navigate back
router.back();

// Replace current screen
router.replace("/");
```

### 2. Using `Link` Component

```jsx
import { Link } from "expo-router";

<Link href="/(features)/art-style-transfer">Go to Art Style Transfer</Link>;
```

### 3. Using `useRouter` Hook

```jsx
import { useRouter } from "expo-router";

function MyComponent() {
  const router = useRouter();

  const navigate = () => {
    router.push("/(features)/art-style-transfer");
  };

  return <Button onPress={navigate} title="Navigate" />;
}
```

## Layout Hierarchy

### Root Layout (`app/_layout.jsx`)

- Sets up global configurations
- Defines Stack navigator
- Applies to all screens
- Configures animations and transitions

```jsx
<Stack
  screenOptions={{
    headerShown: false,
    contentStyle: { backgroundColor: Colors.background },
    animation: "slide_from_right",
  }}
>
  <Stack.Screen name="index" />
  <Stack.Screen name="(features)" />
  <Stack.Screen name="(demo)" options={{ presentation: "modal" }} />
</Stack>
```

### Features Layout (`app/(features)/_layout.jsx`)

- Handles feature screens
- Slide-from-right animation
- Card presentation

### Demo Layout (`app/(demo)/_layout.jsx`)

- Handles demo screens
- Modal presentation
- Slide-from-bottom animation

## Screen Options

### Presentation Styles

1. **Card** (default)

   - Standard screen push
   - Slide from right animation
   - Full-screen takeover

2. **Modal**
   - Slide up from bottom
   - Can be dismissed with gesture
   - Perfect for demos/settings

### Animation Options

- `slide_from_right` - Standard navigation
- `slide_from_bottom` - Modal presentation
- `slide_from_left` - Back navigation
- `fade` - Crossfade transition

## Navigation Flow

### Home → Features

```
Home Screen (/)
  ↓ (Quick Action Bar)
  ├─→ Art Style Transfer (/(features)/art-style-transfer)
  │    ↓ (Back button)
  │    └─→ Home Screen
  │
  └─→ Generate Mockup (/(features)/generate-mockup)
       ↓ (Back button)
       └─→ Home Screen
```

### Home → Demo

```
Home Screen (/)
  ↓ (Special link/button)
  └─→ Star Demo (/(demo)/star-demo) [Modal]
       ↓ (Swipe down or back)
       └─→ Home Screen
```

## Current Navigation Implementations

### QuickActionsBar Component

Located in: `components/ui/QuickActionsBar.jsx`

```jsx
const handleActionPress = (actionId) => {
  switch (actionId) {
    case "art-style":
      router.push("/(features)/art-style-transfer");
      break;
    case "generate-mockup":
      router.push("/(features)/generate-mockup");
      break;
    // ... other actions
  }
};
```

### Feature Screens

Both art-style-transfer and generate-mockup use:

```jsx
// Back navigation
<Header
  onBackPress={() => router.back()}
  onMenuPress={() => console.log("Menu")}
/>
```

## Adding New Routes

### Add a New Feature Screen

1. Create file in `app/(features)/`:

   ```
   app/(features)/new-feature.jsx
   ```

2. Export default component:

   ```jsx
   export default function NewFeature() {
     return <View>...</View>;
   }
   ```

3. Navigate to it:
   ```jsx
   router.push("/(features)/new-feature");
   ```

### Add a New Route Group

1. Create folder with parentheses:

   ```
   app/(settings)/
   ```

2. Create layout file:

   ```jsx
   // app/(settings)/_layout.jsx
   export default function SettingsLayout() {
     return <Stack>...</Stack>;
   }
   ```

3. Add screens:

   ```
   app/(settings)/profile.jsx
   app/(settings)/preferences.jsx
   ```

4. Register in root layout:
   ```jsx
   // app/_layout.jsx
   <Stack.Screen name="(settings)" />
   ```

## Deep Linking

Expo Router automatically handles deep links based on the file structure:

```
artstyletransfer://art-style-transfer
artstyletransfer://generate-mockup
artstyletransfer://star-demo
```

Configure in `app.json`:

```json
{
  "expo": {
    "scheme": "artstyletransfer"
  }
}
```

## Best Practices

### ✅ Do:

- Use route groups to organize related screens
- Keep layout files focused and simple
- Use descriptive file names
- Implement proper back navigation
- Handle loading and error states

### ❌ Don't:

- Don't nest route groups too deeply
- Don't mix navigation patterns (Stack/Tabs) without reason
- Don't forget to export default component
- Don't hardcode screen names - use route constants if needed

## Typed Routes

Expo Router generates TypeScript types automatically when enabled:

```json
{
  "experiments": {
    "typedRoutes": true
  }
}
```

This provides autocomplete and type safety for routes!

## Debugging Navigation

### Check Current Route

```jsx
import { usePathname } from "expo-router";

function MyComponent() {
  const pathname = usePathname();
  console.log("Current route:", pathname);
}
```

### Navigation State

```jsx
import { useNavigation } from "expo-router";

function MyComponent() {
  const navigation = useNavigation();
  console.log("Navigation state:", navigation.getState());
}
```

## Performance Tips

1. **Lazy Loading**: Screens are automatically code-split
2. **Animations**: Use native driver for smooth animations
3. **Caching**: Screens remain mounted when navigating back
4. **Gestures**: Enable gestures for better UX

## Migration Notes

### From Previous Structure

Old:

```jsx
// Flat structure
app / art - style - transfer.jsx;
app / generate - mockup.jsx;
```

New:

```jsx
// Organized with route groups
app / features / art - style - transfer.jsx;
app / features / generate - mockup.jsx;
```

### Updated Import Paths

Navigation paths updated in:

- ✅ `components/ui/QuickActionsBar.jsx`
- ✅ All screen components use `router.back()`
- ✅ Layout files properly configured

## Testing Navigation

Run the app and test:

1. ✅ Home screen loads
2. ✅ Click "Art Style Transfer" quick action
3. ✅ Navigate to art style transfer screen
4. ✅ Press back button to return home
5. ✅ Click "Generate Mockup" quick action
6. ✅ Navigate to mockup screen
7. ✅ Press back button to return home

All navigation should be smooth with proper animations!

## Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [File-based Routing](https://docs.expo.dev/router/create-pages/)
- [Layouts](https://docs.expo.dev/router/layouts/)
- [Navigation](https://docs.expo.dev/router/navigating-pages/)

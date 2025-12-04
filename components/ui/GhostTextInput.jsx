import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../../constants/Theme';
import { useGhostSuggestion } from '../../hooks/useGhostSuggestion';

/**
 * GhostTextInput
 * A TextInput that displays AI-generated ghost suggestions.
 * 
 * @param {object} props - Standard TextInput props
 * @param {object} props.llm - The LLM instance
 * @param {function} props.onSuggestionAccept - Callback when suggestion is accepted (optional)
 */
const GhostTextInput = ({ 
  llm, 
  modelReady,
  value, 
  onChangeText, 
  style, 
  onSuggestionAccept,
  ...props 
}) => {
  const { suggestion, isLoading } = useGhostSuggestion(value, llm, modelReady);
  
  const handleAcceptSuggestion = () => {
    if (suggestion && onChangeText) {
      const newValue = value + (value.endsWith(' ') ? '' : ' ') + suggestion;
      onChangeText(newValue);
      if (onSuggestionAccept) {
        onSuggestionAccept(newValue);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* 
         Overlay Text for Ghost Suggestion 
         We render this BEHIND the input if transparent, or we can try to render it 
         as a separate element if we can't align them perfectly.
         
         Given React Native styling limitations for exact text alignment with wrapping,
         a common trick is to render the text invisible + suggestion visible.
         But TextInput has its own scrolling and layout logic.
         
         Alternative: Display suggestion as a distinct UI element if alignment is hard.
         "to the right of the unfinished text" implies inline.
         
         Let's try to render the suggestion text *after* the input text in a container
         that mimics the input's layout.
      */}
      
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
         <Text style={[styles.ghostText, props.multiline ? styles.multilineGhost : {}]}>
            <Text style={{color: 'transparent'}}>{value}</Text>
            <Text style={{color: Colors.textAccent, opacity: 0.6}}>
               {suggestion ? (value.endsWith(' ') ? '' : ' ') + suggestion : ''}
            </Text>
         </Text>
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { color: Colors.textPrimary }]} // Ensure input text is visible
        {...props}
      />
      
      {/* 
        Interactive layer to accept suggestion? 
        Usually tab or a specific button accepts it. 
        Mobile: maybe tapping the ghost text?
        But the ghost text is behind or non-interactive.
        
        Let's add a small "Tab" button or similar if a suggestion exists?
        Or just rely on the user tapping the text if we make it interactive?
        
        For now, let's make the suggestion clickable if it's visible.
      */}
      {suggestion ? (
        <TouchableOpacity 
          style={styles.acceptOverlay} 
          onPress={handleAcceptSuggestion}
          activeOpacity={1}
        />
      ) : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    textAlignVertical: "top",
    minHeight: 60, // Match typical input height
  },
  ghostText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    textAlignVertical: "top",
    paddingTop: 0, // Match TextInput padding defaults if any
  },
  multilineGhost: {
    // Adjustments for multiline alignment if needed
  },
  acceptOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 8,
    // Maybe a small icon or just invisible touch area?
    // For now, let's not block the whole input.
    // Actually, if we want "Tab" like behavior, maybe a button is better.
  }
});

export default GhostTextInput;

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to generate ghost suggestions using LLM
 * @param {string} text - The current text input
 * @param {object} llm - The LLM instance
 * @param {boolean} modelReady - Whether the model is ready for inference
 * @param {number} debounceTime - Time in ms to wait before generating (default 1000ms)
 * @returns {object} { suggestion, isLoading }
 */
export const useGhostSuggestion = (text, llm, modelReady, suggestions = [], debounceTime = 1000) => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const lastTextRef = useRef(text);
  
  // Refs for persistence logic to avoid dependency loops
  const fullSuggestionRef = useRef('');
  const baseTextRef = useRef('');

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Check for partial match persistence
    const baseText = baseTextRef.current;
    const fullSuggestion = fullSuggestionRef.current;

    if (baseText && fullSuggestion) {
      const expectedFullText = baseText + fullSuggestion;
      
      // Check if current text matches the expected path
      // We allow text to be shorter (backspace) or longer (typing) as long as it matches
      if (expectedFullText.startsWith(text)) {
        // User is typing along the suggestion
        const remaining = expectedFullText.slice(text.length);
        setSuggestion(remaining);
        
        // If user finished typing the suggestion, we can clear and let it generate new
        if (remaining.length === 0) {
           console.log("Suggestion fully typed, clearing.");
           baseTextRef.current = '';
           fullSuggestionRef.current = '';
           setSuggestion('');
           // Fall through to generation logic
        } else {
           // Still matching, don't generate new yet
           // console.log("Partial match, keeping suggestion:", remaining);
           setIsLoading(false);
           return;
        }
      } else {
        // Diverged
        console.log("Text diverged from suggestion, clearing.");
        baseTextRef.current = '';
        fullSuggestionRef.current = '';
        setSuggestion('');
      }
    } else {
       setSuggestion('');
    }

    // Interrupt previous generation if active - REMOVED per user request
    // if (llm && llm.isGenerating) {
    //   llm.interrupt();
    // }

    setIsLoading(false);

    // Don't generate if text is empty or too short
    if (!text || text.trim().length < 5) {
      return;
    }

    // Don't generate if model is not ready
    if (!modelReady) {
      return;
    }

    lastTextRef.current = text;

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      if (!llm || !modelReady) return;

      try {
        setIsLoading(true);
        console.log("Generating ghost suggestion for:", text);

        // Construct prompt for autocomplete
        // Construct prompt for autocomplete
        // We explicitly tell the LLM it is an autocompleter to prevent it from refusing commands like "Generate image"
        let systemContent = 'You are an AUTOCOMPLETE assistant from  suggestions Rules 1)   Continue the sentence EXACTLY from where it ends.  2) do not change the base sentence  only use provided light_suggestions to autocomplete  ONLY natural color/tone language only autocomplete by light_suggetion     .   Keep it strictly short ( 6 words only ). The suggestions are';
        
        console.log("--- Ghost Suggestion Debug ---");
        console.log("Input:", text);
        console.log("Suggestions received:", suggestions);
        console.log("System Content BEFORE append:", systemContent);

        if (suggestions && suggestions.length > 0) {
            systemContent += ` Context: Style suggestions: ${suggestions.join(', ')}.`;
        } else {
            console.log("No suggestions to append.");
        }

        console.log("System Content AFTER append:", systemContent);

        const messages = [
          { role: 'system', content: systemContent },
          { role: 'user', content: text }
        ];
        
        if (llm.isGenerating) {
          console.log("Model busy, skipping.");
          setIsLoading(false);
          return;
        }

        const response = await llm.generate(messages);
        // console.log("llm.generate response received:", JSON.stringify(response));
        
        // Check if the text has changed while generating
        if (text !== lastTextRef.current) {
          return;
        }

        let completion = response;
        
        // Fallback: Check llm.response if generate returns undefined
        if (!completion && llm.response) {
             completion = llm.response;
        }

        if (typeof response === 'object' && response.content) {
          completion = response.content;
        } else if (typeof response === 'object' && response.text) {
          completion = response.text;
        }

        if (completion) {
            let trimmedCompletion = completion.trim();
            
            // Enforce 6 words limit client-side
            const words = trimmedCompletion.split(/\s+/);
            if (words.length > 6) {
                trimmedCompletion = words.slice(0, 6).join(' ');
            }

            // Handle space logic:
            // If text doesn't end with space, and suggestion doesn't start with punctuation, add space
            let finalSuggestion = trimmedCompletion;
            if (!text.endsWith(' ') && !/^[.,;!?]/.test(trimmedCompletion)) {
                finalSuggestion = ' ' + trimmedCompletion;
            }
            
            baseTextRef.current = text;
            fullSuggestionRef.current = finalSuggestion;
            setSuggestion(finalSuggestion);
        }
        
      } catch (error) {
        if (error.message && error.message.includes("ModuleNotLoaded")) {
           console.warn("Ghost Suggestion: Model not loaded yet. Retrying later.");
        } else {
           console.error("Error generating suggestion:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }, debounceTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, llm, modelReady, debounceTime]);

  return { suggestion, isLoading };
};

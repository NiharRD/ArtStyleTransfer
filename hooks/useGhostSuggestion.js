import { useEffect, useRef, useState } from 'react';

/**
 * Hook to generate ghost suggestions using LLM
 * @param {string} text - The current text input
 * @param {object} llm - The LLM instance
 * @param {boolean} modelReady - Whether the model is ready for inference
 * @param {number} debounceTime - Time in ms to wait before generating (default 1000ms)
 * @returns {object} { suggestion, isLoading }
 */
export const useGhostSuggestion = (text, llm, modelReady, debounceTime = 1000) => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const lastTextRef = useRef(text);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Interrupt previous generation if active
    if (llm && llm.isGenerating) {
      llm.interrupt();
    }

    // Reset suggestion when text changes
    setSuggestion('');
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
        // We want the LLM to complete the sentence
        const messages = [
          { 
            role: 'system', 
            content: 'You are a helpful writing assistant. Complete the user\'s sentence naturally. Return ONLY the completion text, starting with the next word. Do not repeat the user\'s text. Keep it short (3-5 words).' 
          },
          { role: 'user', content: text }
        ];

        // Assuming llm.generate returns a promise that resolves to the response
        // and takes a messages array as requested
        const response = await llm.generate(messages);
        
        // Check if the text has changed while generating (double check)
        if (text !== lastTextRef.current) {
          return;
        }

        let completion = response;
        // If response is an object, try to extract text (adjust based on actual API)
        if (typeof response === 'object' && response.content) {
          completion = response.content;
        } else if (typeof response === 'object' && response.text) {
          completion = response.text;
        }

        // Clean up completion
        if (completion) {
            // Ensure we don't repeat the end of the text if the LLM included it
            // This is a simple heuristic
            const trimmedCompletion = completion.trim();
            setSuggestion(trimmedCompletion);
        }
        
      } catch (error) {
        if (error.message && error.message.includes("ModuleNotLoaded")) {
           console.warn("Ghost Suggestion: Model not loaded yet. Retrying later.");
           // Optionally reset modelReady state if we could, but we can't from here.
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
      // Cleanup interrupt is handled by the parent effect usually, 
      // but we can do it here too if we want to be safe on unmount
    };
  }, [text, llm, modelReady, debounceTime]);

  return { suggestion, isLoading };
};

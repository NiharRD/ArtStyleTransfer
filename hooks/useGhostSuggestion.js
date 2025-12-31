import { useEffect, useRef, useState } from "react";
/**
 * Hook to generate ghost suggestions using localhost LLM API
 * @param {string} text - The current text input
 * @param {object} llm - The LLM instance (kept for backwards compatibility, not used)
 * @param {boolean} modelReady - Whether the model is ready (kept for backwards compatibility, not used)
 * @param {array} suggestions - Style suggestions to guide the completion
 * @param {number} debounceTime - Time in ms to wait before generating (default 1000ms)
 * @param {boolean} skipAutocomplete - Whether to skip autocomplete (e.g., after refining)
 * @returns {object} { suggestion, isLoading, clearSuggestion }
 */
export const useGhostSuggestion = (
  text,
  llm,
  modelReady,
  suggestions = [],
  debounceTime = 1000,
  skipAutocomplete = false
) => {
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const lastTextRef = useRef(text);
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  // Refs for persistence logic to avoid dependency loops
  const fullSuggestionRef = useRef("");
  const baseTextRef = useRef("");

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
          baseTextRef.current = "";
          fullSuggestionRef.current = "";
          setSuggestion("");
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
        baseTextRef.current = "";
        fullSuggestionRef.current = "";
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }

    setIsLoading(false);

    // Don't generate if text is empty or too short
    if (!text || text.trim().length < 5) {
      return;
    }

    // Don't generate if skipAutocomplete is true (e.g., after refining)
    if (skipAutocomplete) {
      console.log("Autocomplete skipped (skipAutocomplete=true)");
      return;
    }

    lastTextRef.current = text;

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        console.log("Generating ghost suggestion for:", text);
        console.log("Suggestions:", suggestions);

        const prompt = `
You are an AUTOCOMPLETE assistant.

Use ONLY these light_suggestions:
${JSON.stringify(suggestions)}

RULES:
- Continue the sentence EXACTLY from where it ends.
- Do NOT change the base sentence.
- ONLY use provided light_suggestions to autocomplete.
- ONLY natural color/tone language.
- ONLY autocomplete using the light_suggestions.

Complete: ${text}
`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [
                  { text: "Autocomplete using ONLY the allowed suggestions." },
                ],
              },
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

        // Check if the text has changed while generating
        if (text !== lastTextRef.current) {
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);

        // Extract completion from response
        let completion = "";
        if (
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0]
        ) {
          completion = data.candidates[0].content.parts[0].text;
        }

        if (completion && typeof completion === "string") {
          let trimmedCompletion = completion.trim();

          // Clean up the response - remove leading dots, quotes, or other artifacts
          trimmedCompletion = trimmedCompletion
            .replace(/^\.{2,}/g, "") // Remove leading dots (...)
            .replace(/^["']/g, "") // Remove leading quotes
            .replace(/["']$/g, "") // Remove trailing quotes
            .trim();

          // Enforce 4 words limit client-side for cleaner suggestions
          const words = trimmedCompletion.split(/\s+/);
          if (words.length > 4) {
            trimmedCompletion = words.slice(0, 4).join(" ");
          }

          // Handle space logic:
          // If text doesn't end with space, and suggestion doesn't start with punctuation, add space
          let finalSuggestion = trimmedCompletion;
          if (!text.endsWith(" ") && !/^[.,;!?]/.test(trimmedCompletion)) {
            finalSuggestion = " " + trimmedCompletion;
          }

          baseTextRef.current = text;
          fullSuggestionRef.current = finalSuggestion;
          setSuggestion(finalSuggestion);
        } else {
          console.warn("No valid completion in response");
        }
      } catch (error) {
        console.error("Error generating suggestion:", error);
        setSuggestion(" [AI autocomplete unavailable]");
      } finally {
        setIsLoading(false);
      }
    }, debounceTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, suggestions, debounceTime, skipAutocomplete]);

  // Function to clear suggestion manually
  const clearSuggestion = () => {
    setSuggestion("");
    baseTextRef.current = "";
    fullSuggestionRef.current = "";
  };

  return { suggestion, isLoading, clearSuggestion };
};

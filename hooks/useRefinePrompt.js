import { useState } from "react";

/**
 * Hook to refine prompts using Gemini API
 * @returns {object} { refinePrompt, isRefining, error }
 */
export const useRefinePrompt = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState(null);
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const refinePrompt = async (prompt, suggestions = []) => {
    if (!prompt || prompt.trim().length === 0) {
      console.warn("Refine: Empty prompt provided");
      return null;
    }

    setIsRefining(true);
    setError(null);

    const lightSuggestions =
      suggestions.length > 0
        ? suggestions
        : [
            "Enhance the colors",
            "Add warmth to the scene",
            "Boost contrast",
            "Soften the image",
            "Increase clarity",
          ];

    try {
      console.log("Refining prompt:", prompt);
      console.log("With suggestions:", lightSuggestions);

      const refinePromptText = `
You are a REFINE assistant.

Use ONLY these light_suggestions:
${JSON.stringify(lightSuggestions)}

RULES:
- Continue the sentence EXACTLY from where it ends.
- Do NOT change the base sentence.
- ONLY use provided light_suggestions to refine.
- ONLY natural color/tone language.
- Generate approximately 12 words for the completion.
- ONLY refine using the light_suggestions.

Complete: ${prompt}
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
                {
                  text: "Refine using ONLY the allowed suggestions. Generate approximately 12 words.",
                },
              ],
            },
            contents: [
              {
                parts: [
                  {
                    text: refinePromptText,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Refine API response:", data);

      // Extract the refined text
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
        const trimmedCompletion = completion.trim();
        // Combine prompt and completion to return full text
        // Add space if prompt doesn't end with one and completion doesn't start with punctuation
        const separator =
          prompt.endsWith(" ") || /^[.,;!?]/.test(trimmedCompletion) ? "" : " ";
        return `${prompt}${separator}${trimmedCompletion}`;
      } else {
        console.warn("No valid refined text in response");
        return null;
      }
    } catch (err) {
      console.error("Error refining prompt:", err);
      setError(err.message);
      return null;
    } finally {
      setIsRefining(false);
    }
  };

  return { refinePrompt, isRefining, error };
};

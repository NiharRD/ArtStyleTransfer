import { useState } from "react";
import { localHostUrl } from "../endPoints.js";
/**
 * Hook to refine prompts using localhost LLM API
 * @returns {object} { refinePrompt, isRefining, error }
 */
export const useRefinePrompt = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState(null);

  const refinePrompt = async (prompt, suggestions = []) => {
    if (!prompt || prompt.trim().length === 0) {
      console.warn("Refine: Empty prompt provided");
      return null;
    }

    setIsRefining(true);
    setError(null);

    try {
      console.log("Refining prompt:", prompt);
      console.log("With suggestions:", suggestions);

      const response = await fetch(`${localHostUrl}/refine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sentence: prompt,
          suggestions:
            suggestions.length > 0
              ? suggestions
              : [
                  "Enhance the colors",
                  "Add warmth to the scene",
                  "Boost contrast",
                  "Soften the image",
                  "Increase clarity",
                ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Refine API response:", data);

      // Extract the refined text - use full_text for complete refined prompt
      const refinedText =
        data.full_text || data.completion || data.refined_prompt;

      if (refinedText && typeof refinedText === "string") {
        return refinedText.trim();
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

import { createContext, useContext, useState } from "react";

/**
 * Onboarding tooltip steps configuration
 */
export const ONBOARDING_STEPS = [
  {
    id: "main-branch",
    target: "control-bar-left",
    message: "Create versions of your edit. 'Main' is your primary, 'Branch' creates alternatives.",
    arrowDirection: "up",
  },
  {
    id: "ai-expert",
    target: "control-bar-right",
    message: "Switch between AI-native editing and Expert mode for manual adjustments.",
    arrowDirection: "up",
  },
  {
    id: "infinite-view",
    target: "header-infinite",
    message: "See your edit history, provenance & ethics info. Every AI edit is traceable.",
    arrowDirection: "up",
  },
  {
    id: "quick-actions",
    target: "quick-actions",
    message: "Create custom shortcuts by prompting. Combine multiple workflows into one tap.",
    arrowDirection: "down",
  },
  {
    id: "ai-button",
    target: "ai-button",
    message: "The heart of intelligence. Tap to describe what you want—the AI handles the rest. ✨",
    arrowDirection: "down",
  },
];

/**
 * OnboardingContext - Manages onboarding tooltip flow
 * Note: Currently uses in-memory state. Will persist after native rebuild.
 */
const OnboardingContext = createContext({
  currentStep: 0,
  isComplete: false,
  isActive: false,
  advanceStep: () => {},
  skipOnboarding: () => {},
  resetOnboarding: () => {},
  startOnboarding: () => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isActive, setIsActive] = useState(true); // Start onboarding immediately

  // Advance to next tooltip step
  const advanceStep = () => {
    const nextStep = currentStep + 1;

    if (nextStep >= ONBOARDING_STEPS.length) {
      // Completed all steps
      setIsComplete(true);
      setIsActive(false);
      setCurrentStep(0);
    } else {
      setCurrentStep(nextStep);
    }
  };

  // Skip all remaining tooltips
  const skipOnboarding = () => {
    setIsComplete(true);
    setIsActive(false);
    setCurrentStep(0);
  };

  // Reset onboarding (for testing)
  const resetOnboarding = () => {
    setIsComplete(false);
    setIsActive(true);
    setCurrentStep(0);
  };

  // Manually start onboarding
  const startOnboarding = () => {
    setIsComplete(false);
    setIsActive(true);
    setCurrentStep(0);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isComplete,
        isActive,
        advanceStep,
        skipOnboarding,
        resetOnboarding,
        startOnboarding,
        currentStepData: ONBOARDING_STEPS[currentStep] || null,
        totalSteps: ONBOARDING_STEPS.length,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;

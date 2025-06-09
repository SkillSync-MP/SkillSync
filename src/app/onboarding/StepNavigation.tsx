//src/app/onboarding/StepNavigation.tsx
import React from "react";
import formData from "./formData";
import Button from "@/components/ui/Button";

const StepNavigation = ({
    step,
    setStep,
    handleSubmit,
}: {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    handleSubmit: () => void;
}) => {
    const totalSteps = formData.length;

    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
            {/* Previous Button */}
            {step > 0 ? (
                <Button
                    variant="outline"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="border-white/30 text-white hover:bg-white/10"
                >
                    ← Previous
                </Button>
            ) : (
                <div></div>
            )}

            {/* Next/Submit Button */}
            {step < totalSteps - 1 ? (
                <Button
                    onClick={() => setStep((prev) => prev + 1)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                    Next →
                </Button>
            ) : (
                <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                >
                    Complete Setup ✓
                </Button>
            )}
        </div>
    );
};

export default StepNavigation;
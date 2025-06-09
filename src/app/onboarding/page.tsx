//src/app/onboarding/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import FormSteps from "./FormSteps";
import StepNavigation from "./StepNavigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import Card from "@/components/ui/Card";

const OnboardingForm = () => {
    const [step, setStep] = useState(0);
    const [formResponses, setFormResponses] = useState<{ [key: number]: any }>({});
    const { isLoggedIn, loading, checkAuth } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, loading, router]);

    const handleSubmit = async () => {
        try {
            if (!formResponses[2]?.selectedOptions?.length && !formResponses[2]?.otherText) {
                toast.error("Please select at least one skill");
                return;
            }
            if (!formResponses[0]?.selectedOption) {
                toast.error("Please select your department");
                return;
            }
            if (!formResponses[1]?.selectedOption) {
                toast.error("Please select your graduation year");
                return;
            }

            const res = await axios.post("/api/users/onboarding", {
                onboardingDetails: formResponses,
            });

            if (res.data.success) {
                toast.success("Profile setup completed successfully!");
                await checkAuth(); // Refresh auth state
                router.push("/dashboard");
            } else {
                toast.error("Failed to submit onboarding details.");
            }
        } catch (err: any) {
            console.error("Error submitting data:", err);
            toast.error(err.response?.data?.error || "Error submitting onboarding details");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-4xl p-8" gradient>
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-white mb-4">Welcome to SkillSync!</h2>
                    <p className="text-purple-200 text-lg">
                        Let's set up your profile to help you find the perfect study partners
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm text-purple-200 mb-2">
                            <span>Step {step + 1} of 7</span>
                            <span>{Math.round(((step + 1) / 7) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((step + 1) / 7) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="min-h-[400px] flex flex-col">
                    <div className="flex-1">
                        <FormSteps step={step} formResponses={formResponses} setFormResponses={setFormResponses} />
                    </div>
                    <StepNavigation step={step} setStep={setStep} handleSubmit={handleSubmit} />
                </div>
            </Card>
        </div>
    );
};

export default OnboardingForm;
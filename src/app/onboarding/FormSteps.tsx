//src/app/onboarding/FormSteps.tsx
import React, { useEffect, useState } from "react";
import formData from "./formData";

const FormSteps = ({ step, formResponses, setFormResponses }: { step: number; formResponses: any; setFormResponses: any }) => {
    const currentStep = formData[step];

    // Initialize state based on formResponses for current step
    const [selectedOptions, setSelectedOptions] = useState<string[]>(formResponses[step]?.selectedOptions || []);
    const [otherText, setOtherText] = useState<string>(formResponses[step]?.otherText || "");
    const [textAnswer, setTextAnswer] = useState<string>(formResponses[step]?.text || "");
    const [selectedOption, setSelectedOption] = useState<string>(formResponses[step]?.selectedOption || "");

    // Load responses when step changes
    useEffect(() => {
        if (formResponses[step]) {
            setSelectedOptions(formResponses[step].selectedOptions || []);
            setOtherText(formResponses[step].otherText || "");
            setTextAnswer(formResponses[step].text || "");
            setSelectedOption(formResponses[step].selectedOption || "");
        } else {
            // Ensure new questions start with an empty state
            setSelectedOptions([]);
            setOtherText("");
            setTextAnswer("");
            setSelectedOption("");
        }
    }, [step]);

    // Save responses when state changes
    useEffect(() => {
        setFormResponses((prev: any) => ({
            ...prev,
            [step]: { selectedOptions, otherText, text: textAnswer, selectedOption },
        }));
    }, [selectedOptions, otherText, textAnswer, selectedOption]);

    const handleCheckboxChange = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
    };

    const options = currentStep.options || [];
    const allOptions = options.includes("Other") ? options : [...options, "Other"];

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{currentStep.question}</h3>
                <p className="text-purple-200">Please provide your information to help us match you with the right peers</p>
            </div>

            {/* Text Input */}
            {currentStep.type === "text" ? (
                <div>
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-900 min-h-[120px] resize-none"
                        placeholder="Tell us about your goals and aspirations..."
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                    />
                </div>
            ) : currentStep.type === "select" ? (
                /* Single Select Dropdown */
                <div>
                    <select
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-900 text-lg"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="">Select an option</option>
                        {allOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ) : currentStep.type === "multiSelect" ? (
                /* Multi-Select Checkbox */
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto border border-gray-300 p-4 rounded-lg bg-white/90 backdrop-blur-sm">
                        {allOptions.map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                />
                                <span className="text-gray-900 font-medium">{option}</span>
                            </label>
                        ))}
                    </div>
                    {/* Show input if "Other" is selected */}
                    {selectedOptions.includes("Other") && (
                        <div className="mt-4">
                            <input
                                type="text"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-900"
                                placeholder="Please specify..."
                                value={otherText}
                                onChange={(e) => setOtherText(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default FormSteps;
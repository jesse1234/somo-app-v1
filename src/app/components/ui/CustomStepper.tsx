'use client'

import React from 'react';

interface CustomStepperProps {
    steps: { label: string }[];
    activeStep: number;
    onStepClick: (step: number) => void;
}

const CustomStepper: React.FC<CustomStepperProps> = ({ steps, activeStep, onStepClick }) => {
    return (
        <div className="flex items-center w-full mb-6">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                    {/* Step Circle */}
                    <button 
                        onClick={() => onStepClick(index)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full 
                        ${activeStep === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                        {index + 1}
                    </button>

                    {/* Step Label */}
                    <span className={`ml-2 font-medium ${activeStep === index ? 'text-primary' : 'text-gray-500'}`}>
                        {step.label}
                    </span>

                    {/* Step Connector (only if it's not the last step) */}
                    {index < steps.length - 1 && (
                        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomStepper;

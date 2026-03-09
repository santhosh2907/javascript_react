import React, { useState } from 'react';

const Stepper = ({ steps = ['Step 1', 'Step 2', 'Step 3', 'Finish'] }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const next = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prev = () => setCurrentStep(old => Math.max(old - 1, 0));

    return (
        <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                {steps.map((step, i) => (
                    <div key={i} style={{
                        padding: '10px',
                        borderRadius: '50%',
                        width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: i <= currentStep ? '#007bff' : '#eee',
                        color: i <= currentStep ? 'white' : 'black'
                    }}>
                        {i + 1}
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3>{steps[currentStep]} Content</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button disabled={currentStep === 0} onClick={prev}>Prev</button>
                <button disabled={currentStep === steps.length - 1} onClick={next}>Next</button>
            </div>
        </div>
    );
};
export default Stepper;

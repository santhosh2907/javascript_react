import React, { useState } from 'react';
import { ArrowLeft, Check, User, Mail, CreditCard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        user: { firstName: '', lastName: '' },
        contact: { email: '', phone: '' },
        payment: { cardNumber: '', expiry: '' }
    });

    const updateFormData = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.user.firstName}
                                    onChange={(e) => updateFormData('user', 'firstName', e.target.value)}
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.user.lastName}
                                    onChange={(e) => updateFormData('user', 'lastName', e.target.value)}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Details</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.contact.email}
                                onChange={(e) => updateFormData('contact', 'email', e.target.value)}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.contact.phone}
                                onChange={(e) => updateFormData('contact', 'phone', e.target.value)}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.payment.cardNumber}
                                onChange={(e) => updateFormData('payment', 'cardNumber', e.target.value)}
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.payment.expiry}
                                onChange={(e) => updateFormData('payment', 'expiry', e.target.value)}
                                placeholder="MM/YY"
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-500">Your information has been submitted successfully.</p>

                        <div className="mt-8 bg-gray-50 p-6 rounded-xl text-left text-sm font-mono text-gray-600">
                            <pre>{JSON.stringify(formData, null, 2)}</pre>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-2xl">
                {/* Steps Indicator */}
                <div className="flex justify-between items-center mb-12 relative z-10">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transition-all duration-300`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

                    {[1, 2, 3, 4].map(num => (
                        <div
                            key={num}
                            className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                                ${step >= num ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border border-gray-200'}
                            `}
                        >
                            {step > num ? <Check size={20} /> : num}
                        </div>
                    ))}
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 min-h-[400px] flex flex-col">
                    <div className="flex-1">
                        {renderStepContent()}
                    </div>

                    {step < 4 && (
                        <div className="flex justify-between pt-8 mt-8 border-t border-gray-100">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className={`px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                            >
                                {step === 3 ? 'Submit' : 'Next Step'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;

'use client';

import { useState, useEffect } from 'react';

interface SchoolRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'registration' | 'details';

export default function SchoolRegistrationModal({
  isOpen,
  onClose,
}: SchoolRegistrationModalProps) {
  const [step, setStep] = useState<Step>('registration');

  const [registrationData, setRegistrationData] = useState({
    schoolName: '',
    schoolEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [detailsData, setDetailsData] = useState({
    tagline: '',
    description: '',
    logo: null as File | null,
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('registration');
      setRegistrationData({
        schoolName: '',
        schoolEmail: '',
        password: '',
        confirmPassword: '',
      });
      setDetailsData({
        tagline: '',
        description: '',
        logo: null,
        image: null,
      });
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen]);

  const validateRegistration = () => {
    const newErrors: Record<string, string> = {};

    if (!registrationData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }

    if (!registrationData.schoolEmail.trim()) {
      newErrors.schoolEmail = 'School email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationData.schoolEmail)) {
      newErrors.schoolEmail = 'Please enter a valid email address';
    }

    if (!registrationData.password) {
      newErrors.password = 'Password is required';
    } else if (registrationData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!registrationData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registrationData.password !== registrationData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!detailsData.tagline.trim()) {
      newErrors.tagline = 'Tagline is required';
    }

    if (!detailsData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!detailsData.logo) {
      newErrors.logo = 'School logo is required';
    }

    if (!detailsData.image) {
      newErrors.image = 'School image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDetailsData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 'registration') {
      if (validateRegistration()) {
        setStep('details');
      }
    } else if (step === 'details') {
      if (validateDetails()) {
        setSubmitted(true);
        // Simulate form submission
        setTimeout(() => {
          alert('Your school registration and details have been saved successfully.You can proceed with next steps of registration');
          setRegistrationData({
            schoolName: '',
            schoolEmail: '',
            password: '',
            confirmPassword: '',
          });
          setDetailsData({
            tagline: '',
            description: '',
            logo: null,
            image: null,
          });
          setStep('registration');
          setSubmitted(false);
          onClose();
        }, 1500);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-10/12 sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`px-6 py-8 ${step === 'registration' ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-800'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {step === 'registration' ? 'Register Your School' : 'Add Your Details'}
                </h2>
                <p className={`text-sm ${step === 'registration' ? 'text-blue-100' : 'text-green-100'}`}>
                  {step === 'registration' ? 'Get started in just 3 steps' : 'Customize your school information, upload logo, add photos, and configure your preferences.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {step === 'registration' ? (
              <>
                {/* School Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={registrationData.schoolName}
                    onChange={handleRegistrationChange}
                    placeholder="e.g., Qurashi's High School"
                    className={`w-full px-4 py-3 rounded-lg border-2 placeholder:text-gray-500 focus:outline-none focus:border-blue-600 transition ${
                      errors.schoolName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.schoolName && (
                    <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>
                  )}
                </div>

                {/* School Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Email
                  </label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={registrationData.schoolEmail}
                    onChange={handleRegistrationChange}
                    placeholder="admin@yourschool.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 placeholder:text-gray-500 focus:outline-none focus:border-blue-600 transition ${
                      errors.schoolEmail ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.schoolEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.schoolEmail}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Create Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={registrationData.password}
                    onChange={handleRegistrationChange}
                    placeholder="At least 6 characters"
                    className={`w-full px-4 py-3 rounded-lg border-2 placeholder:text-gray-500 focus:outline-none focus:border-blue-600 transition ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registrationData.confirmPassword}
                    onChange={handleRegistrationChange}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 rounded-lg border-2 placeholder:text-gray-500 focus:outline-none focus:border-blue-600 transition ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
                >
                  Next
                </button>

                {/* Terms */}
                <p className="text-center text-xs text-gray-600 mt-4">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </>
            ) : (
              <>
                {/* Tagline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={detailsData.tagline}
                    onChange={handleDetailsChange}
                    placeholder="e.g., Excellence in Education"
                    className={`w-full px-4 py-3 rounded-lg border-2 placeholder:text-gray-500 focus:outline-none focus:border-green-600 transition ${
                      errors.tagline ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.tagline && (
                    <p className="text-red-500 text-sm mt-1">{errors.tagline}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Description
                  </label>
                  <textarea
                    name="description"
                    value={detailsData.description}
                    onChange={handleDetailsChange}
                    placeholder="Brief description of your school..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border-2 placeholder:text-gray-500 focus:outline-none focus:border-green-600 transition resize-none ${
                      errors.description ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* School Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Logo
                  </label>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-green-600 transition ${
                      errors.logo ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.logo && (
                    <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
                  )}
                </div>

                {/* School Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-green-600 transition ${
                      errors.image ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('registration')}
                    className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-4 rounded-lg transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                  >
                    {submitted ? 'Saving...' : 'Save Details'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

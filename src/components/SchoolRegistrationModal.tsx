'use client';

import { useState } from 'react';

interface SchoolRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SchoolRegistrationModal({
  isOpen,
  onClose,
}: SchoolRegistrationModalProps) {
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }

    if (!formData.schoolEmail.trim()) {
      newErrors.schoolEmail = 'School email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) {
      newErrors.schoolEmail = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      // Simulate form submission
      setTimeout(() => {
        alert(`Welcome ${formData.schoolName}! Your registration is being processed.`);
        setFormData({
          schoolName: '',
          schoolEmail: '',
          password: '',
          confirmPassword: '',
        });
        setSubmitted(false);
        onClose();
      }, 1500);
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Register Your School
                </h2>
                <p className="text-blue-100 text-sm">
                  Get started in just 3 steps
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-100 transition text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* School Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                School Name
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="e.g., Qurashi's High School"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition ${
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
                value={formData.schoolEmail}
                onChange={handleChange}
                placeholder="admin@yourschool.com"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition ${
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
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition ${
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
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-600 transition ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Complete Registration'
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-gray-600 mt-4">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

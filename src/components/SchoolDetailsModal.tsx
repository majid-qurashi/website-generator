'use client';

import { useState } from 'react';

interface SchoolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SchoolDetailsModal({
  isOpen,
  onClose,
}: SchoolDetailsModalProps) {
  const [formData, setFormData] = useState({
    tagline: '',
    description: '',
    logo: null as File | null,
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.tagline.trim()) {
      newErrors.tagline = 'Tagline is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.logo) {
      newErrors.logo = 'School logo is required';
    }

    if (!formData.image) {
      newErrors.image = 'School image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
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

    if (validateForm()) {
      setSubmitted(true);
      // Simulate form submission
      setTimeout(() => {
        alert('Your school details have been saved successfully!');
        setFormData({
          tagline: '',
          description: '',
          logo: null,
          image: null,
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-10/12 sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Add Your Details
                </h2>
                <p className="text-green-100 text-sm">
                  Customize your school information, upload logo, add photos, and configure your preferences.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-green-100 transition text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Tagline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                School Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
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
                value={formData.description}
                onChange={handleChange}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
            >
              {submitted ? 'Saving...' : 'Save Details'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
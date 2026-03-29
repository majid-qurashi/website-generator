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
      newErrors.schoolEmail = 'Invalid email';
    }

    if (!registrationData.password) {
      newErrors.password = 'Password required';
    } else if (registrationData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }

    if (!registrationData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password';
    } else if (registrationData.password !== registrationData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!detailsData.tagline.trim()) {
      newErrors.tagline = 'Tagline required';
    }

    if (!detailsData.description.trim()) {
      newErrors.description = 'Description required';
    }

    if (!detailsData.logo) {
      newErrors.logo = 'Logo required';
    }

    if (!detailsData.image) {
      newErrors.image = 'Image required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user updates input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDetailsData((prev) => ({ ...prev, [name]: files[0] }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 'registration') {
      if (!validateRegistration()) return;

      try {
        const res = await fetch("https://website-generator-backend-xzl1.onrender.com/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: registrationData.schoolEmail,
            password: registrationData.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to register");
        }

        setStep('details');
      } catch (err: any) {
        console.error("Backend Error:", err);
        alert(err.message || "Failed to connect to backend server");
      }
    } else {
      if (!validateDetails()) return;

      setSubmitted(true);
      try {
        // Send as FormData since backend uses multer for files now
        const formData = new FormData();
        formData.append("email", registrationData.schoolEmail);
        formData.append("name", registrationData.schoolName);
        formData.append("tagline", detailsData.tagline);
        formData.append("description", detailsData.description);
        if (detailsData.logo) formData.append("logo", detailsData.logo);
        if (detailsData.image) formData.append("image", detailsData.image);

        const res = await fetch("https://website-generator-backend-xzl1.onrender.com/school-details", {
          method: "POST",
          body: formData, // the browser automatically sets Content-Type to multipart/form-data
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to save details");
        }

        alert("Registration complete! You are ready to build an amazing school site.");
        onClose();
      } catch (err: any) {
        console.error("Details Error:", err);
        alert(err.message || "Error saving school details");
      } finally {
        setSubmitted(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] sm:w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-3xl">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">

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
              <button onClick={onClose} className="text-white hover:text-gray-200 transition text-2xl font-bold">×</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* Adding explicit keys forces React to drop and recreate the DOM nodes when changing step fragments, bypassing morphological attribute issues totally. */}
            {step === 'registration' ? (
              <div key="step-registration">

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">School Name</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={registrationData.schoolName}
                    onChange={handleRegistrationChange}
                    placeholder="e.g., Qurashi's High School"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition ${errors.schoolName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">School Email</label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={registrationData.schoolEmail}
                    onChange={handleRegistrationChange}
                    placeholder="admin@yourschool.com"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition ${errors.schoolEmail ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.schoolEmail && <p className="text-red-500 text-sm mt-1">{errors.schoolEmail}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Create Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registrationData.password}
                    onChange={handleRegistrationChange}
                    placeholder="At least 6 characters"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registrationData.confirmPassword}
                    onChange={handleRegistrationChange}
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 mt-6 shadow-md">
                  Next Step ✨
                </button>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            ) : (
              <div key="step-profile">

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">School Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    value={detailsData.tagline}
                    onChange={handleDetailsChange}
                    placeholder="e.g., Excellence in Education"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-green-600 dark:focus:border-green-500 transition ${errors.tagline ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.tagline && <p className="text-red-500 text-sm mt-1">{errors.tagline}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">School Description</label>
                  <textarea
                    name="description"
                    value={detailsData.description}
                    onChange={handleDetailsChange}
                    placeholder="Brief description of your school..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-green-600 dark:focus:border-green-500 transition resize-none ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">School Logo</label>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-dashed bg-gray-50 dark:bg-gray-800/50 dark:text-gray-300 focus:outline-none focus:border-green-600 dark:focus:border-green-500 transition cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ${errors.logo ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">School Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-dashed bg-gray-50 dark:bg-gray-800/50 dark:text-gray-300 focus:outline-none focus:border-green-600 dark:focus:border-green-500 transition cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ${errors.image ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>

                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setStep('registration')} className="flex-1 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold py-3.5 px-4 rounded-xl transition duration-200">
                    Back
                  </button>
                  <button type="submit" disabled={submitted} className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-400 dark:disabled:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md">
                    {submitted ? 'Saving Details...' : 'Complete Setup ✅'}
                  </button>
                </div>

              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
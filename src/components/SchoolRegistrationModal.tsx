'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import MinimalTemplateOne from '@/components/templates/MinimalTemplateOne';
import MinimalTemplateTwo from '@/components/templates/MinimalTemplateTwo';
import MinimalTemplateThree from '@/components/templates/MinimalTemplateThree';
import MinimalTemplateRP from '@/components/templates/MinimalTemplateRP';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import { SchoolData } from '@/types/school';
import Link from 'next/link';

interface SchoolRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'registration' | 'details' | 'template' | 'success';

export default function SchoolRegistrationModal({
  isOpen,
  onClose,
}: SchoolRegistrationModalProps) {
  const [step, setStep] = useState<Step>('registration');
  const [loading, setLoading] = useState(false);

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
    logoUrl: '',
    image: null as File | null,
    imageUrl: '',
  });

  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [activeCategory, setActiveCategory] = useState<'fancy' | 'simple'>('simple');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        logoUrl: '',
        image: null,
        imageUrl: '',
      });
      setErrors({});
      setLoading(false);
    }
  }, [isOpen]);

  const validateRegistration = () => {
    const newErrors: Record<string, string> = {};
    if (!registrationData.schoolName.trim()) newErrors.schoolName = 'School name is required';
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
    if (registrationData.password !== registrationData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!detailsData.tagline.trim()) newErrors.tagline = 'Tagline required';
    if (!detailsData.description.trim()) newErrors.description = 'Description required';
    if (!detailsData.logo) newErrors.logo = 'Logo required';
    if (!detailsData.image) newErrors.image = 'Hero image required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDetailsData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleRegistrationStep = async () => {
    if (!validateRegistration()) return;
    setLoading(true);
    setErrors({});
    console.log("Starting registration for:", registrationData.schoolEmail);
    
    let registrationSuccess = false;
    let authErrorMsg = "";

    try {
      // 1. Try cloud Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registrationData.schoolEmail,
        password: registrationData.password,
      });

      if (authError) {
        console.error("Auth Error:", authError);
        if (authError.message.includes('already registered')) {
          console.warn("User already exists in Auth, attempting to proceed to Database step...");
        } else {
          throw authError;
        }
      }

      console.log("Auth step handled, starting cloud database sync...");

      // 2. Try cloud Supabase DB
      const { error: dbError } = await supabase.from('schools').upsert({
        email: registrationData.schoolEmail,
        name: registrationData.schoolName,
      }, { onConflict: 'email' });

      if (dbError) {
        throw dbError;
      }

      console.log("Cloud registration successful! Moving to details step.");
      registrationSuccess = true;
    } catch (err: any) {
      authErrorMsg = err.message || "Failed to fetch";
      console.warn("Cloud Supabase registration failed or offline. Falling back to local PostgreSQL backend...", err);
    }

    // Fallback to local PostgreSQL database if cloud registration failed/offline
    if (!registrationSuccess) {
      try {
        console.log("Attempting local backend registration...");
        const res = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: registrationData.schoolEmail,
            password: registrationData.password
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || "Local server registration failed.");
        }

        const data = await res.json();
        console.log("Local PostgreSQL registration successful:", data);
        
        // Seed local storage so other components know we registered on local offline fallback
        localStorage.setItem('school_offline_admin_email', registrationData.schoolEmail);
        registrationSuccess = true;
      } catch (localErr: any) {
        console.error("Both cloud and local registration failed:", localErr);
        setLoading(false);
        alert(`⚠️ Registration failed!\n\nCloud error: ${authErrorMsg}\nLocal DB error: ${localErr.message}\n\nPlease check your internet connection or check if your local Express server (node backend/server.js) is active.`);
        return;
      }
    }

    if (registrationSuccess) {
      setStep('details');
    }
    setLoading(false);
  };

  const handleDetailsServiceStep = async () => {
    if (!validateDetails()) return;
    
    // Generate local blob URLs for immediate preview without uploading yet
    // Using a safe check for SSR (though this is a 'use client' component)
    const localLogoUrl = (detailsData.logo && typeof window !== 'undefined') ? URL.createObjectURL(detailsData.logo) : '';
    const localImageUrl = (detailsData.image && typeof window !== 'undefined') ? URL.createObjectURL(detailsData.image) : '';
    
    setDetailsData(prev => ({ ...prev, logoUrl: localLogoUrl, imageUrl: localImageUrl }));
    setStep('template');
  };

  const handleFullPreview = (templateId: string) => {
    const previewData = {
      name: registrationData.schoolName,
      email: registrationData.schoolEmail,
      tagline: detailsData.tagline,
      description: detailsData.description,
      logo: detailsData.logoUrl,
      image: detailsData.imageUrl,
      template: templateId
    };
    
    sessionStorage.setItem('preview_school_data', JSON.stringify(previewData));
    window.open('/school/preview', '_blank');
  };

  const handleTemplateStep = async (templateId: string) => {
    setLoading(true);
    console.log("Finalizing setup with template:", templateId);
    
    let launchSuccess = false;
    let cloudErrorMsg = "";

    try {
      let finalLogoUrl = detailsData.logoUrl;
      let finalImageUrl = detailsData.imageUrl;

      // 1. Upload Files to Supabase only now
      if (detailsData.logo) {
        const name = `${Date.now()}-logo`;
        const { error: uploadError } = await supabase.storage.from('school-assets').upload(name, detailsData.logo);
        if (uploadError) throw uploadError;
        finalLogoUrl = supabase.storage.from('school-assets').getPublicUrl(name).data.publicUrl;
      }
      
      if (detailsData.image) {
        const name = `${Date.now()}-hero`;
        const { error: uploadError } = await supabase.storage.from('school-assets').upload(name, detailsData.image);
        if (uploadError) throw uploadError;
        finalImageUrl = supabase.storage.from('school-assets').getPublicUrl(name).data.publicUrl;
      }

      console.log("Finalizing database entry with Supabase URLs...");

      // 2. Update DB with final Supabase URLs and selected template
      const { error: updateError } = await supabase.from('schools').update({
        tagline: detailsData.tagline,
        description: detailsData.description,
        logo: finalLogoUrl,
        image: finalImageUrl,
        template: templateId
      }).eq('email', registrationData.schoolEmail);

      if (updateError) throw updateError;
      
      console.log("Launch Ready! Moving to success screen.");
      launchSuccess = true;
    } catch (err: any) {
      cloudErrorMsg = err.message || "Failed to fetch";
      console.warn("Cloud Supabase finalization failed or offline. Falling back to local PostgreSQL backend...", err);
    }

    // Fallback to local PostgreSQL database if cloud finalization failed/offline
    if (!launchSuccess) {
      try {
        console.log("Attempting local backend finalization...");
        
        // 1. Save details and upload files locally via FormData
        const formData = new FormData();
        formData.append('email', registrationData.schoolEmail);
        formData.append('name', registrationData.schoolName);
        formData.append('tagline', detailsData.tagline);
        formData.append('description', detailsData.description);
        if (detailsData.logo) formData.append('logo', detailsData.logo);
        if (detailsData.image) formData.append('image', detailsData.image);

        const detailsRes = await fetch('http://localhost:5000/school-details', {
          method: 'POST',
          body: formData
        });

        if (!detailsRes.ok) {
          const errData = await detailsRes.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || "Failed to save local details.");
        }

        // 2. Select Template locally
        const templateRes = await fetch('http://localhost:5000/select-template', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: registrationData.schoolEmail,
            template: templateId
          })
        });

        if (!templateRes.ok) {
          const errData = await templateRes.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || "Failed to select local template.");
        }

        console.log("Local PostgreSQL finalization successful!");
        launchSuccess = true;
      } catch (localErr: any) {
        console.error("Both cloud and local finalization failed:", localErr);
        setLoading(false);
        alert(`⚠️ Finalization failed!\n\nCloud error: ${cloudErrorMsg}\nLocal DB error: ${localErr.message}\n\nPlease check your internet connection or if your local Express server is active.`);
        return;
      }
    }

    if (launchSuccess) {
      setSelectedTemplate(templateId);
      setStep('success');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose}></div>

      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] shadow-2xl transition-all duration-500 ${step === 'template' ? 'sm:max-w-6xl' : 'sm:max-w-md'}`}>
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]">

          {/* Header */}
          <div className={`px-6 py-8 flex items-center justify-between shadow-lg text-white ${
            step === 'registration' ? 'bg-indigo-600' : 
            step === 'details' ? 'bg-emerald-600' : 
            step === 'template' ? 'bg-slate-900' : 'bg-indigo-700'
          }`}>
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {step === 'registration' && 'Register Your School'}
                {step === 'details' && 'Customize Your Design'}
                {step === 'template' && 'Pick Your Template'}
                {step === 'success' && 'Ready to Launch!'}
              </h2>
              <p className="text-sm opacity-90">
                {step === 'registration' && 'Create your official administrator account.'}
                {step === 'details' && 'Upload your logo and tell us about your school.'}
                {step === 'template' && 'Choose a look that matches your school\'s spirit.'}
                {step === 'success' && 'Your professional website is now live!'}
              </p>
            </div>
            <button onClick={onClose} className="text-3xl font-light hover:rotate-90 transition-transform">×</button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/30">
            {step === 'registration' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">School Name</label>
                  <input type="text" name="schoolName" value={registrationData.schoolName} onChange={handleRegistrationChange} placeholder="Qurashi High School" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:border-indigo-500 outline-none transition" />
                  {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">School Email</label>
                  <input type="email" name="schoolEmail" value={registrationData.schoolEmail} onChange={handleRegistrationChange} placeholder="admin@school.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:border-indigo-500 outline-none transition" />
                  {errors.schoolEmail && <p className="text-red-500 text-xs mt-1">{errors.schoolEmail}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">Password</label>
                  <input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:border-indigo-500 outline-none transition" />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">Confirm Password</label>
                   <input type="password" name="confirmPassword" value={registrationData.confirmPassword} onChange={handleRegistrationChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:border-indigo-500 outline-none transition" />
                   {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <button onClick={handleRegistrationStep} disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-indigo-700 active:scale-[0.98] transition-all mt-4">
                  {loading ? 'Creating Account...' : 'Continue to Design →'}
                </button>
              </div>
            )}

            {step === 'details' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">School Tagline</label>
                  <input type="text" name="tagline" value={detailsData.tagline} onChange={handleDetailsChange} placeholder="Excellence in Education" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:border-emerald-500 outline-none transition" />
                  {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">About Your School</label>
                  <textarea name="description" value={detailsData.description} onChange={handleDetailsChange} rows={3} placeholder="A short description for your website..." className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:border-emerald-500 outline-none transition resize-none"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className={`relative group/file overflow-hidden rounded-xl border-2 border-dashed p-4 text-center transition-all ${detailsData.logo ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'border-gray-200 dark:border-gray-800 hover:bg-slate-50'}`}>
                      <input type="file" name="logo" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <div className="text-2xl mb-1">{detailsData.logo ? '✅' : '📐'}</div>
                      <div className={`text-[10px] font-bold uppercase ${detailsData.logo ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {detailsData.logo ? 'Logo Uploaded ✓' : 'Add Logo'}
                      </div>
                   </div>
                   <div className={`relative group/file overflow-hidden rounded-xl border-2 border-dashed p-4 text-center transition-all ${detailsData.image ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'border-gray-200 dark:border-gray-800 hover:bg-slate-50'}`}>
                      <input type="file" name="image" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <div className="text-2xl mb-1">{detailsData.image ? '✅' : '🖼️'}</div>
                      <div className={`text-[10px] font-bold uppercase ${detailsData.image ? 'text-emerald-600' : 'text-gray-400'}`}>
                         {detailsData.image ? 'Photo Uploaded ✓' : 'Add School Photo'}
                      </div>
                   </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep('registration')} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl">Back</button>
                  <button onClick={handleDetailsServiceStep} disabled={loading} className="flex-[2] bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all">
                    Next Step ✨
                  </button>
                </div>
              </div>
            )}

            {step === 'template' && (
              <div className="space-y-6">
                {/* Category Switcher */}
                <div className="flex justify-center mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit mx-auto border border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => setActiveCategory('simple')}
                    className={`px-8 py-3 rounded-xl font-black transition-all flex items-center space-x-2 ${activeCategory === 'simple' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <span>🏛️ Simple</span>
                  </button>
                  <button 
                    onClick={() => setActiveCategory('fancy')}
                    className={`px-8 py-3 rounded-xl font-black transition-all flex items-center space-x-2 ${activeCategory === 'fancy' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <span>✨ Fancy</span>
                  </button>
                </div>

                {activeCategory === 'simple' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative group/card text-left">
                      <MinimalTemplateOne onSelect={() => handleTemplateStep('minimal1')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'minimal1' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('minimal1')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('minimal1')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                    <div className="relative group/card text-left">
                       <MinimalTemplateTwo onSelect={() => handleTemplateStep('minimal2')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'minimal2' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('minimal2')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('minimal2')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                    <div className="relative group/card text-left">
                       <MinimalTemplateThree onSelect={() => handleTemplateStep('minimal3')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'minimal3' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('minimal3')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('minimal3')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                    <div className="relative group/card text-left">
                       <MinimalTemplateRP onSelect={() => handleTemplateStep('minimal4')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'minimal4' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('minimal4')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('minimal4')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative group/card text-left">
                      <TemplateOne onSelect={() => handleTemplateStep('template1')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'template1' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('template1')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('template1')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                    <div className="relative group/card text-left">
                      <TemplateTwo onSelect={() => handleTemplateStep('template2')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'template2' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('template2')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('template2')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                    <div className="relative group/card text-left">
                      <TemplateThree onSelect={() => handleTemplateStep('template3')} data={{ email: registrationData.schoolEmail, name: registrationData.schoolName, tagline: detailsData.tagline, description: detailsData.description, logo: detailsData.logoUrl, image: detailsData.imageUrl, template: 'template3' } as SchoolData} />
                      <div className="absolute top-4 right-4 flex space-x-2 z-50 transition-all opacity-100 md:opacity-0 md:group-hover/card:opacity-100">
                        <button onClick={() => handleFullPreview('template3')} className="bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold border border-gray-100 hover:bg-gray-50 transition-colors">Full Preview</button>
                        <button onClick={() => handleTemplateStep('template3')} className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-xl text-[10px] font-bold hover:bg-emerald-700 transition-colors">Launch Website 🚀</button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center text-slate-400 text-xs animate-pulse font-medium">
                   💡 Choose a category, hover/tap a template and click "Full Preview" to see it live!
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="text-8xl mb-6">✨</div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-4 italic">Congratulations!</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  Your school registration is complete and your brand new website 
                  <strong> {registrationData.schoolName} </strong> is ready for the world.
                </p>
                <Link 
                  href={`/school/${registrationData.schoolEmail}`}
                  target="_blank"
                  className="inline-block w-full sm:w-auto bg-indigo-600 text-white font-black px-8 sm:px-12 py-3.5 sm:py-5 rounded-2xl shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all text-lg sm:text-2xl"
                >
                  🚀 Launch Website
                </Link>
                <div className="mt-8 text-sm text-slate-400">
                   A confirmation email has been sent to {registrationData.schoolEmail}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
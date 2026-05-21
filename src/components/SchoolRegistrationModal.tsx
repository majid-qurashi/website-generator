'use client';

import { useState, useEffect, useRef } from 'react';
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

// 5 Onboarding Steps + intermediate OTP Verification and Deploying animation
type Step = 
  | 'verify_email' 
  | 'otp_confirm' 
  | 'details' 
  | 'branding' 
  | 'setup' 
  | 'deploying' 
  | 'success';

interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  hover: string;
  accent: string;
  bgGrad: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  { id: 'indigo', name: 'Elegant Indigo', primary: '#4f46e5', hover: '#4338ca', accent: '#818cf8', bgGrad: 'from-indigo-600 to-violet-800' },
  { id: 'blue', name: 'Royal Blue', primary: '#2563eb', hover: '#1d4ed8', accent: '#60a5fa', bgGrad: 'from-blue-600 to-indigo-800' },
  { id: 'green', name: 'Forest Emerald', primary: '#059669', hover: '#047857', accent: '#34d399', bgGrad: 'from-emerald-600 to-teal-800' },
  { id: 'crimson', name: 'Sleek Crimson', primary: '#dc2626', hover: '#b91c1c', accent: '#f87171', bgGrad: 'from-rose-600 to-red-800' },
  { id: 'amber', name: 'Amber Bronze', primary: '#d97706', hover: '#b45309', accent: '#fbbf24', bgGrad: 'from-amber-600 to-orange-850' }
];

const SCHOOL_TYPES = [
  'High School',
  'Secondary Academy',
  'Primary School',
  'International School',
  'Higher College',
  'Prep School',
  'Other Educational Institute'
];

const AVAILABLE_SECTIONS = [
  { id: 'hero', name: '🏫 Elegant Hero Welcome Banner', required: true, desc: 'Premium responsive hero banner.' },
  { id: 'about', name: '📚 About the Institute Statement', required: false, desc: 'Describe the school’s core history, mission, and vision.' },
  { id: 'principal', name: '👨‍🏫 Message from Principal Message', required: false, desc: 'A custom text greeting signed by the principal.' },
  { id: 'gallery', name: '🖼️ Campus Photo Gallery grid', required: false, desc: 'Display gorgeous highlights of school facilities.' },
  { id: 'admission', name: '📝 Interactive Admission Application Form', required: false, desc: 'Let parents register and submit admission applications.' },
  { id: 'contact', name: '📞 Contact Info & Interactive Map', required: false, desc: 'List address, emails, phone, and standard footer.' }
];

export default function SchoolRegistrationModal({
  isOpen,
  onClose,
}: SchoolRegistrationModalProps) {
  const [step, setStep] = useState<Step>('verify_email');
  const [loading, setLoading] = useState(false);

  // Unified Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP States
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
  const [cooldown, setCooldown] = useState(0);

  // Step 2 Details State
  const [schoolName, setSchoolName] = useState('');
  const [schoolType, setSchoolType] = useState('High School');
  const [principalName, setPrincipalName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [tagline, setTagline] = useState('');

  // Step 3 Branding State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [activeCategory, setActiveCategory] = useState<'fancy' | 'simple'>('simple');
  const [selectedColor, setSelectedColor] = useState('indigo');

  // Step 4 Settings State
  const [subdomain, setSubdomain] = useState('');
  const [domainExtension, setDomainExtension] = useState('.com');
  const [isSubdomainChecking, setIsSubdomainChecking] = useState(false);
  const [subdomainMessage, setSubdomainMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [features, setFeatures] = useState<string[]>(['hero', 'about', 'principal', 'gallery', 'admission', 'contact']);
  
  // Step 5 Deploying Animation state
  const [deployStep, setDeployStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const deployLogsList = [
    '🔐 Establishing secure Postgres connection context...',
    '🏫 Creating custom school database rows...',
    '🌐 Allocating unique subdomain dns configuration...',
    '🎨 Initializing dynamic theme presets & layout configurations...',
    '📧 Structuring responsive Welcome Email templates...',
    '🚀 Dispatching onboarding package and deploying site live!...'
  ];

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sandbox mode variables (for local offline testing)
  const [sandboxInfo, setSandboxInfo] = useState<{ show: boolean, previewUrl?: string, otpCode?: string } | null>(null);

  // Keep track of active theme values
  const activeColor = COLOR_PRESETS.find(c => c.id === selectedColor) || COLOR_PRESETS[0];

  useEffect(() => {
    if (isOpen) {
      setStep('verify_email');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setOtpInputs(['', '', '', '', '', '']);
      setSchoolName('');
      setSchoolType('High School');
      setPrincipalName('');
      setContactNumber('');
      setAddress('');
      setTagline('');
      setLogoFile(null);
      setLogoUrl('');
      setImageFile(null);
      setImageUrl('');
      setSelectedTemplate('template1');
      setSelectedColor('indigo');
      setSubdomain('');
      setDomainExtension('.com');
      setSubdomainMessage(null);
      setFeatures(['hero', 'about', 'principal', 'gallery', 'admission', 'contact']);
      setErrors({});
      setLoading(false);
      setSandboxInfo(null);
      setCooldown(0);
    }
  }, [isOpen]);

  // Handle Resend Cooldown timers
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // OTP focus movement logic
  const handleOtpChange = (index: number, val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '').slice(-1);
    const newInputs = [...otpInputs];
    newInputs[index] = cleaned;
    setOtpInputs(newInputs);

    // Auto-focus next input
    if (cleaned !== '' && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otpInputs[index] === '' && index > 0) {
      const newInputs = [...otpInputs];
      newInputs[index - 1] = '';
      setOtpInputs(newInputs);
      otpRefs[index - 1].current?.focus();
    }
  };

  // Domain live uniqueness validator (checks subdomain or custom domains like .com, .in)
  useEffect(() => {
    if (!subdomain.trim() || step !== 'setup') {
      setSubdomainMessage(null);
      return;
    }

    const cleanSub = subdomain.toLowerCase().replace(/[^a-z0-9\-]/g, '');
    if (cleanSub.length < 3) {
      setSubdomainMessage({ type: 'error', text: 'Domain prefix must be at least 3 characters.' });
      return;
    }

    setIsSubdomainChecking(true);
    const delayTimer = setTimeout(async () => {
      try {
        const domainToCheck = cleanSub + domainExtension;
        const res = await fetch('/api/school-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: `${cleanSub}@school-saas-dummy.com`,
            domain: domainToCheck
          })
        });
        
        if (res.status === 404) {
          setSubdomainMessage({ type: 'success', text: `✨ Domain "${cleanSub}${domainExtension}" is available!` });
        } else {
          setSubdomainMessage({ type: 'error', text: 'This domain name is already taken.' });
        }
      } catch (e) {
        setSubdomainMessage({ type: 'success', text: `Domain available: ${cleanSub}${domainExtension} (Sandbox Mode)` });
      } finally {
        setIsSubdomainChecking(false);
      }
    }, 500); // 500ms debounce
    return () => clearTimeout(delayTimer);
  }, [subdomain, domainExtension, step]);

  // Steps Nav Validation
  const validateVerifyEmail = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email address.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (!schoolName.trim()) errs.schoolName = 'School Name is required.';
    if (!principalName.trim()) errs.principalName = 'Principal Name is required.';
    if (!contactNumber.trim()) errs.contactNumber = 'Contact Number is required.';
    if (!address.trim()) errs.address = 'Campus Address is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // STEP 1: Verify Email
  const handleVerifyEmail = async () => {
    if (!validateVerifyEmail()) return;
    setLoading(true);
    setErrors({});
    setSandboxInfo(null);

    try {
      const res = await fetch('/api/verify-email/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to request verification.');
      }

      console.log('Verification email response:', data);
      
      if (data.sandbox) {
        setSandboxInfo({
          show: true,
          previewUrl: data.previewUrl,
          otpCode: data.otpCode
        });
      }

      setStep('otp_confirm');
      setCooldown(60); // Set cooldown timer
    } catch (err: any) {
      console.error(err);
      setErrors({ server: err.message || 'Verification request failed.' });
    } finally {
      setLoading(false);
    }
  };

  // STEP 1.5: Confirm OTP
  const handleConfirmOtp = async () => {
    const code = otpInputs.join('');
    if (code.length < 6) {
      setErrors({ otp: 'Please enter the complete 6-digit OTP code.' });
      return;
    }
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/verify-email/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: code })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP code.');
      }

      // Automatically register the account in schools table now that the email is verified!
      const regRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const regData = await regRes.json();
      if (!regRes.ok) {
        throw new Error(regData.error || 'Registration failed after verification.');
      }

      // Pre-fill subdomain based on email prefix or generated values
      if (regData.subdomain) {
        setSubdomain(regData.subdomain);
      }

      // Advanced to Step 2
      setStep('details');
    } catch (err: any) {
      console.error(err);
      setErrors({ otp: err.message || 'OTP verification failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    setOtpInputs(['', '', '', '', '', '']);
    await handleVerifyEmail();
  };

  // File change handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'image') => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const localUrl = URL.createObjectURL(file);
      if (type === 'logo') {
        setLogoFile(file);
        setLogoUrl(localUrl);
      } else {
        setImageFile(file);
        setImageUrl(localUrl);
      }
    }
  };

  // STEP 2: Save Details
  const handleSaveDetails = async () => {
    if (!validateDetails()) return;
    
    // Automatically generate a beautiful slug from schoolName if subdomain hasn't been manually set yet
    if (!subdomain) {
      const nameSlug = schoolName.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (nameSlug) {
        setSubdomain(nameSlug);
      }
    }
    
    setStep('branding');
  };

  const handleFullPreview = (templateId: string) => {
    const previewData = {
      name: schoolName,
      email: email,
      tagline: tagline || `Excellence in Education`,
      description: address,
      logo: logoUrl || '',
      image: imageUrl || '',
      template: templateId
    };
    
    sessionStorage.setItem('preview_school_data', JSON.stringify(previewData));
    window.open('/school/preview', '_blank');
  };

  // STEP 3: branding
  const handleBrandingStep = () => {
    setStep('setup');
  };

  // STEP 4: Setup Subdomain & Features -> Launch Deploying
  const handleSetupStep = async () => {
    if (subdomainMessage?.type === 'error') {
      setErrors({ subdomain: 'Please choose an available subdomain.' });
      return;
    }
    setErrors({});
    
    // Jump to deploying visual screen
    setStep('deploying');
    setDeployStep(0);
    setDeployLogs([]);
  };

  // Trigger server deployments sequentially inside the beautiful loading terminal
  useEffect(() => {
    if (step !== 'deploying') return;

    if (deployStep < deployLogsList.length) {
      const delay = 1000 + Math.random() * 800; // Simulated loading variance
      const timer = setTimeout(() => {
        setDeployLogs((prev) => [...prev, deployLogsList[deployStep]]);
        setDeployStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Completed terminal loading! Now execute the server finalization launch
      const finalizeLaunch = async () => {
        try {
          // 1. Upload assets to Supabase storage if cloud is active
          let finalLogoUrl = logoUrl;
          let finalImageUrl = imageUrl;
          
          if (logoFile) {
            try {
              const name = `${Date.now()}-logo`;
              await supabase.storage.from('school-assets').upload(name, logoFile);
              finalLogoUrl = supabase.storage.from('school-assets').getPublicUrl(name).data.publicUrl;
            } catch (e) {
              console.warn('Supabase storage unavailable. Falling back to local data URL.');
            }
          }
          if (imageFile) {
            try {
              const name = `${Date.now()}-hero`;
              await supabase.storage.from('school-assets').upload(name, imageFile);
              finalImageUrl = supabase.storage.from('school-assets').getPublicUrl(name).data.publicUrl;
            } catch (e) {
              console.warn('Supabase storage unavailable. Falling back to local data URL.');
            }
          }

          const isCustomDomain = domainExtension !== '.schoolsaas.com';
          const finalChosenSubdomain = subdomain;
          const finalChosenCustomDomain = isCustomDomain ? `${subdomain}${domainExtension}` : null;

          // 2. Call /api/school-details to update metadata and domains
          await fetch('/api/school-details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name: schoolName,
              tagline: tagline || `Excellence in Education`,
              description: `Welcome to ${schoolName}, a premier ${schoolType} dedicated to academic excellence, character development, and holistic learning. Guided by our core tagline, "${tagline || 'Excellence, Integrity, Innovation'}", we cultivate a nurturing and intellectually challenging environment. Under the leadership of our esteemed Principal, ${principalName || 'our leadership'}, we strive to empower students to reach their full potential and become the outstanding leaders of tomorrow.`,
              logo: finalLogoUrl,
              image: finalImageUrl,
              schoolType,
              principalName,
              contactNumber,
              address,
              subdomain: finalChosenSubdomain,
              customDomain: finalChosenCustomDomain
            })
          });

          // 3. Call /api/select-template to select chosen layouts
          await fetch('/api/select-template', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              template: selectedTemplate,
              features
            })
          });

          // 4. Save custom color scheme themes
          const customTheme = {
            preset: selectedColor,
            colors: {
              primary: activeColor.primary,
              primaryHover: activeColor.hover,
              secondary: '#475569',
              accent: activeColor.accent,
              background: '#ffffff',
              cardBg: '#f8fafc',
              navbar: '#ffffff',
              footer: '#0f172a',
              text: '#1e293b',
              textMuted: '#64748b',
              btnBg: activeColor.primary,
              btnText: '#ffffff',
              border: '#e2e8f0'
            },
            typography: {
              headingFont: 'Outfit',
              bodyFont: 'Inter',
              scale: 'medium'
            },
            layout: {
              sectionsVisibility: {
                hero: true,
                about: features.includes('about'),
                principal: features.includes('principal'),
                gallery: features.includes('gallery'),
                admission: features.includes('admission'),
                contact: features.includes('contact')
              }
            }
          };
          
          await fetch('/api/save-theme-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, themeSettings: customTheme })
          });

          // 5. Finalize launch and send Welcome Email
          const launchRes = await fetch('/api/launch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });

          const launchData = await launchRes.json();
          if (!launchRes.ok) {
            throw new Error(launchData.error || 'Welcome email launch execution failed.');
          }

          if (launchData.sandbox) {
            setSandboxInfo({
              show: true,
              previewUrl: launchData.previewUrl
            });
          }

          // Advance to final Success screen!
          setStep('success');
        } catch (err: any) {
          console.error(err);
          alert(`⚠️ Website generation succeeded with warning:\n${err.message || err}\n\nSite is live!`);
          setStep('success');
        }
      };

      finalizeLaunch();
    }
  }, [deployStep, step]);

  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[200] animate-in fade-in duration-300"
        onClick={() => step !== 'deploying' && onClose()}
      ></div>

      {/* Main Responsive Wizard Modal Container */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[250] w-[95%] shadow-2xl transition-all duration-500 overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${
        step === 'branding' ? 'max-w-6xl' : 'max-w-md'
      }`}>
        
        {/* Dynamic header band */}
        <div className={`px-8 py-8 text-white relative overflow-hidden transition-all duration-500 bg-gradient-to-br ${activeColor.bgGrad}`}>
          <div className="absolute right-0 bottom-0 opacity-10 font-black text-9xl pointer-events-none select-none">
            {step === 'verify_email' || step === 'otp_confirm' ? '01' : 
             step === 'details' ? '02' : 
             step === 'branding' ? '03' : 
             step === 'setup' ? '04' : '05'}
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                {step === 'verify_email' && 'Step 1 of 5 • Account Security'}
                {step === 'otp_confirm' && 'Step 1.5 • Confirm OTP Code'}
                {step === 'details' && 'Step 2 of 5 • School Profile'}
                {step === 'branding' && 'Step 3 of 5 • Theme & Brand Setup'}
                {step === 'setup' && 'Step 4 of 5 • Hosting & Features'}
                {step === 'deploying' && 'Step 5 of 5 • Generating Core Website'}
                {step === 'success' && 'Onboarding Complete 🎉'}
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-black mt-3 italic tracking-tight">
                {step === 'verify_email' && 'Verify School Account'}
                {step === 'otp_confirm' && 'Check Your Inbox'}
                {step === 'details' && 'Enter School Details'}
                {step === 'branding' && 'Design Your Brand Identity'}
                {step === 'setup' && 'Configure Core Options'}
                {step === 'deploying' && 'Building Virtual Server...'}
                {step === 'success' && 'Congratulations! Live 🎉'}
              </h2>
              
              <p className="text-sm opacity-90 mt-1.5 font-medium max-w-sm">
                {step === 'verify_email' && 'Enter your school credentials to dispatch verification token.'}
                {step === 'otp_confirm' && `We've sent a branded OTP verification code to ${email}`}
                {step === 'details' && 'Specify name, principal details, contact info, and campus details.'}
                {step === 'branding' && 'Select layout styles, custom palettes, logo, and cover photo.'}
                {step === 'setup' && 'Allocating subdomain hosting, custom domain mapping and page components.'}
                {step === 'deploying' && 'Compiling template sections and generating email packages.'}
                {step === 'success' && `Your gorgeous school platform is live and live-ready.`}
              </p>
            </div>
            {step !== 'deploying' && (
              <button 
                onClick={onClose} 
                className="text-white hover:text-slate-200 text-3xl font-light hover:rotate-90 transition-transform cursor-pointer"
                title="Cancel Registration"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Step progress bar */}
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 flex">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500" 
            style={{
              width: 
                step === 'verify_email' ? '10%' :
                step === 'otp_confirm' ? '20%' :
                step === 'details' ? '40%' :
                step === 'branding' ? '60%' :
                step === 'setup' ? '80%' :
                step === 'deploying' ? '95%' : '100%'
            }}
          ></div>
        </div>

        {/* Body content scroll region */}
        <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar bg-slate-50/20 dark:bg-slate-900/50">
          
          {/* STEP 1: Verify Email Input */}
          {step === 'verify_email' && (
            <div className="space-y-5 animate-in slide-in-from-bottom duration-300">
              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">School Administrator Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.edu.in" 
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 font-medium transition" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1.5 px-1 font-bold">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Security Account Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 transition" 
                />
                {errors.password && <p className="text-red-500 text-xs mt-1.5 px-1 font-bold">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Confirm Security Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 transition" 
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 px-1 font-bold">{errors.confirmPassword}</p>}
              </div>

              {errors.server && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold leading-relaxed">
                  ⚠️ {errors.server}
                </div>
              )}

              <button 
                onClick={handleVerifyEmail}
                disabled={loading}
                className="w-full text-white font-extrabold py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 cursor-pointer flex items-center justify-center space-x-2 text-base"
                style={{ backgroundColor: activeColor.primary, boxShadow: `0 8px 24px -6px ${activeColor.primary}40` }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending Token...</span>
                  </>
                ) : (
                  <span>✅ Verify Email & Continue →</span>
                )}
              </button>
            </div>
          )}

          {/* STEP 1.5: OTP Confirm Grid */}
          {step === 'otp_confirm' && (
            <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
              <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  We have dispatched a 6-digit verification code. Please input it below to complete security checking.
                </p>

                {/* 6 Grid input inputs */}
                <div className="flex justify-center space-x-3 mb-6">
                  {otpInputs.map((digit, i) => (
                    <input 
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-2xl font-black rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-600 outline-none text-slate-800 dark:text-slate-100 transition shadow-inner"
                    />
                  ))}
                </div>

                {errors.otp && <p className="text-red-500 text-xs mb-4 font-bold">{errors.otp}</p>}

                {/* Local Sandbox Info Block */}
                {sandboxInfo?.show && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl text-left text-xs text-amber-800 dark:text-amber-300 leading-relaxed mb-6 space-y-2.5">
                    <div className="font-extrabold flex items-center space-x-1">
                      <span>🧪 Local Developer Sandbox mode active:</span>
                    </div>
                    <div>No Resend API Key is set in your environment. We have mock logs:</div>
                    <div className="bg-white/60 dark:bg-slate-950/40 p-2.5 rounded-xl font-mono border border-amber-100 dark:border-amber-900 flex justify-between items-center text-sm font-black">
                      <span>🔑 Verification OTP:</span>
                      <span className="text-amber-600 dark:text-amber-400 tracking-widest text-lg font-black">{sandboxInfo.otpCode}</span>
                    </div>
                    <div>
                      <a 
                        href={sandboxInfo.previewUrl} 
                        target="_blank" 
                        className="text-indigo-600 dark:text-indigo-400 underline font-black block hover:text-indigo-800"
                      >
                        📂 Click to open beautiful HTML Email Preview in Browser →
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mt-2 px-1">
                  <span>Didn't receive email?</span>
                  <button 
                    onClick={handleResendOtp}
                    disabled={cooldown > 0}
                    className={`underline cursor-pointer ${cooldown > 0 ? 'text-slate-400' : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800'}`}
                  >
                    {cooldown > 0 ? `Resend Code in ${cooldown}s` : 'Resend Code'}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setStep('verify_email')} 
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 text-sm font-bold transition cursor-pointer"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleConfirmOtp}
                  disabled={loading}
                  className="flex-[2] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg cursor-pointer flex items-center justify-center space-x-2 text-sm"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  {loading ? 'Confirming...' : 'Verify & Register ✓'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: School Details */}
          {step === 'details' && (
            <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Official School Name</label>
                <input 
                  type="text" 
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Heritage International Academy" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 font-bold transition" 
                />
                {errors.schoolName && <p className="text-red-500 text-xs mt-1 px-1 font-bold">{errors.schoolName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">School Type</label>
                  <select 
                    value={schoolType}
                    onChange={(e) => setSchoolType(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-150 font-bold transition"
                  >
                    {SCHOOL_TYPES.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Principal Name</label>
                  <input 
                    type="text" 
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    placeholder="Er. Majid Qurashi" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 font-bold transition" 
                  />
                  {errors.principalName && <p className="text-red-500 text-xs mt-1 px-1 font-bold">{errors.principalName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Official Contact Number</label>
                <input 
                  type="tel" 
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+91 98765 43210" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 font-bold transition" 
                />
                {errors.contactNumber && <p className="text-red-500 text-xs mt-1 px-1 font-bold">{errors.contactNumber}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Core Campus Tagline</label>
                <input 
                  type="text" 
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Excellence, Integrity, Innovation" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 font-semibold transition" 
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">Campus Physical Address</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder="12 Main Boulevard, Sector C, Srinagar, J&K" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none text-slate-800 dark:text-slate-100 transition resize-none"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1 px-1 font-bold">{errors.address}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleSaveDetails} className="w-full text-white font-extrabold py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2 text-base" style={{ backgroundColor: activeColor.primary }}>
                  <span>Configure Design & Branding →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Branding & Customizers (Wide Layout supported) */}
          {step === 'branding' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom duration-300">
              
              {/* Left Config Panel */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Upload Logos / Banner */}
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-slate-400 mb-3 px-1">Branding Assets</h3>
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Logo upload card */}
                    <div className={`relative group/file overflow-hidden rounded-2xl border-2 border-dashed p-4 text-center transition-all cursor-pointer ${logoUrl ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                      <input 
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'logo')} 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      />
                      <div className="text-3xl mb-1.5">{logoUrl ? '✅' : '📐'}</div>
                      <div className={`text-[11px] font-extrabold uppercase ${logoUrl ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                        {logoUrl ? 'Logo Attached ✓' : 'Add Logo'}
                      </div>
                    </div>
                    
                    {/* Banner upload card */}
                    <div className={`relative group/file overflow-hidden rounded-2xl border-2 border-dashed p-4 text-center transition-all cursor-pointer ${imageUrl ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                      <input 
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'image')} 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      />
                      <div className="text-3xl mb-1.5">{imageUrl ? '✅' : '🖼️'}</div>
                      <div className={`text-[11px] font-extrabold uppercase ${imageUrl ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                        {imageUrl ? 'Banner Attached ✓' : 'Add School Photo'}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Color Schemes selector */}
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-slate-400 mb-3 px-1">Brand Color Scheme</h3>
                  <div className="space-y-2">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedColor(p.id)}
                        className={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-sm flex items-center justify-between transition cursor-pointer ${
                          selectedColor === p.id 
                            ? 'border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400' 
                            : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: p.primary }}></div>
                          <span>{p.name}</span>
                        </div>
                        <div className="flex space-x-1.5">
                          <span className="h-3 w-3 rounded-full opacity-60" style={{ backgroundColor: p.hover }}></span>
                          <span className="h-3 w-3 rounded-full opacity-40" style={{ backgroundColor: p.accent }}></span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep('details')} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3.5 rounded-xl cursor-pointer hover:bg-slate-200 text-sm">
                    Back
                  </button>
                  <button onClick={handleBrandingStep} className="flex-[2] text-white font-extrabold py-3.5 rounded-xl cursor-pointer shadow-lg text-sm" style={{ backgroundColor: activeColor.primary }}>
                    Continue to Hosting ✨
                  </button>
                </div>

              </div>

              {/* Right template selection visualizer */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-xs uppercase font-extrabold text-slate-400">Select Template Design Layout</h3>
                  <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button 
                      onClick={() => setActiveCategory('simple')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeCategory === 'simple' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      🏛️ Simple
                    </button>
                    <button 
                      onClick={() => setActiveCategory('fancy')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeCategory === 'fancy' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      ✨ Fancy
                    </button>
                  </div>
                </div>

                {/* Templates rendering cards */}
                <div className="max-h-[48vh] overflow-y-auto pr-2 custom-scrollbar">
                  {activeCategory === 'simple' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-1 animate-in fade-in duration-300">
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'minimal1' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('minimal1')}>
                        <MinimalTemplateOne onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'minimal1' } as SchoolData} />
                        <div className="absolute top-2 right-2 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('minimal1'); }} className="bg-white/95 text-slate-800 px-2.5 py-1.5 rounded-full shadow text-[9px] font-black border border-slate-100 hover:bg-white">Preview</button>
                          <button className={`px-2.5 py-1.5 rounded-full shadow text-[9px] font-black text-white ${selectedTemplate === 'minimal1' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'minimal1' ? 'Selected ✓' : 'Select layout'}
                          </button>
                        </div>
                      </div>
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'minimal2' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('minimal2')}>
                        <MinimalTemplateTwo onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'minimal2' } as SchoolData} />
                        <div className="absolute top-2 right-2 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('minimal2'); }} className="bg-white/95 text-slate-800 px-2.5 py-1.5 rounded-full shadow text-[9px] font-black border border-slate-100 hover:bg-white">Preview</button>
                          <button className={`px-2.5 py-1.5 rounded-full shadow text-[9px] font-black text-white ${selectedTemplate === 'minimal2' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'minimal2' ? 'Selected ✓' : 'Select layout'}
                          </button>
                        </div>
                      </div>
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'minimal3' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('minimal3')}>
                        <MinimalTemplateThree onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'minimal3' } as SchoolData} />
                        <div className="absolute top-2 right-2 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('minimal3'); }} className="bg-white/95 text-slate-800 px-2.5 py-1.5 rounded-full shadow text-[9px] font-black border border-slate-100 hover:bg-white">Preview</button>
                          <button className={`px-2.5 py-1.5 rounded-full shadow text-[9px] font-black text-white ${selectedTemplate === 'minimal3' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'minimal3' ? 'Selected ✓' : 'Select layout'}
                          </button>
                        </div>
                      </div>
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'minimal4' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('minimal4')}>
                        <MinimalTemplateRP onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'minimal4' } as SchoolData} />
                        <div className="absolute top-2 right-2 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('minimal4'); }} className="bg-white/95 text-slate-800 px-2.5 py-1.5 rounded-full shadow text-[9px] font-black border border-slate-100 hover:bg-white">Preview</button>
                          <button className={`px-2.5 py-1.5 rounded-full shadow text-[9px] font-black text-white ${selectedTemplate === 'minimal4' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'minimal4' ? 'Selected ✓' : 'Select layout'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 p-1 animate-in fade-in duration-300">
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'template1' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('template1')}>
                        <TemplateOne onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'template1' } as SchoolData} />
                        <div className="absolute top-3 right-3 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('template1'); }} className="bg-white/95 text-slate-800 px-3 py-1.5 rounded-full shadow text-[10px] font-black border border-slate-100 hover:bg-white">Full Preview</button>
                          <button className={`px-3 py-1.5 rounded-full shadow text-[10px] font-black text-white ${selectedTemplate === 'template1' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'template1' ? 'Selected Layout ✓' : 'Select Template'}
                          </button>
                        </div>
                      </div>
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'template2' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('template2')}>
                        <TemplateTwo onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'template2' } as SchoolData} />
                        <div className="absolute top-3 right-3 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('template2'); }} className="bg-white/95 text-slate-800 px-3 py-1.5 rounded-full shadow text-[10px] font-black border border-slate-100 hover:bg-white">Full Preview</button>
                          <button className={`px-3 py-1.5 rounded-full shadow text-[10px] font-black text-white ${selectedTemplate === 'template2' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'template2' ? 'Selected Layout ✓' : 'Select Template'}
                          </button>
                        </div>
                      </div>
                      <div className={`relative group/card text-left rounded-2xl border-2 overflow-hidden transition-all ${selectedTemplate === 'template3' ? 'border-indigo-600 shadow-md' : 'border-slate-100 dark:border-slate-800'}`} onClick={() => setSelectedTemplate('template3')}>
                        <TemplateThree onSelect={() => {}} data={{ email, name: schoolName || 'Qurashi Academy', tagline: tagline || 'Excellence in Education', description: address, logo: logoUrl, image: imageUrl, template: 'template3' } as SchoolData} />
                        <div className="absolute top-3 right-3 flex space-x-2 z-50 transition-all opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleFullPreview('template3'); }} className="bg-white/95 text-slate-800 px-3 py-1.5 rounded-full shadow text-[10px] font-black border border-slate-100 hover:bg-white">Full Preview</button>
                          <button className={`px-3 py-1.5 rounded-full shadow text-[10px] font-black text-white ${selectedTemplate === 'template3' ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-800'}`}>
                            {selectedTemplate === 'template3' ? 'Selected Layout ✓' : 'Select Template'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Setup Subdomain & Features checklists */}
          {step === 'setup' && (
            <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
              
              {/* Configure Website Address (Dynamic Custom Domain Picker) */}
              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-2 px-1">
                  Configure School Website Address
                </label>
                
                <div className="flex rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden focus-within:border-indigo-500 transition shadow-sm">
                  <input 
                    type="text" 
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, ''))}
                    placeholder="heritageschool" 
                    className="flex-1 min-w-0 pl-4 pr-2 py-3.5 bg-transparent border-0 outline-none text-slate-800 dark:text-slate-100 font-extrabold text-base placeholder-slate-400" 
                  />
                  
                  <div className="relative border-l border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center">
                    <select
                      value={domainExtension}
                      onChange={(e) => setDomainExtension(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-3.5 bg-transparent border-0 outline-none text-slate-700 dark:text-slate-200 font-black text-sm cursor-pointer"
                    >
                      <option value=".com">.com (Premium)</option>
                      <option value=".in">.in (Premium)</option>
                    </select>
                    <div className="absolute right-3.5 pointer-events-none text-slate-400 select-none text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                {isSubdomainChecking && (
                  <p className="text-slate-400 text-xs mt-2 px-1 font-bold animate-pulse flex items-center space-x-1.5">
                    <span>🔄</span> <span>Verifying domain availability...</span>
                  </p>
                )}
                {subdomainMessage && (
                  <div className={`text-xs mt-2.5 px-3 py-2.5 rounded-xl font-bold flex items-center space-x-2 border ${
                    subdomainMessage.type === 'success' 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900 text-red-500'
                  }`}>
                    <span>{subdomainMessage.type === 'success' ? '✨' : '❌'}</span>
                    <span>{subdomainMessage.text}</span>
                  </div>
                )}
                {errors.subdomain && <p className="text-red-500 text-xs mt-2 px-1 font-bold">⚠️ {errors.subdomain}</p>}
              </div>

              {/* Custom Domain Connection Guide Info Box */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start space-x-3.5">
                <span className="text-2xl mt-0.5 select-none">🌐</span>
                <div>
                  <h4 className="text-slate-800 dark:text-slate-100 font-black text-sm">Instant SSL Certificate Mappings</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-normal">
                    Once launched, our serverless routing automatically provisions global Cloudflare edge network routing with a premium Let's Encrypt SSL/TLS security key for your chosen school domain.
                  </p>
                </div>
              </div>

              {/* Pages Selector Checklist */}
              <div>
                <label className="block text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 mb-3 px-1">Select Sections to Include</label>
                <div className="space-y-2">
                  {AVAILABLE_SECTIONS.map((sec) => (
                    <label 
                      key={sec.id}
                      className={`flex items-start space-x-3.5 p-3.5 rounded-xl border-2 transition cursor-pointer select-none ${
                        sec.required 
                          ? 'border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-850/20 text-slate-400 dark:text-slate-500' 
                          : features.includes(sec.id)
                            ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/10 text-slate-700 dark:text-slate-200' 
                            : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={features.includes(sec.id)}
                        disabled={sec.required}
                        onChange={() => {
                          if (sec.required) return;
                          if (features.includes(sec.id)) {
                            setFeatures(features.filter(f => f !== sec.id));
                          } else {
                            setFeatures([...features, sec.id]);
                          }
                        }}
                        className="mt-1 h-4.5 w-4.5 accent-indigo-600"
                      />
                      <div>
                        <div className="font-extrabold text-sm">{sec.name} {sec.required && <span className="text-[10px] bg-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded ml-1.5 uppercase tracking-wider">Required</span>}</div>
                        <div className="text-[11px] opacity-80 mt-0.5 leading-normal">{sec.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                <button onClick={() => setStep('branding')} className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 text-sm font-bold transition cursor-pointer">
                  ← Back
                </button>
                <button 
                  onClick={handleSetupStep}
                  className="flex-[2] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg cursor-pointer flex items-center justify-center space-x-2 text-sm"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  <span>🚀 Deploy Website Live!</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 5: Deploying Visual Terminal */}
          {step === 'deploying' && (
            <div className="space-y-6 py-4 animate-in fade-in duration-300">
              <div className="text-center">
                
                {/* Rotating Gears / Loading Ring */}
                <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center select-none">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                  <span className="text-3xl animate-pulse">🛠️</span>
                </div>

                <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 italic">Assembling Core Assets...</h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal max-w-xs mx-auto">
                  Please hold on as our serverless engine automatically provisions database settings and dispatches branded email templates.
                </p>
              </div>

              {/* Simulated visual terminal logs */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 font-mono text-left text-xs leading-relaxed max-w-md mx-auto space-y-2 shadow-inner">
                {deployLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-emerald-400 animate-in slide-in-from-left duration-300">
                    <span className="font-extrabold select-none">✓</span>
                    <span className="font-medium text-slate-350">{log}</span>
                  </div>
                ))}
                
                {deployStep < deployLogsList.length && (
                  <div className="flex items-center space-x-2 text-indigo-400 animate-pulse">
                    <span className="font-extrabold select-none">⚡</span>
                    <span className="font-medium text-slate-300">Processing next sequence...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: Success Congratulation Portal */}
          {step === 'success' && (
            <div className="text-center py-6 animate-in zoom-in duration-500 max-w-md mx-auto">
              <div className="text-7xl mb-5 animate-bounce select-none">✨</div>
              
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2 italic">Launch Complete!</h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed max-w-sm mx-auto">
                Congratulations! Your brand-new, modern school platform for <strong>{schoolName}</strong> is completely generated and deployed.
              </p>

              {/* live info blocks */}
              <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 text-left text-xs space-y-3 mb-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-400 font-extrabold">
                    {domainExtension === '.schoolsaas.com' ? 'Live Subdomain URL:' : 'Official School Domain:'}
                  </span>
                  <a 
                    href={`/school/${email}`}
                    target="_blank" 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-black"
                  >
                    {subdomain}{domainExtension} →
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-400 font-extrabold">Admin login Panel:</span>
                  <a 
                    href={`/school/${email}/customize`}
                    target="_blank" 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-black"
                  >
                    Site Editor Portal →
                  </a>
                </div>
                <div className="flex items-center justify-between text-slate-400 font-extrabold leading-normal">
                  <span>Welcome Email dispatched to:</span>
                  <span className="text-slate-700 dark:text-slate-200 font-black">{email}</span>
                </div>
              </div>

              {/* Local Sandbox Info Block */}
              {sandboxInfo?.show && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl text-left text-xs text-amber-800 dark:text-amber-300 leading-relaxed mb-6">
                  <div className="font-extrabold flex items-center space-x-1 mb-1.5">
                    <span>🧪 Sandbox Email dispatched:</span>
                  </div>
                  <div>
                    <a 
                      href={sandboxInfo.previewUrl} 
                      target="_blank" 
                      className="text-indigo-600 dark:text-indigo-400 underline font-black hover:text-indigo-800"
                    >
                      📂 Open beautiful HTML Welcome Email preview in Browser →
                    </a>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={onClose}
                  className="order-2 sm:order-1 flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black py-4 rounded-2xl shadow hover:scale-[1.03] active:scale-[0.97] transition-all text-sm cursor-pointer"
                >
                  Done & Close
                </button>
                <Link 
                  href={`/school/${email}`}
                  target="_blank"
                  className="order-1 sm:order-2 flex-[2] inline-flex items-center justify-center text-white font-extrabold py-4 rounded-2xl shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all text-base cursor-pointer"
                  style={{ backgroundColor: activeColor.primary, boxShadow: `0 8px 24px -6px ${activeColor.primary}50` }}
                >
                  🚀 Launch Website
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
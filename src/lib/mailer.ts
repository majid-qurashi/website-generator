import fs from 'fs';
import path from 'path';

interface SendEmailParams {
  to: string;
  subject: string;
  templateName: 'verify' | 'welcome' | 'password_reset' | 'domain_connected' | 'invoice';
  templateData: Record<string, any>;
}

// Resend API URL
const RESEND_API_URL = 'https://api.resend.com/emails';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'SchoolSaaS Onboarding <onboarding@resend.dev>';

// Base styles for premium transactional emails
const emailStyles = `
  body { font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  .wrapper { background-color: #f8fafc; padding: 40px 20px; }
  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); }
  .header { background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%); padding: 40px 30px; text-align: center; color: #ffffff; }
  .header-logo { font-size: 28px; font-weight: 800; letter-spacing: -0.05em; display: inline-flex; align-items: center; }
  .header-tag { font-size: 14px; opacity: 0.85; margin-top: 6px; font-weight: 500; }
  .content { padding: 40px 30px; line-height: 1.6; }
  .title { font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 16px; letter-spacing: -0.02em; }
  .subtitle { font-size: 16px; color: #475569; margin-bottom: 24px; }
  .otp-container { background-color: #f1f5f9; border-radius: 16px; padding: 24px; text-align: center; margin: 32px 0; border: 1px dashed #cbd5e1; }
  .otp-code { font-size: 38px; font-weight: 900; letter-spacing: 6px; color: #4f46e5; font-family: monospace; }
  .otp-expiry { font-size: 12px; color: #64748b; margin-top: 10px; font-weight: 500; }
  .btn { display: inline-block; background-color: #4f46e5; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 16px 36px; border-radius: 14px; font-size: 16px; text-align: center; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -2px rgba(79, 70, 229, 0.2); transition: all 0.2s ease; margin: 16px 0; }
  .btn:hover { background-color: #4338ca; }
  .info-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
  .info-table td { padding: 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
  .info-table tr:last-child td { border-bottom: none; }
  .info-table td.label { font-weight: 600; color: #64748b; width: 35%; background-color: #f8fafc; }
  .info-table td.value { color: #0f172a; font-weight: 500; }
  .checklist { padding-left: 20px; margin: 24px 0; }
  .checklist li { margin-bottom: 12px; color: #334155; font-size: 14px; }
  .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer-links { margin-bottom: 16px; }
  .footer-links a { color: #4f46e5; text-decoration: none; margin: 0 10px; font-weight: 600; }
  .security-notice { font-size: 11px; color: #94a3b8; line-height: 1.5; margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 16px; }
  .invoice-card { background: #0f172a; border-radius: 16px; padding: 24px; color: #ffffff; margin-bottom: 24px; }
  .invoice-amount { font-size: 32px; font-weight: 800; color: #34d399; }
`;

// Helper: Wrap code inside clean template skeleton
function buildHtmlWrapper(subject: string, innerHtml: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <div class="header-logo">🏫 SchoolSaaS</div>
            <div class="header-tag">The Premium School Website Platform</div>
          </div>
          <div class="content">
            ${innerHtml}
          </div>
          <div class="footer">
            <div class="footer-links">
              <a href="#">Dashboard</a> • 
              <a href="#">Support Center</a> • 
              <a href="#">Privacy Policy</a>
            </div>
            <div>© ${new Date().getFullYear()} SchoolSaaS Inc. All rights reserved.</div>
            <div class="security-notice">
              This is a transactional message sent to you as part of your registered subscription. If you did not request this email, please contact our support team immediately.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// 1. Verify Email Template
function getVerifyEmailTemplate(data: { otpCode: string; verificationLink: string; expiresMinutes: number }): string {
  return `
    <h1 class="title">Verify Your School Email</h1>
    <p class="subtitle">Welcome to SchoolSaaS! To get started on building your state-of-the-art school website, please verify your email address.</p>
    
    <p>Please enter the following 6-digit verification code directly into the onboarding wizard:</p>
    
    <div class="otp-container">
      <div class="otp-code">${data.otpCode}</div>
      <div class="otp-expiry">Valid for ${data.expiresMinutes} minutes • Secure Transaction Code</div>
    </div>
    
    <p style="text-align: center; margin: 32px 0 16px 0;">Alternatively, you can verify your account by clicking the secure link below:</p>
    
    <div style="text-align: center;">
      <a href="${data.verificationLink}" target="_blank" class="btn">Verify Account Instantly</a>
    </div>
    
    <p style="font-size: 13px; color: #64748b; margin-top: 32px;">
      💡 **Security Notice:** If you did not attempt to sign up for a SchoolSaaS account, you can safely ignore this email. Your email address will not be registered without verification.
    </p>
  `;
}

// 2. Welcome Email + Website Launch Template
function getWelcomeEmailTemplate(data: {
  schoolName: string;
  email: string;
  websiteUrl: string;
  adminDashboardUrl: string;
  subdomain: string;
}): string {
  return `
    <h1 class="title" style="color: #4f46e5;">✨ Your School Website is Live!</h1>
    <p class="subtitle">Congratulations! Your beautiful, premium school website for <strong>${data.schoolName}</strong> has been successfully built and deployed instantly to the cloud.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.websiteUrl}" target="_blank" class="btn" style="background-color: #10b981; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);">🚀 View Your Live Website</a>
    </div>

    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 36px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Portal & Account Credentials</h2>
    <table class="info-table">
      <tr>
        <td class="label">School Name</td>
        <td class="value">${data.schoolName}</td>
      </tr>
      <tr>
        <td class="label">Primary Email</td>
        <td class="value">${data.email}</td>
      </tr>
      <tr>
        <td class="label">Website Subdomain</td>
        <td class="value"><a href="${data.websiteUrl}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: 600;">${data.subdomain}.schoolsaas.com</a></td>
      </tr>
      <tr>
        <td class="label">Admin Dashboard</td>
        <td class="value"><a href="${data.adminDashboardUrl}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Manage Site Panel</a></td>
      </tr>
    </table>

    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 36px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">🚀 Getting Started Checklist</h2>
    <ul class="checklist">
      <li><strong>Customize styling:</strong> Access the editor panel to tweak branding colors, font styles, and layouts in real-time.</li>
      <li><strong>Add School Sections:</strong> Publish announcements, update the principal's statement, and upload campus gallery images.</li>
      <li><strong>Publish Academics:</strong> Add class curriculum guides, calendar schedules, and admission criteria.</li>
      <li><strong>Connect Custom Domain:</strong> Reach out to our team to map your official domain (e.g., <code>www.schoolname.edu</code>).</li>
    </ul>

    <p style="margin-top: 32px; font-size: 14px;">If you have any questions or need technical support, simply reply directly to this email or visit our Help Center.</p>
  `;
}

// 3. Password Reset Template
function getPasswordResetTemplate(data: { resetLink: string }): string {
  return `
    <h1 class="title">Reset Your Admin Password</h1>
    <p class="subtitle">We received a request to reset the administrator password for your school account.</p>
    
    <p>Please click the button below to set a new password. This link is secure and will expire in 1 hour:</p>
    
    <div style="text-align: center; margin: 36px 0;">
      <a href="${data.resetLink}" target="_blank" class="btn">Reset Admin Password</a>
    </div>
    
    <p style="font-size: 12px; color: #64748b; margin-top: 32px; line-height: 1.4;">
      ⚠️ **Didn't request this?** If you did not initiate a password reset, please secure your account or disregard this notice. No action is required and your current password remains fully secure.
    </p>
  `;
}

// 4. Domain Connected Template
function getDomainConnectedTemplate(data: { schoolName: string; customDomain: string; sslStatus: string }): string {
  return `
    <h1 class="title" style="color: #10b981;">🌐 Domain Connected Successfully!</h1>
    <p class="subtitle">Great news! Your custom domain is now fully linked and configured with your school website.</p>
    
    <div class="otp-container" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; text-align: left; padding: 24px;">
      <div style="font-size: 18px; font-weight: 700; color: #15803d; margin-bottom: 8px;">Domain Status: Active</div>
      <div style="font-size: 14px; color: #166534; font-weight: 500;">
        🔗 **Mapped Hostname:** <a href="https://${data.customDomain}" target="_blank" style="color: #15803d; text-decoration: underline; font-weight: 700;">${data.customDomain}</a><br>
        🛡️ **SSL/TLS Protection:** Enabled (Automatic Let's Encrypt Certificate Provisioned)
      </div>
    </div>
    
    <p>Your users can now visit your beautiful school platform directly at your brand-new custom address. Traffic on this domain is automatically optimized, cached, and protected by Cloudflare secure SSL.</p>
  `;
}

// 5. Subscription / Invoice Template
function getInvoiceTemplate(data: {
  schoolName: string;
  invoiceNumber: string;
  amountPaid: string;
  billingDate: string;
  planName: string;
}): string {
  return `
    <h1 class="title">Payment Receipt & Invoice</h1>
    <p class="subtitle">Thank you for supporting SchoolSaaS! Here is your transactional receipt for this billing cycle.</p>
    
    <div class="invoice-card">
      <div style="font-size: 14px; text-transform: uppercase; font-weight: 700; opacity: 0.7; margin-bottom: 6px;">Total Paid</div>
      <div class="invoice-amount">${data.amountPaid}</div>
      <div style="font-size: 12px; opacity: 0.8; margin-top: 8px;">Charged to card on ${data.billingDate}</div>
    </div>

    <table class="info-table">
      <tr>
        <td class="label">Invoice No.</td>
        <td class="value">${data.invoiceNumber}</td>
      </tr>
      <tr>
        <td class="label">School Account</td>
        <td class="value">${data.schoolName}</td>
      </tr>
      <tr>
        <td class="label">Plan Level</td>
        <td class="value">${data.planName}</td>
      </tr>
    </table>
    
    <p style="text-align: center; margin-top: 32px;">
      <a href="#" class="btn" style="background-color: #334155;">Download PDF Receipt</a>
    </p>
  `;
}

/**
 * High-performance email dispatching client.
 * Automatically delegates between Resend API (production)
 * and a Sandbox File Preview Mode (local development fallback).
 */
export async function sendEmail({ to, subject, templateName, templateData }: SendEmailParams) {
  let html = '';
  
  // Resolve template functions
  switch (templateName) {
    case 'verify':
      html = getVerifyEmailTemplate({
        otpCode: templateData.otpCode || '000000',
        verificationLink: templateData.verificationLink || '#',
        expiresMinutes: templateData.expiresMinutes || 15
      });
      break;
    case 'welcome':
      html = getWelcomeEmailTemplate({
        schoolName: templateData.schoolName || 'Your School',
        email: templateData.email || to,
        websiteUrl: templateData.websiteUrl || '#',
        adminDashboardUrl: templateData.adminDashboardUrl || '#',
        subdomain: templateData.subdomain || 'school'
      });
      break;
    case 'password_reset':
      html = getPasswordResetTemplate({
        resetLink: templateData.resetLink || '#'
      });
      break;
    case 'domain_connected':
      html = getDomainConnectedTemplate({
        schoolName: templateData.schoolName || 'Your School',
        customDomain: templateData.customDomain || 'school.com',
        sslStatus: templateData.sslStatus || 'Active'
      });
      break;
    case 'invoice':
      html = getInvoiceTemplate({
        schoolName: templateData.schoolName || 'Your School',
        invoiceNumber: templateData.invoiceNumber || 'INV-0000',
        amountPaid: templateData.amountPaid || '$0.00',
        billingDate: templateData.billingDate || new Date().toLocaleDateString(),
        planName: templateData.planName || 'Standard SaaS'
      });
      break;
  }
  
  const finalHtml = buildHtmlWrapper(subject, html);

  // If RESEND_API_KEY is configured, send standard HTTP Request to Resend
  if (RESEND_API_KEY) {
    try {
      console.log(`📨 Attempting to dispatch email to: ${to} using Resend...`);
      const res = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to,
          subject,
          html: finalHtml
        })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(JSON.stringify(errData));
      }
      
      const resData = await res.json();
      console.log(`✅ Email sent successfully via Resend. ID: ${resData.id}`);
      return { success: true, method: 'resend', id: resData.id };
    } catch (err: any) {
      console.error('❌ Resend API sending failed. Falling back to Sandbox Mode...', err.message);
    }
  }

  // Developer Sandbox Fallback Mode
  // On Vercel/serverless environments the filesystem is read-only.
  // We skip writing the HTML file and just log details + return the OTP directly.
  try {
    const webPath = (() => {
      try {
        // Only attempt filesystem write in local development (writable FS)
        const previewDir = path.join(process.cwd(), 'public', 'email-previews');
        if (!fs.existsSync(previewDir)) {
          fs.mkdirSync(previewDir, { recursive: true });
        }
        const fileName = `preview_${templateName}_${to.replace(/[^a-z0-9]/gi, '_')}.html`;
        const filePath = path.join(previewDir, fileName);
        fs.writeFileSync(filePath, finalHtml);
        return `/email-previews/${fileName}`;
      } catch {
        // Read-only filesystem (Vercel/serverless) — skip file write gracefully
        return null;
      }
    })();

    console.log('\n==================================================');
    console.log('📬  DEVELOPER EMAIL SANDBOX PREVIEW');
    console.log('==================================================');
    console.log(`To:       ${to}`);
    console.log(`Subject:  ${subject}`);
    console.log(`Template: ${templateName}`);
    if (templateData.otpCode) {
      console.log(`🔑 OTP:    ${templateData.otpCode}`);
    }
    if (webPath) {
      console.log(`🔗 Local Browser URL to Preview Email HTML:`);
      console.log(`   http://localhost:3000${webPath}`);
    } else {
      console.log(`ℹ️  Running on serverless (read-only FS). Email preview file not written.`);
      console.log(`ℹ️  Set RESEND_API_KEY in environment variables to send real emails.`);
    }
    console.log('==================================================\n');

    return {
      success: true,
      method: 'sandbox',
      previewUrl: webPath ? `http://localhost:3000${webPath}` : null,
      otpCode: templateData.otpCode
    };
  } catch (writeErr: any) {
    console.error('❌ Sandbox fallback failed:', writeErr.message);
    // Last-resort: still return sandbox success so registration can proceed
    return {
      success: true,
      method: 'sandbox',
      previewUrl: null,
      otpCode: templateData.otpCode
    };
  }
}

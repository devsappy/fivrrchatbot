// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add Gmail as your email service
// 3. Create an email template with these variables:
//    - {{from_name}} - Sender's name
//    - {{from_email}} - Sender's email
//    - {{phone}} - Phone number
//    - {{company}} - Company name
//    - {{service}} - Service interested in
//    - {{budget}} - Budget range
//    - {{message}} - Message content
// 4. Get your Service ID, Template ID, and Public Key
// 5. Add these as environment variables in Vercel

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  TO_EMAIL: 'chatterifyservice@gmail.com'
};

// Debug logging - remove in production
console.log('EmailJS Config:', {
  SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
  TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
  PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'Set' : 'Not Set',
  TO_EMAIL: EMAILJS_CONFIG.TO_EMAIL
});

// Template for EmailJS (copy this to EmailJS template):
/*
Subject: New Contact Form Submission from {{from_name}}

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Service Interested: {{service}}
Budget: {{budget}}

Message:
{{message}}

---
This email was sent from the Chatterify website contact form.
*/
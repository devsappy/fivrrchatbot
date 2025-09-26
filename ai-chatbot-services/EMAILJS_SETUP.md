# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions at chatterifyservice@gmail.com

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free" and create an account
3. Verify your email address

## Step 2: Add Gmail Email Service

1. In EmailJS Dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Click "Connect Account"
5. Authorize EmailJS to send emails from your Gmail account
6. Name your service (e.g., "Chatterify Contact Form")
7. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set up the template as follows:

**To Email:** chatterifyservice@gmail.com

**From Name:** Chatterify Contact Form (or leave default)

**Reply To:** {{from_email}}

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
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
```

4. Click "Save"
5. Copy the **Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to "Account" in the dashboard
2. Click on "API Keys" tab
3. Copy your **Public Key**

## Step 5: Set Up Environment Variables

### For Local Development:
Create a `.env` file in the `ai-chatbot-services` folder:
```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:
   - `REACT_APP_EMAILJS_SERVICE_ID` = your_service_id
   - `REACT_APP_EMAILJS_TEMPLATE_ID` = your_template_id
   - `REACT_APP_EMAILJS_PUBLIC_KEY` = your_public_key
4. Click "Save"
5. Redeploy your application

## Step 6: Test the Form

1. Visit your website's contact page
2. Fill out the form with test data
3. Click "Send Message"
4. Check chatterifyservice@gmail.com for the email

## Important: Template Variables Setup

Make sure your EmailJS template includes ALL these variables in the content/body section:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Phone number
- `{{company}}` - Company name
- `{{service}}` - Service interested in
- `{{budget}}` - Budget range
- `{{message}}` - Message content

**Note:** Do NOT use `{{from_name}}` or `{{from_email}}` in the "From Name" or "From Email" fields. Use fixed values or leave default.

## Troubleshooting

- **400 Error:** This usually means template variables mismatch. Ensure:
  - All variables listed above exist in your template content
  - "From Name" field is NOT set to `{{from_name}}`
  - "Reply To" field is set to `{{from_email}}` (not "From Email")
  - Template ID, Service ID, and Public Key are correct
- **Email not received:** Check spam folder
- **Error sending:** Verify all environment variables are set correctly
- **Gmail blocking:** Make sure you've authorized EmailJS in Gmail security settings
- **Rate limits:** Free EmailJS plan allows 200 emails/month

## Security Notes

- Never commit `.env` files to Git
- The Public Key is safe to expose in frontend code
- Keep Service ID and Template ID in environment variables for extra security

## Support

For EmailJS issues, visit: https://www.emailjs.com/docs/
For application issues, contact the development team.
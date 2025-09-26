# Vercel Environment Variables Setup

Add these environment variables to your Vercel project for EmailJS to work in production:

## Steps:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project (fivrrchatbot or similar)
3. Click on "Settings" tab
4. Click on "Environment Variables" in the left sidebar
5. Add the following variables:

### Required Variables:

| Name | Value |
|------|-------|
| `REACT_APP_EMAILJS_SERVICE_ID` | `service_4bt0izf` |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | `template_mx5jn9l` |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | `-nNP6Br_4U1fqMEwb` |

6. Click "Save" for each variable
7. **IMPORTANT**: Redeploy your application for changes to take effect:
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## Testing:

After redeployment:
1. Visit your website
2. Go to the Contact page
3. Fill out the form
4. Submit and check chatterifyservice@gmail.com for the email

## Note:

If you haven't set up the Service ID yet in EmailJS:
1. Go to EmailJS dashboard
2. Click on "Email Services"
3. Your Gmail service should show a Service ID (like `service_xxxxxxx`)
4. Use that exact Service ID in the environment variable
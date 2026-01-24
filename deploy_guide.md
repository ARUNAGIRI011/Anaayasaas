---
description: How to deploy this application to Vercel
---

# Deploying to Vercel

This workflow describes how to deploy the Anaaya Gen application to Vercel.

1. **Install Vercel CLI**:
   Ensure you have the Vercel CLI installed.
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   Authenticate with your Vercel account.
   ```bash
   vercel login
   ```

3. **Deploy**:
   Run the deploy command from the root of your project.
   ```bash
   vercel
   ```
   - Follow the prompts (Select scope, Link to existing project: No, etc.)
   - Use default settings for Next.js.

4. **Environment Variables**:
   IMPORTANT: You must add your environment variables to the Vercel dashboard for the deployment to work correctly.
   - Go to your Vercel Project Dashboard > Settings > Environment Variables.
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GOOGLE_GENERATIVE_AI_API_KEY`
     - `RAZORPAY_KEY_ID`
     - `RAZORPAY_KEY_SECRET`

5. **Production Deployment**:
   Once you are happy with the preview, deploy to production:
   ```bash
   vercel --prod
   ```

# Vercel Environment Variables Setup

Copy and paste these environment variables into your Vercel project settings:

## Environment Variables to Add in Vercel Dashboard

Go to: **Project Settings → Environment Variables**

Add these two variables:

### Variable 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://lziulkylvlpxtnymoume.supabase.co`

### Variable 2:
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aXVsa3lsdmxweHRueW1vdW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjE2MjksImV4cCI6MjA4OTEzNzYyOX0.kmmiITH_DxauMFsJQD3qK4KqFv2flrvZb57K87QfdOE`

## Steps:

1. Go to https://vercel.com/dashboard
2. Select your "kitaab" project
3. Click "Settings" tab
4. Click "Environment Variables" in the left sidebar
5. Add the two variables above
6. Click "Save"
7. Go to "Deployments" tab
8. Click the three dots on the latest deployment
9. Click "Redeploy"

That's it! Your app should now work on Vercel.

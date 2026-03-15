# How to Find Your Supabase Keys

You've already found your Supabase URL: `https://lziulkylvlpxtnymoume.supabase.co` ✅

Now you need to find the **anon/public key**. Here's how:

## Step-by-Step Instructions

### 1. Go to Your Supabase Project
- Visit [https://app.supabase.com](https://app.supabase.com)
- Click on your project (the one with URL: lziulkylvlpxtnymoume.supabase.co)

### 2. Navigate to API Settings
- Look at the left sidebar
- Click on the **gear icon** (⚙️) at the bottom - this is "Project Settings"
- In the settings menu, click **"API"**

### 3. Find Your Keys
You'll see a section called "Project API keys" with two keys:

#### Option A: anon/public key (RECOMMENDED)
- Look for a key labeled **"anon"** or **"public"**
- It's a long string starting with `eyJ...`
- This is what you need!
- Click the copy icon next to it

#### Option B: service_role key (NOT RECOMMENDED for frontend)
- There's also a "service_role" key
- **DO NOT use this one** - it has full admin access and should never be exposed in frontend code

### 4. Update Your .env.local File

Open `artistic-poetry-platform/.env.local` and replace:

```env
VITE_SUPABASE_ANON_KEY=your_anon_key_here_see_instructions_below
```

With:

```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aXVsa3lsdmxweHRueW1vdW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NzY4MDAsImV4cCI6MjAwMzU1MjgwMH0.YOUR_ACTUAL_KEY_HERE
```

(Replace with your actual key from Supabase dashboard)

## What if I can't find the API section?

### Alternative Method:

1. In your Supabase project dashboard
2. Click **"Settings"** in the left sidebar (gear icon at bottom)
3. Look for **"API"** in the settings submenu
4. Scroll down to **"Project API keys"**
5. Copy the **"anon public"** key

## Visual Guide

```
Supabase Dashboard
├── Your Project
│   ├── Table Editor
│   ├── SQL Editor
│   ├── Database
│   └── Settings (⚙️) ← Click here
│       ├── General
│       ├── API ← Then click here
│       │   └── Project API keys
│       │       ├── anon public ← Copy this one!
│       │       └── service_role (don't use)
│       ├── Database
│       └── ...
```

## After You Update .env.local

1. **Save the file**
2. **Restart your dev server**:
   ```bash
   # Press Ctrl+C in the terminal to stop
   npm run dev
   ```
3. Visit [http://localhost:5173](http://localhost:5173)
4. Your app should now connect to Supabase!

## Testing the Connection

1. Go to [http://localhost:5173/admin](http://localhost:5173/admin)
2. Login with:
   - Username: `ankit@9955`
   - Password: `ankit@poetry99559955`
3. Try adding a test poem
4. If it works, you're all set! 🎉

## Still Having Issues?

Check the browser console (F12) for error messages. Common issues:

- **"Invalid API key"**: Double-check you copied the anon key, not service_role
- **"Failed to fetch"**: Make sure the URL is correct (no trailing slash)
- **"Network error"**: Check your internet connection

## Note About the Keys You Found

The keys you mentioned:
- `NEXT_PUBLIC_SUPABASE_URL` - This is for Next.js projects (we're using Vite)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - This looks like a different type of key

For our Vite/React project, we need:
- `VITE_SUPABASE_URL` ✅ (you have this)
- `VITE_SUPABASE_ANON_KEY` ⏳ (find this in API settings)

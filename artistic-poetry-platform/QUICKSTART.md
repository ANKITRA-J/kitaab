# Quick Start Guide

## 🚀 Get Your Poetry Platform Running in 5 Minutes

### Step 1: Supabase Setup (2 minutes)

1. Go to [https://app.supabase.com](https://app.supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - Project name: `poetry-platform` (or any name you like)
   - Database password: (create a strong password)
   - Region: Choose closest to you
4. Wait for project to be created (~2 minutes)

### Step 2: Create Database Table (1 minute)

1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-setup.sql` file
4. Click "Run" button
5. You should see "Success. No rows returned" - this is good!

### Step 3: Get Your API Keys (30 seconds)

1. In Supabase, click "Project Settings" (gear icon in left sidebar)
2. Click "API" in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)
4. Keep this tab open - you'll need these values next

### Step 4: Configure Environment Variables (1 minute)

1. In your project folder, find the file `.env.local`
2. Open it and replace the placeholder values:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co  # Paste your Project URL here
VITE_SUPABASE_ANON_KEY=eyJxxx...  # Paste your anon public key here
VITE_ADMIN_USERNAME=ankit@9955  # Change if you want
VITE_ADMIN_PASSWORD=ankit@poetry99559955  # Change if you want
```

3. Save the file

### Step 5: Run the App (30 seconds)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## 🎨 Using Your Poetry Platform

### Homepage
- Click anywhere or press "ENTER" to see poems
- Enjoy the animated wiggle effect!

### Viewing Poems
- Click any poem card to open the book viewer
- Toggle between Hindi and English using the language buttons
- Click the ✕ button to close

### Admin Panel
1. Go to [http://localhost:5173/admin](http://localhost:5173/admin)
2. Login with your credentials (from `.env.local`)
3. Add, edit, or delete poems
4. Changes appear immediately on the homepage!

## 📝 Adding Your First Poem

1. Go to `/admin` and login
2. Fill in the form:
   - **Title**: Name of your poem
   - **Content (Hindi)**: Your poem in Hindi (Devanagari script)
   - **Content (English)**: English translation or transliteration
3. Click "Add Poem"
4. Go back to homepage to see your new poem card!

## 🚀 Deploying to Vercel (Free Hosting)

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com) and sign up (free)
3. Click "New Project" and import your GitHub repository
4. Add the same environment variables from `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_USERNAME`
   - `VITE_ADMIN_PASSWORD`
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app`!

## 🆘 Troubleshooting

### "No poems yet" message
- Make sure you ran the SQL setup in Supabase
- Check that your `.env.local` has correct Supabase credentials
- Try refreshing the page

### Admin login not working
- Check your username and password in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server after changing `.env.local`

### Poems not loading
- Open browser console (F12) and check for errors
- Verify Supabase URL and key are correct
- Check that the `poems` table exists in Supabase

## 🎉 You're All Set!

Your poetry platform is now running. Start adding your beautiful poetry and share it with the world!

For more details, see the main [README.md](README.md) file.

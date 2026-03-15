# GitHub Setup Guide for Kitaab

## 📋 Prerequisites

- GitHub account (free at https://github.com)
- Git installed on your computer
- Your project folder ready

---

## Step 1: Create a GitHub Repository

### Option A: Using GitHub Website (Easiest)

1. Go to https://github.com/new
2. **Repository name:** `kitaab` (or your preferred name)
3. **Description:** "A beautiful poetry platform with Hindi & English support"
4. **Visibility:** Choose "Public" (anyone can see) or "Private" (only you)
5. **Initialize with:**
   - ❌ Do NOT check "Add a README file"
   - ❌ Do NOT check "Add .gitignore"
   - ❌ Do NOT check "Choose a license"
6. Click **Create repository**

You'll see a page with commands to run. Copy the HTTPS URL (looks like: `https://github.com/your-username/kitaab.git`)

---

## Step 2: Initialize Git in Your Project

Open terminal/command prompt in your project folder:

```bash
cd path/to/artistic-poetry-platform
```

Then run:

```bash
git init
git add .
git commit -m "Initial commit: Kitaab poetry platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kitaab.git
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

---

## Step 3: Verify on GitHub

1. Go to your GitHub repository URL: `https://github.com/YOUR-USERNAME/kitaab`
2. You should see all your files uploaded
3. ✅ Success!

---

## Important Files Already Gitignored

These files are **NOT** uploaded (protected):
- ✅ `.env.local` - Your Supabase credentials (safe!)
- ✅ `node_modules/` - Dependencies (huge folder)
- ✅ `dist/` - Build files

Check `.gitignore` file to see what's excluded.

---

## Making Changes & Pushing Updates

After making changes to your code:

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Fixed scroll indicator animation"

# Push to GitHub
git push
```

---

## Cloning Your Project (On Another Computer)

If you want to work on this project from another computer:

```bash
git clone https://github.com/YOUR-USERNAME/kitaab.git
cd kitaab
npm install
```

Then create `.env.local` with your Supabase credentials.

---

## Deploying to Vercel (From GitHub)

### Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click **Sign up** (or login if you have account)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

### Step 2: Import Your Project

1. Click **New Project**
2. Find and select `kitaab` repository
3. Click **Import**

### Step 3: Configure Environment Variables

1. In the **Environment Variables** section, add:
   ```
   VITE_SUPABASE_URL=https://lziulkylvlpxtnymoume.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
2. Click **Deploy**

Vercel will automatically:
- ✅ Build your project
- ✅ Deploy to a live URL
- ✅ Give you a domain (e.g., `kitaab.vercel.app`)

### Step 4: Auto-Deploy on Push

Now whenever you push to GitHub:
```bash
git push
```

Vercel automatically rebuilds and deploys! 🚀

---

## Useful Git Commands

```bash
# See commit history
git log

# See what changed in last commit
git show

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch into main
git merge feature-name
```

---

## Troubleshooting

### "fatal: not a git repository"
- Make sure you're in the project folder
- Run `git init` first

### "Permission denied (publickey)"
- You need to set up SSH keys
- Or use HTTPS instead of SSH
- Follow: https://docs.github.com/en/authentication

### ".env.local not showing up"
- Good! It's gitignored (protected)
- Create it manually on new computers

### "node_modules too large"
- It's gitignored (not uploaded)
- Run `npm install` on new computers

---

## Best Practices

1. **Commit often** - Small, meaningful commits
2. **Write good messages** - "Fixed scroll bug" not "fix"
3. **Push regularly** - Don't lose work
4. **Use branches** - For new features
5. **Keep .env.local private** - Never commit credentials

---

## Project Structure on GitHub

```
kitaab/
├── src/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── App.tsx
├── public/
├── .gitignore          ← Protects .env.local
├── package.json
├── vite.config.ts
├── supabase-final-setup.sql
├── ADMIN-GUIDE.md
├── SECURITY-SETUP.md
├── AUDIO-HOSTING-GUIDE.md
└── README.md
```

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push your code
3. ✅ Connect to Vercel
4. ✅ Deploy live!

Your Kitaab poetry platform is now on GitHub and ready to share! 🎉

---

## Need Help?

- GitHub Docs: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
- Git Tutorial: https://git-scm.com/book/en/v2

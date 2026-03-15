# Pre-GitHub Checklist ✅

Before pushing to GitHub, verify everything is working:

---

## 🔐 Security Check

- [ ] `.env.local` exists with Supabase credentials
- [ ] `.env.local` is in `.gitignore` (won't be uploaded)
- [ ] Admin password changed from default `admin123`
- [ ] No hardcoded secrets in code files
- [ ] `.env.example` has placeholder values only

---

## 🗄️ Database Setup

- [ ] Ran `supabase-final-setup.sql` in Supabase SQL Editor
- [ ] `poems` table exists in Supabase
- [ ] `admin_users` table exists in Supabase
- [ ] Default admin user created (username: `admin`)
- [ ] Admin password changed to secure value

---

## 🎨 UI/UX Features

- [ ] Homepage shows "Kitaab" (not "Poetry Journal")
- [ ] Poem cards show only title (no preview text)
- [ ] Scroll indicator moves with text scroll
- [ ] Home button (🏠) appears in poem viewer (top-left)
- [ ] Back button (🏠) appears in library page (top-left)
- [ ] Vinyl player spins (not tonearm)
- [ ] Tonearm moves to record when playing
- [ ] Play/pause button works (▶ and ⏸)
- [ ] Dark mode works (removes all colors)
- [ ] Language toggle works (Hindi/English)
- [ ] About button shows explanation

---

## 🎵 Audio Features

- [ ] Admin panel has file upload buttons
- [ ] Poetry audio uploads to Supabase
- [ ] Background music uploads to Supabase
- [ ] Audio plays correctly for each poem
- [ ] Background music pauses when poem plays
- [ ] No audio mix-ups between poems

---

## 📝 Admin Panel

- [ ] Login works with admin credentials
- [ ] Can add new poems
- [ ] Can edit existing poems
- [ ] Can delete poems
- [ ] Can upload audio files
- [ ] Poem cards auto-generate after adding
- [ ] Logout works

---

## 🌐 Responsive Design

- [ ] Works on desktop (1920px+)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Buttons are clickable on mobile
- [ ] Text is readable on all sizes
- [ ] No horizontal scrolling

---

## 📦 Code Quality

- [ ] No console errors (F12 to check)
- [ ] No TypeScript errors
- [ ] No unused imports
- [ ] No hardcoded values (use env vars)
- [ ] Comments explain complex logic
- [ ] File names are consistent

---

## 📄 Documentation

- [ ] `README.md` exists and is clear
- [ ] `QUICK-START.md` has setup instructions
- [ ] `SECURITY-SETUP.md` explains auth
- [ ] `ADMIN-GUIDE.md` explains admin panel
- [ ] `AUDIO-HOSTING-GUIDE.md` explains audio
- [ ] `GITHUB-SETUP.md` explains GitHub setup
- [ ] All guides are up-to-date

---

## 🚀 Deployment Ready

- [ ] `package.json` has all dependencies
- [ ] `npm install` works without errors
- [ ] `npm run dev` starts dev server
- [ ] `npm run build` builds successfully
- [ ] No build warnings or errors
- [ ] `.gitignore` is correct

---

## 🧪 Testing Checklist

### Homepage
- [ ] Click "ENTER" button
- [ ] Animations work smoothly
- [ ] "Kitaab" title displays correctly

### Library Page
- [ ] Poem cards load
- [ ] Cards show only title (no preview)
- [ ] Click card opens poem
- [ ] Back button (🏠) returns to library

### Poem Viewer
- [ ] Title and subtitle display
- [ ] Hindi text shows correctly
- [ ] English text shows correctly
- [ ] Language toggle works
- [ ] Scroll indicator moves with scroll
- [ ] Home button (🏠) returns to library
- [ ] Close button (✕) returns to library
- [ ] About button shows explanation
- [ ] Vinyl player visible
- [ ] Play button works
- [ ] Audio plays (if URL provided)

### Admin Panel
- [ ] Login with `admin` / your password
- [ ] Add new poem form works
- [ ] Upload audio file works
- [ ] Submit creates poem
- [ ] Poem appears in library
- [ ] Edit poem works
- [ ] Delete poem works
- [ ] Logout works

### Dark Mode
- [ ] Toggle button works
- [ ] Colors removed (grayscale)
- [ ] Text still readable
- [ ] Toggle off restores colors

### Background Music
- [ ] Music button (🎵) visible
- [ ] Click plays background music
- [ ] Button changes to (🎧)
- [ ] Music loops
- [ ] Pauses when poem audio plays

---

## 🔍 Final Checks

- [ ] No console errors (F12)
- [ ] No network errors
- [ ] All images load
- [ ] All fonts load
- [ ] Responsive on mobile
- [ ] Performance is good (no lag)
- [ ] All links work
- [ ] All buttons work

---

## 📋 Files to Include

### Must Include:
- ✅ `src/` - All source code
- ✅ `public/` - Static assets
- ✅ `package.json` - Dependencies
- ✅ `vite.config.ts` - Build config
- ✅ `tsconfig.json` - TypeScript config
- ✅ `.gitignore` - Ignore rules
- ✅ `supabase-final-setup.sql` - Database setup
- ✅ All `.md` files - Documentation

### Must NOT Include:
- ❌ `.env.local` - Gitignored (safe)
- ❌ `node_modules/` - Gitignored (huge)
- ❌ `dist/` - Gitignored (build output)
- ❌ `.git/` - Created by git init

---

## 🎯 Ready to Push?

If all checkboxes are ✅, you're ready!

```bash
git init
git add .
git commit -m "Initial commit: Kitaab poetry platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kitaab.git
git push -u origin main
```

See `GITHUB-SETUP.md` for detailed instructions.

---

## 🚀 After GitHub

1. Create GitHub repository
2. Push code
3. Connect to Vercel
4. Deploy live
5. Share with world! 🌍

---

## 📞 Troubleshooting

**Something not working?**
1. Check browser console (F12)
2. Check Supabase dashboard
3. Check `.env.local` has correct values
4. Restart dev server
5. Clear browser cache

**Still stuck?**
- Review the relevant `.md` guide
- Check error messages carefully
- Verify all setup steps completed

---

Good luck! Your Kitaab is ready to shine! ✨

# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup Database (One-time)

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Go to **SQL Editor**
3. Copy all content from `supabase-final-setup.sql`
4. Paste and click **Run**

✅ This creates your tables and default admin user

---

### Step 2: Change Password (IMPORTANT!)

1. In Supabase, go to **Table Editor** → `admin_users`
2. Click the row with username `admin`
3. Change `password_hash` from `admin123` to your secure password
4. Click **Save**

✅ Your admin panel is now secure!

---

### Step 3: Start Adding Poems

1. Visit `/admin` on your website
2. Login with:
   - Username: `admin`
   - Password: (your password from Step 2)
3. Fill in the form and upload audio files
4. Click "Add Poem"

✅ Your poem appears on the homepage automatically!

---

## 📚 Full Documentation

- **SECURITY-SETUP.md** - Complete security guide
- **ADMIN-GUIDE.md** - How to use admin panel
- **AUDIO-HOSTING-GUIDE.md** - Audio file management

---

## 🎯 Default Credentials

**Username:** `admin`  
**Password:** `admin123` (CHANGE THIS!)

---

## ✨ Features

- ✅ Secure database authentication
- ✅ Direct audio file upload
- ✅ Auto-generating poem cards
- ✅ Hindi & English support
- ✅ Vinyl player with animations
- ✅ Dark mode
- ✅ Background music
- ✅ Mobile responsive

---

## 🆘 Need Help?

1. Check **SECURITY-SETUP.md** for database setup
2. Check **ADMIN-GUIDE.md** for admin panel usage
3. Check browser console (F12) for errors
4. Verify Supabase tables exist

---

## 🔒 Security Notes

- ✅ Credentials stored in Supabase (not in code)
- ✅ `.env.local` is gitignored (safe)
- ✅ Change default password immediately
- ✅ Use HTTPS in production (Vercel does this)

Your poetry platform is ready! 🎉

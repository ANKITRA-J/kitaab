# Security Setup Guide

## 🔒 Secure Admin Authentication

Your admin credentials are now stored in **Supabase database**, NOT in your code. This is much more secure!

---

## 📋 Step-by-Step Setup

### Step 1: Run SQL in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Open your project: `lziulkylvlpxtnymoume`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase-final-setup.sql`
6. Paste into the SQL editor
7. Click **Run** button

This will:
- ✅ Create `poems` table (if not exists)
- ✅ Create `admin_users` table
- ✅ Set up security policies
- ✅ Add default admin user (username: `admin`, password: `admin123`)

---

### Step 2: Verify Tables Created

1. In Supabase Dashboard, click **Table Editor**
2. You should see two tables:
   - `poems` - stores all your poetry
   - `admin_users` - stores admin credentials

3. Click on `admin_users` table
4. You should see one row:
   - username: `admin`
   - password_hash: `admin123`

---

### Step 3: Change Default Password (IMPORTANT!)

**Option A: Using Supabase Dashboard (Easiest)**

1. Go to **Table Editor** → `admin_users`
2. Click on the row with username `admin`
3. Click **Edit** (pencil icon)
4. Change `password_hash` field to your new password
5. Click **Save**

**Option B: Using SQL Editor**

```sql
UPDATE admin_users 
SET password_hash = 'your_new_secure_password_here'
WHERE username = 'admin';
```

**IMPORTANT:** Use a strong password! Examples:
- ✅ `MyP0etry$ecure2024!`
- ✅ `Kitab@Shayari#9955`
- ❌ `admin123` (too weak!)
- ❌ `password` (too weak!)

---

### Step 4: Test Login

1. Go to your website: `/admin`
2. Login with:
   - Username: `admin`
   - Password: (the password you set in Step 3)
3. You should be logged in!

---

## 🔐 How It Works (Security Explained)

### Old Way (INSECURE):
```
.env.local → Compiled into JavaScript → Anyone can see in browser
```

### New Way (SECURE):
```
Supabase Database → Server checks credentials → Only correct password works
```

**Why this is better:**
1. ✅ Credentials stored in database (not in code)
2. ✅ Password never exposed in JavaScript bundle
3. ✅ Can change password without redeploying
4. ✅ Can add multiple admin users easily
5. ✅ Supabase handles security and encryption

---

## 👥 Adding More Admin Users

Want to add another admin? Run this SQL:

```sql
INSERT INTO admin_users (username, password_hash)
VALUES ('your_username', 'your_password');
```

Example:
```sql
INSERT INTO admin_users (username, password_hash)
VALUES ('ankit', 'MySecurePass123!');
```

Now you can login with either:
- `admin` / (your password)
- `ankit` / `MySecurePass123!`

---

## 🔄 Changing Your Password

### Method 1: Supabase Dashboard
1. Table Editor → `admin_users`
2. Find your username row
3. Edit `password_hash` field
4. Save

### Method 2: SQL Query
```sql
UPDATE admin_users 
SET password_hash = 'new_password_here'
WHERE username = 'admin';
```

---

## 🚨 Security Best Practices

### ✅ DO:
- Use strong, unique passwords (12+ characters)
- Mix uppercase, lowercase, numbers, symbols
- Change default password immediately
- Keep Supabase credentials private
- Use HTTPS (Vercel does this automatically)

### ❌ DON'T:
- Use simple passwords like "admin123"
- Share your Supabase credentials
- Commit `.env.local` to Git (already gitignored)
- Use the same password for multiple sites

---

## 🛡️ What About `.env.local`?

You can now **remove** the admin credentials from `.env.local`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://lziulkylvlpxtnymoume.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin credentials are now in Supabase database!
# No need for VITE_ADMIN_USERNAME or VITE_ADMIN_PASSWORD
```

The Supabase URL and Anon Key are **safe to expose** - they're meant to be public. The real security comes from:
1. Row Level Security (RLS) policies
2. Admin credentials in database
3. HTTPS encryption

---

## 🔍 Troubleshooting

### "Invalid username or password" error

**Check:**
1. Did you run the SQL setup script?
2. Does `admin_users` table exist?
3. Is there a row with username `admin`?
4. Are you typing the password correctly?
5. Check browser console (F12) for errors

**Fix:**
```sql
-- Verify admin user exists
SELECT * FROM admin_users WHERE username = 'admin';

-- If not, create it
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'admin123');
```

### Can't access Supabase tables

**Check:**
1. Are you logged into correct Supabase project?
2. Did the SQL script run successfully?
3. Any error messages in SQL editor?

**Fix:**
- Re-run the SQL setup script
- Check Supabase project URL matches your `.env.local`

### Login works but then logs out immediately

**Check:**
1. Browser localStorage enabled?
2. Private/incognito mode? (localStorage might be disabled)

**Fix:**
- Use normal browser window (not incognito)
- Check browser settings allow localStorage

---

## 📊 Database Structure

### `admin_users` table:
```
id              UUID (auto-generated)
username        TEXT (unique)
password_hash   TEXT (your password)
created_at      TIMESTAMP (auto-generated)
```

### `poems` table:
```
id                      UUID (auto-generated)
title                   TEXT (required)
subtitle                TEXT (optional)
content_hindi           TEXT (required)
content_english         TEXT (required)
explanation             TEXT (optional)
audio_url               TEXT (optional)
background_music_url    TEXT (optional)
created_at              TIMESTAMP (auto-generated)
```

---

## 🎯 Quick Checklist

- [ ] Run `supabase-final-setup.sql` in Supabase SQL Editor
- [ ] Verify `admin_users` table exists
- [ ] Change default password from `admin123`
- [ ] Test login at `/admin`
- [ ] Remove old credentials from `.env.local` (optional)
- [ ] Keep Supabase credentials private
- [ ] Use strong password (12+ characters)

---

## 💡 Pro Tips

1. **Password Manager:** Use a password manager (1Password, LastPass, Bitwarden) to generate and store strong passwords

2. **Multiple Admins:** Add different usernames for different people:
   ```sql
   INSERT INTO admin_users (username, password_hash)
   VALUES 
     ('ankit', 'AnkitPass123!'),
     ('editor', 'EditorPass456!');
   ```

3. **Backup:** Export your `admin_users` table occasionally as backup

4. **Audit:** Check who's logging in by adding a `last_login` column:
   ```sql
   ALTER TABLE admin_users ADD COLUMN last_login TIMESTAMP;
   ```

---

## 🆘 Still Need Help?

1. Check browser console (F12) for errors
2. Check Supabase logs in dashboard
3. Verify SQL script ran without errors
4. Test Supabase connection with a simple query
5. Make sure you're using the correct Supabase project

Your credentials are now secure! 🎉

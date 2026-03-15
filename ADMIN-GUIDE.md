# Admin Panel Guide

## 🔐 Login Credentials

**Default credentials:**
- Username: `admin`
- Password: `admin123`

**IMPORTANT:** Change these credentials in `.env.local` for production!

```env
VITE_ADMIN_USERNAME=your_secure_username
VITE_ADMIN_PASSWORD=your_secure_password
```

---

## 📝 Adding a New Poem

1. **Go to Admin Panel**
   - Visit: `http://localhost:5173/admin` (or your-domain.com/admin)
   - Login with your credentials

2. **Fill in the Form**
   - **Title** (required): Main poem title
   - **Subtitle** (optional): Appears below title in smaller text
   - **Content (Hindi)** (required): Full poem text in Hindi
   - **Content (English)** (required): Full poem text in English
   - **Explanation** (optional): Context or meaning (shows in "About" section)

3. **Add Audio Files**
   
   **Poetry Audio:**
   - Click "📁 Upload Audio File" button
   - Select your MP3 file (poem narration)
   - Wait for upload to complete
   - URL will auto-fill
   
   **Background Music (optional):**
   - Click "📁 Upload Music File" button
   - Select your MP3 file (instrumental)
   - Wait for upload to complete
   - URL will auto-fill

   **Alternative:** You can also paste Supabase URLs directly if you uploaded files manually

4. **Submit**
   - Click "Add Poem" button
   - Success message will appear
   - Poem will appear in the list on the right

---

## ✏️ Editing a Poem

1. Find the poem in the "Existing Poems" list
2. Click "Edit" button
3. Form will populate with current data
4. Make your changes
5. Upload new audio files if needed (replaces old ones)
6. Click "Update Poem"

---

## 🗑️ Deleting a Poem

1. Find the poem in the "Existing Poems" list
2. Click "Delete" button
3. Confirm deletion
4. Poem will be removed from database

**Note:** This does NOT delete audio files from Supabase Storage. You'll need to manually delete those from the Supabase dashboard if needed.

---

## 🎵 Audio File Requirements

### Poetry Audio (Narration)
- **Format:** MP3
- **Size:** 1-3 MB recommended
- **Duration:** 1-2 minutes typical
- **Bitrate:** 128kbps recommended
- **Content:** Clear narration of the poem

### Background Music (Instrumental)
- **Format:** MP3
- **Size:** 3-5 MB recommended
- **Duration:** 3-5 minutes (loops automatically)
- **Bitrate:** 128kbps recommended
- **Content:** Instrumental only (no lyrics)

---

## 📦 How File Upload Works

1. **Click Upload Button**
   - Opens file picker
   - Select your MP3 file

2. **Automatic Upload**
   - File uploads to Supabase Storage
   - Unique filename generated (timestamp + random)
   - Public URL created automatically

3. **Storage Buckets**
   - Poetry audio → `poetry-audio` bucket
   - Background music → `Background Music` bucket

4. **URL Auto-Fill**
   - URL field populates automatically
   - You can edit it if needed
   - Format: `https://lziulkylvlpxtnymoume.supabase.co/storage/v1/object/public/[bucket]/[filename].mp3`

---

## 🎨 Poem Cards Auto-Generate

When you add a poem through the admin panel:
- ✅ Poem card automatically created
- ✅ Random colors assigned (from preset palette)
- ✅ Preview text generated (first 100 characters)
- ✅ Appears on homepage immediately
- ✅ No coding required!

The system handles all the rendering - you just provide the text and audio.

---

## 🔧 Troubleshooting

### Upload button says "Uploading..." forever
- Check your internet connection
- Verify Supabase buckets exist and are public
- Check browser console (F12) for errors
- Try refreshing the page

### Audio doesn't play on website
- Verify the URL is correct (click it to test)
- Check Supabase bucket is set to "Public"
- Ensure file format is MP3
- Check browser console for errors

### Can't login to admin panel
- Verify credentials in `.env.local`
- Check username and password match exactly
- Clear browser cache and try again
- Check browser console for errors

### Poem doesn't appear after adding
- Check for success message
- Refresh the homepage
- Check Supabase dashboard to verify data was saved
- Look for error messages in admin panel

---

## 🔒 Security Best Practices

1. **Change Default Credentials**
   - Edit `.env.local`
   - Use strong, unique password
   - Don't share credentials

2. **Keep .env.local Private**
   - Already in `.gitignore`
   - Never commit to Git
   - Don't share publicly

3. **Use HTTPS in Production**
   - Vercel provides this automatically
   - Protects login credentials

4. **Regular Backups**
   - Export poems from Supabase regularly
   - Download audio files as backup
   - Keep local copies

---

## 📊 Storage Limits

**Supabase Free Tier:**
- Storage: 1 GB total
- Bandwidth: 2 GB/month
- File uploads: Unlimited

**Typical Usage:**
- 1 poem with audio: ~2-4 MB
- 250-500 poems possible on free tier
- Background music: ~4 MB (one file for entire site)

---

## 🚀 Quick Workflow

1. **Prepare your content:**
   - Write poem in Hindi and English
   - Record narration (MP3)
   - Optional: Add explanation text

2. **Login to admin panel:**
   - Go to `/admin`
   - Enter credentials

3. **Fill the form:**
   - Paste poem text
   - Upload audio file
   - Add explanation if desired

4. **Submit:**
   - Click "Add Poem"
   - Wait for success message

5. **Verify:**
   - Go to homepage
   - Find your new poem card
   - Click to open and test audio

Done! 🎉

---

## 💡 Tips

- **Line breaks:** Press Enter in the text area to add line breaks in poems
- **Formatting:** Spacing and line breaks are preserved exactly as you type
- **Preview:** Always test your poem on the website after adding
- **Audio quality:** 128kbps is perfect balance of quality and file size
- **Batch upload:** You can add multiple poems in one session
- **Edit anytime:** All poems can be edited later if you find typos

---

## 📞 Need Help?

- Check browser console (F12) for error messages
- Verify Supabase dashboard for data and storage
- Test audio URLs by opening them directly in browser
- Clear browser cache if things look wrong
- Restart dev server if changes don't appear

# Audio Hosting Guide for Poetry Platform

## 🎵 Background Music (Website-wide)

### Supabase Storage (Recommended - Managed via Admin Panel)

**Pros**: Centralized management, easy updates, no code changes needed
**Cons**: 1GB limit on free tier (but 4MB music is tiny!)

#### Steps:

1. **Create Storage Bucket (One-time setup)**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Open your project: `lziulkylvlpxtnymoume`
   - Click "Storage" in left sidebar
   - Click "New Bucket"
   - Name: `Background Music` (you already have this!)
   - **Important**: Make it **Public** ✓
   - Click "Create Bucket"

2. **Upload Background Music**
   - Click on `Background Music` bucket
   - Click "Upload File"
   - Select your MP3 file (e.g., `Lights Are On (Instrumental).mp3`)
   - Click "Upload"

3. **Get the URL**
   - After upload, click on the file
   - Click "Copy URL" button
   - Your current URL:
     ```
     https://lziulkylvlpxtnymoume.supabase.co/storage/v1/object/public/Background%20Music/Lights%20Are%20On%20(Instrumental).mp3
     ```

4. **Update in Code (Currently)**
   - Open `src/App.tsx`
   - Find `BACKGROUND_MUSIC_URL`
   - Replace with your new URL
   - Commit and deploy

**Future Enhancement**: We'll add a settings section in the admin panel to manage this URL without code changes!

---

## 🎤 Poetry Audio (Per-poem narrations)

### Option 1: Supabase Storage (Recommended - Free & Easy)

**Pros**: Free tier (1GB), integrated with your database, easy admin panel workflow
**Cons**: 1GB limit on free tier

#### Steps:

1. **Create Storage Bucket (One-time setup)**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Open your project
   - Click "Storage" in left sidebar
   - Click "New Bucket"
   - Name: `poetry-audio`
   - **Important**: Make it **Public** ✓
   - Click "Create Bucket"

2. **Upload Poetry Audio**
   - Click on `poetry-audio` bucket
   - Click "Upload File"
   - Select your MP3 file (e.g., `poem-mana.mp3`)
   - Click "Upload"

3. **Get the URL**
   - After upload, click on the file
   - Click "Copy URL" button
   - URL format:
     ```
     https://lziulkylvlpxtnymoume.supabase.co/storage/v1/object/public/poetry-audio/poem-mana.mp3
     ```

4. **Add to Poem (Admin Panel)**
   - Go to your website: `/admin`
   - Login
   - Add or Edit a poem
   - Paste the URL in "Poetry Audio URL" field
   - Click "Add Poem" or "Update Poem"

5. **Done!**
   - Open the poem on your website
   - Click "▶ Play Poetry"
   - Watch the vinyl tonearm move! 🎸

---

### Option 2: Local Storage (For Testing)

You can also store poetry audio locally like background music:

1. Place files in: `public/audio/poems/`
2. Use URLs like: `/audio/poems/poem-name.mp3`
3. Paste in admin panel

**Note**: This increases deployment size, so use Supabase for production.

---

## 📊 File Size Recommendations

| Type | Size | Duration | Bitrate |
|------|------|----------|---------|
| Background Music | 3-5 MB | 3-5 min (loops) | 128kbps |
| Poetry Narration | 1-3 MB | 1-2 min | 128kbps |

---

## 🎼 How to Convert/Compress Audio

### Online Tools (Free):
1. **MP3 Converter**: [https://online-audio-converter.com](https://online-audio-converter.com)
   - Upload your file
   - Select MP3
   - Choose 128kbps bitrate
   - Download

2. **Audio Compressor**: [https://www.freeconvert.com/audio-compressor](https://www.freeconvert.com/audio-compressor)
   - Upload file
   - Set target size (e.g., 4MB)
   - Download

---

## 🎨 Free Royalty-Free Music Sources

For background music:
- [Pixabay Music](https://pixabay.com/music/) - Free, no attribution
- [Free Music Archive](https://freemusicarchive.org/) - Various licenses
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Free
- [Incompetech](https://incompetech.com/music/) - Free with attribution

---

## 🧪 Testing Checklist

### Background Music:
- [ ] File placed at `public/audio/background-music.mp3`
- [ ] File size under 5MB
- [ ] Format is MP3
- [ ] Click 🎵 button on website
- [ ] Music plays and button changes to 🎧

### Poetry Audio:
- [ ] Uploaded to Supabase Storage
- [ ] Bucket is Public
- [ ] URL copied correctly
- [ ] Pasted in admin panel
- [ ] Poem saved
- [ ] Open poem on website
- [ ] Vinyl player visible
- [ ] Click "▶ Play Poetry"
- [ ] Tonearm moves to record
- [ ] Audio plays
- [ ] Background music pauses automatically

---

## ⚠️ Important Notes

1. **HTTPS Required**: All URLs must use HTTPS (Supabase does this automatically)
2. **Public Bucket**: Supabase bucket MUST be public for audio to play
3. **File Names**: Avoid spaces in filenames (use hyphens: `my-poem.mp3`)
4. **Browser Support**: MP3 works in all modern browsers
5. **Mobile**: Audio may not autoplay on mobile (user must click play)

---

## 💡 Pro Tips

1. **Background Music**: Choose calm, instrumental music that doesn't distract from poetry
2. **Volume**: Keep background music quieter than poetry narration
3. **Looping**: Background music loops automatically
4. **Quality**: 128kbps is perfect balance of quality and file size
5. **Testing**: Always test on mobile devices too!

---

## 🆘 Troubleshooting

**Background music not playing?**
- Check file exists at `public/audio/background-music.mp3`
- Check filename is exactly correct (case-sensitive)
- Check file format is MP3
- Try clicking the 🎵 button again

**Poetry audio not playing?**
- Check Supabase bucket is Public
- Check URL is correct (copy from Supabase)
- Check URL starts with `https://`
- Open URL in browser - should download/play the file
- Check browser console (F12) for errors

**Tonearm not moving?**
- It only moves when audio is actually playing
- Check audio URL is valid
- Try with a different audio file

---

## 📁 Project Structure

```
artistic-poetry-platform/
├── public/
│   └── audio/
│       ├── background-music.mp3  ← Your background music here
│       ├── poems/                ← Optional: local poetry audio
│       └── README.md
└── src/
    └── App.tsx                   ← Background music URL configured here
```

---

## 🚀 Quick Start

1. **Background Music** (Currently):
   - Upload to Supabase Storage bucket: `Background Music`
   - Copy the URL
   - Update `BACKGROUND_MUSIC_URL` in `src/App.tsx`
   - Deploy

2. **Poetry Audio**:
   - Upload to Supabase Storage bucket: `poetry-audio`
   - Copy URL
   - Paste in admin panel when adding/editing poem

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Update audio files"
   git push
   ```

Done! 🎉

---

## 🔮 Future Enhancements

- [ ] Admin panel settings page for background music URL
- [ ] Direct file upload from admin panel (no Supabase dashboard needed)
- [ ] Audio preview before saving
- [ ] Bulk audio management

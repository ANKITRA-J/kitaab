# Audio Playback Test Guide ✅

## Verify Your Audio Setup is Working

Follow these steps to test that audio playback and vinyl animation are working correctly:

---

## 🎵 Test 1: Check Audio Upload

### In Admin Panel:
1. Go to `/admin`
2. Login with your credentials
3. Add or edit a poem
4. Upload an audio file using "📁 Upload Audio File" button
5. Verify the URL appears in the "Poetry Audio" field
6. Save the poem

✅ **Expected:** Audio URL appears and poem saves successfully

---

## 🎧 Test 2: Verify Audio Playback

### On Poem Page:
1. Go to homepage
2. Click on a poem card
3. Look for the **Vinyl Player** on the right side
4. You should see:
   - Title: "Poetry Audio"
   - Hand-drawn vinyl record
   - Play button (▶)

✅ **Expected:** Vinyl player visible with play button

---

## ▶️ Test 3: Play Button Works

### Click Play:
1. Click the **▶ button** (play icon)
2. Button should change to **⏸ (pause icon)**
3. Audio should start playing
4. You should hear the poetry audio

✅ **Expected:** Button changes and audio plays

---

## 🎵 Test 4: Vinyl Animation

### While Audio Playing:
1. Watch the vinyl record
2. It should **spin continuously** while playing
3. The **tonearm** should be positioned **on the record**
4. The **needle** (gold tip) should touch the record

✅ **Expected:** Vinyl spins, tonearm on record, needle touching

---

## ⏸️ Test 5: Pause Button Works

### Click Pause:
1. Click the **⏸ button** (pause icon)
2. Button should change back to **▶**
3. Audio should stop playing
4. Vinyl should **stop spinning**
5. Tonearm should move **away from record**

✅ **Expected:** Button changes, audio stops, vinyl stops, tonearm lifts

---

## 🔄 Test 6: Play Again

### Click Play Again:
1. Click **▶ button** again
2. Audio should resume from where it paused
3. Vinyl should spin again
4. Tonearm should move back to record

✅ **Expected:** Audio resumes, vinyl spins, tonearm on record

---

## 🎶 Test 7: Background Music Interaction

### While Poem Audio Playing:
1. Click the background music button (🎵)
2. Background music should **NOT play** (paused automatically)
3. Only poem audio should play
4. When you pause poem audio, background music should resume

✅ **Expected:** Background music pauses when poem plays

---

## 🔊 Test 8: Audio Ends

### Let Audio Play to End:
1. Let the poem audio play completely
2. When it ends:
   - Button should change to **▶**
   - Vinyl should **stop spinning**
   - Tonearm should move **away from record**

✅ **Expected:** Everything stops automatically when audio ends

---

## 📱 Test 9: Mobile Responsiveness

### On Mobile Device:
1. Open poem on mobile
2. Vinyl player should be visible
3. Play button should be clickable
4. Audio should play
5. Vinyl should spin

✅ **Expected:** Works smoothly on mobile

---

## 🔍 Test 10: No Audio Fallback

### Poem Without Audio:
1. Open a poem without audio URL
2. Vinyl player should show:
   - "No audio available" message
   - Play button should be disabled/grayed out

✅ **Expected:** Graceful fallback when no audio

---

## 🐛 Troubleshooting

### Audio Not Playing?
- [ ] Check audio URL is correct (click it in browser)
- [ ] Verify Supabase bucket is Public
- [ ] Check browser console (F12) for errors
- [ ] Try different audio file
- [ ] Refresh page

### Vinyl Not Spinning?
- [ ] Check audio is actually playing
- [ ] Verify browser supports animations
- [ ] Check browser console for errors
- [ ] Try different browser

### Tonearm Not Moving?
- [ ] Refresh the page
- [ ] Check browser console
- [ ] Verify isPlaying state is updating
- [ ] Try clicking play/pause again

### Button Not Changing?
- [ ] Check browser console for errors
- [ ] Verify audio element is loading
- [ ] Try refreshing page
- [ ] Check network tab (F12) for audio loading

---

## 📊 What Should Happen

### Play Button Clicked:
```
1. Button changes: ▶ → ⏸
2. Audio starts playing
3. Vinyl starts spinning (360° rotation, 3 seconds per rotation)
4. Tonearm moves to record
5. Background music pauses (if playing)
```

### Pause Button Clicked:
```
1. Button changes: ⏸ → ▶
2. Audio pauses
3. Vinyl stops spinning
4. Tonearm moves away from record
5. Background music resumes (if was playing)
```

### Audio Ends:
```
1. Button changes: ⏸ → ▶
2. Audio stops
3. Vinyl stops spinning
4. Tonearm moves away from record
5. isPlaying state resets to false
```

---

## ✅ Complete Checklist

- [ ] Audio file uploaded successfully
- [ ] Audio URL appears in poem
- [ ] Vinyl player visible on poem page
- [ ] Play button works
- [ ] Audio plays
- [ ] Vinyl spins while playing
- [ ] Tonearm on record while playing
- [ ] Pause button works
- [ ] Audio pauses
- [ ] Vinyl stops spinning
- [ ] Tonearm moves away
- [ ] Play again works
- [ ] Audio resumes
- [ ] Background music pauses
- [ ] Audio ends automatically
- [ ] Button resets to play
- [ ] Works on mobile
- [ ] No console errors

---

## 🎉 All Tests Passing?

If all tests pass, your audio playback system is working perfectly! ✨

---

## 📝 Code References

### VinylPlayer Component:
- File: `src/components/VinylPlayer/VinylPlayer.tsx`
- Handles: Audio playback, vinyl animation, tonearm movement

### Key Features:
- ✅ Play/pause button (▶ and ⏸)
- ✅ Vinyl spinning animation (3 seconds per rotation)
- ✅ Tonearm movement (rest → playing positions)
- ✅ Background music coordination
- ✅ Auto-stop when audio ends
- ✅ Responsive design

---

## 🚀 Ready to Deploy?

If all audio tests pass, you're ready to push to GitHub and deploy! 🎉

See **GITHUB-SETUP.md** for deployment instructions.

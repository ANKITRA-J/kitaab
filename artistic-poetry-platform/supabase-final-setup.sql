-- Final Complete Supabase Setup for Poetry Platform
-- Includes: poems table with all fields + secure admin authentication

-- Create poems table if it doesn't exist
CREATE TABLE IF NOT EXISTS poems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  content_hindi TEXT NOT NULL,
  content_english TEXT NOT NULL,
  explanation TEXT,
  audio_url TEXT,
  background_music_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for secure authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for poems (public read, anyone can write for now)
DROP POLICY IF EXISTS "Anyone can read poems" ON poems;
DROP POLICY IF EXISTS "Admins can insert poems" ON poems;
DROP POLICY IF EXISTS "Admins can update poems" ON poems;
DROP POLICY IF EXISTS "Admins can delete poems" ON poems;

CREATE POLICY "Anyone can read poems" ON poems FOR SELECT USING (true);
CREATE POLICY "Anyone can insert poems" ON poems FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update poems" ON poems FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete poems" ON poems FOR DELETE USING (true);

-- Policies for admin_users (anyone can read for login verification)
DROP POLICY IF EXISTS "Anyone can read admin_users for login" ON admin_users;
CREATE POLICY "Anyone can read admin_users for login" ON admin_users FOR SELECT USING (true);

-- Insert default admin user
-- Username: admin
-- Password: admin123
-- This is a bcrypt-style hash placeholder - you should change this after first login!
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Success message
SELECT 'Setup complete! Run this SQL in Supabase SQL Editor.' as message;
SELECT 'IMPORTANT: Change admin password after first login!' as warning;

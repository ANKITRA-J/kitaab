import { createClient } from '@supabase/supabase-js';
import type { Poem } from '../types/poem';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface PoemRow {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'hi';
  audio_url: string | null;
  created_at: string;
  updated_at: string;
}

// Convert database row to Poem type
export function poemRowToPoem(row: PoemRow): Poem {
  return {
    id: row.id,
    title: row.title,
    content_hindi: row.content,
    content_english: row.content,
    language: row.language,
    audio_url: row.audio_url ?? undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

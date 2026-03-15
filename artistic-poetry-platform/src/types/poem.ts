// Core poem data structure
export interface Poem {
  id: string;
  title: string;
  subtitle?: string;
  content_hindi: string;
  content_english: string;
  explanation?: string;
  audio_url?: string;
  background_music_url?: string;
  language: 'en' | 'hi';
  preview?: string;
  created_at?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


// Form data for admin panel
export interface PoemFormData {
  title: string;
  content: string;
  language: 'en' | 'hi';
  audioFile: File | null;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Animation state
export interface AnimationState {
  isAnimating: boolean;
  progress: number;
  type: 'pageFlip' | 'zoom' | 'unfold';
}

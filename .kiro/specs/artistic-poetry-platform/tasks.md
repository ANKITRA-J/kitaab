# Implementation Plan: Artistic Poetry Platform

## Overview

This implementation plan breaks down the Artistic Poetry Platform into discrete, manageable coding tasks. The platform uses React 18 with TypeScript, Vite for builds, Framer Motion for animations, and Supabase for the database. The implementation follows a logical progression: project setup, database configuration, core UI components, animation system, admin functionality, mobile responsiveness, testing, and deployment.

Each task builds incrementally on previous work, with checkpoints to validate progress. Tasks marked with `*` are optional and can be skipped for faster MVP delivery.

## Tasks

- [ ] 1. Project setup and configuration
  - [ ] 1.1 Initialize React project with Vite and TypeScript
    - Run `npm create vite@latest artistic-poetry-platform -- --template react-ts`
    - Configure TypeScript with strict mode enabled
    - Set up project directory structure: `/src/components`, `/src/api`, `/src/styles`, `/src/assets`, `/src/types`
    - _Requirements: 15.1, 15.2_

  - [ ] 1.2 Install and configure dependencies
    - Install Framer Motion: `npm install framer-motion`
    - Install React Router: `npm install react-router-dom`
    - Install Supabase client: `npm install @supabase/supabase-js`
    - Configure CSS Modules in Vite config
    - _Requirements: 15.1_

  - [ ] 1.3 Set up environment variables and configuration
    - Create `.env.local` file with Supabase URL and anon key placeholders
    - Create `.env.example` template for deployment
    - Document environment variables in README
    - _Requirements: 15.6_

  - [ ] 1.4 Configure deployment for Vercel
    - Create `vercel.json` with build configuration
    - Set up serverless function directory structure: `/api`
    - Configure build output directory and environment variable mapping
    - _Requirements: 15.1, 15.2_


- [ ] 2. Database and backend setup
  - [ ] 2.1 Create Supabase project and configure database schema
    - Create new Supabase project (free tier)
    - Execute SQL schema from design document to create `poems` table
    - Set up indexes on `created_at` column
    - Configure Row Level Security policies for public read and authenticated write
    - _Requirements: 15.5_

  - [ ] 2.2 Set up Supabase Storage for audio files
    - Create `poem-audio` storage bucket in Supabase
    - Configure public access with signed URLs
    - Set maximum file size limit to 5MB
    - _Requirements: 5.4_

  - [ ] 2.3 Create TypeScript type definitions
    - Create `/src/types/poem.ts` with `Poem`, `PoemFormData`, `ApiResponse`, and `AnimationState` interfaces
    - Export all types for use across the application
    - _Requirements: 9.2, 10.1_

  - [ ] 2.4 Implement API route for fetching poems
    - Create `/api/poems.ts` serverless function
    - Implement GET handler that queries Supabase `poems` table
    - Return poems sorted by `created_at` descending
    - Add error handling with retry logic (3 attempts with exponential backoff)
    - _Requirements: 2.6, 13.8_

  - [ ]* 2.5 Write property test for API response structure
    - **Property: API responses match ApiResponse<Poem[]> type structure**
    - **Validates: Requirements 2.6**

  - [ ] 2.6 Implement API route for creating poems
    - Add POST handler to `/api/poems.ts`
    - Validate request body (title, content, language)
    - Handle audio file upload to Supabase Storage
    - Insert poem record into database with audio URL
    - Return success response with poem ID
    - _Requirements: 9.2, 9.5_

  - [ ] 2.7 Implement API routes for updating and deleting poems
    - Add PUT handler to `/api/poems.ts` for updating existing poems
    - Add DELETE handler to `/api/poems.ts` for removing poems
    - Implement authentication check using hardcoded credentials
    - _Requirements: 9.7_

  - [ ]* 2.8 Write unit tests for API error handling
    - Test network timeout scenarios
    - Test invalid request body validation
    - Test authentication failure responses
    - _Requirements: 9.8_


- [ ] 3. Core UI components - Homepage and Library Desk
  - [ ] 3.1 Create LibraryDesk component with base layout
    - Create `/src/components/LibraryDesk/LibraryDesk.tsx`
    - Implement component with state for `isLoading`, `catAwake`, `lampBright`, `showPoems`
    - Render deep black background (#0a0a0a) with grain texture overlay
    - Add wooden desk visual and scattered book elements
    - _Requirements: 1.1, 1.2, 1.3, 1.15_

  - [ ] 3.2 Add interactive Poetry book and decorative Journal book
    - Render clickable "Poetry" book element
    - Render non-interactive "Journal" book as decoration
    - Add dimly lit lamp visual
    - Add sleeping cat visual
    - _Requirements: 1.6, 1.7, 1.4, 1.5_

  - [ ] 3.3 Implement cat wake-up and lamp animation sequence
    - Create `handlePoetryBookClick()` method
    - Implement cat wake-up animation using Framer Motion
    - Implement lamp brightening animation
    - Implement cat jumping animation sequence (6 keyframes from design)
    - Trigger background poem loading during animation
    - _Requirements: 1.8, 1.9, 1.10, 1.11_

  - [ ]* 3.4 Write property test for animation duration bounds
    - **Property 4: Animation Duration Bounds**
    - **Validates: Requirements 7.5**

  - [ ] 3.5 Implement zoom-in transition into Poetry book
    - Create `animateTransition()` method
    - Implement 3D zoom effect using Framer Motion scale and z-axis transform
    - Complete transition within 1500ms
    - Display poem cards after transition completes
    - _Requirements: 1.13, 1.14_

  - [ ] 3.6 Add floating dust particle animations
    - Create CSS keyframe animation for dust particles
    - Render 10-15 dust particle elements with staggered delays
    - Use CSS `will-change: transform` for performance
    - _Requirements: 1.16, 7.4_

  - [ ] 3.7 Create LibraryDesk styles with CSS Modules
    - Create `/src/components/LibraryDesk/LibraryDesk.module.css`
    - Style background with grain texture
    - Style desk, books, lamp, and cat elements
    - Apply warm parchment brown coloring
    - _Requirements: 1.13, 1.17_


- [ ] 4. Poem card components
  - [ ] 4.1 Create PoemCard component
    - Create `/src/components/PoemCard/PoemCard.tsx`
    - Implement component with props: `id`, `title`, `language`, `preview`, `onClick`
    - Render poem title in handwritten-style typography
    - Render preview text (first 2-3 lines)
    - _Requirements: 2.1, 2.4_

  - [ ] 4.2 Style PoemCard with aged parchment aesthetic
    - Create `/src/components/PoemCard/PoemCard.module.css`
    - Apply torn edge effects using CSS `clip-path`
    - Add foxing spots using radial gradients
    - Add ink stains and rough texture
    - Apply parchment brown background
    - _Requirements: 2.2, 2.3, 2.7_

  - [ ]* 4.3 Write property test for font consistency
    - **Property 1: English Poetry Font Consistency**
    - **Property 2: Hindi Poetry Font Consistency**
    - **Validates: Requirements 4.1, 4.2, 10.2, 10.3**

  - [ ] 4.4 Implement poem card grid layout
    - Modify LibraryDesk to fetch poems from API on load
    - Render PoemCard components in scattered layout using CSS Grid
    - Apply random positioning for scattered effect
    - Handle loading and error states
    - _Requirements: 2.6, 13.1_

  - [ ]* 4.5 Write unit tests for PoemCard rendering
    - Test title and preview display
    - Test language-specific font application
    - Test click handler invocation
    - _Requirements: 2.4, 2.5_


- [ ] 5. Book viewer component
  - [ ] 5.1 Create BookViewer component with page flip animation
    - Create `/src/components/BookViewer/BookViewer.tsx`
    - Implement component with props: `poemId`, `onClose`
    - Add state for `isOpen`, `currentPage`, `poem`
    - Fetch poem data by ID when component mounts
    - Implement 3D page flip animation using Framer Motion `rotateY`
    - Complete animation within 1500ms with easeInOut
    - _Requirements: 3.1, 3.2, 3.4, 3.8_

  - [ ] 5.2 Implement two-page book layout
    - Render left page with poem content
    - Render right page with audio player or illustration area
    - Apply aged parchment styling to both pages
    - Center poem text with large margins
    - _Requirements: 3.3, 3.5, 3.6, 3.7, 4.4_

  - [ ] 5.3 Add typography and text rendering
    - Apply Playfair Display or Cormorant Garamond for English poems
    - Apply Noto Serif Devanagari for Hindi poems
    - Set font size between 16px and 24px
    - Apply dark charcoal ink color
    - Center poem lines vertically and horizontally
    - _Requirements: 4.1, 4.2, 4.5, 4.6, 4.7_

  - [ ]* 5.4 Write property test for poem content font size bounds
    - **Property 22: Poem Content Font Size Bounds**
    - **Validates: Requirements 4.7**

  - [ ] 5.5 Implement content parsing and formatting
    - Parse line breaks and preserve stanza separations
    - Preserve indentation (spaces/tabs at line start)
    - Support special characters and punctuation
    - Render formatted content in book layout
    - _Requirements: 12.1, 12.2, 12.5, 12.7_

  - [ ]* 5.6 Write property test for line break preservation
    - **Property 15: Line Break Preservation**
    - **Validates: Requirements 12.1**

  - [ ]* 5.7 Write property test for indentation preservation
    - **Property 16: Indentation Preservation**
    - **Validates: Requirements 12.2**

  - [ ]* 5.8 Write property test for special character support
    - **Property 21: Special Character Support**
    - **Validates: Requirements 12.7**

  - [ ] 5.9 Create BookViewer styles
    - Create `/src/components/BookViewer/BookViewer.module.css`
    - Style full-screen book overlay
    - Style left and right pages with book binding effect
    - Add page shadows and depth
    - _Requirements: 3.3, 3.7_


- [ ] 6. Audio player component
  - [ ] 6.1 Create AudioPlayer component with vinyl player interface
    - Create `/src/components/AudioPlayer/AudioPlayer.tsx`
    - Implement component with props: `audioUrl`, `poemTitle`
    - Add state for `isPlaying`, `rotation`
    - Render vinyl record disc visual
    - Add play/pause controls styled as vintage buttons
    - _Requirements: 5.1, 5.2, 5.5_

  - [ ] 6.2 Implement audio playback functionality
    - Use HTML5 Audio API for playback
    - Implement play, pause, and stop controls
    - Handle audio loading and error states
    - Display message if audio unavailable: "Audio narration unavailable for this poem"
    - _Requirements: 5.4, 5.7_

  - [ ] 6.3 Synchronize vinyl rotation with playback state
    - Rotate vinyl disc using CSS transform when playing
    - Stop rotation when paused or stopped
    - Use smooth CSS animation for rotation
    - _Requirements: 5.3, 5.6_

  - [ ]* 6.4 Write property test for audio playback synchronization
    - **Property 5: Audio Playback Synchronization**
    - **Validates: Requirements 5.6**

  - [ ] 6.5 Create AudioPlayer styles
    - Create `/src/components/AudioPlayer/AudioPlayer.module.css`
    - Style vinyl record player interface
    - Style play/pause buttons with vintage aesthetic
    - Add rotation animation keyframes
    - _Requirements: 5.2_


- [ ] 7. Navigation system
  - [ ] 7.1 Create Navigation component with bookmark visuals
    - Create `/src/components/Navigation/Navigation.tsx`
    - Render navigation elements as bookmark visuals
    - Attach bookmarks to side edges of book pages
    - Provide links to home, browse, and settings
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 7.2 Implement navigation functionality
    - Use React Router for navigation
    - Handle bookmark click events
    - Navigate to corresponding sections
    - Maintain bookmark visibility in book viewer
    - _Requirements: 6.4, 6.5_

  - [ ]* 7.3 Write property test for navigation bookmark functionality
    - **Property 6: Navigation Bookmark Functionality**
    - **Validates: Requirements 6.4**

  - [ ] 7.4 Create Navigation styles
    - Create `/src/components/Navigation/Navigation.module.css`
    - Style bookmarks with parchment texture
    - Apply ink styling consistent with theme
    - Position bookmarks on page edges
    - _Requirements: 6.6_

  - [ ]* 7.5 Write property test for keyboard accessibility
    - **Property 14: Keyboard Accessibility**
    - **Validates: Requirements 11.7**


- [ ] 8. Checkpoint - Ensure core functionality works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Admin panel implementation
  - [ ] 9.1 Create AdminPanel component with authentication
    - Create `/src/components/AdminPanel/AdminPanel.tsx`
    - Add state for `isAuthenticated`, `poems`, `formData`
    - Implement authentication form with username and password fields
    - Check credentials against environment variables (username: "ankit@9955", password: "ankit@poetry99559955")
    - Display error message for invalid credentials: "Invalid credentials. Please check username and password."
    - _Requirements: 9.1_

  - [ ] 9.2 Implement poem upload form
    - Create form with fields: title, content, language selector, audio file upload
    - Accept English and Hindi text input
    - Validate form inputs before submission
    - Display preview before publishing
    - _Requirements: 9.2, 9.3, 9.6_

  - [ ] 9.3 Add content validation
    - Validate poem content for proper UTF-8 encoding
    - Check for Devanagari script in Hindi poems
    - Validate audio file type (MP3) and size (max 5MB)
    - Display descriptive error messages for validation failures
    - _Requirements: 12.3, 12.4_

  - [ ]* 9.4 Write property test for content encoding validation
    - **Property 17: Content Encoding Validation**
    - **Validates: Requirements 12.3**

  - [ ]* 9.5 Write property test for parse error messaging
    - **Property 18: Parse Error Messaging**
    - **Validates: Requirements 12.4**

  - [ ] 9.6 Implement poem submission and publishing
    - Handle form submission
    - Upload audio file to Supabase Storage
    - Call POST /api/poems with form data
    - Display success message and refresh poem list
    - Render newly uploaded poems on homepage within 5 seconds
    - _Requirements: 9.4, 9.5, 9.8_

  - [ ]* 9.7 Write property test for preview-render consistency
    - **Property 20: Preview-Render Consistency (Round Trip)**
    - **Validates: Requirements 12.6**

  - [ ] 9.8 Implement poem editing and deletion
    - Fetch and display list of existing poems
    - Provide edit functionality to modify poem data
    - Provide delete functionality with confirmation
    - Call PUT and DELETE API endpoints
    - _Requirements: 9.7_

  - [ ] 9.9 Create AdminPanel styles
    - Create `/src/components/AdminPanel/AdminPanel.module.css`
    - Style authentication form
    - Style poem upload form with vintage aesthetic
    - Style poem list and action buttons
    - _Requirements: 9.1, 9.2_


- [ ] 10. Mobile responsive design
  - [ ] 10.1 Implement responsive breakpoints
    - Define CSS custom properties for breakpoints: mobile (0-767px), tablet (768-1023px), desktop (1024px+)
    - Apply mobile-first CSS approach
    - _Requirements: 14.1, 14.2, 14.3_

  - [ ] 10.2 Create mobile-specific background and layout
    - Render dark crumpled parchment background for mobile
    - Display sketch-like ink strokes and paper fold textures
    - Render poem cards as vertical list instead of scattered grid
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 10.3 Implement mobile book viewer with vertical page flip
    - Open full-screen book on mobile tap
    - Implement vertical page flip animation (rotateX instead of rotateY)
    - Reduce animation duration to 1000ms for mobile
    - _Requirements: 8.4, 8.5_

  - [ ] 10.4 Add swipe gesture support for page navigation
    - Use Framer Motion drag gestures
    - Detect swipe direction (left/right)
    - Navigate to next/previous page based on swipe
    - _Requirements: 8.6_

  - [ ]* 10.5 Write property test for mobile swipe direction mapping
    - **Property 7: Mobile Swipe Direction Mapping**
    - **Validates: Requirements 8.6**

  - [ ] 10.6 Implement responsive typography
    - Use CSS `clamp()` for fluid typography
    - Scale font sizes proportionally for each breakpoint
    - Adjust poem text size for mobile readability
    - _Requirements: 8.7, 14.6_

  - [ ]* 10.7 Write property test for proportional font scaling
    - **Property 24: Proportional Font Scaling**
    - **Validates: Requirements 14.6**

  - [ ] 10.8 Ensure touch target minimum sizes
    - Set minimum touch target size to 44px for all interactive elements on mobile
    - Increase button and card padding for mobile
    - _Requirements: 14.7_

  - [ ]* 10.9 Write property test for mobile touch target minimum size
    - **Property 25: Mobile Touch Target Minimum Size**
    - **Validates: Requirements 14.7**

  - [ ] 10.10 Optimize mobile performance
    - Reduce animation complexity for mobile (simpler easing)
    - Target 30fps for mobile animations
    - Disable dust particle effects on low-end devices
    - Implement device capability detection
    - _Requirements: 13.9_

  - [ ]* 10.11 Write property test for book aspect ratio consistency
    - **Property 23: Book Aspect Ratio Consistency**
    - **Validates: Requirements 14.5**


- [ ] 11. Font loading and asset optimization
  - [ ] 11.1 Configure Google Fonts with optimal loading
    - Add preconnect link to Google Fonts in HTML head
    - Load Playfair Display, Cormorant Garamond, Noto Serif Devanagari, and Inter fonts
    - Use `font-display: swap` for all fonts
    - Preload critical fonts
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 11.2 Write property test for UI text font consistency
    - **Property 3: UI Text Font Consistency**
    - **Validates: Requirements 4.3**

  - [ ] 11.3 Optimize image assets
    - Convert images to WebP format with PNG fallbacks
    - Compress images to 80% quality
    - Resize images to maximum needed dimensions
    - Implement responsive images with srcset
    - _Requirements: 13.5_

  - [ ] 11.4 Implement lazy loading for images
    - Use Intersection Observer for below-the-fold images
    - Lazy load poem card images
    - Preload homepage background and desk elements
    - _Requirements: 13.6_

  - [ ] 11.5 Optimize audio file handling
    - Compress audio files to 128kbps MP3
    - Stream audio on demand (do not preload)
    - Normalize audio levels
    - _Requirements: 5.4_


- [ ] 12. User experience enhancements
  - [ ] 12.1 Add hover effects and visual affordances
    - Implement hover effects for poem cards
    - Add cursor pointer for clickable elements
    - Display subtle scale animation on hover
    - _Requirements: 11.2_

  - [ ] 12.2 Implement loading states and caching
    - Display loading indicator during poem fetch (via browser address bar)
    - Cache poem data in localStorage
    - Implement fallback to cached data on network error
    - _Requirements: 1.12, 13.7_

  - [ ] 12.3 Add error handling and user feedback
    - Display user-friendly error messages
    - Implement retry logic with exponential backoff
    - Show graceful degradation for missing audio
    - _Requirements: 5.7_

  - [ ]* 12.4 Write property test for interaction response time
    - **Property 13: Interaction Response Time**
    - **Validates: Requirements 11.4**

  - [ ] 12.4 Implement smooth view transitions
    - Add transitions between homepage and book viewer
    - Maintain consistent interaction patterns
    - Ensure transitions complete within 2000ms
    - _Requirements: 11.5, 11.6_


- [ ] 13. Multilingual support implementation
  - [ ] 13.1 Implement language metadata handling
    - Store language metadata with each poem
    - Retrieve language metadata when fetching poems
    - _Requirements: 10.1_

  - [ ]* 13.2 Write property test for language metadata persistence
    - **Property 9: Language Metadata Persistence**
    - **Validates: Requirements 10.1**

  - [ ] 13.3 Implement language-specific font application
    - Apply Playfair Display or Cormorant Garamond for English poems
    - Apply Noto Serif Devanagari for Hindi poems
    - _Requirements: 10.2, 10.3_

  - [ ] 13.4 Add Unicode Devanagari support
    - Ensure proper rendering of Devanagari characters (U+0900 to U+097F)
    - Test with Hindi poem samples
    - _Requirements: 10.5_

  - [ ]* 13.5 Write property test for Unicode Devanagari support
    - **Property 11: Unicode Devanagari Support**
    - **Validates: Requirements 10.5**

  - [ ] 13.6 Implement text direction and alignment
    - Set left-to-right text direction for both English and Hindi
    - Apply proper alignment for poem content
    - _Requirements: 10.4_

  - [ ]* 13.7 Write property test for text direction correctness
    - **Property 10: Text Direction Correctness**
    - **Validates: Requirements 10.4**

  - [ ] 13.7 Display titles in native language
    - Render manuscript titles in poem's specified language
    - Apply language-specific fonts to titles
    - _Requirements: 10.7_

  - [ ]* 13.8 Write property test for native language title display
    - **Property 12: Native Language Title Display**
    - **Validates: Requirements 10.7**

  - [ ] 13.9 Add language selector in admin panel
    - Provide dropdown to select English or Hindi
    - Validate language selection before submission
    - _Requirements: 10.6_

  - [ ]* 13.10 Write property test for multilingual text input acceptance
    - **Property 8: Multilingual Text Input Acceptance**
    - **Validates: Requirements 9.3**


- [ ] 14. Checkpoint - Ensure all features are integrated
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Testing implementation
  - [ ] 15.1 Set up testing framework
    - Install Vitest: `npm install -D vitest @vitest/ui`
    - Install React Testing Library: `npm install -D @testing-library/react @testing-library/jest-dom`
    - Install fast-check: `npm install -D fast-check`
    - Configure Vitest in `vite.config.ts`
    - _Requirements: 13.8_

  - [ ]* 15.2 Write unit tests for LibraryDesk component
    - Test Poetry book and Journal book rendering
    - Test cat wake animation trigger
    - Test lamp brightening animation
    - Test zoom transition execution

  - [ ]* 15.3 Write unit tests for PoemCard component
    - Test title and preview rendering
    - Test language-specific font application
    - Test click handler invocation

  - [ ]* 15.4 Write unit tests for BookViewer component
    - Test page flip animation
    - Test poem content rendering
    - Test close functionality

  - [ ]* 15.5 Write unit tests for AudioPlayer component
    - Test play/pause controls
    - Test vinyl rotation synchronization
    - Test error handling for missing audio

  - [ ]* 15.6 Write unit tests for AdminPanel component
    - Test authentication flow
    - Test form validation
    - Test poem submission

  - [ ]* 15.7 Write unit tests for API routes
    - Test GET /api/poems response
    - Test POST /api/poems with valid data
    - Test error handling for invalid requests

  - [ ]* 15.8 Write property test for layout template application
    - **Property 19: Layout Template Application**
    - **Validates: Requirements 12.5**

  - [ ]* 15.9 Set up integration tests with Playwright
    - Install Playwright: `npm install -D @playwright/test`
    - Configure Playwright for browser testing
    - Write test for homepage load → click Poetry book → view poems → open book → play audio flow
    - Write test for admin login → upload poem → preview → publish → verify on homepage flow


- [ ] 16. Performance optimization
  - [ ] 16.1 Implement performance monitoring
    - Add performance measurement for Time to Interactive
    - Add performance measurement for Largest Contentful Paint
    - Target: TTI < 3s, LCP < 2.5s
    - _Requirements: 13.1, 13.2_

  - [ ] 16.2 Optimize animation performance
    - Use `will-change: transform` for animated elements
    - Limit simultaneous animations to 3-4 elements
    - Use CSS animations for simple loops
    - Use Framer Motion for complex interactions
    - _Requirements: 7.7, 13.8_

  - [ ] 16.3 Implement code splitting and lazy loading
    - Lazy load AdminPanel component
    - Lazy load BookViewer component
    - Split vendor bundles for better caching
    - _Requirements: 13.3_

  - [ ] 16.4 Optimize book opening latency
    - Preload book opening animations
    - Cache poem data after first fetch
    - Target: book opens within 500ms
    - _Requirements: 13.4_


- [ ] 17. Deployment configuration and documentation
  - [ ] 17.1 Create deployment documentation
    - Write step-by-step deployment guide for Vercel in README.md
    - Document Supabase setup process
    - Document environment variable configuration
    - Include troubleshooting section for common issues
    - _Requirements: 15.3, 15.6, 15.7_

  - [ ] 17.2 Configure Vercel deployment
    - Create `vercel.json` with proper build settings
    - Configure environment variables in Vercel dashboard
    - Set up automatic deployments from Git repository
    - _Requirements: 15.1, 15.2_

  - [ ] 17.3 Set up Supabase for production
    - Create production Supabase project
    - Execute database schema
    - Configure Row Level Security policies
    - Set up storage bucket for audio files
    - _Requirements: 15.5_

  - [ ] 17.4 Create README with project overview
    - Document project structure
    - List all dependencies and their purposes
    - Provide local development setup instructions
    - Include screenshots of key features
    - _Requirements: 15.3_

  - [ ] 17.5 Test deployment on Vercel free tier
    - Deploy to Vercel
    - Verify all features work in production
    - Test API routes and database connectivity
    - Verify audio playback from Supabase Storage
    - _Requirements: 15.1_

- [ ] 18. Final checkpoint - Complete system validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and integration points
- The implementation uses TypeScript with React 18, Vite, Framer Motion, and Supabase
- Deployment targets Vercel free tier with Supabase free tier for database and storage

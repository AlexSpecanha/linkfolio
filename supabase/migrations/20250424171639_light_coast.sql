/*
  # Add page appearance settings

  1. Changes
    - Add appearance settings columns to pages table
    - Add default values for new columns
    - Maintain existing data
  
  2. New Columns
    - theme
    - background_color
    - background_image
    - button_color
    - text_color
    - font
    - button_radius
    - button_animation
    - show_logo
*/

ALTER TABLE pages
ADD COLUMN theme text DEFAULT 'light',
ADD COLUMN background_color text DEFAULT '#ffffff',
ADD COLUMN background_image text,
ADD COLUMN button_color text DEFAULT '#6b46c1',
ADD COLUMN text_color text DEFAULT '#1a202c',
ADD COLUMN font text DEFAULT 'Inter',
ADD COLUMN button_radius text DEFAULT '0.5rem',
ADD COLUMN button_animation text DEFAULT 'none',
ADD COLUMN show_logo boolean DEFAULT true;
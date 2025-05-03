/*
  # Create authentication schema and users table

  1. New Tables
    - `auth.users` (managed by Supabase Auth)
    - `public.users` (mirror of auth.users for easier querying)
      - `id` (uuid, primary key)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `last_sign_in_at` (timestamp)
      - `raw_user_meta_data` (jsonb)

  2. Security
    - Enable RLS on `users` table
    - Add policies for user data access
    - Create trigger to sync auth.users with public.users
*/

-- Create public users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_sign_in_at timestamptz,
  raw_user_meta_data jsonb
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own user data" ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own user data" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, raw_user_meta_data)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user record
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users if any
INSERT INTO public.users (id, email, raw_user_meta_data)
SELECT id, email, raw_user_meta_data
FROM auth.users ON CONFLICT (id) DO NOTHING;
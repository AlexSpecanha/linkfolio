/*
  # Fix Profile RLS Policies

  1. Changes
    - Drop existing RLS policies for profiles table
    - Add new RLS policies that allow:
      - Profile creation during registration
      - Users to view their own profile
      - Users to update their own profile
      - Public access to view profiles
      - Admins to view all profiles
  
  2. Security
    - Enable RLS on profiles table
    - Add comprehensive RLS policies for all operations
    - Ensure secure access patterns
*/

-- First enable RLS if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create new policies

-- Allow users to create their own profile
CREATE POLICY "Enable insert for authenticated users only"
ON profiles FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to view their own profile
CREATE POLICY "Enable read access for own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Enable update for users based on id"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow public read access to all profiles
CREATE POLICY "Allow public read access"
ON profiles FOR SELECT
TO public
USING (true);

-- Allow admins to view all profiles
CREATE POLICY "Allow admin full access"
ON profiles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);
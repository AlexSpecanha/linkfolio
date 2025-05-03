/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing RLS policies for profiles table
    - Create new, clearer policies for profile access
    - Ensure public access for username lookups
    - Maintain admin access to all profiles
    
  2. Security
    - Enable RLS on profiles table (already enabled)
    - Add policy for public username lookup
    - Add policy for users to view their own profile
    - Add policy for admins to view all profiles
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create new policies with proper access controls
CREATE POLICY "Public can view usernames"
ON profiles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can view own profile"
ON profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
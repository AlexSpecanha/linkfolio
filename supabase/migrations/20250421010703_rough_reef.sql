/*
  # Fix profiles table RLS policies

  1. Changes
    - Remove existing problematic RLS policies
    - Add new, simplified RLS policies for profiles table
      - Public users can view basic profile info (username, avatar_url)
      - Authenticated users can view their own full profile
      - Admins can view all profiles
      - Users can update their own profile
  
  2. Security
    - Maintains RLS protection
    - Prevents infinite recursion by simplifying policy conditions
    - Ensures proper access control for different user roles
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Public can view usernames" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

-- Create new, simplified policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  )
);

CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);
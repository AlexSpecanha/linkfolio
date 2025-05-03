/*
  # Fix profiles RLS policies

  1. Changes
    - Remove recursive policies that were causing infinite loops
    - Restructure admin and user policies to avoid self-referencing
    - Maintain security while fixing the recursion issue
  
  2. Security
    - Maintain RLS enabled on profiles table
    - Keep public read access for profiles
    - Allow users to update their own profiles
    - Allow admins to view all profiles using a simpler condition
*/

-- Drop existing policies to recreate them without recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Create new policies without recursion
CREATE POLICY "Admins can view all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (
  is_admin = true
);

CREATE POLICY "Public profiles are viewable by everyone"
ON profiles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);
/*
  # Fix recursive profiles policy

  1. Changes
    - Remove problematic recursive admin policy
    - Add new non-recursive admin policy
  
  2. Security
    - Maintains RLS on profiles table
    - Adds cleaner admin access policy
*/

-- Drop the problematic policy that causes recursion
DROP POLICY IF EXISTS "Allow admin full access" ON profiles;

-- Create new admin policy without recursion
CREATE POLICY "Allow admin access" ON profiles
  FOR ALL 
  TO authenticated
  USING (is_admin = true)
  WITH CHECK (is_admin = true);
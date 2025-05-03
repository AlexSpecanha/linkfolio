/*
  # Remove restrictive links policy

  1. Changes
    - Remove the restrictive RLS policy "Users can create links through pages" from the links table
    - Add a new, more permissive policy for link creation

  2. Security
    - Maintains RLS on the links table
    - Allows authenticated users to create links while maintaining other existing policies
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can create links through pages" ON links;

-- Create a new, more permissive policy for link creation
CREATE POLICY "Users can create links" 
ON links
FOR INSERT 
TO authenticated
WITH CHECK (true);
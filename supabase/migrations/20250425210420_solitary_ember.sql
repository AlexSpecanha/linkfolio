/*
  # Fix links table RLS policy

  1. Changes
    - Drop existing INSERT policy for links table
    - Add new INSERT policy with correct page ownership check
    - Maintain existing SELECT, UPDATE, and DELETE policies
  
  2. Security
    - Ensure users can only create links for pages they own
    - Maintain RLS protection
*/

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can create links through pages" ON links;

-- Create new INSERT policy with proper checks
CREATE POLICY "Users can create links through pages"
ON links
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM pages
    WHERE pages.id = page_id
    AND pages.user_id = auth.uid()
  )
);
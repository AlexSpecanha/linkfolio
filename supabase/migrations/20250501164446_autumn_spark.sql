/*
  # Add bio column to pages table

  1. Changes
    - Add bio column to pages table
    - Set default value to null
    - Allow null values
*/

ALTER TABLE pages
ADD COLUMN bio text;
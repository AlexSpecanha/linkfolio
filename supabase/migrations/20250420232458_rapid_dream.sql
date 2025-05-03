/*
  # Add admin role to profiles

  1. Changes
    - Add `is_admin` column to profiles table
    - Add admin policies for all tables
*/

-- Add is_admin column to profiles
ALTER TABLE public.profiles
ADD COLUMN is_admin boolean DEFAULT false;

-- Admin policies for profiles
CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));

-- Admin policies for pages
CREATE POLICY "Admins can view all pages"
    ON public.pages
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));

-- Admin policies for links
CREATE POLICY "Admins can view all links"
    ON public.links
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));

-- Admin policies for support tickets
CREATE POLICY "Admins can view all tickets"
    ON public.support_tickets
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));

CREATE POLICY "Admins can update tickets"
    ON public.support_tickets
    FOR UPDATE
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));

-- Admin policies for ticket responses
CREATE POLICY "Admins can view all responses"
    ON public.ticket_responses
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));

CREATE POLICY "Admins can create responses"
    ON public.ticket_responses
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IN (
        SELECT id FROM public.profiles WHERE is_admin = true
    ));
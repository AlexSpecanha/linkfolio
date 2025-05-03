/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `website` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `pages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `slug` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `links`
      - `id` (uuid, primary key)
      - `page_id` (uuid, references pages)
      - `title` (text)
      - `url` (text)
      - `image_url` (text)
      - `is_image_link` (boolean)
      - `expires_at` (timestamp)
      - `scheduled_from` (timestamp)
      - `scheduled_to` (timestamp)
      - `password` (text)
      - `clicks` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `support_tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `subject` (text)
      - `message` (text)
      - `status` (text)
      - `priority` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `ticket_responses`
      - `id` (uuid, primary key)
      - `ticket_id` (uuid, references support_tickets)
      - `user_id` (uuid, references profiles)
      - `message` (text)
      - `is_admin` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for admins to manage all data
*/

-- Create profiles table
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    username text UNIQUE NOT NULL,
    full_name text,
    avatar_url text,
    website text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create pages table
CREATE TABLE public.pages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, slug)
);

-- Create links table
CREATE TABLE public.links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id uuid REFERENCES public.pages ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    image_url text,
    is_image_link boolean DEFAULT false,
    expires_at timestamptz,
    scheduled_from timestamptz,
    scheduled_to timestamptz,
    password text,
    clicks integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create support_tickets table
CREATE TABLE public.support_tickets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    status text NOT NULL DEFAULT 'open',
    priority text NOT NULL DEFAULT 'medium',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create ticket_responses table
CREATE TABLE public.ticket_responses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id uuid REFERENCES public.support_tickets ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
    message text NOT NULL,
    is_admin boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_responses ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Pages policies
CREATE POLICY "Users can view their own pages"
    ON public.pages
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can create pages"
    ON public.pages
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own pages"
    ON public.pages
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own pages"
    ON public.pages
    FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- Links policies
CREATE POLICY "Users can view links through pages"
    ON public.links
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.pages
            WHERE pages.id = links.page_id
            AND pages.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create links through pages"
    ON public.links
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pages
            WHERE pages.id = page_id
            AND pages.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own links"
    ON public.links
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.pages
            WHERE pages.id = links.page_id
            AND pages.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own links"
    ON public.links
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.pages
            WHERE pages.id = links.page_id
            AND pages.user_id = auth.uid()
        )
    );

-- Support tickets policies
CREATE POLICY "Users can view their own tickets"
    ON public.support_tickets
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets"
    ON public.support_tickets
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Ticket responses policies
CREATE POLICY "Users can view responses to their tickets"
    ON public.ticket_responses
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.support_tickets
            WHERE support_tickets.id = ticket_id
            AND support_tickets.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create responses to their tickets"
    ON public.ticket_responses
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.support_tickets
            WHERE support_tickets.id = ticket_id
            AND support_tickets.user_id = auth.uid()
        )
    );

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
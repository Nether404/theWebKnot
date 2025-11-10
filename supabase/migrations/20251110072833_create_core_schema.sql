/*
  # WebKnot Core Schema - Phase 1

  ## Overview
  Creates the foundational database structure for WebKnot prompt generator with user authentication,
  project management, and AI usage tracking.

  ## New Tables

  ### `users`
  Extends Supabase auth.users with application-specific profile data
  - `id` (uuid, references auth.users) - Primary key
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `tier` (text) - Subscription tier: 'free', 'premium', 'enterprise'
  - `ai_quota_used` (integer) - AI requests used this month
  - `ai_quota_limit` (integer) - Monthly AI request limit based on tier
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update

  ### `projects`
  Stores user project configurations and generated prompts
  - `id` (uuid) - Primary key
  - `user_id` (uuid, references users) - Project owner
  - `name` (text) - Project name
  - `description` (text) - Project description
  - `project_type` (text) - Type: 'portfolio', 'ecommerce', 'blog', etc.
  - `config` (jsonb) - Complete wizard configuration
  - `generated_prompt` (text) - Final generated prompt
  - `is_favorite` (boolean) - User marked as favorite
  - `created_at` (timestamptz) - Project creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ### `ai_usage`
  Tracks AI feature usage for analytics and quota management
  - `id` (uuid) - Primary key
  - `user_id` (uuid, references users) - User who made request
  - `project_id` (uuid, references projects, nullable) - Associated project if any
  - `feature` (text) - AI feature used: 'analysis', 'compatibility', 'enhancement', 'chat'
  - `tokens_used` (integer) - Estimated tokens consumed
  - `response_time_ms` (integer) - Response time in milliseconds
  - `success` (boolean) - Whether request succeeded
  - `error_message` (text, nullable) - Error details if failed
  - `created_at` (timestamptz) - Request timestamp

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Policies enforce user ownership checks
  - No public access without authentication

  ## Indexes
  - Optimized for user-based queries
  - AI usage lookups by user and date
  - Project searches by user and favorites
*/

-- Create users profile table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'enterprise')),
  ai_quota_used integer NOT NULL DEFAULT 0,
  ai_quota_limit integer NOT NULL DEFAULT 20,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  project_type text,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  generated_prompt text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_usage tracking table
CREATE TABLE IF NOT EXISTS ai_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  feature text NOT NULL CHECK (feature IN ('analysis', 'compatibility', 'enhancement', 'chat')),
  tokens_used integer DEFAULT 0,
  response_time_ms integer,
  success boolean DEFAULT true,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_is_favorite ON projects(user_id, is_favorite) WHERE is_favorite = true;
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_id ON ai_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_feature ON ai_usage(user_id, feature);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Projects table policies
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- AI usage table policies
CREATE POLICY "Users can view own ai usage"
  ON ai_usage FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own ai usage records"
  ON ai_usage FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
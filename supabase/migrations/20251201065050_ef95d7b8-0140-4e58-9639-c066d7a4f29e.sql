-- Create user_preferences table
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  theme_mode TEXT NOT NULL DEFAULT 'light' CHECK (theme_mode IN ('light', 'dark')),
  theme_preset TEXT NOT NULL DEFAULT 'default' CHECK (theme_preset IN ('default', 'ocean', 'sunset', 'forest', 'lavender')),
  custom_primary_color TEXT,
  custom_accent_color TEXT,
  logo_visible BOOLEAN NOT NULL DEFAULT true,
  logo_size TEXT NOT NULL DEFAULT 'md' CHECK (logo_size IN ('sm', 'md', 'lg', 'xl')),
  logo_position TEXT NOT NULL DEFAULT 'header' CHECK (logo_position IN ('header', 'sidebar', 'corner')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own preferences"
ON public.user_preferences
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
ON public.user_preferences
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
ON public.user_preferences
FOR UPDATE
USING (auth.uid() = user_id);

-- Add trigger for timestamps
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
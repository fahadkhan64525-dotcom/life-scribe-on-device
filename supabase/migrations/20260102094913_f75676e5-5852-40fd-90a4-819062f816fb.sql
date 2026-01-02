-- Update theme preset constraint to include new themes
ALTER TABLE public.user_preferences DROP CONSTRAINT IF EXISTS user_preferences_theme_preset_check;
ALTER TABLE public.user_preferences ADD CONSTRAINT user_preferences_theme_preset_check 
CHECK (theme_preset IN ('cozy-room', 'night-cat', 'tulip-garden', 'sky-balloons', 'sunset-city', 'magic-book', 'night-mountain', 'midnight', 'charcoal', 'forest-night', 'wine-cellar', 'pink-clouds', 'lake-mountains', 'cream', 'minimal', 'lavender-mist', 'ocean-breeze', 'default', 'ocean', 'sunset', 'forest', 'lavender'));
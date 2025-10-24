-- ==============================================
-- Fix Existing Profiles - Add Email Column
-- Run this to fix profiles that have NULL emails
-- ==============================================

-- 1. Add email column if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Update existing profiles with NULL emails
-- Copy email from auth.users table
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
AND p.email IS NULL;

-- 3. Update the trigger function to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Verify the fix
SELECT 
  id,
  email,
  first_name,
  last_name,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

-- ==============================================
-- Done! All profiles should now have emails ✅
-- ==============================================




-- Create storage bucket for diary photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('diary-photos', 'diary-photos', true);

-- Allow authenticated users to upload their own photos
CREATE POLICY "Users can upload their own diary photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'diary-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own photos
CREATE POLICY "Users can view their own diary photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'diary-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own photos
CREATE POLICY "Users can delete their own diary photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'diary-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own photos
CREATE POLICY "Users can update their own diary photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'diary-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
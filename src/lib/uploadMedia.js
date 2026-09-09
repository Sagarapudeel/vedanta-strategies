import { supabase, isSupabaseConfigured } from './supabase';

export async function uploadMediaFile(file, folder = 'uploads') {
  if (!file) throw new Error('No file selected');
  if (!file.type.startsWith('image/')) throw new Error('Please select an image file (JPG, PNG, WebP, SVG)');
  if (file.size > 10 * 1024 * 1024) throw new Error('Please choose an image smaller than 10MB.');
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.');
  }

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

  const { error } = await supabase.storage.from('media').upload(path, file, {
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;

  const { data } = supabase.storage.from('media').getPublicUrl(path);
  if (!data?.publicUrl) throw new Error('Upload succeeded but no public URL was returned.');
  return data.publicUrl;
}

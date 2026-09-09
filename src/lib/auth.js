import { supabase, isSupabaseConfigured } from './supabase';

export async function loadAdminFromSession() {
  if (!isSupabaseConfigured || !supabase) {
    return { isAuthenticated: false, user: null, role: 'super_admin', name: null };
  }

  const { data: sessionData, error } = await supabase.auth.getSession();
  if (error || !sessionData?.session?.user) {
    return { isAuthenticated: false, user: null, role: 'super_admin', name: null };
  }

  return profileToAuth(sessionData.session.user);
}

export async function profileToAuth(user) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (profile?.status === 'disabled') {
    await supabase.auth.signOut();
    return {
      isAuthenticated: false,
      user: null,
      role: 'super_admin',
      name: null,
      error: 'This administrator account has been disabled.'
    };
  }

  return {
    isAuthenticated: true,
    user: user.email,
    role: profile?.role || 'super_admin',
    name: profile?.name || user.email
  };
}

export async function signInAdmin(email, password) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });
  if (error) throw error;
  if (!data.user) throw new Error('Login failed.');

  const auth = await profileToAuth(data.user);
  if (!auth.isAuthenticated) {
    throw new Error(auth.error || 'Unable to sign in.');
  }
  return auth;
}

export async function signOutAdmin() {
  if (supabase) await supabase.auth.signOut();
}

import { useState, useEffect, useRef } from 'react';
import { initialData } from './initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const EVENT_NAME = 'vedanta-data-update';

function stripCmsMeta(store) {
  const {
    leads,
    adminUsers,
    loading,
    error,
    configured,
    ...cms
  } = store;
  return cms;
}

function mergeCms(parsed = {}) {
  const siteSettings = {
    ...initialData.siteSettings,
    ...(parsed.siteSettings || {}),
    latitude: initialData.siteSettings.latitude,
    longitude: initialData.siteSettings.longitude,
    mapsUrl: initialData.siteSettings.mapsUrl,
    mapsEmbed: initialData.siteSettings.mapsEmbed
  };
  if (siteSettings.address_en?.includes('Putalisadak') || siteSettings.address?.includes('Putalisadak')) {
    siteSettings.address_en = initialData.siteSettings.address_en;
    siteSettings.address_ne = initialData.siteSettings.address_ne;
    siteSettings.address = initialData.siteSettings.address_en;
  }
  return {
    ...initialData,
    ...parsed,
    partners: (parsed.partners && parsed.partners.length > 0) ? parsed.partners : initialData.partners,
    teamMembers: (parsed.teamMembers && parsed.teamMembers.length > 0) ? parsed.teamMembers : initialData.teamMembers,
    blogPosts: (parsed.blogPosts && parsed.blogPosts.length > 0) ? parsed.blogPosts : initialData.blogPosts,
    testimonials: (parsed.testimonials && parsed.testimonials.length > 0) ? parsed.testimonials : initialData.testimonials,
    siteContent: parsed.siteContent ? {
      ...initialData.siteContent,
      ...parsed.siteContent,
      about: { ...initialData.siteContent.about, ...(parsed.siteContent.about || {}) }
    } : initialData.siteContent,
    siteSettings,
    media: { ...(initialData.media || {}), ...(parsed.media || {}) }
  };
}

function mapLeadRow(row) {
  const created = row.created_at || new Date().toISOString();
  return {
    id: row.id,
    name: row.name || '',
    email: row.email || '',
    phone: row.phone || '',
    purpose: row.purpose || 'general',
    courseName: row.course_name || '',
    institutionName: row.institution_name || '',
    message: row.message || '',
    status: row.status || 'new',
    notes: row.notes || '',
    createdAt: String(created).replace('T', ' ').substring(0, 16)
  };
}

function mapProfileRow(row) {
  return {
    id: row.id,
    name: row.name || '',
    email: row.email || '',
    role: row.role || 'content_editor',
    status: row.status || 'active',
    isPrimary: Boolean(row.is_primary),
    createdAt: row.created_at ? String(row.created_at).slice(0, 10) : ''
  };
}

function formatLeadCreatedAt() {
  return new Date().toISOString().replace('T', ' ').substring(0, 16);
}

export function getStore() {
  return mergeCms(initialData);
}

async function fetchLeads() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    // Public visitors cannot read leads (RLS); that is expected.
    console.warn('Leads not loaded:', error.message);
    return [];
  }
  return (data || []).map(mapLeadRow);
}

async function fetchProfiles() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: true });
  if (error) {
    console.warn('Profiles not loaded:', error.message);
    return [];
  }
  return (data || []).map(mapProfileRow);
}

async function persistCms(cms) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase
    .from('site_store')
    .update({ data: cms, updated_at: new Date().toISOString() })
    .eq('id', 'default');
  if (error) throw error;
}

async function loadRemoteStore() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      ...mergeCms(initialData),
      leads: initialData.leads || [],
      adminUsers: [],
      loading: false,
      error: 'Supabase is not configured. Copy .env.example to .env.local and add your project URL and anon key.',
      configured: false
    };
  }

  const seedPayload = stripCmsMeta(mergeCms(initialData));
  const { data: seeded, error: seedError } = await supabase.rpc('ensure_site_store', { payload: seedPayload });
  if (seedError) throw seedError;

  const cms = mergeCms(seeded || {});
  const [leads, adminUsers] = await Promise.all([fetchLeads(), fetchProfiles()]);

  return {
    ...cms,
    leads,
    adminUsers,
    loading: false,
    error: null,
    configured: true
  };
}

export function useDataStore() {
  const [data, setData] = useState(() => ({
    ...mergeCms(initialData),
    leads: [],
    adminUsers: [],
    loading: true,
    error: null,
    configured: isSupabaseConfigured
  }));
  const dataRef = useRef(data);
  dataRef.current = data;

  const apply = (next) => {
    dataRef.current = next;
    setData(next);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  };

  const mutateCms = async (updater) => {
    const current = dataRef.current;
    const next = typeof updater === 'function' ? updater(current) : updater;
    apply({ ...next, loading: false });
    try {
      await persistCms(stripCmsMeta(next));
    } catch (err) {
      console.error('Failed to persist CMS', err);
      apply({ ...current, error: err.message || 'Failed to save changes.' });
      throw err;
    }
  };

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      try {
        const remote = await loadRemoteStore();
        if (!cancelled) apply(remote);
      } catch (err) {
        console.error('Failed to load store from Supabase', err);
        if (!cancelled) {
          apply({
            ...mergeCms(initialData),
            leads: [],
            adminUsers: [],
            loading: false,
            error: err.message || 'Failed to load data from Supabase.',
            configured: isSupabaseConfigured
          });
        }
      }
    };

    boot();

    const handleUpdate = (e) => {
      if (e.detail) setData(e.detail);
    };
    window.addEventListener(EVENT_NAME, handleUpdate);

    let cmsChannel;
    let leadsChannel;
    if (supabase) {
      cmsChannel = supabase
        .channel('site-store-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_store' }, async () => {
          try {
            const { data: row } = await supabase.from('site_store').select('data').eq('id', 'default').maybeSingle();
            if (!row) return;
            const current = dataRef.current;
            apply({ ...current, ...mergeCms(row.data), leads: current.leads, adminUsers: current.adminUsers });
          } catch (err) {
            console.warn('Realtime CMS refresh failed', err);
          }
        })
        .subscribe();

      leadsChannel = supabase
        .channel('leads-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, async () => {
          const leads = await fetchLeads();
          apply({ ...dataRef.current, leads });
        })
        .subscribe();
    }

    return () => {
      cancelled = true;
      window.removeEventListener(EVENT_NAME, handleUpdate);
      if (cmsChannel) supabase.removeChannel(cmsChannel);
      if (leadsChannel) supabase.removeChannel(leadsChannel);
    };
  }, []);

  return {
    ...data,

    updateSiteContent: (newContent) => {
      return mutateCms((current) => ({
        ...current,
        siteContent: {
          ...current.siteContent,
          ...newContent
        }
      }));
    },

    addLead: async (lead) => {
      const newLead = {
        ...lead,
        id: 'lead-' + Date.now(),
        status: 'new',
        createdAt: formatLeadCreatedAt()
      };
      const current = dataRef.current;
      apply({ ...current, leads: [newLead, ...current.leads] });

      if (!supabase) return newLead;
      const { error } = await supabase.from('leads').insert({
        id: newLead.id,
        name: newLead.name || '',
        email: newLead.email || '',
        phone: newLead.phone || '',
        purpose: newLead.purpose || 'general',
        course_name: newLead.courseName || '',
        institution_name: newLead.institutionName || '',
        message: newLead.message || '',
        status: 'new',
        notes: ''
      });
      if (error) {
        console.error('Failed to insert lead', error);
        apply({ ...current, error: error.message });
      }
      return newLead;
    },

    updateLeadStatus: async (id, status, notes) => {
      const current = dataRef.current;
      const updatedLeads = current.leads.map((l) =>
        l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l
      );
      apply({ ...current, leads: updatedLeads });
      if (!supabase) return;
      const patch = { status };
      if (notes !== undefined) patch.notes = notes;
      const { error } = await supabase.from('leads').update(patch).eq('id', id);
      if (error) console.error('Failed to update lead', error);
    },

    deleteLead: async (id) => {
      const current = dataRef.current;
      apply({ ...current, leads: current.leads.filter((l) => l.id !== id) });
      if (!supabase) return;
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) console.error('Failed to delete lead', error);
    },

    addCourse: (course) => {
      return mutateCms((current) => {
        const newCourse = {
          ...course,
          id: 'crs-' + Date.now(),
          curriculum_en: Array.isArray(course.curriculum_en) ? course.curriculum_en : (course.curriculum || []),
          curriculum_ne: Array.isArray(course.curriculum_ne) ? course.curriculum_ne : []
        };
        return { ...current, courses: [newCourse, ...current.courses] };
      });
    },
    updateCourse: (id, courseData) => {
      return mutateCms((current) => ({
        ...current,
        courses: current.courses.map((c) => (c.id === id ? { ...c, ...courseData } : c))
      }));
    },
    deleteCourse: (id) => {
      return mutateCms((current) => ({
        ...current,
        courses: current.courses.filter((c) => c.id !== id)
      }));
    },

    addService: (service) => {
      return mutateCms((current) => ({
        ...current,
        services: [...current.services, { ...service, id: 'srv-' + Date.now() }]
      }));
    },
    updateService: (id, serviceData) => {
      return mutateCms((current) => ({
        ...current,
        services: current.services.map((s) => (s.id === id ? { ...s, ...serviceData } : s))
      }));
    },
    deleteService: (id) => {
      return mutateCms((current) => ({
        ...current,
        services: current.services.filter((s) => s.id !== id)
      }));
    },

    addPortfolio: (item) => {
      return mutateCms((current) => ({
        ...current,
        portfolioItems: [{ ...item, id: 'case-' + Date.now() }, ...current.portfolioItems]
      }));
    },
    updatePortfolio: (id, itemData) => {
      return mutateCms((current) => ({
        ...current,
        portfolioItems: current.portfolioItems.map((p) => (p.id === id ? { ...p, ...itemData } : p))
      }));
    },
    deletePortfolio: (id) => {
      return mutateCms((current) => ({
        ...current,
        portfolioItems: current.portfolioItems.filter((p) => p.id !== id)
      }));
    },

    addTestimonial: (t) => {
      return mutateCms((current) => ({
        ...current,
        testimonials: [{ ...t, id: 't-' + Date.now() }, ...current.testimonials]
      }));
    },
    updateTestimonial: (id, tData) => {
      return mutateCms((current) => ({
        ...current,
        testimonials: current.testimonials.map((t) => (t.id === id ? { ...t, ...tData } : t))
      }));
    },
    deleteTestimonial: (id) => {
      return mutateCms((current) => ({
        ...current,
        testimonials: current.testimonials.filter((t) => t.id !== id)
      }));
    },

    addTeamMember: (member) => {
      return mutateCms((current) => ({
        ...current,
        teamMembers: [...(current.teamMembers || []), { ...member, id: 'tm-' + Date.now() }]
      }));
    },
    updateTeamMember: (id, mData) => {
      return mutateCms((current) => ({
        ...current,
        teamMembers: (current.teamMembers || []).map((m) => (m.id === id ? { ...m, ...mData } : m))
      }));
    },
    deleteTeamMember: (id) => {
      return mutateCms((current) => ({
        ...current,
        teamMembers: (current.teamMembers || []).filter((m) => m.id !== id)
      }));
    },

    addProductionItem: (item) => {
      return mutateCms((current) => ({
        ...current,
        productionGallery: [{ ...item, id: 'prod-' + Date.now() }, ...(current.productionGallery || [])]
      }));
    },
    updateProductionItem: (id, itemData) => {
      return mutateCms((current) => ({
        ...current,
        productionGallery: (current.productionGallery || []).map((p) => (p.id === id ? { ...p, ...itemData } : p))
      }));
    },
    deleteProductionItem: (id) => {
      return mutateCms((current) => ({
        ...current,
        productionGallery: (current.productionGallery || []).filter((p) => p.id !== id)
      }));
    },

    addBlogPost: (post) => {
      return mutateCms((current) => {
        const newPost = {
          ...post,
          id: 'post-' + Date.now(),
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };
        return { ...current, blogPosts: [newPost, ...current.blogPosts] };
      });
    },
    updateBlogPost: (id, postData) => {
      return mutateCms((current) => ({
        ...current,
        blogPosts: current.blogPosts.map((b) => (b.id === id ? { ...b, ...postData } : b))
      }));
    },
    deleteBlogPost: (id) => {
      return mutateCms((current) => ({
        ...current,
        blogPosts: current.blogPosts.filter((b) => b.id !== id)
      }));
    },

    updateSettings: (newSettings) => {
      return mutateCms((current) => ({
        ...current,
        siteSettings: { ...current.siteSettings, ...newSettings }
      }));
    },

    addPartner: (partner) => {
      return mutateCms((current) => ({
        ...current,
        partners: [...(current.partners || []), { ...partner, id: 'part-' + Date.now() }]
      }));
    },
    updatePartner: (id, pData) => {
      return mutateCms((current) => ({
        ...current,
        partners: (current.partners || []).map((p) => (p.id === id ? { ...p, ...pData } : p))
      }));
    },
    deletePartner: (id) => {
      return mutateCms((current) => ({
        ...current,
        partners: (current.partners || []).filter((p) => p.id !== id)
      }));
    },

    addAdminUser: async () => {
      throw new Error('Create staff in the Supabase dashboard (Authentication → Users). A profile is created automatically.');
    },
    updateAdminUser: async (id, userData) => {
      const current = dataRef.current;
      const updated = (current.adminUsers || []).map((u) => (u.id === id ? { ...u, ...userData, password: undefined } : u));
      apply({ ...current, adminUsers: updated });
      if (!supabase) return;
      const patch = {};
      if (userData.name !== undefined) patch.name = userData.name;
      if (userData.role !== undefined) patch.role = userData.role;
      if (userData.status !== undefined) patch.status = userData.status;
      const { error } = await supabase.from('profiles').update(patch).eq('id', id);
      if (error) {
        console.error('Failed to update profile', error);
        throw error;
      }
    },
    deleteAdminUser: async (id) => {
      const current = dataRef.current;
      const userToDelete = (current.adminUsers || []).find((u) => u.id === id);
      if (userToDelete?.isPrimary) {
        throw new Error('Cannot delete primary super administrator account.');
      }
      apply({ ...current, adminUsers: (current.adminUsers || []).filter((u) => u.id !== id) });
      if (!supabase) return;
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) {
        apply(current);
        throw error;
      }
    },

    refreshAdminUsers: async () => {
      const adminUsers = await fetchProfiles();
      apply({ ...dataRef.current, adminUsers });
    },
    refreshLeads: async () => {
      const leads = await fetchLeads();
      apply({ ...dataRef.current, leads });
    },

    updateMedia: (mediaData) => {
      return mutateCms((current) => ({
        ...current,
        media: { ...(current.media || {}), ...mediaData }
      }));
    },
    addGalleryPhoto: (photo) => {
      return mutateCms((current) => {
        const media = current.media || {};
        const newPhoto = { ...photo, id: 'gph-' + Date.now() };
        return { ...current, media: { ...media, galleryPhotos: [...(media.galleryPhotos || []), newPhoto] } };
      });
    },
    deleteGalleryPhoto: (id) => {
      return mutateCms((current) => {
        const media = current.media || {};
        return { ...current, media: { ...media, galleryPhotos: (media.galleryPhotos || []).filter((p) => p.id !== id) } };
      });
    },
    addGalleryVideo: (video) => {
      return mutateCms((current) => {
        const media = current.media || {};
        const newVideo = { ...video, id: 'gvd-' + Date.now() };
        return { ...current, media: { ...media, galleryVideos: [...(media.galleryVideos || []), newVideo] } };
      });
    },
    deleteGalleryVideo: (id) => {
      return mutateCms((current) => {
        const media = current.media || {};
        return { ...current, media: { ...media, galleryVideos: (media.galleryVideos || []).filter((v) => v.id !== id) } };
      });
    },

    resetStoreToDefault: () => {
      return mutateCms((current) => ({
        ...mergeCms(initialData),
        leads: current.leads,
        adminUsers: current.adminUsers,
        loading: false,
        error: null,
        configured: current.configured
      }));
    }
  };
}

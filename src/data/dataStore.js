import { useState, useEffect } from 'react';
import { initialData } from './initialData';

const STORAGE_KEY = 'vedanta_strategies_data_v5';
const PREV_KEYS = ['vedanta_strategies_data_v4', 'vedanta_strategies_data_v3', 'vedanta_strategies_data_v2'];
const EVENT_NAME = 'vedanta-data-update';

function sanitizePutalisadak(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/Putalisadak/gi, 'Bagbazar').replace(/पुतलीसडक/g, 'बागबजार');
}

export function getStore() {
  try {
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      for (const prevKey of PREV_KEYS) {
        const oldSaved = localStorage.getItem(prevKey);
        if (oldSaved) {
          try {
            const cleaned = sanitizePutalisadak(oldSaved);
            localStorage.setItem(STORAGE_KEY, cleaned);
            saved = cleaned;
            break;
          } catch (e) {
            // continue
          }
        }
      }
    }
    if (saved) {
      const parsed = JSON.parse(saved);
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
        adminUsers: (parsed.adminUsers && parsed.adminUsers.length > 0) ? parsed.adminUsers : initialData.adminUsers,
        siteContent: parsed.siteContent ? {
          ...initialData.siteContent,
          ...parsed.siteContent,
          about: { ...initialData.siteContent.about, ...(parsed.siteContent.about || {}) }
        } : initialData.siteContent,
        siteSettings
      };
    }
  } catch (err) {
    console.error('Failed to load store from localStorage', err);
  }
  return initialData;
}

export function saveStore(newData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: newData }));
  } catch (err) {
    console.error('Failed to persist store to localStorage', err);
  }
}

// React Hook
export function useDataStore() {
  const [data, setData] = useState(getStore);

  useEffect(() => {
    const handleUpdate = (e) => {
      setData(e.detail || getStore());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => window.removeEventListener(EVENT_NAME, handleUpdate);
  }, []);

  return {
    ...data,
    
    // Mutations for Bilingual Site Content (CMS)
    updateSiteContent: (newContent) => {
      const current = getStore();
      const updated = {
        ...current,
        siteContent: {
          ...current.siteContent,
          ...newContent
        }
      };
      saveStore(updated);
    },

    // Leads
    addLead: (lead) => {
      const current = getStore();
      const newLead = {
        ...lead,
        id: 'lead-' + Date.now(),
        status: 'new',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      const updated = { ...current, leads: [newLead, ...current.leads] };
      saveStore(updated);
      return newLead;
    },
    updateLeadStatus: (id, status, notes) => {
      const current = getStore();
      const updatedLeads = current.leads.map((l) =>
        l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l
      );
      saveStore({ ...current, leads: updatedLeads });
    },
    deleteLead: (id) => {
      const current = getStore();
      saveStore({ ...current, leads: current.leads.filter((l) => l.id !== id) });
    },

    // Courses (Bilingual: _en and _ne)
    addCourse: (course) => {
      const current = getStore();
      const newCourse = {
        ...course,
        id: 'crs-' + Date.now(),
        curriculum_en: Array.isArray(course.curriculum_en) ? course.curriculum_en : (course.curriculum || []),
        curriculum_ne: Array.isArray(course.curriculum_ne) ? course.curriculum_ne : []
      };
      saveStore({ ...current, courses: [newCourse, ...current.courses] });
    },
    updateCourse: (id, courseData) => {
      const current = getStore();
      const updatedCourses = current.courses.map((c) =>
        c.id === id ? { ...c, ...courseData } : c
      );
      saveStore({ ...current, courses: updatedCourses });
    },
    deleteCourse: (id) => {
      const current = getStore();
      saveStore({ ...current, courses: current.courses.filter((c) => c.id !== id) });
    },

    // Services (Bilingual: _en and _ne)
    addService: (service) => {
      const current = getStore();
      const newService = { ...service, id: 'srv-' + Date.now() };
      saveStore({ ...current, services: [...current.services, newService] });
    },
    updateService: (id, serviceData) => {
      const current = getStore();
      const updated = current.services.map((s) => (s.id === id ? { ...s, ...serviceData } : s));
      saveStore({ ...current, services: updated });
    },
    deleteService: (id) => {
      const current = getStore();
      saveStore({ ...current, services: current.services.filter((s) => s.id !== id) });
    },

    // Portfolio
    addPortfolio: (item) => {
      const current = getStore();
      const newItem = { ...item, id: 'case-' + Date.now() };
      saveStore({ ...current, portfolioItems: [newItem, ...current.portfolioItems] });
    },
    updatePortfolio: (id, itemData) => {
      const current = getStore();
      const updated = current.portfolioItems.map((p) => (p.id === id ? { ...p, ...itemData } : p));
      saveStore({ ...current, portfolioItems: updated });
    },
    deletePortfolio: (id) => {
      const current = getStore();
      saveStore({ ...current, portfolioItems: current.portfolioItems.filter((p) => p.id !== id) });
    },

    // Testimonials
    addTestimonial: (t) => {
      const current = getStore();
      const newT = { ...t, id: 't-' + Date.now() };
      saveStore({ ...current, testimonials: [newT, ...current.testimonials] });
    },
    updateTestimonial: (id, tData) => {
      const current = getStore();
      const updated = current.testimonials.map((t) => (t.id === id ? { ...t, ...tData } : t));
      saveStore({ ...current, testimonials: updated });
    },
    deleteTestimonial: (id) => {
      const current = getStore();
      saveStore({ ...current, testimonials: current.testimonials.filter((t) => t.id !== id) });
    },

    // Team Members
    addTeamMember: (member) => {
      const current = getStore();
      const newMember = { ...member, id: 'tm-' + Date.now() };
      saveStore({ ...current, teamMembers: [...(current.teamMembers || []), newMember] });
    },
    updateTeamMember: (id, mData) => {
      const current = getStore();
      const updated = (current.teamMembers || []).map((m) => (m.id === id ? { ...m, ...mData } : m));
      saveStore({ ...current, teamMembers: updated });
    },
    deleteTeamMember: (id) => {
      const current = getStore();
      saveStore({ ...current, teamMembers: (current.teamMembers || []).filter((m) => m.id !== id) });
    },

    // Production Showcase
    addProductionItem: (item) => {
      const current = getStore();
      const newItem = { ...item, id: 'prod-' + Date.now() };
      saveStore({ ...current, productionGallery: [newItem, ...(current.productionGallery || [])] });
    },
    updateProductionItem: (id, itemData) => {
      const current = getStore();
      const updated = (current.productionGallery || []).map((p) => (p.id === id ? { ...p, ...itemData } : p));
      saveStore({ ...current, productionGallery: updated });
    },
    deleteProductionItem: (id) => {
      const current = getStore();
      saveStore({ ...current, productionGallery: (current.productionGallery || []).filter((p) => p.id !== id) });
    },

    // Blog
    addBlogPost: (post) => {
      const current = getStore();
      const newPost = {
        ...post,
        id: 'post-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };
      saveStore({ ...current, blogPosts: [newPost, ...current.blogPosts] });
    },
    updateBlogPost: (id, postData) => {
      const current = getStore();
      const updated = current.blogPosts.map((b) => (b.id === id ? { ...b, ...postData } : b));
      saveStore({ ...current, blogPosts: updated });
    },
    deleteBlogPost: (id) => {
      const current = getStore();
      saveStore({ ...current, blogPosts: current.blogPosts.filter((b) => b.id !== id) });
    },

    // Site Settings
    updateSettings: (newSettings) => {
      const current = getStore();
      saveStore({ ...current, siteSettings: { ...current.siteSettings, ...newSettings } });
    },

    // Trusted Partners & Institutional Logos
    addPartner: (partner) => {
      const current = getStore();
      const newPartner = { ...partner, id: 'part-' + Date.now() };
      saveStore({ ...current, partners: [...(current.partners || []), newPartner] });
    },
    updatePartner: (id, pData) => {
      const current = getStore();
      const updated = (current.partners || []).map((p) => (p.id === id ? { ...p, ...pData } : p));
      saveStore({ ...current, partners: updated });
    },
    deletePartner: (id) => {
      const current = getStore();
      saveStore({ ...current, partners: (current.partners || []).filter((p) => p.id !== id) });
    },

    // Admin Users Management (Super Admin only)
    addAdminUser: (adminUser) => {
      const current = getStore();
      const newAdmin = {
        ...adminUser,
        id: 'admin-' + Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
        status: adminUser.status || 'active',
        isPrimary: false
      };
      saveStore({ ...current, adminUsers: [...(current.adminUsers || initialData.adminUsers), newAdmin] });
      return newAdmin;
    },
    updateAdminUser: (id, userData) => {
      const current = getStore();
      const updated = (current.adminUsers || initialData.adminUsers).map((u) =>
        u.id === id ? { ...u, ...userData } : u
      );
      saveStore({ ...current, adminUsers: updated });
    },
    deleteAdminUser: (id) => {
      const current = getStore();
      const userToDelete = (current.adminUsers || []).find((u) => u.id === id);
      if (userToDelete?.isPrimary) {
        throw new Error("Cannot delete primary super administrator account.");
      }
      saveStore({
        ...current,
        adminUsers: (current.adminUsers || initialData.adminUsers).filter((u) => u.id !== id)
      });
    },

    resetStoreToDefault: () => {
      saveStore(initialData);
    }
  };
}

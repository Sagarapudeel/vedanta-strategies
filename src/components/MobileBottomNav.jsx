import React from 'react';
import { BookOpen, Briefcase, Phone, MessageCircle, Home } from 'lucide-react';

export default function MobileBottomNav({ activePage, setActivePage, openLeadModal, whatsappNumber }) {
  const cleanNumber = (whatsappNumber || '9779801234567').replace(/[^0-9]/g, '');

  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello Vedanta Strategies! I would like to make an inquiry.')}`, '_blank');
  };

  return (
    <nav className="mobile-bottom-bar">
      <div className="mobile-bottom-flex">
        <button 
          className={`mobile-bottom-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => handleNav('home')}
        >
          <Home size={18} />
          <span>Home</span>
        </button>

        <button 
          className={`mobile-bottom-item ${activePage === 'training' ? 'active' : ''}`}
          onClick={() => handleNav('training')}
        >
          <BookOpen size={18} />
          <span>Courses</span>
        </button>

        <button 
          className={`mobile-bottom-item ${activePage === 'services' ? 'active' : ''}`}
          onClick={() => handleNav('services')}
        >
          <Briefcase size={18} />
          <span>Services</span>
        </button>

        <button 
          className={`mobile-bottom-item ${activePage === 'contact' ? 'active' : ''}`}
          onClick={() => handleNav('contact')}
        >
          <Phone size={18} />
          <span>Contact</span>
        </button>

        <button 
          className="mobile-bottom-item"
          style={{ color: '#25d366' }}
          onClick={handleWhatsApp}
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </button>
      </div>
    </nav>
  );
}

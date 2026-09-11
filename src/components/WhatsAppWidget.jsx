import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function WhatsAppWidget({ whatsappNumber, currentLang, onSearch }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const cleanNumber = (whatsappNumber || '9779747887598').replace(/[^0-9]/g, '');
  const greetingText = currentLang === 'ne'
    ? 'नमस्ते Vedanta Strategies, म तपाईंको तालिम र सेवाहरूबारे थप बुझ्न चाहन्छु।'
    : 'Hello Vedanta Strategies! I would like to inquire about your training courses and media services.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greetingText)}`;
    window.open(url, '_blank');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="whatsapp-float-wrap">
      {/* Search — above the WhatsApp icon */}
      <div className="widget-search-wrap">
        {searchOpen && (
          <form className="widget-search-popover" onSubmit={handleSearchSubmit}>
            <Search size={15} color="#1C2F4D" />
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={currentLang === 'ne' ? 'खोज्नुहोस्...' : 'Search...'}
              aria-label={currentLang === 'ne' ? 'साइट खोज्नुहोस्' : 'Search site'}
            />
          </form>
        )}
        <button
          type="button"
          className="widget-search-toggle"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label={currentLang === 'ne' ? 'खोज खोल्नुहोस्' : 'Open site search'}
          aria-expanded={searchOpen}
          title="Search"
        >
          {searchOpen ? <X size={20} /> : <Search size={20} />}
        </button>
      </div>

      {/* WhatsApp quick chat */}
      <div
        className="whatsapp-btn-wrap"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div className="whatsapp-tooltip">
            {currentLang === 'ne' ? 'ह्वाट्सएपमा कुरा गर्नुहोस्' : 'Quick Chat on WhatsApp'}
          </div>
        )}
        <button
          className="whatsapp-float-btn"
          onClick={handleWhatsAppClick}
          aria-label="WhatsApp Chat"
          title="Chat with our program coordinator on WhatsApp"
        >
          <img src="/images/whatsapp.svg" alt="WhatsApp" width="30" height="30" />
        </button>
      </div>
    </div>
  );
}
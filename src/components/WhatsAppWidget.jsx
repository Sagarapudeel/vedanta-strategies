import React, { useState } from 'react';

export default function WhatsAppWidget({ whatsappNumber, currentLang }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = (whatsappNumber || '9779801234567').replace(/[^0-9]/g, '');
  const greetingText = currentLang === 'ne' 
    ? 'नमस्ते Vedanta Strategies, म तपाईंको तालिम र सेवाहरूबारे थप बुझ्न चाहन्छु।' 
    : 'Hello Vedanta Strategies! I would like to inquire about your training courses and media services.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greetingText)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="whatsapp-float-wrap"
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
  );
}
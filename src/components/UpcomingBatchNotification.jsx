import React, { useState } from 'react';
import { Clock, CalendarCheck, ArrowRight, X } from 'lucide-react';
import { getLangText } from '../utils/langHelper';

const POPUP_KEY = 'vedanta_batch_popup_seen';
const BAR_KEY = 'vedanta_batch_bar_seen';

export default function UpcomingBatchNotification({ currentLang = 'en', courses = [], media = {}, openLeadModal }) {
  const [popupOpen, setPopupOpen] = useState(() => {
    try {
      return sessionStorage.getItem(POPUP_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const [barDismissed, setBarDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(BAR_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const upcoming = (Array.isArray(courses) ? courses : [])
    .filter((c) => c && c.id && (c.title || c.title_en))
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .find((c) => getLangText(c, 'nextBatch', currentLang) || c.featured);

  if (!upcoming) return null;

  const title = getLangText(upcoming, 'title', currentLang) || upcoming.title;
  const duration = getLangText(upcoming, 'duration', currentLang) || upcoming.duration || '';
  const nextBatch = getLangText(upcoming, 'nextBatch', currentLang) || upcoming.nextBatch || '';
  const image = upcoming.coverUrl || upcoming.thumb || media?.heroImage || '/images/hero.jpg';

  const closePopup = () => {
    try {
      sessionStorage.setItem(POPUP_KEY, 'true');
    } catch {
      /* no-op */
    }
    setPopupOpen(false);
  };

  const closeBar = () => {
    try {
      sessionStorage.setItem(BAR_KEY, 'true');
    } catch {
      /* no-op */
    }
    setBarDismissed(true);
  };

  // ---- 1) Square popup shown once per session ----
  if (popupOpen) {
    return (
      <div
        className="upcoming-batch-overlay"
        onClick={closePopup}
        role="presentation"
      >
        <div
          className="upcoming-batch-notice"
          role="dialog"
          aria-modal="true"
          aria-label={currentLang === 'ne' ? 'नयाँ ब्याच सूचना' : 'New batch notification'}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="upcoming-batch-close"
            onClick={closePopup}
            aria-label={currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Dismiss notification'}
          >
            <X size={18} />
          </button>

          <div className="upcoming-batch-media">
            <img src={image} alt={title} onError={(e) => { e.target.style.display = 'none'; }} />
          </div>

          <div className="upcoming-batch-body">
            <div className="upcoming-batch-tag">
              {currentLang === 'ne' ? 'नयाँ ब्याच • भर्ना खुला' : 'NEW BATCH • ENROLLING NOW'}
            </div>
            <h4 className="upcoming-batch-title">{title}</h4>
            <div className="upcoming-batch-meta">
              {duration && (
                <span><Clock size={13} /> {duration}</span>
              )}
              {nextBatch && (
                <span><CalendarCheck size={13} /> {currentLang === 'ne' ? 'आगामी ब्याच: ' : 'Next batch: '}{nextBatch}</span>
              )}
            </div>
            <button
              className="btn btn-primary upcoming-batch-btn"
              onClick={() => { openLeadModal('training', upcoming.id); closePopup(); }}
            >
              <span>{currentLang === 'ne' ? 'अहिले भर्ना हुनुहोस्' : 'Apply Now'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- 2) Slim notification bar after the popup is dismissed ----
  if (!barDismissed) {
    return (
      <div className="upcoming-batch-bar" role="complementary" aria-label={currentLang === 'ne' ? 'नयाँ ब्याच सूचना' : 'New batch announcement'}>
        <div className="upcoming-batch-bar-inner">
          <span className="upcoming-batch-bar-text">
            {title}
            {nextBatch && (
              <span className="upcoming-batch-bar-date">
                <CalendarCheck size={13} /> {currentLang === 'ne' ? 'सुरु: ' : 'Starts: '}{nextBatch}
              </span>
            )}
          </span>
          <button
            className="upcoming-batch-bar-cta"
            onClick={() => openLeadModal('training', upcoming.id)}
          >
            {currentLang === 'ne' ? 'भर्ना हुनुहोस्' : 'Apply Now'}
            <ArrowRight size={13} />
          </button>
          <button
            type="button"
            className="upcoming-batch-bar-close"
            onClick={closeBar}
            aria-label={currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Dismiss notification'}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
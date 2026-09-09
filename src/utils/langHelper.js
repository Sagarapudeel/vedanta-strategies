// Helper utility for bilingual text resolution with fallback
export function getLangText(item, field, lang = 'en') {
  if (!item) return '';
  const langKey = `${field}_${lang}`;
  if (item[langKey] !== undefined && item[langKey] !== null && item[langKey] !== '') {
    return item[langKey];
  }
  // Fallback to English
  const enKey = `${field}_en`;
  if (item[enKey] !== undefined && item[enKey] !== null && item[enKey] !== '') {
    return item[enKey];
  }
  // Fallback to plain field
  if (item[field] !== undefined && item[field] !== null) {
    return item[field];
  }
  return '';
}

export function getLangArray(item, field, lang = 'en') {
  if (!item) return [];
  const langKey = `${field}_${lang}`;
  if (Array.isArray(item[langKey]) && item[langKey].length > 0) {
    return item[langKey];
  }
  const enKey = `${field}_en`;
  if (Array.isArray(item[enKey]) && item[enKey].length > 0) {
    return item[enKey];
  }
  if (Array.isArray(item[field])) {
    return item[field];
  }
  return [];
}

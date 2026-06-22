export const SITE = {
  name: 'vibranttechnomad.com',
  title: 'vibranttechnomad.com | Premium Domain for Sale — Own the Brand of the Unbound Creator',
  description:
    'vibranttechnomad.com — Premium domain for the intermedia artist era. The definitive brand for nomadic creators empowered by Starlink, AI, and global connectivity. Now available for acquisition.',
  url: 'https://vibranttechnomad.com',
  locale: 'en_US',
  acquisitionEmail: 'sales@desertrich.com',
  updated: '2026-06-01',
} as const;

export const ACQUISITION_MAILTO = `mailto:${SITE.acquisitionEmail}?subject=${encodeURIComponent(
  `${SITE.name} — Domain Acquisition Inquiry`,
)}&body=${encodeURIComponent(
  'Hello,\n\nI am interested in acquiring vibranttechnomad.com. Please share availability, terms, and next steps.\n\n— ',
)}`;

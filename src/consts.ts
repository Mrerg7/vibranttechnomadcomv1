export const SITE = {
  name: 'vibranttechnomad.com',
  title: 'vibranttechnomad.com | Premium Domain for Sale | VibrantTechNomad',
  description:
    'vibranttechnomad.com for sale — $27,500 via secure escrow. Premium brandable .com for nomadic creators, intermedia artists & the Starlink creator economy. Buy now or make an offer.',
  url: 'https://vibranttechnomad.com',
  locale: 'en_US',
  acquisitionEmail: 'sales@desertrich.com',
  updated: '2026-10-01',
  price: 27500,
  priceCurrency: 'USD',
  priceDisplay: '$27,500',
  escrowUrl: 'https://www.escrow.com',
} as const;

export const ACQUISITION_MAILTO = `mailto:${SITE.acquisitionEmail}?subject=${encodeURIComponent(
  `${SITE.name} — Domain Acquisition Inquiry (${SITE.priceDisplay})`,
)}&body=${encodeURIComponent(
  'Hello,\n\nI am interested in acquiring vibranttechnomad.com. Please share availability, terms, and next steps.\n\n— ',
)}`;

export const MAKE_OFFER_MAILTO = `mailto:${SITE.acquisitionEmail}?subject=${encodeURIComponent(
  `Offer for ${SITE.name}`,
)}&body=${encodeURIComponent(
  'Hello,\n\nI would like to make an offer for vibranttechnomad.com.\n\nMy offer (USD): $\nPreferred closing timeline:\nPreferred escrow service (Escrow.com recommended):\n\nThank you.\n\n— ',
)}`;

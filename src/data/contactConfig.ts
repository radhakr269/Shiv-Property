/**
 * Centralized Contact & Communication Configuration for Property Darshan
 * Clearly distinguishes confirmed official business details from pending client confirmations.
 */
export const CONTACT_CONFIG = {
  // Confirmed official business contact numbers
  primaryPhone: '+919721013815',
  secondaryPhone: '+918809269208',
  displayPhones: '+91 9721013815 / +91 8809269208',
  whatsappNumber: '919721013815',
  displayWhatsApp: '+91 9721013815',
  email: 'info@propertydarshan.in',
  address: 'Lucknow, Uttar Pradesh (Physical property site tours available across prime sectors)',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  timing: 'Mon - Sun: 9:00 AM - 8:00 PM',

  // Confirmed social media
  instagramUrl: 'https://instagram.com/_property.darshan_',
  instagramHandle: '@_property.darshan_',

  // Pending confirmation: set to null so no generic social homepages are linked
  facebookUrl: null as string | null,
  youtubeUrl: null as string | null,

  // Verification status flags
  isPhoneConfirmed: true,
  isWhatsAppConfirmed: true,
  isEmailConfirmed: true,
  isAddressConfirmed: true,
  isSocialInstagramConfirmed: true,

  // Native phone dialer link
  getTelLink: (phone = '+919721013815') => `tel:${phone.replace(/\s+/g, '')}`,

  // WhatsApp enquiry link with pre-filled, URI-encoded message
  getWhatsAppLink: (propertyTitle?: string, propertyLocation?: string) => {
    let message = 'Hello Property Darshan, I would like to enquire about premium properties in Lucknow.';
    if (propertyTitle) {
      message = `Hello Property Darshan, I am interested in "${propertyTitle}"${propertyLocation ? ` in ${propertyLocation}` : ''}. Please share complete details, brochure, and schedule a site visit.`;
    }
    return `https://wa.me/919721013815?text=${encodeURIComponent(message)}`;
  },
};

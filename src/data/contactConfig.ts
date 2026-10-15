/**
 * Centralized Contact & Communication Configuration for Shiv Property Uttarakhand
 * Clearly distinguishes confirmed official business details from pending client confirmations.
 */
export const CONTACT_CONFIG = {
  // Verified official business identity
  businessName: 'Shiv Property Uttarakhand',
  
  // Confirmed official business contact number
  primaryPhone: '+919528411441',
  secondaryPhone: '+919528411441',
  displayPhones: '+91 95284 11441',
  whatsappNumber: '919528411441',
  displayWhatsApp: '+91 95284 11441',

  // Pending official business email confirmation (avoid fabricated email addresses)
  email: null as string | null,
  displayEmailNotice: 'Official email pending verification',

  // Primary physical location
  address: 'Rudrapur, Udham Singh Nagar, Uttarakhand, India',
  city: 'Rudrapur',
  state: 'Uttarakhand',
  district: 'Udham Singh Nagar',
  timing: 'Mon - Sun: 9:00 AM - 8:00 PM',

  // Confirmed social media from profile
  instagramUrl: 'https://www.instagram.com/shiv_property_uttarakhand/',
  instagramHandle: '@shiv_property_uttarakhand',
  youtubeUrl: 'https://www.youtube.com/@ShyamapropertiesUttarakhandRud',

  // Verification status flags
  isPhoneConfirmed: true,
  isWhatsAppConfirmed: true,
  isEmailConfirmed: false,
  isAddressConfirmed: true,
  isSocialInstagramConfirmed: true,
  isSocialYoutubeLinked: true,

  // Native phone dialer link
  getTelLink: (phone = '+919528411441') => `tel:${phone.replace(/\s+/g, '')}`,

  // WhatsApp enquiry link with pre-filled, URI-encoded message
  getWhatsAppLink: (propertyTitle?: string, propertyLocation?: string) => {
    let message = 'Hello Shiv Property Uttarakhand, I would like to enquire about properties in Rudrapur, Uttarakhand.';
    if (propertyTitle) {
      message = `Hello Shiv Property Uttarakhand, I am interested in "${propertyTitle}"${propertyLocation ? ` in ${propertyLocation}` : ''}. Please share complete details, location, and schedule a site visit.`;
    }
    return `https://wa.me/919528411441?text=${encodeURIComponent(message)}`;
  },
};

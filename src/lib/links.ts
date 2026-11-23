import { contact, isFilled, show, social, workplace } from '../data/profile'

/** Each helper returns null while the underlying value is still a [placeholder]. */
export const links = {
  tel: isFilled(contact.phone) ? `tel:${contact.phone.replace(/[^\d+]/g, '')}` : null,
  mail: isFilled(contact.email) ? `mailto:${contact.email}` : null,
  whatsapp: isFilled(contact.whatsapp) ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` : null,
  facebook: isFilled(social.facebook) ? social.facebook : null,
  linkedin: isFilled(social.linkedin) ? social.linkedin : null,
  googleBusiness: isFilled(social.googleBusiness) ? social.googleBusiness : null,
  maps: isFilled(workplace.mapsUrl) ? workplace.mapsUrl : null,
  mapEmbed: isFilled(workplace.mapQuery)
    ? `https://www.google.com/maps?q=${encodeURIComponent(workplace.mapQuery)}&output=embed`
    : null,
}

export function formatAddress(): string {
  const a = workplace.address
  return [a.street, a.city, a.region, a.postalCode, a.country].filter(show).join(', ')
}

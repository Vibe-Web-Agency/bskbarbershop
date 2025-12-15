// lib/emails/templates/index.ts
// Export centralisé de tous les templates d'email

// Templates pour les clients
export { getLocksRequestTemplate } from './locks-request';
export { getAppointmentConfirmationTemplate } from './appointment-confirmation';

// Templates pour le gérant (admin)
export { getAdminNewReservationTemplate } from './admin-new-reservation';
export { getAdminNewQuoteTemplate } from './admin-new-quote';

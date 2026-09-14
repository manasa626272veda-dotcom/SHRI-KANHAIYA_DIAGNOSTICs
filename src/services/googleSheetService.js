/**
 * Google Sheet & Gmail Notification Integration Service
 * Target Sheet ID: 1kWWWoPG_91ad-CFrBG5mk4lkAd3aXESL6M1mKPJk-60
 * Target Email: drsreeranga65918@gmail.com
 */

const DEFAULT_SHEET_ID = "1kWWWoPG_91ad-CFrBG5mk4lkAd3aXESL6M1mKPJk-60";
const DEFAULT_NOTIFICATION_EMAIL = "drsreeranga65918@gmail.com";
const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMrC5gRdgp5MymyF_XErP6Z_gEAtLoDnhrJxYxLuSn5YVCQkHszxyhNVyIPdA7ZB4p/exec";

/**
 * Sends appointment booking data to Google Apps Script Web App.
 * The Apps Script appends the record to Google Sheets and fires a Gmail notification.
 * 
 * @param {Object} appointment 
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function sendAppointmentToGoogleSheet(appointment) {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  const payload = {
    sheetId: DEFAULT_SHEET_ID,
    notificationEmail: DEFAULT_NOTIFICATION_EMAIL,
    bookingId: appointment.bookingId || `SKD-${Date.now()}`,
    patientName: appointment.patientName || '',
    email: appointment.email || '',
    phone: appointment.phone ? `'${appointment.phone}` : '',
    dateOfBirth: appointment.dateOfBirth || '',
    gender: appointment.gender || '',
    address: appointment.address || '',
    service: appointment.service || '',
    doctor: appointment.doctor || 'Shri Kanhaiya Diagnostics Team',
    date: appointment.date || '',
    time: appointment.time || '',
    reason: appointment.reason || '',
    notes: appointment.notes || '',
    status: appointment.status || 'Confirmed',
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  console.log('Sending appointment payload to Google Sheet integration...', payload);

  if (!scriptUrl) {
    console.warn(
      'VITE_GOOGLE_SCRIPT_URL is not configured yet in .env.local. ' +
      'Please deploy the Google Apps Script and set VITE_GOOGLE_SCRIPT_URL.'
    );
    return {
      success: false,
      message: 'Apps Script URL not set. Follow setup instructions to connect Google Sheet.',
    };
  }

  try {
    // Google Apps Script Web Apps require POST with JSON payload.
    // mode: 'no-cors' allows cross-origin submission from client browser without CORS blockage.
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Appointment successfully posted to Google Apps Script!');
    return { success: true };
  } catch (err) {
    console.error('Error posting appointment to Google Sheet:', err);
    return { success: false, message: err.toString() };
  }
}

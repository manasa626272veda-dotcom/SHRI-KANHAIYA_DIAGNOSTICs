/**
 * Google Apps Script for Shri Kanhaiya Diagnostics & Chest Pain Clinic
 * Web App Endpoint for Appointment Booking, Google Sheets Sync & Dual Email Notifications
 * 
 * Target Sheet ID: 1kWWWoPG_91ad-CFrBG5mk4lkAd3aXESL6M1mKPJk-60
 * Target Doctor Email: drsreeranga65918@gmail.com
 * 
 * Deployment Instructions:
 * 1. Open Google Sheets (ID: 1kWWWoPG_91ad-CFrBG5mk4lkAd3aXESL6M1mKPJk-60)
 * 2. Go to Extensions -> Apps Script
 * 3. Replace all code in Code.gs with this script
 * 4. Click "Deploy" -> "New deployment"
 * 5. Select type: "Web app"
 * 6. Set Description: "Shri Kanhaiya Diagnostics Booking WebApp v2"
 * 7. Set Execute as: "Me"
 * 8. Set Who has access: "Anyone"
 * 9. Click "Deploy" (or "Authorize Access" if prompted)
 * 10. Copy the Web App URL into your .env.local file as VITE_GOOGLE_SCRIPT_URL
 */

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "Shri Kanhaiya Diagnostics & Chest Pain Clinic Appointment Service v2.0 is running active!",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var sheetId = data.sheetId || "1kWWWoPG_91ad-CFrBG5mk4lkAd3aXESL6M1mKPJk-60";
    var doctorEmail = data.notificationEmail || "drsreeranga65918@gmail.com";

    // Open Target Google Spreadsheet
    var ss = SpreadsheetApp.openById(sheetId);
    var sheet = ss.getSheetByName("Appointments") || ss.getActiveSheet();

    // ─── 1. Header Row Initialization & Auto-Styling ──────────────────────────
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Booking ID",
        "Submission Time",
        "Patient Name",
        "Phone Number",
        "Email",
        "Age",
        "Gender",
        "Service Requested",
        "Doctor",
        "Appointment Date",
        "Time Slot",
        "Reason / Symptoms",
        "Address",
        "Notes",
        "Status"
      ];
      sheet.appendRow(headers);

      // Format Header Row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#06192E");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      headerRange.setHeight(36);
      headerRange.setVerticalAlignment("middle");
      sheet.setFrozenRows(1);
    }

    // Prepare cleaned data fields
    var bookingId = data.bookingId || ("SKD-" + Date.now());
    var submittedAt = data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var patientName = data.patientName || "N/A";
    var phone = data.phone || "N/A";
    var email = data.email || "N/A";
    var age = data.age ? (data.age + " Yrs") : "N/A";
    var gender = data.gender || "N/A";
    var service = data.service || "General Cardiac Consultation";
    var doctor = data.doctor || "Dr. Sree Ranga P.C.";
    var apptDate = data.date || "N/A";
    var apptTime = data.time || "N/A";
    var reason = data.reason || "N/A";
    var address = data.address || "N/A";
    var notes = data.notes || "None";
    var status = data.status || "Confirmed";

    // ─── 2. Append Row to Google Sheet ────────────────────────────────────────
    sheet.appendRow([
      bookingId,
      submittedAt,
      patientName,
      phone,
      email,
      age,
      gender,
      service,
      doctor,
      apptDate,
      apptTime,
      reason,
      address,
      notes,
      status
    ]);

    // Format new row
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, 15);
    rowRange.setVerticalAlignment("middle");
    if (lastRow % 2 === 0) {
      rowRange.setBackground("#F8FAFC");
    }

    // ─── 3. HTML Email to Doctor / Clinic ──────────────────────────────────────
    var doctorSubject = "🚨 New Appointment Booking: " + patientName + " (" + bookingId + ")";
    var doctorHtmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background-color: #06192E; padding: 24px 28px; text-align: left; border-bottom: 4px solid #E52323;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; tracking-wide: 0.5px;">
            ❤️ SHRI KANHAIYA DIAGNOSTICS & CHEST PAIN CLINIC
          </h2>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">New Online Patient Appointment Alert</p>
        </div>

        <!-- Content -->
        <div style="padding: 28px;">
          <div style="background-color: #FEF2F2; border-left: 4px solid #E52323; padding: 14px 18px; border-radius: 6px; margin-bottom: 24px;">
            <p style="margin: 0; color: #991B1B; font-weight: 700; font-size: 15px;">New Booking Received</p>
            <p style="margin: 4px 0 0 0; color: #7F1D1D; font-size: 13px;">Booking ID: <strong>${bookingId}</strong> | Date: ${submittedAt}</p>
          </div>

          <h3 style="color: #0f172a; font-size: 15px; margin-bottom: 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">PATIENT DETAILS</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 35%;">Patient Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${patientName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Age & Gender:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${age} | ${gender}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Contact Phone:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Email Address:</td><td style="padding: 8px 0; color: #0f172a;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Residential Address:</td><td style="padding: 8px 0; color: #0f172a;">${address}</td></tr>
          </table>

          <h3 style="color: #0f172a; font-size: 15px; margin-bottom: 12px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">APPOINTMENT DETAILS</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 35%;">Service Requested:</td><td style="padding: 8px 0; color: #E52323; font-weight: 700;">${service}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Consulting Doctor:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${doctor}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Scheduled Date & Time:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${apptDate} at ${apptTime}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Reason / Symptoms:</td><td style="padding: 8px 0; color: #334155;">${reason}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Additional Notes:</td><td style="padding: 8px 0; color: #334155;">${notes}</td></tr>
          </table>

          <div style="text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <a href="https://docs.google.com/spreadsheets/d/${sheetId}" style="display: inline-block; background-color: #06192E; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              📊 Open Live Google Sheet
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
          Automated Notification System • Shri Kanhaiya Diagnostics & Chest Pain Clinic
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: doctorEmail,
      subject: doctorSubject,
      htmlBody: doctorHtmlBody
    });

    // ─── 4. Optional Confirmation Email to Patient ─────────────────────────────
    if (email && email !== "N/A" && email.indexOf("@") !== -1) {
      try {
        var patientSubject = "Appointment Request Received - Shri Kanhaiya Diagnostics (" + bookingId + ")";
        var patientHtmlBody = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #06192E; padding: 20px 24px; text-align: center; border-bottom: 4px solid #E52323;">
              <h2 style="color: #ffffff; margin: 0; font-size: 18px;">Shri Kanhaiya Diagnostics & Chest Pain Clinic</h2>
            </div>
            <div style="padding: 24px; font-size: 14px; color: #334155; line-height: 1.6;">
              <p>Dear <strong>${patientName}</strong>,</p>
              <p>Thank you for scheduling your appointment with us online. Your appointment request has been logged successfully.</p>
              
              <div style="background-color: #F0F7FE; border: 1px solid #BAE6FD; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; font-weight: 700; color: #0369A1;">Appointment Summary:</p>
                <p style="margin: 4px 0;">• <strong>Booking Reference:</strong> ${bookingId}</p>
                <p style="margin: 4px 0;">• <strong>Service:</strong> ${service}</p>
                <p style="margin: 4px 0;">• <strong>Doctor:</strong> ${doctor}</p>
                <p style="margin: 4px 0;">• <strong>Date & Time:</strong> ${apptDate} at ${apptTime}</p>
              </div>

              <p>Our clinic desk will confirm your appointment shortly. If you have any urgent queries, please feel free to reach us directly at <strong>+91 98860 00000</strong>.</p>
              
              <p style="margin-top: 24px; color: #64748b; font-size: 13px;">Warm regards,<br><strong>Shri Kanhaiya Diagnostics & Chest Pain Clinic Team</strong></p>
            </div>
          </div>
        `;

        MailApp.sendEmail({
          to: email,
          subject: patientSubject,
          htmlBody: patientHtmlBody
        });
      } catch (ePatient) {
        console.warn("Could not send patient confirmation email:", ePatient.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success", bookingId: bookingId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

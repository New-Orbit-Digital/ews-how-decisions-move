/**
 * EWS · How Decisions Move — feedback endpoint
 *
 * Paste this into the Apps Script editor attached to the feedback Sheet,
 * then deploy it as a Web app. Step-by-step: see SETUP.md.
 *
 * The Sheet's first row must already be these four headers:
 *   Timestamp | Name | Feedback | Context
 *
 * Every note the form sends is appended as one new row.
 */

// Longest we accept for each field. Anything longer is trimmed, not rejected —
// a too-long note is still worth keeping.
var LIMITS = { name: 100, feedback: 1000, context: 300 };

function doPost(e) {
  var form = (e && e.parameter) ? e.parameter : {};

  // The form has a hidden field no person can see. If something filled it in,
  // it was a bot: say OK, write nothing.
  if (String(form.website || '').trim() !== '') {
    return reply({ ok: true });
  }

  var feedback = String(form.feedback || '').trim();
  if (!feedback) {
    return reply({ ok: false, error: 'empty feedback' });
  }

  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().appendRow([
    new Date(),
    String(form.name || '').trim().slice(0, LIMITS.name),
    feedback.slice(0, LIMITS.feedback),
    String(form.context || '').trim().slice(0, LIMITS.context)
  ]);

  return reply({ ok: true });
}

// Apps Script needs a reply object; the page does not read it.
function reply(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

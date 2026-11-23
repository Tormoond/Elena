/**
 * google-apps-script.gs
 * Paste into a Google Sheet owned by lenasorochenk@gmail.com:
 *   Extensions → Apps Script → replace Code.gs with this file.
 *
 * On every consultation request from the website it:
 *   1. adds a row to the "Заявки" sheet,
 *   2. sends a WhatsApp message to WHATSAPP_PHONE via CallMeBot,
 *   3. sends a backup email to NOTIFY_EMAIL.
 *
 * Script Properties (Project Settings → Script Properties):
 *   CALLMEBOT_APIKEY — required for WhatsApp; CallMeBot sends it to the phone below
 *   WHATSAPP_PHONE   — optional, overrides the default number below
 */

const SHEET_NAME = "Заявки";
const HEADERS = ["Дата заявки", "Ім'я", "Email", "Телефон", "Послуга", "Бажаний час", "Повідомлення", "Мова", "Сторінка"];
const DEFAULT_WHATSAPP_PHONE = "+420728345904";
const NOTIFY_EMAIL = "lenasorochenk@gmail.com";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const p = (e && e.parameter) || {};

    if (p.website) return json({ ok: true }); // bot trap
    if (!p.name || !p.email) {
      return json({ ok: false, error: "Name or email missing" });
    }

    getSheet().appendRow([
      new Date(),
      clean(p.name),
      clean(p.email),
      clean(p.phone),
      clean(p.service),
      clean(p.date).replace("T", " "),
      clean(p.message),
      clean(p.lang),
      clean(p.page),
    ]);

    const text = buildMessage(p);
    sendWhatsApp(text);
    sendEmail(p, text);

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the /exec URL in a browser shows this, so you can check the deployment is live
function doGet() {
  return json({ ok: true, service: "consultation form" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function buildMessage(p) {
  return [
    "🔔 Нова заявка на консультацію!",
    "👤 " + clean(p.name),
    "📧 " + clean(p.email),
    p.phone ? "📞 " + clean(p.phone) : "",
    p.service ? "🧩 " + clean(p.service) : "",
    p.date ? "🗓 Бажаний час: " + clean(p.date).replace("T", " ") : "",
    p.message ? "💬 " + clean(p.message).slice(0, 300) : "",
  ].filter(Boolean).join("\n");
}

function sendWhatsApp(text) {
  const props = PropertiesService.getScriptProperties();
  const phone = props.getProperty("WHATSAPP_PHONE") || DEFAULT_WHATSAPP_PHONE;
  const apikey = props.getProperty("CALLMEBOT_APIKEY");
  if (!apikey) {
    console.warn("WhatsApp is not set up: add CALLMEBOT_APIKEY in Script Properties");
    return;
  }

  const url =
    "https://api.callmebot.com/whatsapp.php" +
    "?phone=" + encodeURIComponent(phone) +
    "&text=" + encodeURIComponent(text) +
    "&apikey=" + encodeURIComponent(apikey);

  // A WhatsApp failure must not lose the row in the sheet
  try {
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) console.error("CallMeBot " + res.getResponseCode() + ": " + res.getContentText());
  } catch (err) {
    console.error("WhatsApp error: " + err);
  }
}

function sendEmail(p, text) {
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: clean(p.email),
      subject: "Нова заявка на консультацію: " + clean(p.name),
      body: text + "\n\n" + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
  } catch (err) {
    console.error("Email error: " + err);
  }
}

// Guards against formulas in cells (=, +, -, @) and overly long values
function clean(value) {
  let s = String(value || "").trim().slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor: grants permissions, then checks the sheet, WhatsApp and email
function testSubmission() {
  doPost({ parameter: { name: "Тест", email: "test@example.com", phone: "+420000000000", service: "Interior Design", date: "2026-12-01T10:00", message: "Перевірка", lang: "uk" } });
}

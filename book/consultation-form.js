/**
 * consultation-form.js
 * Sends the "Discuss a project" form (#contact-form in index.html) to a
 * Google Apps Script web app, which writes a row to Google Sheets
 * (lenasorochenk@gmail.com) and pings WhatsApp. See google-apps-script.gs.
 *
 * Loaded at the end of index.html:
 *   <script src="book/consultation-form.js"></script>
 *
 * Fields sent: name, email, phone, service, date, message, lang, page.
 * The hidden "website" field is a bot trap: real people leave it empty.
 */

(function () {
  // 👉 Paste the Web app URL from Apps Script (Deploy → Manage deployments). It ends with /exec
  const SCRIPT_URL = "https://script.google.com/macros/s/PASTE_YOUR_DEPLOYMENT_ID/exec";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const T = {
    en: {
      need: "Please enter your name and email.",
      sending: "Sending…",
      okH: "Got it, thank you.",
      okP: "I'll reply within one working day, usually with a few questions about the space.",
      fail: "Couldn't send. Please try again or write to lenasorochenk@gmail.com.",
    },
    uk: {
      need: "Будь ласка, вкажіть ім'я та email.",
      sending: "Надсилаємо…",
      okH: "Отримала, дякую!",
      okP: "Відповім протягом робочого дня, зазвичай із кількома запитаннями про простір.",
      fail: "Не вдалося надіслати. Спробуйте ще раз або напишіть на lenasorochenk@gmail.com.",
    },
    cs: {
      need: "Vyplňte prosím jméno a e-mail.",
      sending: "Odesílám…",
      okH: "Mám to, děkuji.",
      okP: "Odpovím do jednoho pracovního dne, obvykle s pár otázkami k prostoru.",
      fail: "Odeslání se nepovedlo. Zkuste to znovu nebo napište na lenasorochenk@gmail.com.",
    },
  };
  const t = () => T[document.documentElement.lang] || T.en;

  const statusEl = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');

  function setStatus(text, type) {
    if (!statusEl) return;
    statusEl.textContent = text || "";
    statusEl.className = type ? "is-" + type : "";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const val = (k) => (data.get(k) || "").toString().trim();

    // A bot filled the hidden field: pretend it worked, send nothing
    if (val("website")) return showThanks();

    const name = val("name");
    const email = val("email");
    if (!name || !email) return setStatus(t().need, "error");

    const payload = new URLSearchParams({
      name,
      email,
      phone: val("phone"),
      service: val("service"),
      date: val("date"),
      message: val("message"),
      lang: document.documentElement.lang || "en",
      page: location.href,
    });

    button.disabled = true;
    setStatus(t().sending);

    try {
      if (SCRIPT_URL.includes("PASTE_YOUR")) throw new Error("SCRIPT_URL is not set in book/consultation-form.js");

      // x-www-form-urlencoded is a "simple" request: no CORS preflight
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 20000);
      const response = await fetch(SCRIPT_URL, { method: "POST", body: payload, signal: ctrl.signal });
      clearTimeout(timer);
      const result = await response.json().catch(() => ({ ok: response.ok }));
      if (result.ok === false) throw new Error(result.error || "Server error");

      showThanks();
    } catch (err) {
      console.error(err);
      setStatus(t().fail, "error");
      button.disabled = false;
    }
  });

  function showThanks() {
    const m = t();
    form.innerHTML =
      '<div class="form-ok" role="status"><i class="fa-regular fa-circle-check" aria-hidden="true"></i>' +
      "<p>" + m.okH + "</p><p>" + m.okP + "</p></div>";
  }
})();

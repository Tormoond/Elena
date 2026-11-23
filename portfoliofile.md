# Portfolio Site Playbook

Lessons and reusable pieces from building **Elena · Interior Designer** (`index.html`, Nov 21–23, 2026).
Use this as the starting brief for the next portfolio or one-page site.

---

## 1. What happened in this project

| # | Request | What was done |
|---|---------|---------------|
| 1 | "Refresh the site using the Owl-Listener design skills" | Found the page sold Elena as a **web designer** with invented projects, while `photo/` held her real **interior/architecture** renders. Asked first, then rebuilt the site around the real work, in EN / UA / CZ. |
| 2 | Interiors Collection as a "cards fan-out" | 21 images → **3 stacks of 7** across the full width. Fan out on hover or tap; click opens the lightbox. |
| 3 | Bigger cards, language-switch animation, mobile hamburger | Cards ~12% larger. Sliding "pill" with a bounce, plus a blur/fade text swap. Full-screen mobile menu with links, language switch, CTA and email. |
| 4 | Next section moves over the Hero | Sticky hero; the marquee and stats slide up like a sheet while the hero shrinks and darkens. |
| 5 | New portrait PNG → JPEG, same colour | Cropped a 1–5px dark screenshot frame and saved as JPEG q92 (average RGB identical). Removed the `mix-blend-mode` that tinted it. |
| 6 | Custom cursor, desktop only | Dot (8px) plus a ring (32px) with lerp 0.12; ring `scale(2)` on links. Strict desktop detection. |
| 7 | "Scroll up" button next to the logo | First a desktop pill next to the logo. **Later moved to the footer** on every screen size (see 14). |
| 8 | New About heading | "I'm a sketch designer. From the first sketch to the final drawing on your project." (EN/UA/CZ). |
| 9 | Contact details | Location → **Plzeň, Czech Republic**. Added WhatsApp **+420-728-256-152** (`wa.me/420728256152`). Email → **kornienko.lena.k@gmail.com**, replaced everywhere (4 places) so the site never shows two addresses. |
| 10 | Hero label | "Interior design & visualization · Czech Republic · Plzeň" (EN/UA/CZ). |
| 11 | Mobile footer "Scroll up" | Full-width pill with an orange ↑ circle, shown up to 1080px wide. |
| 12 | Wave dividers from `wave-haikei.svg` | 7 waves between sections, coloured like the section below, every other one mirrored. |
| 13 | "What do you need?" dropdown + mobile contact | Custom dropdown with icons, ✓ and keyboard support. Contact section centred on phones. |
| 14 | Copyright line, move "Scroll up" | "© 2026 Elena. All rights reserved. · Created with love in the Czech Republic". The nav button was removed; the footer button now shows on desktop too (compact pill). |
| 15 | Mobile CTA: email and button on one line | At ≤768px: `.cta-mail` uses `clamp(18px,6.4vw,30px)` + `nowrap`; `#cta .btn` uses `clamp(14px,4.4vw,17px)` with padding `14px 20px`. Checked at 320 and 390px. |
| 16 | Remove the email from the CTA section | Removed the `.cta-mail` link and its CSS. The button got `margin-top:var(--s4)` to keep the spacing. The email still appears in the mobile menu, the contact block and the footer. |
| 17 | Consultation form → Google Sheet + WhatsApp | `#contact-form` now posts to a Google Apps Script web app (`book/google-apps-script.gs`) through `book/consultation-form.js`: a row in the "Заявки" sheet, a WhatsApp message to **+420 728 345 904** via CallMeBot, and a backup email to lenasorochenk@gmail.com. New optional fields: phone/WhatsApp and preferred call time (EN/UA/CZ), a honeypot field and a status line. **Waiting on deployment** (see §7). |
| 18 | New email and phone everywhere | Email → **lenasorochenk@gmail.com**, phone/WhatsApp → **+420 728 345 904** (`wa.me/420728345904`) in the mobile menu, contact block, footer and both `book/` scripts. The site and the WhatsApp notifications now use the same number. |
| 19 | Site phone back to 256 152; date field; logo scrolls up | Site WhatsApp → **+420 728 256 152** (`wa.me/420728256152`). WhatsApp **notifications still go to +420 728 345 904** (`DEFAULT_WHATSAPP_PHONE` in the `.gs`). "Preferred call time" restyled to match the custom dropdown: a calendar badge (fills with accent when focused or filled), a chevron, the whole field opens the picker, muted empty state, and `appearance:none` + `min-width:0` so it never overflows on phones. Phone and date are now full width (side by side cut off the time). Clicking the ELENA logo (`#hero`) scrolls to the top via `lenis.scrollTo(0)`. |
| 20 | Booking-style call-time picker | The client supplied a React + framer-motion booking widget. It was rebuilt in vanilla JS in the site style, replacing the native `datetime-local` field (see §4.12). |
| 21 | Book up to a month ahead | The picker now lists every weekday up to one month ahead instead of 10 days. The month name follows the scroll position. |
| 22 | Make the site load fast | Two resized copies of every gallery photo: `photo/thumbs/` (720px, q80) and `photo/thumbs-sm/` (420px, q78). Page images use `srcset` + `sizes`; the fans and the lightbox strip use the 420px copies; the lightbox itself still opens the originals. The hero image is preloaded with `fetchpriority=high`. Font Awesome CSS no longer blocks the first paint; CDNs are preconnected; Jost 300 was dropped. **First load: 5.8 MB → 1.2 MB on phones, 1.6 MB on desktop.** Also fixed a load bug (see §4.10): the page opened scrolled down to the contact form. |
| 23 | Push to GitHub | Repo: **github.com/Tormoond/Elena-portfolio--2** (branch `main`). The form scripts, thumbnails and speed work went in a second commit. `.gitignore` keeps the old web-designer backup and throwaway `_*.html` copies out. |
| 24 | Link preview shows "ELENA INTERIORS" | `<title>` (and the `uk`/`cs` `title` keys) → **ELENA INTERIORS**. Added Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image` = the lake guesthouse 720px thumb, `twitter:card`). Meta description: Barcelona → Plzeň. Live site: **https://tormoond.github.io/Elena-portfolio--2/**. Telegram caches previews; refresh with @WebpageBot or send the link with `?v=2`. |

**Key decision:** the site must show the **real work**. Invented stats, testimonials and stock photos were removed rather than reworded.

---

## 2. Final page structure

```
nav (logo | links | EN/UA/CZ pill | CTA | burger ≤1080px)
mobile menu (numbered links, language switch, CTA, email)
hero (sticky; label "… · Czech Republic · Plzeň"; arched render + tilted floor-plan card)
marquee + facts  ← slides over the hero              ~ wave ~
work: 5 project cards (lightbox) + Interiors Collection (3 fanned stacks)   ~ wave ~
services (1 featured + 3)   ~ wave ~   process (4 steps)   ~ wave ~
about (portrait JPEG, "I'm a sketch designer…")   ~ wave ~
CTA   ~ wave ~   contact (email, WhatsApp, Plzeň; custom dropdown)   ~ wave ~
footer (columns, "Scroll up" pill, copyright "…in the Czech Republic")
lightbox (thumbnails, arrows, swipe, Esc, focus trap)
```

Current contact facts: **lenasorochenk@gmail.com** · WhatsApp **+420 728 256 152** (form notifications go to +420 728 345 904) · **Plzeň, Czech Republic** · Instagram **@elena.sketch** · Mon–Fri 9:00–18:00 CET.

Stack: one static `index.html` with no build step, plus `book/consultation-form.js` (form → Google Apps Script). Images: originals in `photo/<project>/`, 720px copies in `photo/thumbs/`, 420px copies in `photo/thumbs-sm/`. CDN libraries: Lenis 1.0.42, GSAP 3.12.2, AOS 2.3.1, Font Awesome 6.4. Fonts: Cormorant Garamond for headings, Jost for body text.
Palette: terracotta `#C8693D`, cream `#F7F1E8` / `#FBF6EF`, dark `#171210`.

---

## 3. Before writing anything: discovery checklist

1. **Look at the assets, not just the code.** Build a labelled contact sheet of every image folder (see §6). The photos told the real story here.
2. **Check embedded base64 images.** Decode them, because they may be the portrait or someone else's stock photo with a watermark.
3. **Flag invented content.** Look for stats, testimonials, client names and "years of experience". Ask, or remove; never polish fiction.
4. **Ask only real decisions** (positioning, languages). Use defaults for everything else.
5. **Back up first:** `cp index.html index.backup-<label>.html`.

---

## 4. Reusable techniques

### 4.1 i18n with no library
- Mark text with `data-i18n="key"` (innerHTML) and alt text with `data-i18n-alt`.
- English is **captured from the DOM** at load (`EN[key]=el.innerHTML`), so only the other languages live in `I18N.uk` / `I18N.cs`.
- Keys can be reused in several places (e.g. `pj.plans.t` is both a card title and a service name).
- The choice persists in `localStorage` inside try/catch.
- **Always check key coverage** (§6).

### 4.2 Language-switch animation
- An absolutely positioned `.lang-pill` sits behind the buttons. JS sets `left`/`width` from the active button's `offsetLeft`/`offsetWidth`.
- Transition the pill with `cubic-bezier(.34,1.56,.64,1)` (overshoot). A `.bump` class plays a squash keyframe.
- Text swap: add `lang-anim lang-fading` (opacity 0, `blur(6px)`) → wait 220ms → render → remove `lang-fading` → after 300ms remove `lang-anim`.
- Only transition `[data-i18n]` **during** the switch, otherwise it fights GSAP/AOS opacity tweens.
- Add the `ready` class after the first placement so the pill doesn't animate from 0 on load. Re-place it on `document.fonts.ready` and on resize.

### 4.3 Lightbox (one for all projects)
- `PROJECTS = {key:{dir, files[]}}`. Build paths with `encodeURI` because folder names contain spaces.
- One delegated `click` listener on `[data-project]` with optional `data-index`.
- Include Esc, arrow keys, swipe (50px threshold), a thumbnail strip with `aria-current`, a Tab focus trap, and focus restored on close.
- Preload the next image. Call `lenis.stop()` while it's open.

### 4.4 Cards fan-out (3 × 7)
- Each stack has `container-type:inline-size`, so all sizes use **`cqw`** and the fan scales with its column and never collides.
- Card: `width:38cqw; aspect-ratio:5/7`, `transform-origin:50% 100%`, `--i` from −3…3, `--z = 10-|i|`.
- Fanned: `translateX(i*6.5cqw) translateY(i²*.9cqw) rotate(i*4deg)`. The hovered card lifts −6cqw and scales 1.08; the others dim.
- Fit rule: half card + 3×spread + (card height × sin(max angle)) ≤ 50cqw.
- Opens on `:hover`, `:focus-within` and `.open`. On touch (`hover:none`), the first tap adds `.open` with `stopPropagation`, and the second tap opens the lightbox.

### 4.5 Next section covering the hero
- `#hero{position:sticky; top:0; z-index:0}`, with every later `section`/`footer` at `z-index:1` and an opaque background.
- The covering strip gets `border-radius:28px 28px 0 0` and an upward shadow.
- **A hero taller than the screen (phones):** set `hero.style.top = min(0, innerHeight - heroH)` so it scrolls to its bottom before pinning.
- Progress `p = clamp((scrollY - max(0,H-V)) / min(V,H))`. The hero content gets `translateY(-60p) scale(1-.08p)` and opacity `1-.55p`; the shade overlay gets `.8p`.
- Set `visibility:hidden` when p = 1 so the hidden hero isn't painted.
- **Links to `#hero` must scroll to 0 explicitly.** A sticky element's offset is wherever it is pinned, so `lenis.scrollTo(hero)` barely moves.

### 4.6 Mobile menu
- Shown at ≤1080px. Tablets need it too, because the nav links are hidden from 1080px down.
- **The nav's stacking context traps the burger:** when the menu is open, raise `#nav` above the menu (`.menu-open #nav{z-index:1003}`).
- `setMenu(open)` handles the class, `aria-expanded`, `aria-hidden`, the label ("Close menu"), body overflow, `lenis.stop/start`, Esc, and auto-close above 1080px.
- Links stagger in with `transition-delay: calc(var(--d)*60ms + 120ms)`.

### 4.7 Custom cursor: desktop only
- Turn it on only if `matchMedia('(hover:hover) and (pointer:fine) and (min-width:1081px)')` **and** the user agent isn't a phone or tablet, including iPadOS (`Macintosh` + `maxTouchPoints>1`).
- Create or remove the DOM nodes in `enable()`/`disable()`, and re-run on the media query's `change` event.
- Gate the CSS on `html.cursor-on`. Add `has-cursor` only after the first mousemove, so the system cursor is never hidden without a replacement.
- Ring: `currentX += (targetX - currentX) * 0.12` in rAF. Nest an inner `<span>` for `scale(2)` so the scale doesn't fight the translate.
- Keep `cursor:text` on inputs and textareas. Keep the cursor `pointer-events:none` and above the lightbox (z-index 5000).
- **DevTools "Responsive" mode still reports a mouse,** so width + UA gating is required, not just `pointer:fine`.

### 4.8 Scroll-up button (footer)
- The final placement is **in the footer, above the copyright line**, on every screen size. The client didn't want it in the nav.
- Phones and tablets: a full-width pill (max 360px, min-height 52px). Desktop: a compact pill (`width:auto`).
- Use one shared handler for every `.to-top, .foot-top`: `lenis ? lenis.scrollTo(0,{duration:1.4}) : scrollTo({top:0,behavior})`.
- Reuse the translation key `nav.top` (Scroll up / Нагору / Nahoru).

### 4.9 Wave dividers between sections
- Take only the `<path>` from the SVG (Haikei export) and put it in **one `<symbol>` sprite** right after `<body>`.
- Crop the viewBox to the wave strip (`0 380 900 71`) and use `preserveAspectRatio="none"` with `fill="currentColor"`.
- Each section ends with `<svg class="wave" style="color:NEXT-SECTION-BG"><use href="#wave-shape"/></svg>`, positioned absolute, `bottom:-1px`, height `--wave-h: clamp(34px,5vw,72px)`.
- Alternate `.flip` (`scaleX(-1)`) so the waves don't repeat.
- Add `padding-bottom: calc(normal + var(--wave-h))` so the wave never covers content.
- **Seamless joins:** gradient backgrounds next to a wave must run **top-to-bottom (180deg)**; a diagonal gradient leaves a visible colour step at the edge.
- Remove border-tops that the wave replaces (the footer's orange line).
- Ignore the SVG's own colours (navy rect, blue fill) and use the site palette.

### 4.10 Custom `<select>` ("What do you need?")
- Keep the **native `<select>` visually hidden** (`tabindex=-1`, `aria-hidden`) so the form still submits the value.
- Wrap it in a `div.field`, not a `<label>`, or clicking the label focuses the hidden select.
- Add a button (`aria-haspopup="listbox"`, `aria-expanded`) plus `ul[role=listbox]` with `li[role=option][aria-selected]`, built **from the native options**. Icons come from `data-icon` on each `<option>`.
- `cselectSync()` rebuilds the list. Call it from `render()` (language change) and after any code that sets `selectedIndex` (the "Ask about this" links).
- **Never call `scrollIntoView` on the options** to keep the active one visible. On load the list is hidden, so the browser scrolls the **whole page** to the form (the site opened at the contact section). Adjust `list.scrollTop` instead, and only while the list is open.
- Keyboard: ↑/↓/Home/End move `.active` with `aria-activedescendant`; Enter/Space selects; Esc and Tab close; clicking outside closes.
- Style: cream panel, radius 12px, soft shadow, fade plus slide-in. The selected option is solid accent with a ✓. Remove the focus outline on the list itself (`.cselect-list:focus{outline:0}`), or it doubles the border.

### 4.11 Mobile contact section
- At ≤768px, centre the heading, the intro, and the contact lines (`.c-line{justify-content:center}`).
- Keep form labels **left-aligned**, because they're easier to read and fill in.
- Separate the details from the form with a thin top border on the form.


### 4.13 Page speed
- **Images are the weight.** The originals are Telegram JPEGs (1280px, 150–380 KB). Make resized copies with PowerShell `System.Drawing` (HighQualityBicubic + JPEG quality encoder), in parallel folders that keep the same names: `photo/thumbs/<dir>/` 720px, `photo/thumbs-sm/<dir>/` 420px.
- `<img src=thumb srcset="thumb 720w, original 1280w" sizes="…">`, with `sizes` matched to the layout (wide card 58vw, mid 42vw, small 34vw, all 100vw on phones). Keep `width`/`height` so there's no layout shift, and use `loading="lazy" decoding="async"` below the fold.
- JS gallery paths: `src(p,i,t)`, where t=1 → `thumbs/`, t=2 → `thumbs-sm/`, and no t → the original (lightbox stage only).
- Preload the hero (LCP) image with `imagesrcset`/`imagesizes` and `fetchpriority="high"`.
- Non-blocking icon CSS: `<link rel="preload" as="style" onload="this.rel='stylesheet'">` plus a `<noscript>` fallback. Keep the AOS CSS blocking, or animated blocks flash before they hide.
- **Measure** with a tiny local Node static server (`path.resolve` the root, or Windows paths fail the `startsWith` check), then sum `performance.getEntriesByType("resource")` `encodedBodySize` in headless Edge. `file://` reports 0 bytes.
- Headless screenshots of the full page can come out blank. Check `scrollY` first: here it was the real bug above.

### 4.12 Call-time picker (from a React/framer-motion widget, no libraries)
- Markup: `div.field#dp` (not a `<label>`, because it holds buttons) with a month header + ‹ › buttons, `.dp-days` strip, `.dp-times` grid, `.dp-pick` summary, and a **hidden `input name="date"`** holding `YYYY-MM-DDTHH:MM`, so the Apps Script didn't change.
- Days: **every weekday from tomorrow up to one month ahead** (about 22 days), labelled with `Intl.DateTimeFormat` in the current language (capitalised, trailing "." stripped). Slots 09–12 and 14–17 Czech time; they are the same every day because there is no real availability data.
- framer-motion → CSS: `layoutId` pill = an absolute `.dp-pill` moved via `left`/`width` with the language-pill overshoot curve; `AnimatePresence` = a `.out` class (fade up, 160ms) and then a rebuild; staggered slots = `animation-delay: calc(var(--i)*40ms)`; summary reveal = a `grid-template-rows: 0fr → 1fr` transition.
- The month header follows the **first visible day** while scrolling (November → December).
- The strip scrolls sideways (`data-lenis-prevent`, hidden scrollbar, snap). The ‹ › buttons page by 80% and disable at the ends, and they hide when everything fits.
- `window.dpSync()` is called from `render()`, so the days relabel on language change.
- Screenshot it with `*{transition:none!important;animation:none!important}` in the throwaway copy, or the pill and slots are captured mid-animation.
---

## 5. Design rules applied (from the Owl-Listener skills pack)

`C:\Users\pavel\Desktop\Owl-Listener Skills`: the most useful skills were visual-hierarchy, typography-scale, readable-measure, aesthetic-usability, hicks-law, peak-end-rule, animation-principles, case-study and ux-writing.

- **Type and spacing:** a fluid type scale on a 1.333 ratio using `clamp()`, and an 8pt spacing scale kept as CSS variables.
- **Line length:** body copy at `max-width` 50–58ch.
- **Restraint reads as quality:** particles, pulsing badges, tilt and "Swiper for everything" were removed. Keep only purposeful motion and always honour `prefers-reduced-motion`.
- **Show the work first:** a real render in the hero, projects before services, and progressive disclosure through the lightbox.
- **Six projects, no filter needed** (Hick's law). The page ends on a strong CTA (peak-end rule).
- **Numbers in Cormorant:** use `font-variant-numeric: lining-nums`, or "1" looks like "I".
- **Copy:** verb-first CTAs, and every new string added in all three languages.

---

## 6. Windows toolbox (no Python on this machine)

| Task | How |
|------|-----|
| Image sizes, crop, JPEG | PowerShell `System.Drawing`. Save JPEG through `ImageCodecInfo` with the quality `EncoderParameter`. Compare the average RGB before and after to prove the colour didn't change. |
| Detect a screenshot frame | Sample 40 pixels per edge row by row and stop when fewer than 60% are near-frame-colour. |
| Contact sheets | PowerShell: a 4-column thumbnail grid with yellow index numbers, then read the JPG. |
| Decode embedded base64 | Regex `data:image/webp;base64,(...)` → `[IO.File]::WriteAllBytes`. |
| JS syntax check | `node -e 'new Function(html.split("<script>")[1].split("</script>")[0])'` |
| i18n coverage | Use node to collect every `data-i18n` key and diff it against `I18N.uk` / `I18N.cs`. |
| Screenshots | `msedge --headless --screenshot --window-size=W,H --virtual-time-budget=7000` |

**Screenshot gotchas**
- **Width:** headless Edge won't go below **~492px wide**. For a true phone view, load the page in a `<iframe style="width:390px">`.
- **Scrolled pages** render garbled when shot directly. Scroll **inside an iframe** instead (`lenis.scrollTo(y,{immediate:true})`, then `onScroll()`).
- **Height:** `min-height:100vh` stretches in a tall window. Inject a temporary CSS override into a throwaway copy (`_shot.html`) and delete it afterwards.
- **Checking state, not pixels:** use `--dump-dom` with `parent.postMessage(...)` into `document.title`, then grep the `<title>`.
- **Don't trust one screenshot** for animation state, because the capture timing varies. Confirm with a DOM/state check.
- **Elements caught mid-fade** (dropdowns, menus): inject `*{transition:none!important}` into the throwaway copy to see the final state.
- **Isolating one section:** hide all other sections (`#hero,#facts,…{display:none!important}`). To zoom into part of a tall screenshot, crop it with PowerShell `System.Drawing` (`DrawImage` with source and destination rectangles).
- **Full page at 1440px:** override `#hero{position:relative;min-height:860px}` and force `[data-aos]{opacity:1;transform:none}` in the copy, then slice the image into ~1750px parts.

**Shell gotchas**
- `sed` breaks on `#` and `|` inside CSS/JS. Do the edit with a small Node script written to the scratchpad instead.
- Long heredocs in the Bash tool can fail with "unexpected EOF". Write the script with the Write tool, then run it with `node`.
- For multi-part edits, use a Node script with a `rep(a,b)` that **throws if `a` isn't found**, so nothing half-applies silently.
- **The client edits `index.html` in VS Code (Live Server) between requests.** Re-grep the current text before replacing it. For example, the copyright line on disk said "Made with soul" while the request quoted "Created with love".
- Text changes always go into **three places**: the HTML (EN) and the `uk` and `cs` objects in `I18N`. Grep for the key (`"about.h"`, `"foot.copy"` …) to find all three.

---

## 7. Open items on this project

- [ ] **Barcelona leftovers** (EN/UA/CZ): the About text ("I work from Barcelona…"), the line under the CTA button (`cta.re`) and the footer tagline (`foot.tag`). Ask whether all of them should say Plzeň.
- [ ] The "www.elenadesigns.com" link in the contact block points to the old domain. Remove it or replace it.
- [ ] The stats block still says "Designer, from first sketch to final drawing" (`fact.4`). Decide whether it should match the new About heading.
- [ ] **Deploy the form backend** (logged in as lenasorochenk@gmail.com): create a Google Sheet → Extensions → Apps Script → paste `book/google-apps-script.gs` → run `testSubmission` once to grant permissions → Deploy → Web app (Execute as: Me, Who has access: Anyone) → paste the `/exec` URL into `SCRIPT_URL` in `book/consultation-form.js`. For WhatsApp, get a CallMeBot key for +420 728 345 904 and save it as the Script Property `CALLMEBOT_APIKEY`. After any change to the `.gs` file, redeploy as a **new version** of the same deployment, or the URL keeps running the old code.
- [ ] The footer Behance and LinkedIn links are `#`. They need real URLs.
- [ ] `photo/elena.webp` (old cut-out portrait) is unused and can be deleted. `photo/POTFOLIO PHOTO.png` is the source of `elena-portrait.jpg`. `index.backup-webdesigner.html` holds the old version.
- [ ] Ask Elena to confirm the project titles and descriptions, which were inferred from the images.
- [ ] Possible next step: sharing previews (`og:image`) and a favicon. More speed: WebP/AVIF copies (needs a real encoder; System.Drawing can't write WebP) and self-hosting the fonts/libraries.
- [ ] When new photos are added, regenerate both thumbnail folders (same script, `-Max 720 -Q 80` and `-Max 420 -Q 78`).
- [x] Done: Plzeň location, WhatsApp, new email, hero label, About heading, copyright line, wave dividers, custom dropdown, footer "Scroll up".

---

## 8. Quick-start checklist for the next similar site

1. Back up and inventory: assets, embedded images, invented claims.
2. Ask about positioning and languages; use defaults for the rest.
3. Set the palette, type scale and spacing as CSS variables.
4. Structure: hero → work → services → process → about → CTA → contact → footer.
5. Build a shared lightbox and i18n from the start, and add every string in every language.
6. Add motion last; respect reduced motion; make cursor effects desktop-only.
   Decorative dividers (waves) take the colours of the neighbouring sections. Replace native form controls (dropdowns) only with accessible custom ones that keep the native element for the form.
   When the client changes a city, email or phone, search the **whole page in every language** and list any leftovers instead of silently leaving them.
7. Verify: JS parses, all image paths exist, i18n coverage is complete, and screenshots at 1440 / 390 (iframe) plus a mid-scroll shot look right.
8. Report what's unverified and what's still a placeholder.

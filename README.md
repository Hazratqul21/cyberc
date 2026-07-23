# KiberQalqon — Milliy Kiberxavfsizlik Boshqaruv Paneli (BETA)

O'zbekiston uchun milliy kiberxavfsizlik platformasi (SIEM / XDR / SOAR / Zero-Trust /
Cloud Security / AI qatlami) boshqaruv panelining **beta / vizual prototip** versiyasi.

> ⚠️ Bu frontend prototip. Barcha ma'lumotlar — soxta (mock) demo data.
> Real backend, real Wazuh/SIEM ulanishi yoki ma'lumotlar bazasi YO'Q.
> Maqsad — potentsial xaridor/investorga mahsulot ko'rinishini taqdim etish.

## Beta versiyadagi yangiliklar

- **Haqiqiy O'zbekiston xaritasi** — GeoJSON konturidan (10 ta shahar to'g'ri joylashgan)
- **Alert tafsiloti paneli** — har bir ogohlantirishni bosib to'liq spetsifikatsiyani ko'rish:
  IP egasi/ASN/geolokatsiya, reputatsiya xavfi, MITRE ATT&CK klassifikatsiyasi, kill chain
  bosqichi, texnik log dalillari va bajarilgan javob choralari
- **Atamalar lug'ati** — chap panelda 20 ta kiberxavfsizlik atamasi (SIEM, EDR, C2, MITRE...)
  qidiruv bilan, har biri o'zbekcha izohlangan
- **Kirish (boot) ekrani** — SOC terminal uslubidagi ishga tushish: Matrix kod yomg'iri,
  boot-log, progress-bar va "Boshqaruv markaziga kirish" (`src/components/BootScreen.jsx`)
- **Premium ikonalar** — yagona stroke-asosli ikonka tizimi (`src/components/Icon.jsx`)
- **Dark + Light rejim** — topbardagi quyosh/oy tugmasi orqali (`src/context/ThemeContext.jsx`),
  tanlov `localStorage` da saqlanadi (standart: dark)
- **Preliminary belgisi** — doimiy "real ma'lumot emas · maxfiy namuna" ogohlantirishi

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:5310

## Production build

```bash
npm run build
npm run preview
```

## Texnik stack

- React 18 + Vite 6
- TailwindCSS 4 (dizayn tokenlari `src/index.css` da, light mavzu CSS-var override orqali)
- Recharts — grafiklar
- `@fontsource` — fontlar paket ichida (internetsiz ham to'g'ri ko'rinadi)
- ESLint + Prettier — `npm run lint`, `npm run format`
- Mock data — `src/data/mockData.js` (setInterval bilan "jonli" yangilanadi)

## Sahifalar

| Sahifa | Tavsif |
|---|---|
| Umumiy ko'rinish | KPI kartalar, 24 soatlik hodisalar grafigi, severity/manba taqsimoti |
| Jonli ogohlantirishlar | Real-vaqt alert oqimi (soxta ravishda yangi qatorlar qo'shiladi), severity filtrlar |
| Hujum xaritasi | O'zbekiston konturi ustida animatsiyalangan hujum oqimlari (SVG) |
| SOAR | Playbooklar ro'yxati, avtomatik javob harakatlari, jonli progress |
| Compliance | Reglamentlar jadvali progress-barlar bilan, hisobotlar, muddatlar |

Qo'shimcha: yuqori panelda **multi-tenant tanlagich** (5 ta soxta mijoz — tanlanganda
**barcha sahifalardagi** raqamlar `tenant.mult` koeffitsienti bo'yicha qayta hisoblanadi)
va o'ng tomonda **AI tahlilchi** chat paneli (oldindan yozilgan namunaviy javoblar,
real LLM chaqiruvi yo'q).

## Tuzilma

```
src/
  App.jsx                    — layout, routing, boot holati, ErrorBoundary
  main.jsx                   — kirish nuqtasi + lokal fontlar
  index.css                  — Tailwind tokenlari (dark/light) + animatsiyalar
  context/
    ThemeContext.jsx         — ThemeProvider komponenti
    themeStore.js            — useTheme hook + mavzuga bog'liq ranglar (CHART)
  utils/rand.js              — deterministik psevdo-tasodifiy (render uchun xavfsiz)
  data/
    mockData.js              — barcha demo ma'lumotlar + atamalar lug'ati
    uzMap.js                 — O'zbekiston SVG konturi (GeoJSON'dan generatsiya)
  components/
    Sidebar.jsx              — chap navigatsiya + atamalar lug'ati
    Topbar.jsx               — tenant tanlagich, Toshkent soati, mavzu tugmasi
    AiAssistant.jsx          — AI chat paneli
    BootScreen.jsx           — kirish ekrani (Matrix kod yomg'iri, boot-log)
    Glossary.jsx             — to'liq atamalar lug'ati (qidiruv bilan)
    Icon.jsx                 — premium stroke ikonalar to'plami
    Watermark.jsx            — "preliminary demo" ogohlantirishi
    ErrorBoundary.jsx        — demo paytida oq ekranning oldini oladi
  pages/
    Overview.jsx             — KPI + grafiklar
    LiveAlerts.jsx           — jonli oqim + alert tafsiloti (pauza tugmasi bilan)
    ThreatMap.jsx            — hujum xaritasi
    Soar.jsx                 — playbooklar
    Compliance.jsx           — muvofiqlik va hisobotlar
```

## Demo ko'rsatishdan oldin

- Splash ekran sessiyada bir marta chiqadi. Qayta ko'rsatish uchun brauzer konsolida:
  `sessionStorage.removeItem('kq-booted')` va sahifani yangilang.
- Alert oqimini **Pauza** tugmasi bilan to'xtatib, bitta hodisani batafsil tushuntirish qulay.
- Mavzu (dark/light) `localStorage`da saqlanadi — standart: dark.

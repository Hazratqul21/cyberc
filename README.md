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
- TailwindCSS 4 (dizayn tokenlari `src/index.css` da)
- Recharts — grafiklar
- Mock data — `src/data/mockData.js` (setInterval bilan "jonli" yangilanadi)

## Sahifalar

| Sahifa | Tavsif |
|---|---|
| Umumiy ko'rinish | KPI kartalar, 24 soatlik hodisalar grafigi, severity/manba taqsimoti |
| Jonli ogohlantirishlar | Real-vaqt alert oqimi (soxta ravishda yangi qatorlar qo'shiladi), severity filtrlar |
| Hujum xaritasi | O'zbekiston konturi ustida animatsiyalangan hujum oqimlari (SVG) |
| SOAR | Playbooklar ro'yxati, avtomatik javob harakatlari, jonli progress |
| Compliance | Reglamentlar jadvali progress-barlar bilan, hisobotlar, muddatlar |

Qo'shimcha: yuqori panelda **multi-tenant tanlagich** (5 ta soxta mijoz — tanlanganda KPI
raqamlari o'zgaradi) va o'ng tomonda **AI tahlilchi** chat paneli (oldindan yozilgan
namunaviy javoblar, real LLM chaqiruvi yo'q).

## Tuzilma

```
src/
  App.jsx               — asosiy layout va sahifa routing
  index.css             — Tailwind + dizayn tokenlari + animatsiyalar
  data/mockData.js      — barcha demo ma'lumotlar
  components/
    Sidebar.jsx         — chap navigatsiya
    Topbar.jsx          — tenant tanlagich, soat, foydalanuvchi
    AiAssistant.jsx     — AI chat paneli
  pages/
    Overview.jsx        — KPI + grafiklar
    LiveAlerts.jsx      — jonli alert oqimi
    ThreatMap.jsx       — hujum xaritasi
    Soar.jsx            — playbooklar
    Compliance.jsx      — muvofiqlik va hisobotlar
```

// ─── Multi-tenant mijozlar ────────────────────────────────────────────────
export const TENANTS = [
  { id: 'all', name: 'Milliy SOC — Barcha obyektlar', short: 'Milliy SOC', mult: 1 },
  { id: 'bank-a', name: '"Turon Bank" ATB', short: 'Turon Bank', mult: 0.34 },
  { id: 'fintech-b', name: 'PayUz Fintech', short: 'PayUz', mult: 0.18 },
  { id: 'dc-c', name: '"Buyuk Ipak Yo\'li" Data-markazi', short: 'Data-markaz', mult: 0.27 },
  { id: 'gov-d', name: 'Davlat xizmatlari portali', short: 'Gov Portal', mult: 0.21 },
]

// ─── KPI bazaviy qiymatlar (tenant mult bilan ko'paytiriladi) ─────────────
export const BASE_KPI = {
  activeAlerts: 1284,
  endpoints: 48210,
  openIncidents: 37,
  compliance: 87,
  blockedToday: 12847,
  mttr: 14, // minut
}

// ─── 24 soatlik hodisalar grafigi ─────────────────────────────────────────
export const HOURLY_EVENTS = Array.from({ length: 24 }, (_, i) => {
  const hour = (new Date().getHours() - 23 + i + 24) % 24
  const base = 400 + Math.sin(i / 3.2) * 180 + (i > 16 ? (i - 16) * 90 : 0)
  const attacks = Math.round(base + Math.random() * 120)
  return {
    hour: `${String(hour).padStart(2, '0')}:00`,
    hodisalar: attacks,
    bloklangan: Math.round(attacks * (0.82 + Math.random() * 0.12)),
  }
})

export const SEVERITY_DIST = [
  { name: 'Kritik', value: 42, color: '#E5484D' },
  { name: 'Yuqori', value: 167, color: '#F76B15' },
  { name: "O'rta", value: 486, color: '#FFB224' },
  { name: 'Past', value: 589, color: '#46A758' },
]

export const SOURCE_DIST = [
  { name: 'SIEM', value: 34 },
  { name: 'EDR/XDR', value: 28 },
  { name: 'Cloud', value: 17 },
  { name: 'Tarmoq', value: 13 },
  { name: 'Pentest', value: 8 },
]

// ─── Live alert oqimi uchun shablonlar ────────────────────────────────────
export const SEVERITIES = {
  critical: { label: 'Kritik', color: '#E5484D', bg: 'rgba(229,72,77,0.14)' },
  high: { label: 'Yuqori', color: '#F76B15', bg: 'rgba(247,107,21,0.14)' },
  medium: { label: "O'rta", color: '#FFB224', bg: 'rgba(255,178,36,0.14)' },
  low: { label: 'Past', color: '#46A758', bg: 'rgba(70,167,88,0.14)' },
}

export const STATUSES = {
  new: { label: 'Yangi', color: '#4A9BD4' },
  investigating: { label: 'Tekshirilmoqda', color: '#FFB224' },
  closed: { label: 'Yopilgan', color: '#5B7194' },
}

export const ALERT_TEMPLATES = [
  {
    source: 'EDR', severity: 'critical', title: 'Ransomware xatti-harakati aniqlandi — fayllar ommaviy shifrlanmoqda', host: 'SRV-FIN-012',
    ip: '45.147.230.18', ipOwner: 'Alsycon B.V. (bulletproof hosting)', asn: 'AS208843', geo: 'Niderlandiya, Amsterdam', rep: 96,
    firstSeen: '2026-07-19', mitre: [{ id: 'T1486', name: 'Data Encrypted for Impact' }, { id: 'T1490', name: 'Inhibit System Recovery' }],
    stage: 'Actions on Objectives (7/7)', analyst: 'D. Yusupova · L2',
    evidence: [
      '14:14:58 SRV-FIN-012 fayl tizimida 2 340 ta .xlsx → .lockbit kengaytma o\'zgarishi (38s ichida)',
      '14:15:01 vssadmin.exe delete shadows /all /quiet — soya nusxalarni o\'chirish urinishi (bloklandi)',
      '14:15:02 EDR jarayonni to\'xtatdi: PID 4812 (invoice_scan.exe, imzosiz, entropy 7.94)',
    ],
    actions: ['Endpoint tarmoqdan izolyatsiya qilindi (PB-2039)', 'Disk snapshot forenzika uchun olindi', 'Zaxira nusxalar yaxlitligi tekshirildi — 8/8 OK'],
  },
  {
    source: 'SIEM', severity: 'critical', title: 'Domen kontrollerga brute-force hujum (4625 hodisa, 3 daqiqa)', host: 'DC-01.corp.uz',
    ip: '91.240.118.72', ipOwner: 'OOO "Selectel" (ijaraga olingan VPS)', asn: 'AS49505', geo: 'Rossiya, Sankt-Peterburg', rep: 88,
    firstSeen: '2026-07-23', mitre: [{ id: 'T1110.001', name: 'Brute Force: Password Guessing' }],
    stage: 'Credential Access (4/7)', analyst: 'A. Karimov · L3',
    evidence: [
      '23:48:11 EventID 4625 × 1 847: administrator, admin, backup_svc akkauntlariga ketma-ket urinish',
      '23:49:35 Bir IP dan 620 ta noyob login urinishi — parol spreying naqshi',
      '23:51:02 NTLM autentifikatsiya so\'rovlari geografik anomal manbadan',
    ],
    actions: ['IP perimetr firewallda bloklandi', 'Nishondagi 3 akkaunt uchun majburiy parol reset', 'Smart lockout siyosati kuchaytirildi'],
  },
  {
    source: 'SIEM', severity: 'high', title: 'Imtiyozli akkaunt ish vaqtidan tashqari kirish amalga oshirdi', host: 'admin.i.karimov',
    ip: '10.4.12.7', ipOwner: 'Ichki tarmoq — VPN pool (Toshkent ofisi)', asn: '—', geo: "O'zbekiston, Toshkent", rep: 12,
    firstSeen: '—', mitre: [{ id: 'T1078.002', name: 'Valid Accounts: Domain Accounts' }],
    stage: 'Persistence (3/7)', analyst: 'S. Nazarov · L1',
    evidence: [
      '02:14:22 admin.i.karimov VPN orqali ulandi — odatiy ish vaqti: 09:00–19:00',
      '02:16:05 Domain Admin guruhidagi akkaunt bilan RDP → SRV-DB-004',
      '02:17:40 UEBA ball: 82/100 (odatdan tashqari vaqt + yangi qurilma barmoq izi)',
    ],
    actions: ['Egasi bilan telefon orqali tasdiqlash talab qilinadi', 'Sessiya kuzatuvga olindi (yozib borilmoqda)', 'MFA qayta so\'raldi — muvaffaqiyatli o\'tdi'],
  },
  {
    source: 'Cloud', severity: 'high', title: "S3 bucket ommaviy o'qishga ochilgan — konfiguratsiya drift", host: 'uzcloud-prod-backups',
    ip: '—', ipOwner: 'UzCloud (mahalliy bulut provayder)', asn: 'AS201767', geo: "O'zbekiston, Toshkent", rep: 5,
    firstSeen: '2026-07-23', mitre: [{ id: 'T1530', name: 'Data from Cloud Storage' }],
    stage: 'Collection (6/7)', analyst: 'D. Yusupova · L2',
    evidence: [
      '11:20:14 CloudTrail: PutBucketAcl — public-read ruxsati qo\'shildi (terraform apply, CI/CD pipeline)',
      '11:20:15 CSPM skaner: 41 GB zaxira arxivi ochiq holatda (shifrlangan — AES-256)',
      '11:24:50 Tashqi IP lardan ListObjects urinishi: 0 ta muvaffaqiyatli (shifrlash tufayli)',
    ],
    actions: ['Bucket ACL avtomatik qaytarildi (private)', 'CI/CD pipeline dagi terraform o\'zgarishi reviewga qaytarildi', 'Access loglar 90 kunga arxivlandi'],
  },
  {
    source: 'EDR', severity: 'high', title: 'PowerShell orqali shubhali kodlangan buyruq bajarildi', host: 'WS-HR-034',
    ip: '172.67.181.93', ipOwner: 'Cloudflare Inc. (proksi ortida yashiringan)', asn: 'AS13335', geo: 'AQSH (proksi)', rep: 71,
    firstSeen: '2026-07-22', mitre: [{ id: 'T1059.001', name: 'PowerShell' }, { id: 'T1027', name: 'Obfuscated Files' }],
    stage: 'Execution (2/7)', analyst: 'S. Nazarov · L1',
    evidence: [
      '15:42:33 powershell.exe -enc JABzAD0ATgBlAHcALQBPAGIA... (base64, 4.2 KB)',
      '15:42:34 Dekodlangan: Invoke-WebRequest → hxxps://cdn-updates[.]top/svc.ps1',
      '15:42:34 AMSI hook: skript bajarilishdan oldin bloklandi',
    ],
    actions: ['Jarayon daraxti to\'xtatildi', 'cdn-updates[.]top domeni DNS sinkhole ga yo\'naltirildi', 'Foydalanuvchiga fishing treningi tayinlandi'],
  },
  {
    source: 'Tarmoq', severity: 'medium', title: 'Ichki hostdan TOR chiqish tuguniga ulanish urinishi', host: '10.14.2.88',
    ip: '185.220.101.44', ipOwner: 'Artikel10 e.V. (TOR exit node operatori)', asn: 'AS200651', geo: 'Germaniya, Berlin', rep: 64,
    firstSeen: '2026-07-20', mitre: [{ id: 'T1090.003', name: 'Multi-hop Proxy: Tor' }],
    stage: 'Command & Control (5/7)', analyst: 'A. Karimov · L3',
    evidence: [
      '16:05:12 10.14.2.88 → 185.220.101.44:9001 TCP SYN — TOR relay portiga',
      '16:05:12 NGFW app-id: tor-obfs4 protokoli aniqlandi',
      '16:05:13 Ulanish siyosat bo\'yicha rad etildi (korporativ tarmoqda TOR taqiqlangan)',
    ],
    actions: ['Ulanish bloklandi', 'Host qurilmasi inventarizatsiya tekshiruviga qo\'shildi', 'Egasidan tushuntirish so\'raldi'],
  },
  {
    source: 'SIEM', severity: 'medium', title: 'Bir akkauntdan 2 mamlakatdan parallel sessiya (impossible travel)', host: 's.rashidova',
    ip: '103.75.226.11', ipOwner: 'PT Cloud Hosting Indonesia', asn: 'AS138608', geo: 'Indoneziya, Jakarta', rep: 77,
    firstSeen: '2026-07-23', mitre: [{ id: 'T1078', name: 'Valid Accounts' }, { id: 'T1539', name: 'Steal Web Session Cookie' }],
    stage: 'Initial Access (1/7)', analyst: 'D. Yusupova · L2',
    evidence: [
      "14:16:02 s.rashidova faol sessiya: Toshkent (odatiy) + yangi login: Jakarta",
      '14:16:02 Ikki nuqta orasidagi "sayohat tezligi": 5 840 km/soat — jismonan imkonsiz',
      '14:16:03 Jakarta sessiyasi user-agent: headless-chrome — avtomatlashtirilgan vosita',
    ],
    actions: ['Akkaunt muzlatildi, barcha sessiyalar uzildi (PB-2040)', 'Parol + MFA qayta ro\'yxatdan o\'tkazildi', 'Cookie o\'g\'irlash manbasi tekshirilmoqda'],
  },
  {
    source: 'Cloud', severity: 'medium', title: 'IAM kaliti 90 kundan beri rotatsiya qilinmagan', host: 'svc-etl-pipeline',
    ip: '—', ipOwner: 'Ichki servis akkaunti', asn: '—', geo: '—', rep: 8,
    firstSeen: '2026-04-24', mitre: [{ id: 'T1098.001', name: 'Account Manipulation: Cloud Credentials' }],
    stage: 'Profilaktika (0/7)', analyst: 'Avtomatik (CSPM)',
    evidence: [
      'Kalit yaratilgan: 2026-04-24 (91 kun oldin) — siyosat: maks. 90 kun',
      'Kalit oxirgi 30 kunda 12 400 marta ishlatilgan (faol)',
      'Xuddi shu kalit 2 ta muhitda (staging + prod) ishlatilmoqda — anti-pattern',
    ],
    actions: ['Majburiy rotatsiya rejalashtirildi (PB-2037, tasdiq kutilmoqda)', 'Staging uchun alohida kalit yaratish tavsiya etildi'],
  },
  {
    source: 'Pentest', severity: 'medium', title: 'Tashqi perimetrda eskirgan TLS 1.0 xizmati topildi', host: 'mail.client-b.uz',
    ip: '84.54.117.30', ipOwner: 'Mijozning o\'z serveri (UZTELECOM kanali)', asn: 'AS8193', geo: "O'zbekiston, Toshkent", rep: 3,
    firstSeen: '2026-07-23', mitre: [{ id: 'T1190', name: 'Exploit Public-Facing Application' }],
    stage: 'Razvedka (bosqichgacha)', analyst: 'Pentest jamoasi',
    evidence: [
      'Doimiy skaner: 84.54.117.30:993 (IMAPS) TLS 1.0 va TLS 1.1 qabul qilmoqda',
      'Zaif shifrlar: TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 xavfi)',
      'Sertifikat muddati: 2026-09-14 gacha amal qiladi (OK)',
    ],
    actions: ['Mijoz IT jamoasiga tiket ochildi (SLA: 14 kun)', 'TLS 1.2+ minimal talab qilib sozlash yo\'riqnomasi biriktirildi'],
  },
  {
    source: 'EDR', severity: 'low', title: 'Ruxsat etilmagan USB qurilma ulandi va bloklandi', host: 'WS-ACC-101',
    ip: '—', ipOwner: 'Lokal qurilma (VID 0951 Kingston)', asn: '—', geo: 'Toshkent ofisi, 3-qavat', rep: 15,
    firstSeen: '—', mitre: [{ id: 'T1091', name: 'Replication Through Removable Media' }],
    stage: 'Initial Access (1/7)', analyst: 'Avtomatik (DLP)',
    evidence: [
      '10:12:40 USB mass-storage ulandi: Kingston DataTraveler 64GB, seriya D77F...',
      '10:12:40 Qurilma oq ro\'yxatda yo\'q — yozish/o\'qish bloklandi',
      '10:12:41 Foydalanuvchiga siyosat eslatmasi ko\'rsatildi',
    ],
    actions: ['Qurilma bloklandi', 'Hodisa foydalanuvchi HR profiliga qayd etildi'],
  },
  {
    source: 'Tarmoq', severity: 'low', title: "DNS so'rovlar anomal hajmda — kesh zaharlanish ehtimoli past", host: 'ns2.internal',
    ip: '10.0.0.53', ipOwner: 'Ichki DNS server', asn: '—', geo: 'Data-markaz, Toshkent', rep: 6,
    firstSeen: '—', mitre: [{ id: 'T1071.004', name: 'Application Layer Protocol: DNS' }],
    stage: 'Kuzatuv', analyst: 'Avtomatik (NDR)',
    evidence: [
      'So\'nggi soatda NXDOMAIN javoblari 3.2× ortdi (baseline: 1 200/soat)',
      'Manba: 10.14.8.0/24 segmentidagi 4 ta host — yangi o\'rnatilgan monitoring vositasi',
      'DGA (domen generatsiya algoritmi) naqshi aniqlanmadi',
    ],
    actions: ['Kuzatuv davom etmoqda', 'Yangi monitoring vositasi oq ro\'yxatga qo\'shilishi kutilmoqda'],
  },
  {
    source: 'SIEM', severity: 'low', title: 'Muvaffaqiyatsiz VPN ulanishlar soni chegaraga yaqinlashdi', host: 'vpn-gw-02',
    ip: '196.44.98.7', ipOwner: 'Safaricom Ltd (mobil operator)', asn: 'AS33771', geo: 'Keniya, Nayrobi', rep: 42,
    firstSeen: '2026-07-23', mitre: [{ id: 'T1133', name: 'External Remote Services' }],
    stage: 'Initial Access (1/7)', analyst: 'S. Nazarov · L1',
    evidence: [
      'So\'nggi 15 daqiqada 38 ta muvaffaqiyatsiz ulanish (chegara: 50)',
      'Barcha urinishlar mavjud bo\'lmagan userlar bilan: test, admin, vpn1',
      'Rate-limit avtomatik faollashdi: manba IP 10 daqiqaga sekinlashtirildi',
    ],
    actions: ['Rate-limit qo\'llandi', 'Geo-filtr qoidasini ko\'rib chiqish tavsiya etilmoqda'],
  },
  {
    source: 'Cloud', severity: 'critical', title: 'Kubernetes klasterida kriptomayner konteyner aniqlandi', host: 'k8s-prod-node-7',
    ip: '141.98.83.20', ipOwner: 'UAB Host Baltic (ma\'lum mining pool relay)', asn: 'AS209605', geo: 'Litva, Vilnyus', rep: 93,
    firstSeen: '2026-07-21', mitre: [{ id: 'T1610', name: 'Deploy Container' }, { id: 'T1496', name: 'Resource Hijacking' }],
    stage: 'Impact (7/7)', analyst: 'A. Karimov · L3',
    evidence: [
      '13:02:11 Yangi pod: kube-system/metrics-agent-x7f2 — rasmiy registrda yo\'q image',
      '13:02:40 CPU 96% → xmrig jarayoni, pool.minexmr.com:443 ga stratum ulanish',
      '13:02:41 Image manbasi: buzilgan CI token orqali push qilingan (audit log)',
    ],
    actions: ['Pod to\'xtatildi, image karantinga olindi', 'Buzilgan CI token bekor qilindi', 'Registry uchun imzo (cosign) majburiy qilindi'],
  },
  {
    source: 'EDR', severity: 'high', title: 'LSASS xotirasidan credential dump urinishi bloklandi', host: 'SRV-APP-003',
    ip: '185.220.101.44', ipOwner: 'Artikel10 e.V. (TOR exit node)', asn: 'AS200651', geo: 'Germaniya (TOR orqali)', rep: 64,
    firstSeen: '2026-07-20', mitre: [{ id: 'T1003.001', name: 'OS Credential Dumping: LSASS Memory' }],
    stage: 'Credential Access (4/7)', analyst: 'D. Yusupova · L2',
    evidence: [
      '17:33:20 rundll32.exe comsvcs.dll MiniDump 656 lsass.dmp — klassik LOLBin texnikasi',
      '17:33:20 EDR credential-theft qoidasi: jarayon to\'xtatildi, dump yaratilmadi',
      '17:33:25 Ota jarayon: wmiprvse.exe ← masofaviy WMI chaqiruvi (lateral movement belgisi)',
    ],
    actions: ['Jarayon bloklandi', 'Manba host aniqlanmoqda (WMI event log korrelyatsiya)', 'Server krb tiketi qayta chiqarildi'],
  },
  {
    source: 'Tarmoq', severity: 'high', title: 'C2 serverga beaconing trafik naqshi aniqlandi (JA3 mos)', host: '10.8.4.21',
    ip: '45.147.230.18', ipOwner: 'Alsycon B.V. (bulletproof hosting)', asn: 'AS208843', geo: 'Niderlandiya, Amsterdam', rep: 96,
    firstSeen: '2026-07-19', mitre: [{ id: 'T1071.001', name: 'Web Protocols' }, { id: 'T1573.002', name: 'Encrypted Channel: Asymmetric' }],
    stage: 'Command & Control (5/7)', analyst: 'A. Karimov · L3',
    evidence: [
      '14:28:00 dan beri har 60±2s da HTTPS POST → 45.147.230.18 (jitter 3%)',
      'JA3 hash 6734f37431670b3ab4292b8f60f29984 — Cobalt Strike default profili bilan mos',
      'Har so\'rov hajmi 1.2–1.4 KB — heartbeat naqshi, ma\'lumot chiqishi kuzatilmadi',
    ],
    actions: ['IP bloklandi (PB-2041)', 'Host izolyatsiya qilindi, xotira dampi olindi', 'UZ-CERT ga IOC ulashildi'],
  },
]

let alertId = 1000
export function makeAlert(overrides = {}) {
  const t = ALERT_TEMPLATES[Math.floor(Math.random() * ALERT_TEMPLATES.length)]
  const statusKeys = ['new', 'new', 'new', 'investigating']
  return {
    id: `ALT-${alertId++}`,
    time: new Date(),
    ...t,
    status: statusKeys[Math.floor(Math.random() * statusKeys.length)],
    ...overrides,
  }
}

export function initialAlerts(n = 18) {
  const list = []
  for (let i = 0; i < n; i++) {
    const a = makeAlert({
      time: new Date(Date.now() - (i + 1) * (90_000 + Math.random() * 240_000)),
      status: i < 3 ? 'new' : i < 9 ? 'investigating' : Math.random() > 0.5 ? 'closed' : 'investigating',
    })
    list.push(a)
  }
  return list
}

// ─── SOAR playbooklar ─────────────────────────────────────────────────────
export const PLAYBOOKS = [
  { id: 'PB-2041', name: 'Zararli IP avtomatik bloklash', trigger: 'C2 beaconing — 10.8.4.21', status: 'done', steps: 5, stepsDone: 5, time: '14:32:08', duration: '1.8s' },
  { id: 'PB-2040', name: 'Akkauntni muzlatish + sessiyalarni uzish', trigger: 'Impossible travel — s.rashidova', status: 'done', steps: 7, stepsDone: 7, time: '14:18:44', duration: '3.2s' },
  { id: 'PB-2039', name: 'Endpoint izolyatsiyasi (tarmoqdan uzish)', trigger: 'Ransomware — SRV-FIN-012', status: 'running', steps: 6, stepsDone: 4, time: '14:15:02', duration: '—' },
  { id: 'PB-2038', name: 'Fishing xat qutilardan ommaviy o\'chirish', trigger: 'Fishing kampaniya — 214 qabul qiluvchi', status: 'done', steps: 4, stepsDone: 4, time: '13:57:31', duration: '12.4s' },
  { id: 'PB-2037', name: 'IAM kalitni majburiy rotatsiya qilish', trigger: 'Kalit eskirgan — svc-etl-pipeline', status: 'awaiting', steps: 3, stepsDone: 1, time: '13:41:10', duration: '—' },
  { id: 'PB-2036', name: 'WAF qoidasini yangilash (virtual patch)', trigger: 'CVE-2026-31114 ekspluatatsiya urinishi', status: 'done', steps: 5, stepsDone: 5, time: '13:22:55', duration: '2.1s' },
  { id: 'PB-2035', name: 'Zaxira nusxa yaxlitligini tekshirish', trigger: 'Ransomware indikatori', status: 'done', steps: 8, stepsDone: 8, time: '13:20:12', duration: '47s' },
]

export const PB_STATUS = {
  done: { label: 'Bajarildi', color: '#46A758' },
  running: { label: 'Bajarilmoqda', color: '#4A9BD4' },
  awaiting: { label: 'Tasdiq kutilmoqda', color: '#FFB224' },
  failed: { label: 'Xato', color: '#E5484D' },
}

// ─── Compliance ───────────────────────────────────────────────────────────
export const COMPLIANCE = [
  { name: "O'zR Kiberxavfsizlik qonuni (2022)", org: 'Davlat regulyatori', score: 94, controls: '112/119', audit: '2026-05-14' },
  { name: 'Markaziy bank axborot xavfsizligi talablari', org: "O'zR Markaziy banki", score: 91, controls: '87/96', audit: '2026-06-02' },
  { name: 'PCI DSS v4.0', org: 'PCI SSC', score: 88, controls: '231/264', audit: '2026-04-28' },
  { name: 'ISO/IEC 27001:2022', org: 'ISO', score: 85, controls: '79/93', audit: '2026-03-19' },
  { name: "O'zDSt 2814 (axborot xavfsizligi)", org: "O'zstandart", score: 82, controls: '54/66', audit: '2026-06-21' },
  { name: 'NIST CSF 2.0 (ixtiyoriy)', org: 'NIST', score: 76, controls: '82/108', audit: '2026-02-10' },
]

// ─── AI yordamchi demo dialoglari ─────────────────────────────────────────
export const AI_CANNED = [
  {
    match: ['server', 'shubhali', 'ulanish', '24'],
    answer: "So'nggi 24 soatda 3 ta server shubhali tashqi ulanish amalga oshirdi:\n\n1. **SRV-APP-003** — 185.220.101.44 (TOR chiqish tuguni) bilan 14 ta sessiya, jami 2.1 MB chiquvchi trafik. ⚠️ Yuqori xavf\n2. **10.8.4.21** — 45.147.230.18 manziliga har 60 soniyada beaconing (C2 naqshi, JA3 hash ma'lum botnet bilan mos). ⚠️ Kritik — PB-2041 playbook orqali IP bloklandi\n3. **k8s-prod-node-7** — noma'lum mining pool (pool.minexmr.com) ga ulanish urinishi, konteyner to'xtatildi.\n\nBarcha uchta hodisa bo'yicha incidentlar ochilgan: INC-4471, INC-4472, INC-4473.",
  },
  {
    match: ['fishing', 'phishing', 'xat'],
    answer: "Bugun 214 ta qabul qiluvchiga yuborilgan fishing kampaniyasi aniqlandi. Mavzu: «Ish haqi hisobotini tasdiqlang». 11 kishi havolani ochgan, 2 kishi ma'lumot kiritgan — ikkala akkaunt paroli majburiy yangilandi va sessiyalar uzildi. Xatlar barcha qutilardan avtomatik o'chirildi (PB-2038).",
  },
  {
    match: ['compliance', 'audit', 'pci'],
    answer: "Joriy compliance holati: umumiy ball **87%**. Eng past ko'rsatkich — NIST CSF 2.0 (76%), asosiy kamchilik: uzluksiz monitoring qamrovi (DE.CM) va yetkazib beruvchilar riskini baholash (GV.SC). PCI DSS bo'yicha keyingi audit 2026-yil oktabrda — 33 ta control yopilishi kerak, ulardan 8 tasi avtomatlashtirish orqali yopilishi mumkin. Batafsil reja tayyorlab beraymi?",
  },
  {
    match: ['hisobot', 'report', 'rahbariyat'],
    answer: "Rahbariyat uchun haftalik xulosalar:\n\n• Jami **89 412** hodisa qayd etildi, 99.2% avtomatik bartaraf qilindi\n• 3 ta kritik incident — barchasi 30 daqiqa ichida cheklandi (MTTR: 14 daq)\n• Eng faol hujum turi: credential stuffing (+34% haftalik)\n• Himoyalangan endpointlar: 48 210 (+1 240 yangi)\n\nTo'liq PDF hisobotni shakllantirishim mumkin — kerakmi?",
  },
]

export const AI_DEFAULT =
  "Bu savol bo'yicha ma'lumotlarni tahlil qildim. Demo rejimda men oldindan tayyorlangan stsenariylar bilan ishlayman — to'liq versiyada SIEM, EDR va Cloud qatlamlaridagi barcha real ma'lumotlar ustidan tabiiy tilda so'rov berish mumkin bo'ladi.\n\nQuyidagilardan birini sinab ko'ring:\n• «Oxirgi 24 soatda qaysi serverlar shubhali ulanish qildi?»\n• «Fishing hujumlari bo'yicha holat qanday?»\n• «Compliance holati va keyingi audit haqida»\n• «Rahbariyat uchun hisobot tayyorlab ber»"

// ─── Atamalar lug'ati ─────────────────────────────────────────────────────
export const GLOSSARY = [
  { term: 'SIEM', full: 'Security Information & Event Management', def: "Barcha tizimlardan (server, tarmoq, ilova) loglarni yig'ib, korrelyatsiya qilib, xavfsizlik hodisalarini aniqlaydigan markaziy tizim." },
  { term: 'EDR', full: 'Endpoint Detection & Response', def: "Har bir kompyuter/serverga o'rnatiladigan agent — zararli jarayonlarni real vaqtda aniqlaydi va to'xtatadi." },
  { term: 'XDR', full: 'Extended Detection & Response', def: "EDR ning kengaytirilgani: endpoint, tarmoq, pochta va bulut ma'lumotlarini birlashtirib tahlil qiladi." },
  { term: 'SOAR', full: 'Security Orchestration, Automation & Response', def: "Xavfsizlik javob choralarini avtomatlashtiruvchi tizim — playbook asosida IP bloklash, akkaunt muzlatish kabi harakatlarni soniyalarda bajaradi." },
  { term: 'SOC', full: 'Security Operations Center', def: "Xavfsizlik operatsiyalari markazi — tahlilchilar 24/7 rejimda hodisalarni kuzatib, javob beradigan jamoa va infratuzilma." },
  { term: 'Zero-Trust', full: 'Zero Trust Architecture', def: "«Hech kimga sukut bo'yicha ishonma» tamoyili: har bir so'rov, hatto ichki tarmoqdan bo'lsa ham, qayta tekshiriladi." },
  { term: 'Playbook', full: 'Response Playbook', def: "Muayyan hodisa turiga avtomatik javob berish stsenariysi — qadamlar ketma-ketligi (aniqlash → cheklash → bartaraf etish)." },
  { term: 'MTTR', full: 'Mean Time To Respond', def: "Hodisa aniqlanganidan to bartaraf etilgunicha o'tgan o'rtacha vaqt. Qancha past bo'lsa, shuncha yaxshi." },
  { term: 'IOC', full: 'Indicator of Compromise', def: "Buzilish belgisi — zararli IP, domen, fayl hashi kabi texnik izlar. Tizimlar shular bo'yicha qidiruv yuritadi." },
  { term: 'C2', full: 'Command & Control', def: "Hujumchi zararlangan kompyuterni masofadan boshqaradigan server. C2 ga «beaconing» — muntazam yashirin bog'lanish." },
  { term: 'MITRE ATT&CK', full: 'Adversarial Tactics & Techniques', def: "Hujum texnikalarining xalqaro klassifikatori (T1486 kabi kodlar). Har bir alert shu tilda tavsiflanadi." },
  { term: 'Kill Chain', full: 'Cyber Kill Chain', def: "Hujumning 7 bosqichli modeli: razvedkadan maqsadga erishgunicha. Qaysi bosqichda to'xtatilgani muhim ko'rsatkich." },
  { term: 'CVE', full: 'Common Vulnerabilities & Exposures', def: "Dasturiy zaifliklarning xalqaro reyestri (masalan CVE-2026-31114). Har biriga xavflilik balli beriladi." },
  { term: 'WAF', full: 'Web Application Firewall', def: "Veb-ilovalarni SQL-injection, XSS kabi hujumlardan himoya qiluvchi ekran. «Virtual patch» — zaiflikni WAF darajasida yopish." },
  { term: 'DDoS', full: 'Distributed Denial of Service', def: "Minglab manbadan bir vaqtda trafik yuborib xizmatni ishdan chiqarish hujumi. Scrubbing markazi trafikni filtrlab tozalaydi." },
  { term: 'UEBA', full: 'User & Entity Behavior Analytics', def: "Foydalanuvchi xatti-harakatini o'rganib, odatdan chetlanishlarni (g'ayrioddiy vaqt, joy, hajm) aniqlaydigan AI qatlami." },
  { term: 'DLP', full: 'Data Loss Prevention', def: "Maxfiy ma'lumotlarning tashqariga chiqib ketishini (USB, pochta, bulut orqali) nazorat qiluvchi tizim." },
  { term: 'CSPM', full: 'Cloud Security Posture Management', def: "Bulut sozlamalarini uzluksiz tekshirib, xato konfiguratsiyalarni (ochiq bucket, eskirgan kalit) topadigan vosita." },
  { term: 'JA3', full: 'TLS Fingerprinting', def: "Shifrlangan trafikni ochmasdan, TLS «barmoq izi» orqali qaysi vosita ulanayotganini aniqlash usuli." },
  { term: 'Compliance', full: 'Muvofiqlik', def: "Qonun va standartlar (PCI DSS, ISO 27001, mahalliy reglamentlar) talablariga javob berish darajasi." },
]

export const MAP_SOURCES = [
  { id: 's1', label: '185.220.x.x', x: 60, y: 90 },
  { id: 's2', label: '45.147.x.x', x: 730, y: 40 },
  { id: 's3', label: '103.75.x.x', x: 770, y: 250 },
  { id: 's4', label: '91.240.x.x', x: 90, y: 330 },
  { id: 's5', label: '196.44.x.x', x: 330, y: 430 },
  { id: 's6', label: '23.129.x.x', x: 640, y: 420 },
]

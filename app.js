/* ═══════════════════════════════════════════════════════════════════
   DPDT BANGLADESH — PORTAL APP SCRIPT
   Navigation (mirrors real dpdt.gov.bd structure), routing,
   language toggle, general site search, and the preserved
   trademark-verification engine.
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ── Base domain for official DPDT pages ───────────────────────── */
const OFF = 'https://dpdt.gov.bd';

/* ── Navigation data ──────────────────────────────────────────────
   Mirrors the REAL current official DPDT website menu structure.
   All official hrefs are relative paths on dpdt.gov.bd (resolved
   via url()).  Items flagged ext:true are third-party sites.      */
const NAV = [
  {
    key: 'about', en: 'About DPDT', bn: 'অধিদপ্তর সম্পর্কিত',
    groups: [
      { en: 'About the Department', bn: 'অধিদপ্তর', items: [
        { en: 'About the Department', bn: 'অধিদপ্তর সম্পর্কে', href: '/about', internal: true },
        { en: 'Aims & Objectives', bn: 'লক্ষ্য ও উদ্দেশ্য', href: '/pages/static-pages/6922defe933eb65569e1f09f' },
        { en: 'Milestones', bn: 'মাইলস্টোন্স', href: '/pages/static-pages/6922db7a933eb65569e0a514' },
        { en: 'Organizational Structure', bn: 'সাংগঠনিক কাঠামো', href: '/pages/static-pages/6922e04a933eb65569e265a1' },
        { en: 'Citizen Charter', bn: 'নাগরিক সনদ', href: '/pages/static-pages/6922df66933eb65569e21bc3' }
      ]},
      { en: 'Officials & Grievance', bn: 'কর্মকর্তা ও অভিযোগ', items: [
        { en: 'Officers', bn: 'কর্মকর্তাবৃন্দ', href: '/pages/officers' },
        { en: 'Officers by Unit', bn: 'ইউনিট ভিত্তিক কর্মকর্তাবৃন্দ', href: '/pages/officers' },
        { en: 'List of Directors General', bn: 'মহাপরিচালকগণের তালিকা', href: '/pages/static-pages/6922e0da933eb65569e28dbd' },
        { en: 'Grievance & Appellate Authority', bn: 'অভিযোগ নিষ্পত্তি কর্মকর্তা ও আপিল কর্তৃপক্ষ', href: '/pages/static-pages/grs-focal-point-0c6c4d-6922dc3a933eb65569e0f1a3' },
        { en: 'Contact', bn: 'যোগাযোগ', href: '/pages/static-pages/6922de7c933eb65569e1af90' }
      ]}
    ]
  },

  {
    key: 'statistics', en: 'Statistics', bn: 'পরিসংখ্যান',
    groups: [{ en: 'Statistics', bn: 'পরিসংখ্যান', items: [
      { en: 'Patents', bn: 'পেটেন্ট', href: '/pages/static-pages/6922df1c933eb65569e1fed9' },
      { en: 'Industrial Designs', bn: 'শিল্প-নকশা', href: '/pages/static-pages/6922dd30933eb65569e13db9' },
      { en: 'Trademarks', bn: 'ট্রেডমার্কস', href: '/pages/static-pages/6922dc00933eb65569e0de4f' },
      { en: 'Geographical Indications', bn: 'জিআই', href: '/pages/static-pages/6922dff0933eb65569e24bcf' }
    ]}]
  },

  {
    key: 'online', en: 'Online Application', bn: 'অনলাইন আবেদন',
    groups: [{ en: 'Online Application', bn: 'অনলাইন আবেদন', items: [
      { en: 'IPAS 4.0 — Online Application', bn: 'অনলাইন আবেদন (আইপাস)', href: '/online-application', internal: true },
      { en: 'Online Application Updates', bn: 'অনলাইন আবেদন বিষয়ক হালনাগাদ তথ্য', href: '/pages/static-pages/6922e02a933eb65569e25ca3' },
      { en: 'A-Challan Link', bn: 'A চালান লিংক', href: 'https://www.achallan.gov.bd/', ext: true }
    ]}]
  },

  {
    key: 'publication', en: 'Publication', bn: 'পাবলিকেশন',
    groups: [
      { en: 'General', bn: 'পাবলিকেশন', items: [
        { en: 'E-Journal', bn: 'ই-জার্নাল', href: 'https://bd.publish.wipo.net/wopublish-search/public/home?5', ext: true }
      ]},
      { en: 'Patent Publications', bn: 'পেটেন্ট পাবলিকেশন', items: [
        { en: 'Published Patent Applications', bn: 'আবেদনকৃত পেটেন্ট প্রকাশনা', href: '/pages/static-pages/6922e12a933eb65569e2aa10' },
        { en: 'Opposition (Applied Patents)', bn: 'আবেদনকৃত পেটেন্ট প্রকাশনার অপোজিশন আবেদন', href: '/pages/static-pages/6922de9b933eb65569e1bf1c' },
        { en: 'Granted Patent Publications', bn: 'মঞ্জুরকৃত পেটেন্ট প্রকাশনা', href: '/pages/static-pages/6922dcb2933eb65569e11955' },
        { en: 'Opposition (Granted Patents)', bn: 'মঞ্জুরকৃত পেটেন্ট প্রকাশনার অপোজিশন আবেদন', href: '/pages/static-pages/6922e134933eb65569e2adb0' },
        { en: 'Special Publications', bn: 'বিশেষ প্রকাশনা', href: '/pages/static-pages/6922e036933eb65569e2607e' }
      ]},
      { en: 'Industrial Design Publications', bn: 'ইন্ডাস্ট্রিয়াল ডিজাইন পাবলিকেশন', items: [
        { en: 'Accepted Design Applications', bn: 'ইন্ডাস্ট্রিয়াল ডিজাইনের গৃহীত আবেদনের প্রকাশনা', href: '/pages/static-pages/6922dc68933eb65569e102e5' },
        { en: 'Opposition Notice', bn: 'অপোজিশন নোটিশ', href: '/pages/static-pages/6922e113933eb65569e2a0b3' }
      ]},
      { en: 'Trademark Publications', bn: 'ট্রেডমার্কস পাবলিকেশন', items: [
        { en: 'Trademarks Journal', bn: 'ট্রেডমার্কস জার্নাল', href: '/pages/static-pages/6922dc84933eb65569e10c76' },
        { en: 'Opposition Notice', bn: 'অপোজিশন নোটিশ', href: '/pages/static-pages/6922df81933eb65569e22696' }
      ]},
      { en: 'GI Publications', bn: 'জি আই পাবলিকেশন', items: [
        { en: 'GI Journal', bn: 'জি আই জার্নাল', href: '/pages/static-pages/6922db8e933eb65569e0adbc' }
      ]}
    ]
  },

  {
    key: 'acts', en: 'Act-Rules', bn: 'আইন-বিধি',
    groups: [
      { en: 'Laws', bn: 'আইন', items: [
        { en: 'Bangladesh Patent Act, 2023', bn: 'বাংলাদেশ পেটেন্ট আইন, ২০২৩', href: '/pages/static-pages/6922db58933eb65569e098d2' },
        { en: 'Bangladesh Industrial Design Act, 2023', bn: 'বাংলাদেশ শিল্প-নকশা আইন, ২০২৩', href: '/pages/static-pages/6922dc85933eb65569e10c9e' },
        { en: 'Bangladesh Patent Act, 2022', bn: 'বাংলাদেশ পেটেন্ট আইন, ২০২২', href: 'https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-dpdt/2024/12/9a15f34210ce469ab51b841e547c990a.pdf', ext: true },
        { en: 'Patents & Designs Act, 1911', bn: 'পেটেন্ট ও ডিজাইন আইন, ১৯১১', href: '/pages/static-pages/6922dcb3933eb65569e119ba' },
        { en: 'Trademark Act, 2009', bn: 'ট্রেডমার্ক আইন, ২০০৯', href: '/pages/static-pages/6922dfa7933eb65569e2344c' },
        { en: 'Trademark (Amendment) Act, 2015', bn: 'ট্রেডমার্ক (সংশোধন) আইন, ২০১৫', href: '/pages/static-pages/6922df46933eb65569e2100a' },
        { en: 'GI Product (Registration & Protection) Act, 2013', bn: 'ভৌগোলিক নির্দেশক পণ্য (নিবন্ধন ও সুরক্ষা) আইন, ২০১৩', href: '/pages/static-pages/6922dc4e933eb65569e0f9cd' },
        { en: 'All Laws', bn: 'সকল আইন', href: '/pages/laws' }
      ]},
      { en: 'Rules', bn: 'বিধি', items: [
        { en: 'Patents & Designs Rules, 1933', bn: 'পেটেন্ট ও ডিজাইন বিধিমালা, ১৯৩৩', href: '/pages/static-pages/6922e033933eb65569e25f61' },
        { en: 'Trademark Rules, 2015', bn: 'ট্রেডমার্ক বিধিমালা, ২০১৫', href: '/pages/static-pages/6922ddc2933eb65569e1620f' },
        { en: 'GI Product Rules, 2015', bn: 'ভৌগোলিক নির্দেশক পণ্য বিধিমালা, ২০১৫', href: '/pages/static-pages/6922de14933eb65569e1811f' }
      ]},
      { en: 'Policies', bn: 'নীতি', items: [
        { en: 'National IP Policy, 2018', bn: 'আইপি পলিসি ২০১৮', href: '/pages/static-pages/6922db7a933eb65569e0a4f0' },
        { en: 'Disclosure of Information Policy, 2015', bn: 'তথ্য অবমুক্তকরণ নীতিমালা ২০১৫', href: '/pages/static-pages/6922df08933eb65569e1f5c2' }
      ]}
    ]
  },

  {
    key: 'media', en: 'Media Gallery', bn: 'মিডিয়া গ্যালারী',
    groups: [{ en: 'Media Gallery', bn: 'মিডিয়া গ্যালারী', items: [
      { en: 'Photo Gallery', bn: 'ফটো গ্যালারী', href: '/pages/photo-galleries' },
      { en: 'Publications', bn: 'প্রকাশনা', href: '/pages/publications' },
      { en: 'Presentations', bn: 'প্রেজেন্টেশন', href: '/pages/static-pages/6922df0a933eb65569e1f694' }
    ]}]
  },

  {
    key: 'download', en: 'Download', bn: 'ডাউনলোড',
    groups: [
      { en: 'Application Process', bn: 'আবেদন প্রক্রিয়া', items: [
        { en: 'Patent', bn: 'পেটেন্ট', href: '/pages/static-pages/6922df03933eb65569e1f32d' },
        { en: 'Industrial Design', bn: 'শিল্প-নকশা', href: '/pages/static-pages/6922df1b933eb65569e1fe94' },
        { en: 'Trademarks', bn: 'ট্রেডমার্কস', href: '/pages/static-pages/6922df8e933eb65569e22c0d' },
        { en: 'Geographical Indication', bn: 'ভৌগোলিক নির্দেশক পণ্য', href: '/pages/static-pages/6922deab933eb65569e1c7b8' }
      ]},
      { en: 'Fees', bn: 'ফি', items: [
        { en: 'Revised Fees (Patent, Design & Trademark)', bn: 'পুনঃনির্ধারিত ফি (পেটেন্ট,শিল্প-নকশা ও ট্রেডমার্কস)', href: '/pages/static-pages/6922e14d933eb65569e2b677' },
        { en: 'Patent (Previous)', bn: 'পেটেন্ট (পূর্বের)', href: '/pages/static-pages/6922de4e933eb65569e19b55' },
        { en: 'Industrial Design (Previous)', bn: 'শিল্প-নকশা (পূর্বের)', href: '/pages/static-pages/6922dd13933eb65569e13695' },
        { en: 'Trademarks (Previous)', bn: 'ট্রেডমার্কস (পূর্বের)', href: '/pages/static-pages/6922e0cc933eb65569e289fd' },
        { en: 'GI Products (Revised Fees)', bn: 'জি আই পণ্য (পুনঃনির্ধারিত ফি)', href: '/pages/static-pages/6922df9f933eb65569e23135' }
      ]},
      { en: 'Forms', bn: 'ফরম', items: [
        { en: 'Patent', bn: 'পেটেন্ট', href: '/pages/static-pages/6922dce0933eb65569e12878' },
        { en: 'Industrial Design', bn: 'শিল্প-নকশা', href: '/pages/static-pages/6922dfde933eb65569e24690' },
        { en: 'Trademarks', bn: 'ট্রেডমার্কস', href: '/pages/static-pages/6922e08d933eb65569e278d3' },
        { en: 'Geographical Indication', bn: 'ভৌগোলিক নির্দেশক পণ্য', href: '/pages/static-pages/6922dc71933eb65569e10685' }
      ]},
      { en: 'Application Checklists', bn: 'আবেদনের চেকলিস্ট', items: [
        { en: 'Trademarks', bn: 'ট্রেডমার্কস', href: '/pages/static-pages/6922df0e933eb65569e1f8de' },
        { en: 'Geographical Indication', bn: 'ভৌগোলিক নির্দেশক পণ্য', href: '/pages/static-pages/6922e0ff933eb65569e297d6' }
      ]},
      { en: 'Gazette & Journal', bn: 'গেজেট/জার্নাল', items: [
        { en: 'Patent Gazette', bn: 'পেটেন্ট গেজেট', href: '/pages/static-pages/6922df78933eb65569e22309' },
        { en: 'Trademark Journal', bn: 'ট্রেডমার্ক জার্নাল', href: '/pages/static-pages/6922dc84933eb65569e10c76' },
        { en: 'GI Journal', bn: 'জি আই জার্নাল', href: '/pages/static-pages/6922db8e933eb65569e0adbc' },
        { en: 'GI Authorized Users', bn: 'জি আই অনুমোদিত ব্যবহারকারী', href: '/pages/static-pages/6922dc5f933eb65569e0ffae' }
      ]},
      { en: 'Notices & Tenders', bn: 'বিজ্ঞপ্তি ও দরপত্র', items: [
        { en: 'Tenders / Notices', bn: 'দরপত্র/বিজ্ঞপ্তি', href: '/pages/tenders' },
        { en: 'Notifications', bn: 'প্রজ্ঞাপন', href: '/pages/notification-circulars' },
        { en: 'Local Tenders', bn: 'লোকাল দরপত্র', href: '/pages/tenders' }
      ]},
      { en: 'Office Orders & Letters', bn: 'অফিস আদেশ ও পত্র', items: [
        { en: 'Office Orders (All)', bn: 'অফিস আদেশ (সকল)', href: '/pages/office-orders' },
        { en: 'No-Objection Letters', bn: 'অনাপত্তি পত্র', href: '/pages/static-pages/6922df77933eb65569e22293' },
        { en: 'IT Requirement Letters', bn: 'আইটি সংক্রান্ত চাহিদা পত্র', href: '/pages/static-pages/6922de5f933eb65569e1a327' }
      ]}
    ]
  },

  {
    key: 'classification', en: 'International Classification', bn: 'আন্তর্জাতিক শ্রেণিবিভাগ',
    groups: [{ en: 'International Classification', bn: 'আন্তর্জাতিক শ্রেণিবিভাগ', items: [
      { en: 'Trademark Nice Classification', bn: 'ট্রেডমার্ক নিস শ্রেণী বিভাগ', href: '/pages/static-pages/6922df9e933eb65569e230bd' },
      { en: 'Trademark Vienna Classification', bn: 'ট্রেডমার্ক ভিয়েনা শ্রেণী বিভাগ', href: '/pages/static-pages/6922dcf0933eb65569e12d68' },
      { en: 'Locarno Classification', bn: 'লোকার্নো শ্রেনী বিভাগ', href: '/pages/static-pages/6922e07e933eb65569e2754d' }
    ]}]
  },

  {
    key: 'gi', en: 'GI Products', bn: 'ভৌগোলিক নির্দেশক (জিআই) পণ্য',
    groups: [{ en: 'Geographical Indications', bn: 'জিআই পণ্য', items: [
      { en: 'GI Applications in Process', bn: 'প্রক্রিয়াধীন জি আই আবেদনসমূহ', href: '/pages/static-pages/6922dfaa933eb65569e2356d' },
      { en: 'Registered (Certified) GI Products', bn: 'নিবন্ধিত (সনদপ্রাপ্ত) জি আই পণ্য', href: '/pages/static-pages/6922dff0933eb65569e24bcf' },
      { en: 'GI Journal', bn: 'জি আই জার্নাল', href: '/pages/static-pages/6922db8e933eb65569e0adbc' },
      { en: 'GI Authorized Users', bn: 'জি আই অনুমোদিত ব্যবহারকারী', href: '/pages/static-pages/6922dc5f933eb65569e0ffae' },
      { en: 'GI Application Process', bn: 'জি আই পণ্য আবেদন প্রক্রিয়া', href: '/pages/static-pages/6922deab933eb65569e1c7b8' },
      { en: 'GI Registration Checklist', bn: 'জি আই পণ্য নিবন্ধন চেকলিস্ট', href: '/pages/static-pages/6922e0ff933eb65569e297d6' },
      { en: 'GI Forms', bn: 'জি আই ফরম', href: '/pages/static-pages/6922dc71933eb65569e10685' },
      { en: 'GI Fee Schedule', bn: 'জি আই ফি সিডিউল', href: '/pages/static-pages/6922df9f933eb65569e23135' }
    ]}]
  },

  {
    key: 'faq', en: 'FAQ', bn: 'সচরাচর জিজ্ঞাস্য',
    groups: [{ en: 'Frequently Asked Questions', bn: 'সচরাচর জিজ্ঞাস্য', items: [
      { en: 'Intellectual Property', bn: 'মেধা সম্পদ', href: '/pages/static-pages/6922ddba933eb65569e1606a' },
      { en: 'Copyright', bn: 'কপিরাইট', href: '/pages/static-pages/6922e0c0933eb65569e28742' },
      { en: 'Geographical Indication', bn: 'ভৌগোলিক নির্দেশক পণ্য', href: '/pages/static-pages/6922e110933eb65569e29f56' },
      { en: 'Patent', bn: 'পেটেন্ট', href: '/pages/static-pages/6922e08e933eb65569e278f2' },
      { en: 'Industrial Design', bn: 'শিল্প-নকশা', href: '/pages/static-pages/6922df55933eb65569e2141a' },
      { en: 'Trademarks', bn: 'ট্রেডমার্কস', href: '/pages/static-pages/6922e09c933eb65569e27d43' }
    ]}]
  }
];

/* Portal-internal links (functionality owned by this portal). */
const INTERNAL_LINKS = [
  { en: 'Home', bn: 'হোম', href: '/' },
  { en: 'About the Department', bn: 'অধিদপ্তর সম্পর্কে', href: '/about' },
  { en: 'Online Application (IPAS)', bn: 'অনলাইন আবেদন (আইপাস)', href: '/online-application' },
  { en: 'Trademark Verification', bn: 'ট্রেডমার্ক যাচাইকরণ', href: '/verify' },
  { en: 'Fee Structure', bn: 'ফি কাঠামো', href: '/verify?page=fee' },
  { en: 'Contact & Hotlines', bn: 'যোগাযোগ', href: '/verify?page=contact' }
];

const IMPORTANT_LINKS = [
  { en: 'Recruitment Notice 2026', bn: 'নিয়োগ বিজ্ঞপ্তি-২০২৬', href: 'http://dpdt.teletalk.com.bd/', ext: true },
  { en: 'Ministry of Industries', bn: 'শিল্প মন্ত্রণালয়', href: 'http://www.moind.gov.bd/', ext: true },
  { en: 'World Intellectual Property Organization', bn: 'বিশ্ব মেধাসম্পদ সংস্থা', href: 'http://www.wipo.int', ext: true },
  { en: 'World Trade Organization', bn: 'বিশ্ব বানিজ্য সংস্থা', href: 'http://www.wto.org/', ext: true },
  { en: 'Personnel Management System (PMIS)', bn: 'পার্সোনেল ম্যানেজমেন্ট সিস্টেম', href: 'http://pmis.mopa.gov.bd/', ext: true },
  { en: 'Bangladesh National Portal', bn: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন', href: 'http://bangladesh.gov.bd/', ext: true },
  { en: 'MyGov Bangladesh', bn: 'মাইগভ', href: 'https://www.mygov.bd/', ext: true },
  { en: 'Bangladesh e-Directory', bn: 'বাংলাদেশ ই-ডিরেক্টরি', href: 'https://edirectory.portal.gov.bd/', ext: true }
];

const HOTLINES = [
  { en: 'Government Information & Services', bn: 'সরকারি তথ্য ও সেবা', num: '৩৩৩', href: 'https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9' },
  { en: 'National Emergency Service', bn: 'জরুরি সেবা', num: '৯৯৯', href: 'https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9' },
  { en: 'Fire Service Hotline', bn: 'ফায়ার সার্ভিস হটলাইন', num: '১০২', href: 'https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9' }
];

const NOTICES = [
  { en: 'Information regarding opposition cases filed against trademark applications published in the 340th Trademark Journal.', bn: '৩৪০ নং ট্রেডমার্ক জার্নালে প্রকাশিত ট্রেডমার্ক দরখাস্ত সমূহের বিরুদ্ধে দায়েরকৃত অপোজিশন মামলা সংক্রান্ত তথ্য।', d: '11', m: 'Aug 2026', href: '/pages/notices/৩৪০-নং-ট্রেডমার্ক-জার্নালে-প্রকাশিত-ট্রেডমার্ক-দরখাস্ত-সমূহের-বিরুদ্ধে-দায়েরকৃত-অপোজিশন-মামলা-সংক্রান্ত-তথ্য-qe52if-6a7ab7896ab58a3743452384' },
  { en: 'Meeting with representatives/members of Bangladesh Intellectual Property Attorneys Association (BIPAA).', bn: 'Bangladesh Intellectual Property Attorneys Association (BIPAA) এর প্রতিনিধি/সদস্যগণের সাথে মতবিনিময় সভা।', d: '27', m: 'Jul 2026', href: '/pages/notices/bangladesh-intellectual-property-attorneys-association-bipaa-এর-প্রতিনিধিসদস্যগণের-সাথে-মতবিনিময়-সভা-o9yb8w-6a6879a8a134e8fb07b769b9' },
  { en: 'Information regarding opposition cases filed against trademark applications published in the 339th Trademark Journal.', bn: '৩৩৯ নং ট্রেডমার্ক জার্নালে প্রকাশিত ট্রেডমার্ক দরখাস্ত সমূহের বিরুদ্ধে দায়েরকৃত অপোজিশন মামলা সংক্রান্ত তথ্য।', d: '24', m: 'Jun 2026', href: '/pages/notices/৩৩৯-নং-ট্রেডমার্ক-জার্নালে-প্রকাশিত-ট্রেডমার্ক-দরখাস্ত-সমূহের-বিরুদ্ধে-দায়েরকৃত-অপোজিশন-মামলা-সংক্রান্ত-তথ্য-4wcj98-6a3bb1ce96ede6d08b061305' }
];

/* Additional searchable portal pages (not already covered by NAV). */
const SEARCH_PAGES = [
  { en: 'Notice Board', bn: 'নোটিশ বোর্ড', href: '/pages/notices', kw: ['notice', 'নোটিশ', 'বিজ্ঞপ্তি'] },
  { en: 'News', bn: 'খবর', href: '/pages/news/', kw: ['news', 'খবর'] },
  { en: 'All Services', bn: 'সকল সেবা', href: '/pages/service-boxes', kw: ['services', 'সেবা'] },
  { en: 'Service Process Maps', bn: 'সেবা প্রক্রিয়া', href: '/pages/office-process-maps', kw: ['process', 'সেবা প্রক্রিয়া'] },
  { en: 'Tenders & Notices', bn: 'দরপত্র ও বিজ্ঞপ্তি', href: '/pages/tenders', kw: ['tender', 'দরপত্র', 'বিজ্ঞপ্তি'] },
  { en: 'Notifications & Circulars', bn: 'প্রজ্ঞাপন ও পরিপত্র', href: '/pages/notification-circulars', kw: ['notification', 'circular', 'প্রজ্ঞাপন'] },
  { en: 'Office Orders', bn: 'অফিস আদেশ', href: '/pages/office-orders', kw: ['office order', 'অফিস আদেশ'] },
  { en: 'Photo Gallery', bn: 'ফটো গ্যালারি', href: '/pages/photo-galleries', kw: ['gallery', 'photo', 'ছবি'] },
  { en: 'Publications', bn: 'প্রকাশনা', href: '/pages/publications', kw: ['publication', 'প্রকাশনা'] },
  { en: 'All Laws', bn: 'সকল আইন', href: '/pages/laws', kw: ['law', 'act', 'আইন'] },
  { en: 'Site Map', bn: 'সাইট ম্যাপ', href: '/views/sitemap', kw: ['sitemap', 'সাইট ম্যাপ'] }
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function url(href) {
  if (/^https?:\/\//i.test(href)) return href;
  return OFF + href;
}
function extIcon() {
  return '<svg class="ext" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
}
function hrefFor(item) {
  if (item.internal) return item.href;
  return url(item.href);
}
function itemHTML(item) {
  const isExt = !!item.ext;
  const isInternal = !!item.internal;
  return '<a href="' + hrefFor(item) + '"' + (isExt ? ' target="_blank" rel="noopener"' : '') + (isInternal ? ' data-internal="1"' : '') + '>' +
    '<span class="bn">' + item.bn + '</span>' +
    '<span class="en">' + item.en + '</span>' +
    (isExt ? extIcon() : '') +
    '</a>';
}

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE STATE
═══════════════════════════════════════════════════════════════ */
let lang = localStorage.getItem('dpdt-lang') || 'en';

function t(bn, en) { return lang === 'bn' ? bn : en; }

/* ═══════════════════════════════════════════════════════════════
   RENDER — DESKTOP PRIMARY NAV (full official DPDT structure)
═══════════════════════════════════════════════════════════════ */
function barItemHTML(cat) {
  if (cat.type === 'link') {
    const ctaCls = cat.cta ? ' cta' : '';
    return '<li><a class="nav-link' + ctaCls + '" href="' + cat.href + '" data-internal="1"' + (cat.newtab ? ' target="_blank" rel="noopener"' : '') + '>' +
      cat.icon + '<span>' + t(cat.bn, cat.en) + '</span>' +
      (cat.cta ? '<span class="badge-verify">ONLINE</span>' : '') + '</a></li>';
  }
  const category = NAV.find(n => n.key === cat.key);
  const wide = category.groups.length > 1;
  let inner = '';
  if (wide) {
    inner = '<div class="dropdown wide">';
    category.groups.forEach(g => {
      inner += '<div class="dg-col">' +
        '<div class="dg-head">' + t(g.bn, g.en) + '</div>' +
        '<div class="dg-links">' + g.items.map(itemHTML).join('') + '</div>' +
        '</div>';
    });
    inner += '</div>';
  } else {
    inner = '<div class="dropdown">' + category.groups[0].items.map(itemHTML).join('') + '</div>';
  }
  return '<li class="has-sub" data-cat="' + category.key + '">' +
    '<button class="nav-link" aria-haspopup="true">' +
      '<span>' + t(category.bn, category.en) + '</span><span class="caret">&#9662;</span>' +
    '</button>' + inner + '</li>';
}

const ICON_HOME = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
const ICON_SEARCH = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
const ICON_PHONE = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

function renderBar() {
  const el = document.getElementById('navList');
  if (!el) return;
  const BAR = [
    { type: 'link', en: 'Home', bn: 'হোম', href: '/', icon: ICON_HOME },
    { type: 'menu', key: 'about' },
    { type: 'menu', key: 'statistics' },
    { type: 'menu', key: 'online' },
    { type: 'menu', key: 'publication' },
    { type: 'menu', key: 'acts' },
    { type: 'menu', key: 'media' },
    { type: 'menu', key: 'download' },
    { type: 'menu', key: 'classification' },
    { type: 'menu', key: 'gi' },
    { type: 'menu', key: 'faq' },
    { type: 'link', en: 'Contact', bn: 'যোগাযোগ', href: '/verify?page=contact', icon: ICON_PHONE },
    { type: 'link', en: 'Trademark Verification', bn: 'ট্রেডমার্ক যাচাইকরণ', href: '/verify', cta: true, icon: ICON_SEARCH }
  ];
  el.innerHTML = BAR.map(barItemHTML).join('');
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — FULL MENU OVERLAY (all official categories)
═══════════════════════════════════════════════════════════════ */
function renderMega() {
  const body = document.getElementById('megaBody');
  if (!body) return;
  let html = '<div class="mega-internal"><div class="mega-internal-title">' + t('এ পোর্টালের সেবাসমূহ', 'This Portal\'s Services') + '</div>';
  INTERNAL_LINKS.forEach(l => {
    html += '<a href="' + l.href + '" data-internal="1">' + t(l.bn, l.en) + '</a>';
  });
  html += '</div>';
  NAV.forEach(cat => {
    html += '<div class="mega-col">' +
      '<div class="mega-col-head">' + t(cat.bn, cat.en) + '</div>';
    cat.groups.forEach(g => {
      html += '<div class="mega-sub-head">' + t(g.bn, g.en) + '</div>';
      g.items.forEach(item => {
        const isExt = !!item.ext;
        const isInternal = !!item.internal;
        html += '<a href="' + hrefFor(item) + '"' + (isExt ? ' target="_blank" rel="noopener"' : '') + (isInternal ? ' data-internal="1"' : '') + '>' +
          '<span class="bn">' + item.bn + '</span><span class="en">' + item.en + '</span></a>';
      });
    });
    html += '</div>';
  });
  body.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — MOBILE DRAWER (accordion of ALL categories)
═══════════════════════════════════════════════════════════════ */
function renderMobile() {
  const el = document.getElementById('mobileNav');
  if (!el) return;
  let html = '<div class="mn-top">';
  INTERNAL_LINKS.forEach(l => {
    html += '<a href="' + l.href + '" data-internal="1">' + t(l.bn, l.en) + '</a>';
  });
  html += '</div>';
  NAV.forEach(cat => {
    html += '<div class="mn-group" data-cat="' + cat.key + '">' +
      '<button class="mn-toggle" type="button">' +
        '<span>' + t(cat.bn, cat.en) + '</span><span class="arrow">&#9656;</span>' +
      '</button><div class="mn-sub">';
    cat.groups.forEach(g => {
      g.items.forEach(item => {
        const isExt = !!item.ext;
        const isInternal = !!item.internal;
        html += '<a href="' + hrefFor(item) + '"' + (isExt ? ' target="_blank" rel="noopener"' : '') + (isInternal ? ' data-internal="1"' : '') + '>' +
          '<span class="bn">' + item.bn + '</span><span class="en">' + item.en + '</span></a>';
      });
    });
    html += '</div></div>';
  });
  el.innerHTML = html;

  el.querySelectorAll('.mn-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.mn-group').classList.toggle('open');
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   RENDER — SIDE & HOME DYNAMIC LISTS
═══════════════════════════════════════════════════════════════ */
function renderLists() {
  const imp = document.getElementById('importantLinks');
  if (imp) {
    imp.innerHTML = IMPORTANT_LINKS.map(l => {
      const isExt = !!l.ext;
      return '<a href="' + l.href + '"' + (isExt ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="bn">' + l.bn + '</span><span class="en">' + l.en + '</span>' +
        (isExt ? extIcon() : '') + '</a>';
    }).join('');
  }
  const hl = document.getElementById('hotlineList');
  if (hl) {
    hl.innerHTML = HOTLINES.map(h => {
      return '<a class="hotline-row" href="' + h.href + '" target="_blank" rel="noopener">' +
        '<span class="hl-name"><span class="bn">' + h.bn + '</span><span class="en">' + h.en + '</span></span>' +
        '<span class="hl-num">' + h.num + '</span></a>';
    }).join('');
  }
  const nt = document.getElementById('noticeList');
  if (nt) {
    nt.innerHTML = NOTICES.map(n => {
      return '<li><a href="' + url(n.href) + '" target="_blank" rel="noopener">' +
        '<span class="n-date"><b>' + n.d + '</b><span>' + n.m + '</span></span>' +
        '<span class="n-body">' + t(n.bn, n.en) + '<span class="n-tag">' + t('সাধারণ', 'General') + '</span></span></a></li>';
    }).join('');
  }
}

/* ═══════════════════════════════════════════════════════════════
   GENERAL SITE SEARCH
   Searches the portal's available content and shows matching
   sections/links.  Trademark-number lookup remains on /verify.
═══════════════════════════════════════════════════════════════ */
function buildSearchIndex() {
  const idx = [];
  NAV.forEach(cat => {
    cat.groups.forEach(g => {
      g.items.forEach(item => {
        idx.push({
          groupEn: cat.en, groupBn: cat.bn,
          en: item.en, bn: item.bn,
          href: item.href, ext: !!item.ext, internal: !!item.internal, kw: item.kw || []
        });
      });
    });
  });
  INTERNAL_LINKS.forEach(l => {
    idx.push({ groupEn: 'This Portal', groupBn: 'এই পোর্টাল', en: l.en, bn: l.bn, href: l.href, ext: false, internal: true, kw: [] });
  });
  SEARCH_PAGES.forEach(p => {
    idx.push({ groupEn: 'Pages', groupBn: 'পাতা', en: p.en, bn: p.bn, href: p.href, ext: false, kw: p.kw || [] });
  });
  return idx;
}
const SEARCH_INDEX = buildSearchIndex();

function scoreSearch(rawQuery) {
  const query = (rawQuery || '').trim().toLowerCase();
  if (!query) return [];
  const tokens = query.split(/\s+/).filter(Boolean);
  const matched = [];
  SEARCH_INDEX.forEach(entry => {
    const hay = (entry.en + ' ' + entry.bn + ' ' + (entry.kw || []).join(' ')).toLowerCase();
    if (tokens.every(tk => hay.indexOf(tk) !== -1)) {
      let score = 4;
      const enL = entry.en.toLowerCase();
      const bnL = entry.bn.toLowerCase();
      if (enL.indexOf(query) === 0) score = 0;
      else if (bnL.indexOf(query) === 0) score = 1;
      else if (enL.indexOf(query) !== -1) score = 2;
      else if (bnL.indexOf(query) !== -1) score = 3;
      matched.push({ entry: entry, score: score });
    }
  });
  matched.sort(function (a, b) { return a.score - b.score; });
  return matched;
}

function doSiteSearch(rawQuery) {
  const panel = document.getElementById('siteSearchResults');
  if (!panel) return;
  const query = (rawQuery || '').trim();
  if (!query) { panel.classList.add('hidden'); return; }
  const matched = scoreSearch(query);
  renderSearchResults(panel, matched.slice(0, 12), query);
}

function renderSearchResults(panel, results, query) {
  let head = '<div class="sr-head">' + t('অনুসন্ধান ফলাফল:', 'Search results for:') + ' <b>' + query + '</b>';
  if (results.length) {
    head += '<a class="sr-viewall" href="/verify?page=search&amp;q=' + encodeURIComponent(query) + '" data-internal="1">' + t('সব ফলাফল দেখুন', 'View all results') + ' &rarr;</a>';
  }
  head += '</div>';
  let html = head;
  if (!results.length) {
    html += '<div class="sr-empty">' + t('কোনো ফলাফল পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।', 'No matching sections found. Try a different keyword.') + '</div>';
  } else {
    let lastGroup = null;
    results.forEach(r => {
      const g = t(r.groupBn, r.groupEn);
      if (g !== lastGroup) {
        html += '<div class="sr-group">' + g + '</div>';
        lastGroup = g;
      }
      html += '<a class="sr-item" href="' + (r.internal ? r.href : url(r.href)) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : ' data-internal="1"') + '>' +
        '<span class="sr-title">' + t(r.bn, r.en) + '</span>' +
        (r.ext ? extIcon() : '<span class="sr-go">' + t('যান', 'Go') + ' &rarr;</span>') +
        '</a>';
    });
  }
  panel.innerHTML = html;
  panel.classList.remove('hidden');
}

function runFullSearch(rawQuery) {
  const out = document.getElementById('searchResults');
  const empty = document.getElementById('searchEmpty');
  const countEl = document.getElementById('searchCount');
  if (!out) return;
  const query = (rawQuery || '').trim();
  if (!query) {
    out.innerHTML = '';
    if (empty) empty.classList.add('hidden');
    if (countEl) countEl.textContent = '';
    return;
  }
  const matched = scoreSearch(query);
  if (countEl) countEl.textContent = String(matched.length);

  let html = '';
  if (/^\d{4,}$/.test(query)) {
    html += '<div class="sr-tm-hint">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<span>' + t('একটি ট্রেডমার্ক নম্বর খুঁজছেন? সরাসরি যাচাই করে দেখুন —', 'Looking for a trademark number? Verify it directly —') +
      '</span><a href="/verify?reg_no=' + encodeURIComponent(query) + '" data-internal="1">' + t('ট্রেডমার্ক যাচাই করুন', 'Verify Trademark') + '</a></div>';
  }
  if (!matched.length) {
    if (empty && !/^\d{4,}$/.test(query)) empty.classList.remove('hidden');
    out.innerHTML = html;
    return;
  }
  if (empty) empty.classList.add('hidden');
  let lastGroup = null;
  matched.forEach(r => {
    const g = t(r.groupBn, r.groupEn);
    if (g !== lastGroup) {
      html += '<div class="sr-group">' + g + '</div>';
      lastGroup = g;
    }
    html += '<a class="sr-item" href="' + (r.internal ? r.href : url(r.href)) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : ' data-internal="1"') + '>' +
      '<span class="sr-title">' + t(r.bn, r.en) + '</span>' +
      (r.ext ? extIcon() : '<span class="sr-go">' + t('যান', 'Go') + ' &rarr;</span>') +
      '</a>';
  });
  out.innerHTML = html;
}

function runSiteSearch() {
  const inputEl = document.getElementById('siteSearchInput');
  if (!inputEl) return;
  runFullSearch(inputEl.value);
}

function openSearch() {
  const panel = document.getElementById('siteSearchResults');
  if (panel) panel.classList.remove('hidden');
}
function closeSearch() {
  const panel = document.getElementById('siteSearchResults');
  if (panel) panel.classList.add('hidden');
}

function bindSiteSearch() {
  const form = document.getElementById('topSearchForm');
  if (!form) return;
  const input = document.getElementById('topSearchInput');
  const btn = document.getElementById('topSearchBtn');
  let debounce = null;

  if (input) {
    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () { doSiteSearch(input.value); }, 180);
    });
    input.addEventListener('focus', function () { doSiteSearch(input.value); });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const v = input ? input.value.trim() : '';
    if (!v) return;
    doSiteSearch(v);
  });
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const v = input ? input.value.trim() : '';
      doSiteSearch(v);
    });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.national-bar')) closeSearch();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
  });
}

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════════════════════════════════ */
function applyStaticLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = lang === 'bn' ? (el.getAttribute('data-bn') || el.getAttribute('data-en')) : el.getAttribute('data-en');
    el.innerHTML = val || '';
  });
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  const si = document.getElementById('topSearchInput');
  if (si) si.setAttribute('placeholder', lang === 'bn' ? 'পোর্টাল খুঁজুন...' : 'Search the portal...');
  const fsi = document.getElementById('siteSearchInput');
  if (fsi) fsi.setAttribute('placeholder', lang === 'bn' ? 'এখানে খুঁজুন...' : 'Search here...');
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'bn' ? 'English' : 'বাংলা';
  const crumb = document.getElementById('crumbCurrent');
  if (crumb) {
    const map = { home: t('হোম', 'Home'), verify: t('ট্রেডমার্ক যাচাইকরণ', 'Trademark Verification'), fee: t('ফি কাঠামো', 'Fee Structure'), contact: t('যোগাযোগ', 'Contact'), search: t('অনুসন্ধান', 'Search'), 'online-application': t('অনলাইন আবেদন', 'Online Application'), about: t('অধিদপ্তর সম্পর্কে', 'About the Department') };
    crumb.textContent = map[state.route] || map.home;
  }
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', lang === 'bn'
      ? 'পেটেন্ট, শিল্প-নকশা ও ট্রেডমার্কস অধিদপ্তর (ডিপিডিটি), শিল্প মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার।'
      : 'Department of Patents, Designs & Trademarks (DPDT), Ministry of Industries, Government of the People\'s Republic of Bangladesh.');
  }
  if (input && input.value) doSiteSearch(input.value);
}

function setLang(next) {
  lang = next;
  localStorage.setItem('dpdt-lang', lang);
  renderBar(); renderMega(); renderMobile(); renderLists();
  applyStaticLang();
}

function initLang() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      setLang(lang === 'bn' ? 'en' : 'bn');
    });
  }
  const mobileLang = document.getElementById('mobileLangToggle');
  if (mobileLang) {
    mobileLang.addEventListener('click', function () {
      setLang(lang === 'bn' ? 'en' : 'bn');
    });
  }
  renderBar(); renderMega(); renderMobile(); renderLists();
  applyStaticLang();
}

/* ═══════════════════════════════════════════════════════════════
   ROUTING — single-file portal app
   Served from both index.html and verify.html (Vercel cleanUrls).
   Route is derived from the real URL path + query string.
═══════════════════════════════════════════════════════════════ */
const state = { route: 'home', regNo: null };
let input = null;

function currentRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const q = new URLSearchParams(window.location.search);
  if (q.get('page') === 'fee') return 'fee';
  if (q.get('page') === 'contact') return 'contact';
  if (q.get('page') === 'search') return 'search';
  if (q.has('reg_no') || q.has('regNo')) return 'verify';
  if (/\/verify/.test(path)) return 'verify';
  if (/\/online-application/.test(path)) return 'online-application';
  if (/\/about/.test(path)) return 'about';
  return 'home';
}

const VIEW_TITLES = {
  home: 'Home | Department of Patents, Designs & Trademarks, Bangladesh',
  verify: 'Trademark Verification | DPDT Bangladesh',
  fee: 'Fee Structure | DPDT Bangladesh',
  contact: 'Contact | DPDT Bangladesh',
  search: 'Search the Portal | DPDT Bangladesh',
  'online-application': 'Online Application (IPAS) | DPDT Bangladesh',
  about: 'About the Department | DPDT Bangladesh'
};

function viewTitle(route) {
  if (lang === 'bn') {
    const m = {
      home: 'হোম | পেটেন্ট, শিল্প-নকশা ও ট্রেডমার্কস অধিদপ্তর',
      verify: 'ট্রেডমার্ক যাচাইকরণ | ডিপিডিটি বাংলাদেশ',
      fee: 'ফি কাঠামো | ডিপিডিটি বাংলাদেশ',
      contact: 'যোগাযোগ | ডিপিডিটি বাংলাদেশ',
      search: 'পোর্টালে অনুসন্ধান | ডিপিডিটি বাংলাদেশ',
      'online-application': 'অনলাইন আবেদন (আইপাস) | ডিপিডিটি বাংলাদেশ',
      about: 'অধিদপ্তর সম্পর্কে | ডিপিডিটি বাংলাদেশ'
    };
    return m[route] || m.home;
  }
  return VIEW_TITLES[route] || VIEW_TITLES.home;
}

function showView(route) {
  state.route = route;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + route);
  if (view) view.classList.add('active');

  document.querySelectorAll('.nav-link.active').forEach(el => el.classList.remove('active'));
  if (route === 'verify') {
    const cta = document.querySelector('#navList a[href="/verify"]');
    if (cta) cta.classList.add('active');
  }
  document.title = viewTitle(route);

  const crumb = document.getElementById('crumbCurrent');
  if (crumb) {
    const map = { home: t('হোম', 'Home'), verify: t('ট্রেডমার্ক যাচাইকরণ', 'Trademark Verification'), fee: t('ফি কাঠামো', 'Fee Structure'), contact: t('যোগাযোগ', 'Contact'), search: t('অনুসন্ধান', 'Search'), 'online-application': t('অনলাইন আবেদন', 'Online Application'), about: t('অধিদপ্তর সম্পর্কে', 'About the Department') };
    crumb.textContent = map[route] || map.home;
  }

  const q = new URLSearchParams(window.location.search);
  const reg = q.get('reg_no') || q.get('regNo');
  if (route === 'search') {
    const term = q.get('q') || q.get('search') || '';
    const searchInput = document.getElementById('siteSearchInput');
    if (searchInput) searchInput.value = term;
    runFullSearch(term);
  }
  if (route === 'verify') {
    const inputEl = document.getElementById('tm');
    if (inputEl) inputEl.value = reg || '';
    if (reg) verifyTrademark(reg);
  }
  closeAllMenus();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function navigate(href) {
  history.pushState({}, '', href);
  route();
}

function route() {
  const r = currentRoute();
  showView(r);
  applyStaticLang();
}

/* intercept internal portal links (no full reload) */
function bindInternalLinks() {
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[data-internal]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || /^https?:/i.test(href)) return;
    e.preventDefault();
    navigate(href);
  });
}

/* ═══════════════════════════════════════════════════════════════
   TRADEMARK VERIFICATION — ORIGINAL CORE LOGIC (PRESERVED)
═══════════════════════════════════════════════════════════════ */
let currentRegNo = null;

function searchTM() {
  const regNo = document.getElementById('tm').value.trim();
  if (!regNo) { alert('Please enter a Trademark number.'); return; }
  navigate('?reg_no=' + encodeURIComponent(regNo));
}

async function verifyTrademark(regNo) {
  currentRegNo = regNo;
  const tableResult = document.getElementById('verificationResult');
  const errorResult = document.getElementById('errorResult');
  const assetContainer = document.getElementById('assetContainer');
  if (!tableResult || !errorResult || !assetContainer) return;

  try {
    const response = await fetch('data.json');
    const data = await response.json();

    if (data[regNo]) {
      const info = data[regNo];
      errorResult.classList.add('hidden');
      tableResult.classList.remove('hidden');

      document.getElementById('resNum').innerHTML =
        '<span class="tm-chip">' + regNo + '</span>';
      document.getElementById('resName').textContent = info.name;
      document.getElementById('resDate').textContent = info.application_date || '08/12/2015';
      document.getElementById('resAuth').textContent = info.authority;

      resolveCertificateAsset(regNo, assetContainer);
    } else {
      tableResult.classList.add('hidden');
      errorResult.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Database Layer Error:', error);
    alert('Database could not be loaded. Please ensure data.json structure is valid.');
  }
}

/* File-extension resolver — renders ONLY the original certificate
   asset (image or PDF). No injected text, captions or overlays. */
function resolveCertificateAsset(regNo, container) {
  const imgUrl = regNo + '.jpg';
  const imgChecker = new Image();

  imgChecker.onload = function () {
    container.innerHTML = '<img src="' + imgUrl + '" alt="">';
  };

  imgChecker.onerror = function () {
    const pdfUrl = regNo + '.pdf';
    fetch(pdfUrl)
      .then(response => {
        if (response.ok) {
          container.innerHTML = '<iframe src="' + pdfUrl + '" title=""></iframe>';
        } else {
          container.innerHTML = '<p style="font-size:13px;color:#64756c;padding:24px;text-align:center;">Certificate document preview is currently unavailable.</p>';
        }
      })
      .catch(function () {
        container.innerHTML = '<p style="font-size:13px;color:#64756c;padding:24px;text-align:center;">Certificate document preview is currently unavailable.</p>';
      });
  };

  imgChecker.src = imgUrl;
}

/* Download the ORIGINAL certificate file (no regeneration). */
function downloadCertificate() {
  if (!currentRegNo) return;
  const a = document.createElement('a');
  a.href = currentRegNo + '.jpg';
  a.download = currentRegNo + '.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER CLOCK
═══════════════════════════════════════════════════════════════ */
function updateClock() {
  const el = document.getElementById('lastUpdate');
  if (!el) return;
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  el.textContent = date + ' at ' + time;
}

/* ═══════════════════════════════════════════════════════════════
   MENU OPEN/CLOSE
═══════════════════════════════════════════════════════════════ */
function openMega() { document.getElementById('megaOverlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMega() { document.getElementById('megaOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function openDrawer() { document.getElementById('mobileDrawer').classList.add('open'); document.getElementById('scrim').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeDrawer() { document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('scrim').classList.remove('open'); document.body.style.overflow = ''; }
function closeAllMenus() { closeMega(); closeDrawer(); }

/* Close desktop dropdowns */
function closeBarDropdowns(except) {
  document.querySelectorAll('.nav-list > li.has-sub.open').forEach(function (li) {
    if (except && li === except) return;
    li.classList.remove('open');
  });
}

/* Keep an open dropdown inside the viewport (nav wraps / right-aligned rows) */
function clampDropdown(li) {
  const dd = li.querySelector('.dropdown');
  if (!dd) return;
  const liRect = li.getBoundingClientRect();
  const w = dd.offsetWidth;
  let leftPx = 0;
  if (w <= window.innerWidth - 16) {
    const minL = 8, maxL = window.innerWidth - w - 8;
    const ddLeft = dd.getBoundingClientRect().left;
    leftPx = Math.min(Math.max(ddLeft, minL), maxL) - liRect.left;
  }
  dd.style.left = leftPx + 'px';
}

function bindMenus() {
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) menuBtn.addEventListener('click', openMega);
  const megaClose = document.getElementById('megaClose');
  if (megaClose) megaClose.addEventListener('click', closeMega);
  const megaOverlay = document.getElementById('megaOverlay');
  if (megaOverlay) megaOverlay.addEventListener('click', function (e) { if (e.target === this) closeMega(); });

  const hamburger = document.getElementById('navHamburger');
  if (hamburger) hamburger.addEventListener('click', openDrawer);
  const mobileClose = document.getElementById('mobileClose');
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  const scrim = document.getElementById('scrim');
  if (scrim) scrim.addEventListener('click', closeDrawer);

  /* click-to-open dropdowns (touch / tablet) */
  const navList = document.getElementById('navList');
  if (navList) {
    navList.addEventListener('click', function (e) {
      const btn = e.target.closest('.nav-link');
      if (!btn) return;
      const li = btn.closest('li.has-sub');
      if (!li) return;
      const isOpen = li.classList.contains('open');
      closeBarDropdowns();
      if (!isOpen) li.classList.add('open');
      clampDropdown(li);
    });
    navList.addEventListener('mouseover', function (e) {
      const li = e.target.closest('li.has-sub');
      if (li) clampDropdown(li);
    });
    window.addEventListener('resize', function () {
      document.querySelectorAll('.nav-list > li.has-sub.open').forEach(clampDropdown);
    });
    navList.addEventListener('mouseleave', function () { closeBarDropdowns(); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllMenus();
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.primary-nav')) closeBarDropdowns();
  });
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  input = document.getElementById('topSearchInput');
  initLang();
  bindMenus();
  bindInternalLinks();
  bindSiteSearch();
  loadRecordCount();
  window.addEventListener('popstate', route);
  route();
  updateClock();
  setInterval(updateClock, 1000);
});

/* Live count of trademark records in data.json (reliable stat) */
function loadRecordCount() {
  fetch('data.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      const count = Object.keys(data).length;
      const el = document.getElementById('recordCount');
      if (el) el.textContent = count;
    })
    .catch(function () {});
}

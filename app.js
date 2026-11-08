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
  { en: 'Advanced Trademark Search', bn: 'উন্নত ট্রেডমার্ক অনুসন্ধান', href: '/trademarks' },
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
  { en: 'Advanced Trademark Search', bn: 'উন্নত ট্রেডমার্ক অনুসন্ধান', href: '/trademarks', kw: ['search', 'trademark', 'owner', 'class', 'অনুসন্ধান', 'ট্রেডমার্ক'] },
  { en: 'Site Map', bn: 'সাইট ম্যাপ', href: '/views/sitemap', kw: ['sitemap', 'সাইট ম্যাপ'] }
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function url(href) {
  if (/^https?:\/\//i.test(href)) return href;
  return OFF + href;
}
function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
  const primary = document.getElementById('navRowPrimary');
  const secondary = document.getElementById('navRowSecondary');
  if (!primary || !secondary) return;
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
    { type: 'link', en: 'Trademark Search', bn: 'ট্রেডমার্ক অনুসন্ধান', href: '/trademarks', icon: ICON_SEARCH },
    { type: 'link', en: 'Trademark Verification', bn: 'ট্রেডমার্ক যাচাইকরণ', href: '/verify', cta: true, icon: ICON_SEARCH }
  ];
  primary.innerHTML = BAR.slice(0, 9).map(barItemHTML).join('');
  secondary.innerHTML = BAR.slice(9).map(barItemHTML).join('');
  updateNavActive();
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
  const safeQuery = escapeHtml(query);
  let head = '<div class="sr-head">' + t('অনুসন্ধান ফলাফল:', 'Search results for:') + ' <b>' + safeQuery + '</b>';
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
      const e = r.entry;
      const g = t(e.groupBn, e.groupEn);
      if (g !== lastGroup) {
        html += '<div class="sr-group">' + escapeHtml(g) + '</div>';
        lastGroup = g;
      }
      html += '<a class="sr-item" href="' + (e.internal ? e.href : url(e.href)) + '"' + (e.ext ? ' target="_blank" rel="noopener"' : ' data-internal="1"') + '>' +
        '<span class="sr-title">' + escapeHtml(t(e.bn, e.en)) + '</span>' +
        (e.ext ? extIcon() : '<span class="sr-go">' + t('যান', 'Go') + ' &rarr;</span>') +
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
  const summaryEl = document.getElementById('searchSummary');
  if (!out) return;
  const query = (rawQuery || '').trim();
  if (!query) {
    out.innerHTML = '';
    if (empty) empty.classList.add('hidden');
    if (countEl) countEl.textContent = '';
    if (summaryEl) summaryEl.classList.add('hidden');
    return;
  }
  const matched = scoreSearch(query);
  if (countEl) countEl.textContent = String(matched.length);
  if (summaryEl) summaryEl.classList.remove('hidden');

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
    const e = r.entry;
    const g = t(e.groupBn, e.groupEn);
    if (g !== lastGroup) {
      html += '<div class="sr-group">' + escapeHtml(g) + '</div>';
      lastGroup = g;
    }
    html += '<a class="sr-item" href="' + (e.internal ? e.href : url(e.href)) + '"' + (e.ext ? ' target="_blank" rel="noopener"' : ' data-internal="1"') + '>' +
      '<span class="sr-title">' + escapeHtml(t(e.bn, e.en)) + '</span>' +
      (e.ext ? extIcon() : '<span class="sr-go">' + t('যান', 'Go') + ' &rarr;</span>') +
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
    const map = { home: t('হোম', 'Home'), verify: t('ট্রেডমার্ক যাচাইকরণ', 'Trademark Verification'), trademarks: t('ট্রেডমার্ক অনুসন্ধান', 'Trademark Search'), record: t('ট্রেডমার্ক রেকর্ড', 'Trademark Record'), fee: t('ফি কাঠামো', 'Fee Structure'), contact: t('যোগাযোগ', 'Contact'), search: t('অনুসন্ধান', 'Search'), 'online-application': t('অনলাইন আবেদন', 'Online Application'), about: t('অধিদপ্তর সম্পর্কে', 'About the Department') };
    const portalPg = window.PORTAL_DATA ? portalPath() : null;
    if (state.route === 'portal' && portalPg && window.PORTAL_DATA[portalPg]) {
      crumb.textContent = tv(window.PORTAL_DATA[portalPg].title);
    } else {
      crumb.textContent = map[state.route] || map.home;
    }
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
  if (/^\/trademark\/[^/]+/.test(path)) return 'record';
  if (/^\/trademarks\/?$/.test(path)) return 'trademarks';
  if (/\/verify/.test(path)) return 'verify';
  if (/\/online-application/.test(path)) return 'online-application';
  if (/\/about/.test(path)) return 'about';
  return 'home';
}

function recordNoFromPath() {
  const m = (window.location.pathname || '').match(/^\/trademark\/([^/]+)\/?$/);
  if (!m) return null;
  try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; }
}

const VIEW_TITLES = {
  home: 'Home | Department of Patents, Designs & Trademarks, Bangladesh',
  verify: 'Trademark Verification | DPDT Bangladesh',
  trademarks: 'Advanced Trademark Search | DPDT Bangladesh',
  record: 'Trademark Record | DPDT Bangladesh',
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
      trademarks: 'উন্নত ট্রেডমার্ক অনুসন্ধান | ডিপিডিটি বাংলাদেশ',
      record: 'ট্রেডমার্ক রেকর্ড | ডিপিডিটি বাংলাদেশ',
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

function updateNavActive() {
  const path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
  const qs = new URLSearchParams(window.location.search);
  const page = qs.get('page');
  const isVerifyPath = path === '/verify' || path === '/verify.html';
  const isHome = (path === '/' || path === '/index.html' || path === '/index') &&
    !isVerifyPath && !page && !qs.has('reg_no') && !qs.has('regNo');

  document.querySelectorAll('#navList .nav-link.active').forEach(function (el) {
    el.classList.remove('active');
  });

  function mark(selector) {
    const el = document.querySelector(selector);
    if (el) el.classList.add('active');
  }
  function markCat(key) {
    const li = document.querySelector('#navList li.has-sub[data-cat="' + key + '"]');
    if (!li) return;
    const btn = li.querySelector(':scope > .nav-link');
    if (btn) btn.classList.add('active');
  }

  if (isHome) {
    mark('#navRowPrimary a.nav-link[href="/"]');
    return;
  }

  if (isVerifyPath && page === 'contact') {
    mark('#navList a.nav-link[href="/verify?page=contact"]');
    return;
  }

  if (isVerifyPath && (page === 'fee' || page === 'search')) {
    mark('#navList a.nav-link[href="/verify"]');
    return;
  }

  if (isVerifyPath && page !== 'contact') {
    mark('#navList a.nav-link[href="/verify"]');
    return;
  }

  const first = path.replace(/^\//, '').split('/')[0];
  const KEY_MAP = {
    about: 'about',
    statistics: 'statistics',
    'online-application': 'online',
    'online-updates': 'online',
    publication: 'publication',
    acts: 'acts',
    laws: 'acts',
    policies: 'acts',
    media: 'media',
    download: 'download',
    fees: 'download',
    classification: 'classification',
    gi: 'gi',
    faq: 'faq'
  };
  let matchedKey = KEY_MAP[first] || null;

  if (!matchedKey) {
    NAV.some(function (cat) {
      return cat.groups.some(function (g) {
        return g.items.some(function (item) {
          if (!item || !item.href || /^https?:/i.test(item.href)) return false;
          const hrefPath = item.href.split('?')[0].replace(/\/+$/, '') || '/';
          if (hrefPath === path) {
            matchedKey = cat.key;
            return true;
          }
          return false;
        });
      });
    });
  }

  if (matchedKey) markCat(matchedKey);
}

function showView(route) {
  state.route = route;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + route);
  if (view) view.classList.add('active');

  updateNavActive();
  document.title = viewTitle(route);

  const crumb = document.getElementById('crumbCurrent');
  if (crumb) {
    const map = { home: t('হোম', 'Home'), verify: t('ট্রেডমার্ক যাচাইকরণ', 'Trademark Verification'), trademarks: t('ট্রেডমার্ক অনুসন্ধান', 'Trademark Search'), record: t('ট্রেডমার্ক রেকর্ড', 'Trademark Record'), fee: t('ফি কাঠামো', 'Fee Structure'), contact: t('যোগাযোগ', 'Contact'), search: t('অনুসন্ধান', 'Search'), 'online-application': t('অনলাইন আবেদন', 'Online Application'), about: t('অধিদপ্তর সম্পর্কে', 'About the Department') };
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
  if (route === 'trademarks') {
    populateAdvFiltersFromUrl();
    refreshAdvCoverage();
    renderDatabaseStats();
    runAdvancedSearch(false);
  }
  if (route === 'record') {
    const recNo = recordNoFromPath();
    if (recNo) renderRecordDetail(recNo);
  }
  if (route === 'verify') {
    const inputEl = document.getElementById('tm');
    const normalised = normaliseTmNumber(reg || '');
    if (inputEl) inputEl.value = normalised;
    setFieldError('');
    if (normalised) {
      verifyTrademark(normalised);
    } else {
      currentRegNo = null;
      currentAssetUrl = null;
      setVerifyState('idle');
    }
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
   TRADEMARK VERIFICATION
   Read-only lookup against the project's verification dataset
   (data.json). No sample numbers, no auto-filled values and no
   fabricated fields.
═══════════════════════════════════════════════════════════════ */
let currentRegNo = null;
let currentAssetUrl = null;
let archivePromise = null;

const VERIFY_STATE_IDS = ['verifyIdle', 'verifyLoading', 'verifyNotFound', 'verifyError'];
const VERIFY_RESULT_ID = 'verificationResult';

function setVerifyState(state) {
  VERIFY_STATE_IDS.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const result = document.getElementById(VERIFY_RESULT_ID);
  if (result) result.classList.add('hidden');

  if (state === 'result') {
    if (result) result.classList.remove('hidden');
    return;
  }
  const target = document.getElementById(state === 'idle' ? 'verifyIdle' : state === 'loading' ? 'verifyLoading' : state === 'notfound' ? 'verifyNotFound' : 'verifyError');
  if (target) target.classList.remove('hidden');
}

function setFieldError(message) {
  const input = document.getElementById('tm');
  const err = document.getElementById('verifyInputError');
  if (input) {
    input.classList.toggle('input-invalid', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }
  if (err) {
    if (message) {
      err.textContent = message;
      err.hidden = false;
    } else {
      err.textContent = '';
      err.hidden = true;
    }
  }
}

function normaliseTmNumber(raw) {
  return String(raw == null ? '' : raw).replace(/[\s\u200e\u200f-]/g, '').trim();
}

function validateTmNumber(value) {
  if (!value) return 'Enter a trademark registration or application number to continue.';
  if (!/^\d+$/.test(value)) return 'Use digits only. The number should contain no letters or symbols.';
  if (value.length < 3) return 'That number is too short. Enter the full number from the document.';
  if (value.length > 20) return 'That number is too long. Enter the full number from the document.';
  return '';
}

function searchTM() {
  const tmEl = document.getElementById('tm');
  if (!tmEl) return;
  const regNo = normaliseTmNumber(tmEl.value);
  const error = validateTmNumber(regNo);
  if (error) {
    setFieldError(error);
    setVerifyState('idle');
    tmEl.focus();
    return;
  }
  setFieldError('');
  tmEl.value = regNo;
  navigate('/verify?reg_no=' + encodeURIComponent(regNo));
}

function loadArchive() {
  if (!archivePromise) {
    archivePromise = fetch('data.json', { cache: 'no-cache' }).then(function (response) {
      if (!response.ok) throw new Error('Data request failed with status ' + response.status);
      return response.json();
    }).catch(function (error) {
      archivePromise = null;
      throw error;
    });
  }
  return archivePromise;
}

function formatArchiveDate(value) {
  if (!value) return '';
  const str = String(value).trim();
  const m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return str;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return str;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(date.getTime())) return str;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function reportReference(regNo) {
  const stamp = new Date();
  const pad = function (n) { return String(n).padStart(2, '0'); };
  return 'DPDT-VR-' + regNo + '-' + stamp.getFullYear() + pad(stamp.getMonth() + 1) + pad(stamp.getDate()) + '-' + pad(stamp.getHours()) + pad(stamp.getMinutes()) + pad(stamp.getSeconds());
}

/* Build the report strictly from fields present in the record.
   Unknown/absent fields are omitted; nothing is inferred. */
function buildReportRows(regNo, info) {
  const rows = [];
  const push = function (en, bn, value, opts) {
    if (value == null || String(value).trim() === '') return;
    rows.push({ en: en, bn: bn, value: String(value).trim(), cls: (opts && opts.cls) || '' });
  };

  const recordNo = info.registration_number || info.registrationNumber || regNo;
  push('Trademark Number', 'ট্রেডমার্ক নম্বর', recordNo, { cls: 'value-mono' });

  if (info.application_number || info.applicationNumber) {
    push('Application Number', 'আবেদন নম্বর', info.application_number || info.applicationNumber, { cls: 'value-mono' });
  }
  push('Trademark / Brand Name', 'ট্রেডমার্ক / ব্র্যান্ড নাম', info.name || info.trademark_name || info.trademarkName || info.mark, { cls: 'value-bold' });
  push('Owner / Proprietor', 'মালিক / স্বত্বাধিকারী', info.owner || info.proprietor || info.applicant);
  push('Filing / Application Date', 'আবেদনের তারিখ', formatArchiveDate(info.application_date || info.applicationDate || info.filing_date || info.filingDate));
  push('Registration Date', 'নিবন্ধনের তারিখ', formatArchiveDate(info.registration_date || info.registrationDate));
  push('Registration Status', 'নিবন্ধন অবস্থা', info.status || info.registration_status || info.registrationStatus);
  push('Trademark Class', 'ট্রেডমার্ক শ্রেণি', info.class || info.trademark_class || info.trademarkClass || info.nice_class);
  push('Goods and Services', 'পণ্য ও সেবা', info.goods_services || info.goodsServices || info.goods);
  push('Issuing Authority', 'ইস্যুকারী কর্তৃপক্ষ', info.authority);
  push('Source / Reference', 'উৎস / সূত্র', info.source || info.reference || info.source_url || info.sourceUrl);
  push('Certificate Document', 'সনদপত্র', info.certificate || info.certificate_file || info.certificateFile);
  return rows;
}

function renderReport(regNo, info) {
  const tbody = document.getElementById('resultTableBody');
  if (!tbody) return;
  const rows = buildReportRows(regNo, info);
  tbody.innerHTML = '';
  rows.forEach(function (row) {
    const tr = document.createElement('tr');
    const th = document.createElement('td');
    th.className = 'label-cell';
    th.setAttribute('data-en', row.en);
    th.setAttribute('data-bn', row.bn);
    th.textContent = lang === 'bn' ? row.bn : row.en;
    const td = document.createElement('td');
    td.className = 'value-cell ' + row.cls;
    if (/^https?:\/\//i.test(row.value)) {
      const a = document.createElement('a');
      a.href = row.value;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = row.value;
      td.appendChild(a);
    } else {
      td.textContent = row.value;
    }
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });

  const ref = document.getElementById('reportRef');
  if (ref) ref.textContent = reportReference(regNo);
}

async function verifyTrademark(regNo) {
  const normalised = normaliseTmNumber(regNo);
  const container = document.getElementById('assetContainer');
  if (!container) return;
  currentAssetUrl = null;

  if (!normalised) {
    currentRegNo = null;
    setVerifyState('idle');
    return;
  }

  const validationError = validateTmNumber(normalised);
  if (validationError) {
    currentRegNo = null;
    setFieldError(validationError);
    setVerifyState('idle');
    return;
  }

  currentRegNo = normalised;
  setFieldError('');
  setVerifyState('loading');

  try {
    const data = await loadArchive();
    if (currentRegNo !== normalised) return;

    const info = Object.prototype.hasOwnProperty.call(data, normalised) ? data[normalised] : null;
    if (!info || typeof info !== 'object') {
      const num = document.getElementById('notFoundNumber');
      if (num) num.textContent = normalised;
      setVerifyState('notfound');
      return;
    }

    renderReport(normalised, info);
    setVerifyState('result');
    resolveCertificateAsset(normalised, container, info);
  } catch (error) {
    console.error('Verification data error:', error);
    if (currentRegNo !== normalised) return;
    setVerifyState('error');
  }
}

function certUnavailableHtml() {
  return '<p class="cert-unavailable">No certificate image or PDF is stored for this record.</p>';
}

/* File-extension resolver — renders ONLY the original certificate
   asset (image or PDF). No injected text, captions or overlays.
   Single <img> request; skeleton + reserved aspect-ratio show
   immediately and the JPG starts when near the viewport. */
let certObserver = null;

function resolveCertificateAsset(regNo, container, info) {
  const declared = info && (info.certificate || info.certificate_file || info.certificateFile);
  const imgUrl = declared && /\.(jpe?g|png|webp)$/i.test(declared) ? declared : regNo + '.jpg';
  const pdfUrl = declared && /\.pdf$/i.test(declared) ? declared : regNo + '.pdf';
  currentAssetUrl = imgUrl;

  if (certObserver) {
    certObserver.disconnect();
    certObserver = null;
  }

  const frame = document.createElement('div');
  frame.className = 'cert-frame';
  frame.setAttribute('aria-busy', 'true');

  const skeleton = document.createElement('div');
  skeleton.className = 'cert-skeleton';
  skeleton.setAttribute('aria-hidden', 'true');

  const img = document.createElement('img');
  img.alt = 'Certificate document for trademark ' + regNo;
  img.width = 2373;
  img.height = 3508;
  img.decoding = 'async';
  img.className = 'cert-img is-loading';

  img.onload = function () {
    if (currentRegNo !== regNo) return;
    img.classList.remove('is-loading');
    frame.setAttribute('aria-busy', 'false');
    if (skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);
  };

  img.onerror = function () {
    if (currentRegNo !== regNo) return;
    fetch(pdfUrl, { method: 'HEAD' })
      .then(function (response) {
        if (currentRegNo !== regNo) return;
        if (response.ok) {
          currentAssetUrl = pdfUrl;
          const iframe = document.createElement('iframe');
          iframe.src = pdfUrl;
          iframe.title = 'Certificate PDF for trademark ' + regNo;
          container.innerHTML = '';
          container.appendChild(iframe);
        } else {
          currentAssetUrl = null;
          container.innerHTML = certUnavailableHtml();
        }
      })
      .catch(function () {
        if (currentRegNo !== regNo) return;
        currentAssetUrl = null;
        container.innerHTML = certUnavailableHtml();
      });
  };

  frame.appendChild(skeleton);
  frame.appendChild(img);
  container.innerHTML = '';
  container.appendChild(frame);

  function startLoad() {
    if (currentRegNo !== regNo) return;
    if (!img.getAttribute('src')) img.src = imgUrl;
  }

  if (!('IntersectionObserver' in window)) {
    startLoad();
    return;
  }

  certObserver = new IntersectionObserver(function (entries) {
    if (!entries[0] || !entries[0].isIntersecting) return;
    if (certObserver) {
      certObserver.disconnect();
      certObserver = null;
    }
    startLoad();
  }, { rootMargin: '400px 0px', threshold: 0.01 });

  certObserver.observe(frame);
}

/* Download the ORIGINAL certificate file (no regeneration). */
function downloadCertificate() {
  if (!currentRegNo || !currentAssetUrl) return;
  const a = document.createElement('a');
  a.href = currentAssetUrl;
  a.download = currentAssetUrl.split('/').pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function bindVerifyUi() {
  const retry = document.getElementById('verifyRetry');
  if (retry) {
    retry.addEventListener('click', function () {
      if (currentRegNo) verifyTrademark(currentRegNo);
    });
  }
  const printBtn = document.getElementById('printReportBtn');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
  const dl = document.getElementById('downloadCertBtn');
  if (dl) dl.addEventListener('click', downloadCertificate);
  const input = document.getElementById('tm');
  if (input) {
    input.addEventListener('input', function () {
      if (input.classList.contains('input-invalid')) setFieldError('');
    });
  }
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
      if (window.matchMedia('(max-width: 992px)').matches) {
        e.preventDefault();
        const key = li.getAttribute('data-cat');
        openDrawer();
        document.querySelectorAll('#mobileNav .mn-group').forEach(function (g) {
          const match = key && g.getAttribute('data-cat') === key;
          g.classList.toggle('open', match);
          if (match) g.scrollIntoView({ block: 'nearest' });
        });
        return;
      }
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
  bindVerifyUi();
  bindAdvSearch();
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

/* ═══════════════════════════════════════════════════════════════
   TRADEMARK DATABASE — advanced search, record details, QR, stats
   Read-only over data.json. Missing fields are never fabricated.
═══════════════════════════════════════════════════════════════ */
const RECORD_FIELDS = {
  regNo:          { keys: ['registration_number', 'registrationNumber'] },
  appNo:          { keys: ['application_number', 'applicationNumber'] },
  name:           { keys: ['name', 'trademark_name', 'trademarkName', 'mark'] },
  owner:          { keys: ['owner', 'proprietor', 'applicant'] },
  klass:          { keys: ['class', 'trademark_class', 'trademarkClass', 'nice_class'] },
  status:         { keys: ['status', 'registration_status', 'registrationStatus'] },
  applicationDate:{ keys: ['application_date', 'applicationDate', 'filing_date', 'filingDate'] },
  registrationDate:{ keys: ['registration_date', 'registrationDate'] },
  goods:          { keys: ['goods_services', 'goodsServices', 'goods'] },
  authority:      { keys: ['authority'] },
  source:         { keys: ['source', 'reference', 'source_url', 'sourceUrl'] },
  certificate:    { keys: ['certificate', 'certificate_file', 'certificateFile'] }
};

function fieldValue(info, field) {
  if (!info) return '';
  const spec = RECORD_FIELDS[field];
  if (!spec) return '';
  for (let i = 0; i < spec.keys.length; i++) {
    const v = info[spec.keys[i]];
    if (v != null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
}

/* Which optional fields actually exist across the dataset — used for the
   transparency note so we never imply a field is searchable when it is not
   published for any record. */
function datasetFieldCoverage(records) {
  const coverage = {};
  Object.keys(RECORD_FIELDS).forEach(function (f) {
    coverage[f] = 0;
  });
  Object.keys(records).forEach(function (key) {
    const info = records[key] || {};
    Object.keys(RECORD_FIELDS).forEach(function (f) {
      if (fieldValue(info, f) !== '') coverage[f] += 1;
    });
    if (fieldValue(info, 'regNo') === '') coverage.regNo += 1;
  });
  return coverage;
}

let ADV_PAGE_SIZE = 10;
let advState = { page: 1, results: [], filters: {} };

function readAdvFilters() {
  const get = function (id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  return {
    regNo: get('advRegNo'),
    appNo: get('advAppNo'),
    name: get('advName'),
    owner: get('advOwner'),
    klass: get('advClass'),
    status: get('advStatus'),
    mode: (document.getElementById('advMatch') || {}).value || 'contains'
  };
}

function filterActive(f) {
  return !!(f.regNo || f.appNo || f.name || f.owner || f.klass || f.status);
}

function matchValue(haystack, needle, mode) {
  if (!needle) return true;
  const h = String(haystack || '').toLowerCase();
  const n = needle.toLowerCase();
  return mode === 'exact' ? h === n : h.indexOf(n) !== -1;
}

function searchRecords(records, f) {
  const out = [];
  Object.keys(records).forEach(function (key) {
    const info = records[key] || {};
    const regNo = fieldValue(info, 'regNo') || key;
    const appNo = fieldValue(info, 'appNo') || '';
    const name = fieldValue(info, 'name');
    const owner = fieldValue(info, 'owner');
    const klass = fieldValue(info, 'klass');
    const status = fieldValue(info, 'status');

    if (!matchValue(regNo, f.regNo, f.mode)) return;
    if (!matchValue(appNo || regNo, f.appNo, f.mode)) return;
    if (!matchValue(name, f.name, f.mode)) return;
    if (!matchValue(owner, f.owner, f.mode)) return;
    if (!matchValue(klass, f.klass, f.mode)) return;
    if (!matchValue(status, f.status, f.mode)) return;

    out.push({ key: key, info: info, regNo: regNo });
  });
  out.sort(function (a, b) {
    return String(a.regNo).localeCompare(String(b.regNo), undefined, { numeric: true });
  });
  return out;
}

function recordDetailHref(regNo) {
  return '/trademark/' + encodeURIComponent(regNo);
}

function renderAdvCard(r) {
  const info = r.info;
  const name = fieldValue(info, 'name') || t('নাম নেই', 'Untitled record');
  const owner = fieldValue(info, 'owner');
  const klass = fieldValue(info, 'klass');
  const status = fieldValue(info, 'status');
  const date = fieldValue(info, 'applicationDate');
  let meta = '';
  if (owner) meta += '<span class="adv-meta"><span class="adv-k">' + t('মালিক', 'Owner') + '</span> ' + escapeHtml(owner) + '</span>';
  if (klass) meta += '<span class="adv-meta"><span class="adv-k">' + t('শ্রেণি', 'Class') + '</span> ' + escapeHtml(klass) + '</span>';
  if (date) meta += '<span class="adv-meta"><span class="adv-k">' + t('আবেদনের তারিখ', 'Application date') + '</span> ' + escapeHtml(formatArchiveDate(date)) + '</span>';
  const badge = status
    ? '<span class="adv-badge">' + escapeHtml(status) + '</span>'
    : '<span class="adv-badge adv-badge-neutral">' + t('রেকর্ডভুক্ত', 'On record') + '</span>';
  return '<article class="adv-card">' +
      '<div class="adv-card-main">' +
        '<a class="adv-card-title" href="' + recordDetailHref(r.regNo) + '" data-internal="1">' + escapeHtml(name) + '</a>' +
        '<div class="adv-card-no">' + t('ট্রেডমার্ক নম্বর', 'Trademark no.') + ' <b>' + escapeHtml(r.regNo) + '</b></div>' +
        (meta ? '<div class="adv-card-meta">' + meta + '</div>' : '') +
      '</div>' +
      '<div class="adv-card-side">' + badge +
        '<a class="action-btn action-btn-outline adv-open" href="' + recordDetailHref(r.regNo) + '" data-internal="1">' + t('বিস্তারিত', 'View details') + ' →</a>' +
      '</div>' +
    '</article>';
}

function renderAdvResults() {
  const out = document.getElementById('advResults');
  const empty = document.getElementById('advEmpty');
  const summary = document.getElementById('advSummary');
  const pager = document.getElementById('advPager');
  if (!out) return;

  const total = advState.results.length;
  if (summary) {
    if (!filterActive(advState.filters) && !total) {
      summary.classList.add('hidden');
    } else {
      summary.innerHTML = '<strong>' + total + '</strong> ' + t('টি রেকর্ড পাওয়া গেছে', 'record(s) found');
      summary.classList.remove('hidden');
    }
  }

  if (!total) {
    out.innerHTML = '';
    if (empty && filterActive(advState.filters)) empty.classList.remove('hidden');
    else if (empty) empty.classList.add('hidden');
    if (pager) pager.classList.add('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  const pages = Math.max(1, Math.ceil(total / ADV_PAGE_SIZE));
  if (advState.page > pages) advState.page = pages;
  const start = (advState.page - 1) * ADV_PAGE_SIZE;
  const slice = advState.results.slice(start, start + ADV_PAGE_SIZE);
  out.innerHTML = slice.map(renderAdvCard).join('');

  if (pager) {
    if (pages <= 1) {
      pager.classList.add('hidden');
      pager.innerHTML = '';
    } else {
      let html = '<button class="adv-page-btn" type="button" data-page="' + (advState.page - 1) + '"' + (advState.page === 1 ? ' disabled' : '') + '>' + t('পূর্ববর্তী', 'Previous') + '</button>';
      html += '<span class="adv-page-info">' + t('পৃষ্ঠা', 'Page') + ' ' + advState.page + ' / ' + pages + '</span>';
      html += '<button class="adv-page-btn" type="button" data-page="' + (advState.page + 1) + '"' + (advState.page === pages ? ' disabled' : '') + '>' + t('পরবর্তী', 'Next') + '</button>';
      pager.innerHTML = html;
      pager.classList.remove('hidden');
      pager.querySelectorAll('.adv-page-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const p = parseInt(btn.getAttribute('data-page'), 10);
          if (!isNaN(p) && p >= 1 && p <= pages) {
            advState.page = p;
            renderAdvResults();
            const v = document.getElementById('view-trademarks');
            if (v) window.scrollTo({ top: v.offsetTop, behavior: 'smooth' });
          }
        });
      });
    }
  }
}

async function runAdvancedSearch(updateUrl) {
  const loading = document.getElementById('advLoading');
  const out = document.getElementById('advResults');
  const empty = document.getElementById('advEmpty');
  const filters = readAdvFilters();
  advState.filters = filters;
  advState.page = 1;

  if (loading) loading.classList.remove('hidden');
  if (out) out.innerHTML = '';
  if (empty) empty.classList.add('hidden');

  let records;
  try {
    records = await loadArchive();
  } catch (e) {
    if (loading) loading.classList.add('hidden');
    const sum = document.getElementById('advSummary');
    if (sum) { sum.textContent = t('ডেটা লোড করা যায়নি।', 'Unable to load data.'); sum.classList.remove('hidden'); }
    return;
  }

  advState.results = filterActive(filters) ? searchRecords(records, filters) : [];
  if (loading) loading.classList.add('hidden');

  if (updateUrl) {
    const params = new URLSearchParams();
    if (filters.regNo) params.set('reg_no', filters.regNo);
    if (filters.appNo) params.set('app_no', filters.appNo);
    if (filters.name) params.set('name', filters.name);
    if (filters.owner) params.set('owner', filters.owner);
    if (filters.klass) params.set('class', filters.klass);
    if (filters.status) params.set('status', filters.status);
    if (filters.mode === 'exact') params.set('match', 'exact');
    const qs = params.toString();
    history.replaceState({}, '', '/trademarks' + (qs ? '?' + qs : ''));
  }

  renderAdvResults();
}

function populateAdvFiltersFromUrl() {
  const q = new URLSearchParams(window.location.search);
  const set = function (id, val) { const el = document.getElementById(id); if (el && val != null) el.value = val; };
  set('advRegNo', q.get('reg_no') || '');
  set('advAppNo', q.get('app_no') || '');
  set('advName', q.get('name') || '');
  set('advOwner', q.get('owner') || '');
  set('advClass', q.get('class') || '');
  set('advStatus', q.get('status') || '');
  set('advMatch', q.get('match') === 'exact' ? 'exact' : 'contains');
}

function resetAdvSearch() {
  ['advRegNo', 'advAppNo', 'advName', 'advOwner', 'advClass', 'advStatus'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const m = document.getElementById('advMatch');
  if (m) m.value = 'contains';
  runAdvancedSearch(true);
}

async function refreshAdvCoverage() {
  const el = document.getElementById('advCoverage');
  if (!el) return;
  try {
    const records = await loadArchive();
    const cov = datasetFieldCoverage(records);
    const total = Object.keys(records).length;
    const published = [];
    if (cov.owner) published.push(t('মালিক', 'owner'));
    if (cov.klass) published.push(t('শ্রেণি', 'class'));
    if (cov.status) published.push(t('অবস্থা', 'status'));
    if (published.length) {
      el.textContent = t('এই ডেটাসেটে ' + total + 'টি রেকর্ড রয়েছে; অনুসন্ধানযোগ্য অতিরিক্ত ক্ষেত্র: ' + published.join(', ') + '।',
        'This dataset holds ' + total + ' record(s); additional searchable fields: ' + published.join(', ') + '.');
    } else {
      el.textContent = t('এই ডেটাসেটে ' + total + 'টি রেকর্ড রয়েছে। প্রতিটি রেকর্ডে ট্রেডমার্ক নম্বর, নাম, কর্তৃপক্ষ ও আবেদনের তারিখ প্রকাশিত; মালিক, শ্রেণি বা অবস্থা এই ডেটাসেটে প্রকাশিত নয়।',
        'This dataset holds ' + total + ' record(s). Each record publishes the trademark number, name, authority and application date; owner, class and status are not published in this dataset.');
    }
    el.classList.remove('hidden');
  } catch (e) { /* keep hidden */ }
}

/* ── Record detail page ─────────────────────────────────────── */
function detailRow(en, bn, value, opts) {
  if (value == null || String(value).trim() === '') return '';
  const cls = (opts && opts.cls) ? ' ' + opts.cls : '';
  let cell;
  if (/^https?:\/\//i.test(value)) {
    cell = '<a href="' + escapeHtml(value) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(value) + '</a>';
  } else {
    cell = escapeHtml(value);
  }
  return '<tr><td class="label-cell">' + escapeHtml(t(bn, en)) + '</td><td class="value-cell' + cls + '">' + cell + '</td></tr>';
}

function buildTimeline(regNo, info) {
  const events = [];
  const app = fieldValue(info, 'applicationDate');
  const reg = fieldValue(info, 'registrationDate');
  if (app) events.push({ date: app, en: 'Application date', bn: 'আবেদনের তারিখ', ref: regNo });
  if (reg) events.push({ date: reg, en: 'Registration date', bn: 'নিবন্ধনের তারিখ', ref: regNo });
  if (!events.length) {
    return '<div class="record-timeline-empty"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>' +
      t('এই রেকর্ডে কোনো তারিখভিত্তিক ইভেন্ট প্রকাশিত হয়নি।', 'No dated events are published for this record.') + '</span></div>';
  }
  const items = events.map(function (e) {
    return '<li class="record-tl-item">' +
      '<span class="record-tl-dot" aria-hidden="true"></span>' +
      '<div class="record-tl-body">' +
        '<span class="record-tl-date">' + escapeHtml(formatArchiveDate(e.date)) + '</span>' +
        '<span class="record-tl-label">' + escapeHtml(t(e.bn, e.en)) + '</span>' +
      '</div></li>';
  }).join('');
  return '<ol class="record-timeline">' + items + '</ol>';
}

function publicRecordUrl(regNo) {
  return window.location.origin + recordDetailHref(regNo);
}

function renderQr(regNo) {
  const url = publicRecordUrl(regNo);
  const box = document.getElementById('recordQr');
  const cap = document.getElementById('recordQrUrl');
  if (cap) cap.textContent = url;
  if (!box) return;
  if (typeof qrcode !== 'function') {
    box.innerHTML = '<div class="qr-fallback">' + t('QR জেনারেটর লোড হয়নি।', 'QR generator failed to load.') + '</div>';
    return;
  }
  try {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    box.innerHTML = qr.createSvgTag({ cellSize: 5, margin: 12, scalable: true, alt: t('রেকর্ড QR কোড', 'Record QR code') });
  } catch (e) {
    box.innerHTML = '<div class="qr-fallback">' + t('QR তৈরি করা যায়নি।', 'Unable to generate QR.') + '</div>';
  }
}

function copyText(value) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(value);
  }
  return new Promise(function (resolve, reject) {
    try {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      resolve();
    } catch (err) { reject(err); }
  });
}

async function shareRecord(regNo) {
  const url = publicRecordUrl(regNo);
  const title = t('ডিপিডিটি ট্রেডমার্ক রেকর্ড', 'DPDT Trademark Record');
  if (navigator.share) {
    try { await navigator.share({ title: title, url: url }); return; } catch (e) { /* fall through to copy */ }
  }
  try {
    await copyText(url);
    showRecordToast(t('লিংক কপি হয়েছে', 'Link copied'));
  } catch (e) {
    showRecordToast(t('লিংক কপি করা যায়নি', 'Could not copy link'));
  }
}

function showRecordToast(msg) {
  const el = document.getElementById('recordToast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(function () { el.classList.remove('show'); }, 2200);
}

function documentRows(info) {
  const rows = [];
  const campos = [
    ['registrationDate', 'Registration date', 'নিবন্ধনের তারিখ', {}],
    ['klass', 'Trademark class', 'ট্রেডমার্ক শ্রেণি', {}],
    ['status', 'Registration status', 'নিবন্ধন অবস্থা', {}],
    ['goods', 'Goods and services', 'পণ্য ও সেবা', {}],
    ['authority', 'Issuing authority', 'ইস্যুকারী কর্তৃপক্ষ', {}]
  ];
  campos.forEach(function (c) {
    rows.push(detailRow(c[1], c[2], fieldValue(info, c[0]), c[3]));
  });
  return rows.join('');
}

async function renderRecordDetail(regNo) {
  const box = document.getElementById('recordContainer');
  if (!box) return;
  box.innerHTML = '<div class="record-loading"><div class="adv-skel"></div><div class="adv-skel"></div><div class="adv-skel"></div></div>';

  let records;
  try { records = await loadArchive(); }
  catch (e) {
    box.innerHTML = '<div class="verify-state"><div class="vs-icon vs-icon-error"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div><div><h3>' +
      escapeHtml(t('ডেটা লোড করা যায়নি', 'Data could not be loaded')) + '</h3><p>' +
      escapeHtml(t('আবার চেষ্টা করুন।', 'Please try again.')) + '</p></div></div>';
    return;
  }

  const info = Object.prototype.hasOwnProperty.call(records, regNo) ? records[regNo] : null;
  if (!info || typeof info !== 'object') {
    box.innerHTML = '<div class="verify-state verify-notfound"><div class="vs-icon vs-icon-warn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="16.5" x2="12.01" y2="16.5"/></svg></div><div><h3>' +
      escapeHtml(t('রেকর্ড পাওয়া যায়নি', 'Record not found')) + '</h3><p><strong class="vs-number">' + escapeHtml(regNo) +
      '</strong> ' + escapeHtml(t('এই ডেটাসেটে নেই।', 'is not present in this dataset.')) + '</p>' +
      '<a class="action-btn action-btn-green" href="/verify" data-internal="1">' + escapeHtml(t('যাচাইকরণে ফিরে যান', 'Back to verification')) + '</a></div></div>';
    document.title = t('রেকর্ড পাওয়া যায়নি | ডিপিডিটি বাংলাদেশ', 'Record not found | DPDT Bangladesh');
    return;
  }

  const name = fieldValue(info, 'name') || t('শিরোনামহীন রেকর্ড', 'Untitled record');
  const owner = fieldValue(info, 'owner');
  const appDate = fieldValue(info, 'applicationDate');
  const hasCert = !!(fieldValue(info, 'certificate'));
  const certUrl = hasCert ? fieldValue(info, 'certificate') : null;
  const imgCandidate = certUrl && /\.(jpe?g|png|webp)$/i.test(certUrl) ? certUrl : regNo + '.jpg';
  const pdfCandidate = certUrl && /\.pdf$/i.test(certUrl) ? certUrl : regNo + '.pdf';

  document.title = name + ' | DPDT Bangladesh';
  const crumb = document.getElementById('crumbCurrent');
  if (crumb) crumb.textContent = name;

  const infoRows = [
    detailRow('Trademark number', 'ট্রেডমার্ক নম্বর', regNo, { cls: 'value-mono' }),
    detailRow('Application number', 'আবেদন নম্বর', fieldValue(info, 'appNo'), { cls: 'value-mono' }),
    detailRow('Trademark / brand name', 'ট্রেডমার্ক / ব্র্যান্ড নাম', name, { cls: 'value-bold' }),
    detailRow('Owner / proprietor', 'মালিক / স্বত্বাধিকারী', owner)
  ].join('');

  const dateRows = [
    detailRow('Application date', 'আবেদনের তারিখ', appDate ? formatArchiveDate(appDate) : ''),
    detailRow('Registration date', 'নিবন্ধনের তারিখ', fieldValue(info, 'registrationDate') ? formatArchiveDate(fieldValue(info, 'registrationDate')) : '')
  ].join('');

  const classRows = [
    detailRow('Trademark class', 'ট্রেডমার্ক শ্রেণি', fieldValue(info, 'klass')),
    detailRow('Registration status', 'নিবন্ধন অবস্থা', fieldValue(info, 'status')),
    detailRow('Goods and services', 'পণ্য ও সেবা', fieldValue(info, 'goods')),
    detailRow('Issuing authority', 'ইস্যুকারী কর্তৃপক্ষ', fieldValue(info, 'authority'))
  ].join('');

  const sourceVal = fieldValue(info, 'source');
  const sourceRows = sourceVal ? detailRow('Source reference', 'উৎস সূত্র', sourceVal) : '';

  function tableBlock(rows) {
    if (!rows) return '<p class="record-none">' + escapeHtml(t('কোনো তথ্য প্রকাশিত হয়নি।', 'No information published.')) + '</p>';
    return '<table class="result-table record-table"><tbody>' + rows + '</tbody></table>';
  }

  box.innerHTML =
    '<div class="record-head">' +
      '<div class="record-head-main">' +
        '<div class="record-eyebrow">' + escapeHtml(t('ট্রেডমার্ক রেকর্ড', 'Trademark record')) + '</div>' +
        '<h2 class="record-title">' + escapeHtml(name) + '</h2>' +
        '<div class="record-sub">' + escapeHtml(t('ট্রেডমার্ক নম্বর', 'Trademark no.')) + ' <b>' + escapeHtml(regNo) + '</b></div>' +
      '</div>' +
      '<div class="record-head-actions">' +
        '<button class="action-btn action-btn-outline" type="button" id="recordCopyBtn">' + escapeHtml(t('লিংক কপি', 'Copy link')) + '</button>' +
        '<button class="action-btn action-btn-green" type="button" id="recordShareBtn">' + escapeHtml(t('শেয়ার', 'Share')) + '</button>' +
      '</div>' +
    '</div>' +

    '<div class="record-grid">' +
      '<div class="record-col">' +
        '<section class="record-card"><h3>' + escapeHtml(t('ট্রেডমার্ক তথ্য', 'Trademark information')) + '</h3>' + tableBlock(infoRows) + '</section>' +
        '<section class="record-card"><h3>' + escapeHtml(t('শ্রেণিবিন্যাস ও অবস্থা', 'Classification &amp; status')) + '</h3>' + tableBlock(classRows) + '</section>' +
        '<section class="record-card"><h3>' + escapeHtml(t('তারিখসমূহ', 'Dates')) + '</h3>' + tableBlock(dateRows) + '</section>' +
        (sourceRows ? '<section class="record-card"><h3>' + escapeHtml(t('উৎস', 'Source')) + '</h3>' + tableBlock(sourceRows) + '</section>' : '') +
        '<section class="record-card"><h3>' + escapeHtml(t('ইভেন্ট টাইমলাইন', 'Event timeline')) + '</h3>' + buildTimeline(regNo, info) + '</section>' +
      '</div>' +
      '<div class="record-col">' +
        '<section class="record-card record-qr-card">' +
          '<h3>' + escapeHtml(t('QR যাচাইকরণ', 'QR verification')) + '</h3>' +
          '<div class="record-qr" id="recordQr"></div>' +
          '<p class="record-qr-url" id="recordQrUrl"></p>' +
          '<p class="record-qr-note">' + escapeHtml(t('এই QR কোডটি শুধু এই পাবলিক রেকর্ড পেজ খোলে। এটি কোনো সরকারি ডিজিটাল স্বাক্ষর নয়।', 'This QR code only opens this public record page. It is not a government digital signature.')) + '</p>' +
        '</section>' +
        '<section class="record-card">' +
          '<h3>' + escapeHtml(t('সনদ ও নথি কেন্দ্র', 'Certificate &amp; document center')) + '</h3>' +
          '<div class="record-cert" id="recordCert">' +
            '<div class="cert-skeleton" aria-hidden="true"></div>' +
          '</div>' +
          '<p class="record-doc-note" id="recordDocNote"></p>' +
          '<div class="record-doc-actions" id="recordDocActions"></div>' +
        '</section>' +
        '<section class="record-card">' +
          '<h3>' + escapeHtml(t('সহায়ক লিংক', 'Official resources')) + '</h3>' +
          '<ul class="record-links">' +
            '<li><a href="/verify" data-internal="1">' + escapeHtml(t('নম্বর দিয়ে যাচাই করুন', 'Verify by number')) + '</a></li>' +
            '<li><a href="/classification/nice" data-internal="1">' + escapeHtml(t('নিস শ্রেণিবিন্যাস', 'Nice classification')) + '</a></li>' +
            '<li><a href="/download/trademark-application-process" data-internal="1">' + escapeHtml(t('ট্রেডমার্ক নিবন্ধন প্রক্রিয়া', 'Trademark registration process')) + '</a></li>' +
            '<li><a href="/acts/trademark-act-2009" data-internal="1">' + escapeHtml(t('ট্রেডমার্ক আইন, ২০০৯', 'Trademark Act, 2009')) + '</a></li>' +
            '<li><a href="/faq/trademark" data-internal="1">' + escapeHtml(t('ট্রেডমার্ক সচরাচর জিজ্ঞাসা', 'Trademark FAQ')) + '</a></li>' +
          '</ul>' +
        '</section>' +
      '</div>' +
    '</div>' +
    '<div class="record-toast" id="recordToast" role="status" aria-live="polite"></div>';

  renderQr(regNo);

  const copyBtn = document.getElementById('recordCopyBtn');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyText(publicRecordUrl(regNo))
      .then(function () { showRecordToast(t('লিংক কপি হয়েছে', 'Link copied')); })
      .catch(function () { showRecordToast(t('লিংক কপি করা যায়নি', 'Could not copy link')); });
  });
  const shareBtn = document.getElementById('recordShareBtn');
  if (shareBtn) shareBtn.addEventListener('click', function () { shareRecord(regNo); });

  loadRecordCertificate(regNo, imgCandidate, pdfCandidate);
  applyStaticLang();
}

function loadRecordCertificate(regNo, imgUrl, pdfUrl) {
  const box = document.getElementById('recordCert');
  const note = document.getElementById('recordDocNote');
  const actions = document.getElementById('recordDocActions');
  if (!box) return;

  function unavailable() {
    box.innerHTML = '<div class="record-cert-missing"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span>' +
      escapeHtml(t('এই রেকর্ডের জন্য কোনো সনদ ফাইল সংরক্ষিত নেই।', 'No certificate file is stored for this record.')) + '</span></div>';
    if (note) note.textContent = '';
    if (actions) actions.innerHTML = '';
  }

  const img = document.createElement('img');
  img.className = 'record-cert-img';
  img.alt = t('সনদের ছবি', 'Certificate document') + ' — ' + regNo;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.onload = function () {
    box.innerHTML = '';
    box.appendChild(img);
    if (note) note.textContent = t('মূল ফাইল, অপরিবর্তিত।', 'Original file, unmodified.');
    if (actions) {
      actions.innerHTML = '<a class="action-btn action-btn-outline" href="' + escapeHtml(imgUrl) + '" target="_blank" rel="noopener">' + escapeHtml(t('সম্পূর্ণ দেখুন', 'Open full size')) + '</a>' +
        '<a class="action-btn action-btn-green" href="' + escapeHtml(imgUrl) + '" download>' + escapeHtml(t('ডাউনলোড', 'Download')) + '</a>';
    }
  };
  img.onerror = function () {
    fetch(pdfUrl, { method: 'HEAD' })
      .then(function (r) {
        if (!r.ok) { unavailable(); return; }
        const iframe = document.createElement('iframe');
        iframe.src = pdfUrl;
        iframe.title = 'Certificate PDF — ' + regNo;
        iframe.className = 'record-cert-pdf';
        box.innerHTML = '';
        box.appendChild(iframe);
        if (note) note.textContent = t('মূল PDF ফাইল, অপরিবর্তিত।', 'Original PDF file, unmodified.');
        if (actions) {
          actions.innerHTML = '<a class="action-btn action-btn-green" href="' + escapeHtml(pdfUrl) + '" download>' + escapeHtml(t('PDF ডাউনলোড', 'Download PDF')) + '</a>';
        }
      })
      .catch(unavailable);
  };
  img.src = imgUrl;
}

/* ── Dynamic database statistics ────────────────────────────── */
/* Format a number with grouping and (for Bangla) Bengali digits.
   Bangla uses the South Asian grouping system (e.g. ৩,৪৫,১১৭). */
function formatStatNumber(value) {
  const num = Math.max(0, Math.round(Number(value) || 0));
  if (lang !== 'bn') {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let s = String(num);
  let grouped = '';
  if (s.length > 3) {
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    grouped = rest + ',' + last3;
  } else {
    grouped = s;
  }
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return grouped.replace(/[0-9]/g, function (d) { return bn[+d]; });
}

/* Count-up animation for a KPI number. Honours reduced-motion. */
function animateKpi(el, target) {
  if (!el) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.requestAnimationFrame || target === 0) {
    el.textContent = formatStatNumber(target);
    return;
  }
  const duration = 1100;
  const start = performance.now();
  function step(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatStatNumber(Math.round(target * eased));
    if (p < 1) window.requestAnimationFrame(step);
    else el.textContent = formatStatNumber(target);
  }
  window.requestAnimationFrame(step);
}

async function renderDatabaseStats() {
  const searchableEl = document.getElementById('kpiSearchable');
  const brandsEl = document.getElementById('kpiBrands');
  const officialAppsEl = document.getElementById('kpiOfficialApps');
  const officialCertsEl = document.getElementById('kpiOfficialCerts');
  if (!searchableEl && !brandsEl) return;

  /* Official cumulative figures are declared once in the markup via
     data-count and rendered here so both languages + animation stay
     consistent. They are historical statistics, NOT searchable rows. */
  if (officialAppsEl) animateKpi(officialAppsEl, parseInt(officialAppsEl.getAttribute('data-count'), 10) || 0);
  if (officialCertsEl) animateKpi(officialCertsEl, parseInt(officialCertsEl.getAttribute('data-count'), 10) || 0);

  let records;
  try { records = await loadArchive(); } catch (e) { records = null; }
  if (!records) {
    if (searchableEl) searchableEl.textContent = formatStatNumber(0);
    if (brandsEl) brandsEl.textContent = formatStatNumber(0);
    return;
  }

  const keys = Object.keys(records);
  const total = keys.length;
  const brandSet = {};
  keys.forEach(function (k) {
    const v = fieldValue(records[k], 'name');
    if (v) brandSet[v.trim().toLowerCase()] = true;
  });
  const brands = Object.keys(brandSet).length;

  animateKpi(searchableEl, total);
  animateKpi(brandsEl, brands);
}

/* ── Search suggestions (advanced search inputs) ─────────────── */
function bindAdvSearch() {
  const form = document.getElementById('advSearchForm');
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); runAdvancedSearch(true); });
  }
  const reset = document.getElementById('advReset');
  if (reset) reset.addEventListener('click', resetAdvSearch);

  const nameEl = document.getElementById('advName');
  const ownerEl = document.getElementById('advOwner');
  [nameEl, ownerEl].forEach(function (el) {
    if (!el) return;
    const wrap = document.createElement('div');
    wrap.className = 'adv-suggest';
    el.parentNode.style.position = 'relative';
    el.parentNode.appendChild(wrap);
    el.setAttribute('autocomplete', 'off');

    el.addEventListener('input', function () {
      const q = el.value.trim().toLowerCase();
      if (q.length < 2) { wrap.innerHTML = ''; wrap.classList.remove('open'); return; }
      const field = el === ownerEl ? 'owner' : 'name';
      loadArchive().then(function (records) {
        const seen = {};
        const out = [];
        Object.keys(records).forEach(function (k) {
          const v = fieldValue(records[k], field);
          if (v && v.toLowerCase().indexOf(q) !== -1 && !seen[v.toLowerCase()]) {
            seen[v.toLowerCase()] = true;
            out.push(v);
          }
        });
        out.sort(function (a, b) { return a.localeCompare(b); });
        wrap.innerHTML = out.slice(0, 6).map(function (v) {
          return '<button type="button" class="adv-suggest-item">' + escapeHtml(v) + '</button>';
        }).join('');
        wrap.classList.toggle('open', out.length > 0);
        wrap.querySelectorAll('.adv-suggest-item').forEach(function (b) {
          b.addEventListener('click', function () {
            el.value = b.textContent;
            wrap.innerHTML = '';
            wrap.classList.remove('open');
            runAdvancedSearch(true);
          });
        });
      }).catch(function () {});
    });
    el.addEventListener('blur', function () { setTimeout(function () { wrap.classList.remove('open'); }, 150); });
  });
}

/* ═══════════════════════════════════════════════════════════════
   PORTAL PAGES — data-driven internal pages (portal-data.js)
   Renders the ~75 bilingual internal DPDT pages that previously
   opened external dpdt.gov.bd links.
═══════════════════════════════════════════════════════════════ */

/* 1) Rewrite NAV/SEARCH so official hrefs become internal pages */
(function internalizeNav() {
  const alias = window.PORTAL_ALIAS || {};
  const extPdf = {};
  Object.keys(alias).forEach(function (k) {
    if (/objectstorage/.test(k)) extPdf[k] = alias[k];
  });
  const PATCH = function (item) {
    if (!item) return item;
    if (item.internal) return item;
    if (alias[item.href]) { item.href = alias[item.href]; item.internal = true; item.ext = false; return item; }
    if (item.ext && /objectstorage/.test(item.href || '')) {
      const hit = Object.keys(extPdf).find(function (k) { return k === item.href; });
      if (hit) { item.href = extPdf[hit]; item.internal = true; item.ext = false; }
    }
    return item;
  };
  NAV.forEach(function (cat) {
    cat.groups.forEach(function (g) { g.items.forEach(PATCH); });
  });
  SEARCH_PAGES.forEach(PATCH);
})();

/* 2) helpers */
const PORTAL_PAGE_ALIAS = {
  '/trademark-forms': '/download/trademark-forms',
  '/trademarks-journal': '/publication/trademark-journal',
  '/revised-fees': '/fees/revised'
};
function portalPath() {
  const p = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
  const data = window.PORTAL_DATA || {};
  if (data[p]) return p;
  return PORTAL_PAGE_ALIAS[p] || null;
}
function portalPage() {
  const p = portalPath();
  return p ? (window.PORTAL_DATA || {})[p] : null;
}
function tv(o) {
  if (o == null) return '';
  if (typeof o === 'string') return o;
  const e = o.e != null ? o.e : (o.en != null ? o.en : '');
  const b = o.b != null ? o.b : (o.bn != null ? o.bn : '');
  const v = lang === 'bn' ? b : e;
  const alt = lang === 'bn' ? e : b;
  return v != null && v !== '' ? v : alt;
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function portalLink(href, label, cls) {
  const attrs = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener"' : ' data-internal="1"';
  return '<a class="' + (cls || 'pp-link') + '" href="' + esc(href) + '"' + attrs + '>' + label + '</a>';
}
function cellHTML(c) {
  if (!c) return '';
  if (c.dl) return '<a class="pp-dl" href="' + esc(c.dl) + '" target="_blank" rel="noopener" title="Download">' + dlIcon() + '<span>' + (lang === 'bn' ? 'ডাউনলোড' : 'Download') + '</span></a>';
  return esc(tv(c));
}
function dlIcon() {
  return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
}

/* 3) section renderers */
function renderPortalSection(sec) {
  const h = sec.h ? '<h3 class="pp-sec-h">' + esc(tv(sec.h)) + '</h3>' : '';
  switch (sec.t) {
    case 'text': {
      const paras = tv(sec.p).split(/\n+/).filter(Boolean).map(function (s) { return '<p>' + esc(s) + '</p>'; }).join('');
      return '<section class="pp-block pp-text">' + h + paras + '</section>';
    }
    case 'list': {
      const items = (sec.items || []).map(function (it) {
        let inner = '<span class="pp-li-bullet">•</span><span class="pp-li-t">' + esc(tv(it.t)) + '</span>';
        if (it.m) inner += '<span class="pp-li-m">' + esc(tv(it.m)) + '</span>';
        if (it.href) return '<li>' + portalLink(it.href, inner, 'pp-li') + '</li>';
        return '<li>' + inner + '</li>';
      }).join('');
      return '<section class="pp-block pp-list">' + h + '<ul class="pp-ul">' + items + '</ul></section>';
    }
    case 'cards': {
      const cards = (sec.items || []).map(function (c) {
        let body = '<div class="pp-card-b">';
        if (c.m) body += '<div class="pp-card-m">' + esc(tv(c.m)) + '</div>';
        body += '<h4>' + esc(tv(c.t)) + '</h4>';
        if (c.d) body += '<p>' + esc(tv(c.d)) + '</p>';
        body += '</div>';
        if (c.href) return '<div class="pp-card">' + portalLink(c.href, body, 'pp-card-inner') + '</div>';
        return '<div class="pp-card">' + body + '</div>';
      }).join('');
      return '<section class="pp-block">' + h + '<div class="pp-cards">' + cards + '</div></section>';
    }
    case 'files': {
      const rows = (sec.files || []).map(function (f) {
        const name = f.n ? tv(f.n) : 'Document';
        const d = f.d ? '<span class="pp-file-d">' + esc(tv(f.d)) + '</span>' : '';
        return '<li class="pp-file">' + dlIcon() +
          '<span class="pp-file-info">' + '<span class="pp-file-n">' + esc(name) + '</span>' + d + '</span>' +
          '<a class="pp-dl" href="' + esc(f.u) + '" target="_blank" rel="noopener">' + (lang === 'bn' ? 'ডাউনলোড' : 'Download') + '</a></li>';
      }).join('');
      const note = sec.note ? '<p class="pp-note">' + esc(tv(sec.note)) + '</p>' : '';
      return '<section class="pp-block pp-files">' + h + '<ul class="pp-file-list">' + rows + '</ul>' + note + '</section>';
    }
    case 'table': {
      const cols = sec.cols || [];
      const head = '<tr>' + cols.map(function (c) { return '<th>' + esc(tv(c)) + '</th>'; }).join('') + '</tr>';
      const body = (sec.rows || []).map(function (r) {
        return '<tr>' + cols.map(function (_, i) { return '<td>' + cellHTML(r[i]) + '</td>'; }).join('') + '</tr>';
      }).join('');
      const note = sec.note ? '<p class="pp-note">' + esc(tv(sec.note)) + '</p>' : '';
      return '<section class="pp-block pp-tbl">' + h + '<div class="pp-scroll"><table class="pp-table"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' + note + '</section>';
    }
    case 'accordion': {
      const items = (sec.items || []).map(function (it, i) {
        return '<details class="pp-acc"' + (i === 0 ? ' open' : '') + '><summary>' + esc(tv(it.q)) + '</summary><div class="pp-acc-a">' + esc(tv(it.a)) + '</div></details>';
      }).join('');
      return '<section class="pp-block pp-acc">' + h + items + '</section>';
    }
    case 'timeline': {
      const items = (sec.items || []).map(function (it) {
        return '<li class="pp-tl"><span class="pp-tl-y">' + esc(it.y) + '</span><span class="pp-tl-t">' + esc(tv({ b: it.b, e: it.e })) + '</span></li>';
      }).join('');
      return '<section class="pp-block"><ol class="pp-timeline">' + items + '</ol></section>';
    }
    default: return '';
  }
}

function ensurePortalView() {
  let v = document.getElementById('view-portal');
  if (!v) {
    v = document.createElement('section');
    v.className = 'view';
    v.id = 'view-portal';
    v.innerHTML = '<div class="container page"><div class="pp-crumb-wrap" id="portalCrumb"></div><div id="portalContainer"></div></div>';
    const main = document.getElementById('main-content');
    if (main) main.appendChild(v);
  }
  return v;
}

function renderPortal() {
  const pg = portalPage();
  if (!pg) return;
  ensurePortalView();
  const c = document.getElementById('portalContainer');
  if (!c) return;
  let html = '<div class="verify-head pp-head">' +
    '<div class="vh-icon">' + dlIcon() + '</div>' +
    '<div><h2>' + esc(tv(pg.title)) + '</h2>' +
    (pg.lead ? '<p>' + esc(tv(pg.lead)) + '</p>' : '') +
    '</div></div>';
  (pg.sections || []).forEach(function (s) { html += renderPortalSection(s); });
  c.innerHTML = html;
  applyStaticLang();
}

/* 4) wrap routing */
const _portalCr = currentRoute;
currentRoute = function () {
  if (portalPath()) return 'portal';
  return _portalCr();
};
const _portalSv = showView;
showView = function (route) {
  _portalSv(route);
  if (route === 'portal') {
    const v = ensurePortalView();
    if (v) v.classList.add('active');
    renderPortal();
    const pg = portalPage();
    const crumb = document.getElementById('crumbCurrent');
    if (crumb && pg) crumb.textContent = tv(pg.title);
    const t = pg ? tv(pg.title) : '';
    document.title = (t ? t + ' | ' : '') + (lang === 'bn' ? 'ডিপিডিটি বাংলাদেশ' : 'DPDT Bangladesh');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
};
const _portalLang = setLang;
setLang = function (next) {
  _portalLang(next);
  if (state.route === 'portal' || portalPath()) {
    renderPortal();
    const pg = portalPage();
    const t = pg ? tv(pg.title) : '';
    document.title = (t ? t + ' | ' : '') + (lang === 'bn' ? 'ডিপিডিটি বাংলাদেশ' : 'DPDT Bangladesh');
  }
  if (state.route === 'trademarks') {
    refreshAdvCoverage();
    renderDatabaseStats();
    renderAdvResults();
  }
  if (state.route === 'record') {
    const recNo = recordNoFromPath();
    if (recNo) renderRecordDetail(recNo);
  }
};

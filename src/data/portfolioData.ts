import { Project, Article, ExperienceItem, Certification } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Elena Rostova',
  role: 'Lead Accessibility Engineer & Systems Architect',
  location: 'Seattle, WA (Pacific Time, UTC-7)',
  email: 'elena.rostova@accessible-systems.org',
  tagline: 'Architecting digital systems where semantic structure, WCAG 2.2 AAA rigor, and humane user experience converge.',
  bio: 'With over a decade of systems engineering, I design and audit enterprise web interfaces, headless design systems, and government portals to guarantee barrier-free access for blind, low-vision, motor-impaired, and neurodivergent individuals.',
  stats: [
    { label: 'Enterprise Audits Led', value: '140+' },
    { label: 'WCAG 2.2 AAA Score Average', value: '99.4%' },
    { label: 'Engineers Trained', value: '2,800+' },
    { label: 'Open-Source A11y Tools', value: '12' },
  ],
  socials: [
    { name: 'GitHub', url: 'https://github.com/example/elena-rostova', label: 'Elena Rostova on GitHub' },
    { name: 'W3C Profile', url: 'https://w3.org', label: 'Elena Rostova W3C Working Group' },
    { name: 'LinkedIn', url: 'https://linkedin.com', label: 'Elena Rostova on LinkedIn' },
    { name: 'Mastodon', url: 'https://mastodon.social', label: 'Elena Rostova on Mastodon' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'gov-portal-redesign',
    title: 'CivicAccess: Federal Portal WCAG 2.2 Re-Architecture',
    subtitle: 'Modernizing citizen service portals for 14M annual users with strict zero-barrier compliance',
    category: 'Web Accessibility',
    year: '2025',
    client: 'Department of Public Services',
    summary: 'A multi-year re-architecture replacing an inaccessible legacy multi-page portal with pure semantic HTML5, aria-live status regions, and robust keyboard navigation patterns.',
    challenge: 'The legacy portal had over 1,200 WCAG 2.1 violations, including missing form labels, untabbable custom modals, broken landmarks, and zero screen reader announcements on dynamic state changes.',
    solution: 'Engineered a semantic component library utilizing native HTML5 dialogs, `<header>`, `<main>`, `<nav>`, `<aside>`, `<section>`, and `<article>` tags. Established strict focus traps, ARIA 1.2 roving tabindexes, and automated Lighthouse CI gating.',
    wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '2.4.7 Focus Visible', '4.1.2 Name, Role, Value', '2.5.8 Target Size (Minimum)'],
    metrics: [
      { label: 'WCAG Violations Resolved', value: '100%' },
      { label: 'Lighthouse A11y Score', value: '100 / 100' },
      { label: 'Screen Reader Task Completion', value: '+310%' }
    ],
    technologies: ['Semantic HTML5', 'WAI-ARIA 1.2', 'TypeScript', 'Automated Axe-Core', 'VoiceOver / NVDA Testing'],
    codeSnippet: {
      language: 'html',
      caption: 'Semantic landmark structure with skip navigation & accessible heading sequence',
      code: `<header role="banner">
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
  <nav aria-label="Primary Navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
</header>
<main id="main-content" tabindex="-1">
  <h1>Citizen Benefits Portal</h1>
  <section aria-labelledby="status-heading">
    <h2 id="status-heading">Active Applications</h2>
    <div role="status" aria-live="polite">Your filing was verified.</div>
  </section>
</main>`
    }
  },
  {
    id: 'a11y-design-system',
    title: 'Aura UI: Accessible Headless Design System',
    subtitle: '64 production-ready UI components with automated WCAG 2.2 AAA conformance tests',
    category: 'Design Systems',
    year: '2024',
    client: 'Global Health Informatics',
    summary: 'Built a multi-platform accessible component library adopted by 40+ engineering squads, supporting high-contrast mode, dyslexia typography, and full keyboard-only operational parity.',
    challenge: 'Engineering teams were rolling bespoke datepickers, multi-select combo-boxes, and tablists with conflicting ARIA roles that broke braille readers and VoiceOver.',
    solution: 'Designed and documented native-first components prioritizing native HTML tags (`<details>`, `<dialog>`, `<button>`, `<fieldset>`) over ARIA polyfills, enforcing W3C APG patterns and strict keyboard contracts (Escape, Tab, Arrow keys).',
    wcagCriteria: ['1.4.3 Contrast (Minimum)', '1.4.11 Non-text Contrast', '2.1.2 No Keyboard Trap', '3.3.2 Labels or Instructions', '4.1.3 Status Messages'],
    metrics: [
      { label: 'Component Adoptions', value: '64 Components' },
      { label: 'A11y Regression Drop', value: '-94%' },
      { label: 'Keyboard Navigation Coverage', value: '100%' }
    ],
    technologies: ['React', 'TypeScript', 'Aria-query', 'Jest-Axe', 'Tailwind CSS', 'Screen Reader Test Suites'],
    codeSnippet: {
      language: 'tsx',
      caption: 'Accessible combo-box with roving tabindex and screen reader descriptions',
      code: `<div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-owns="results-list">
  <input
    id="search-input"
    type="search"
    aria-autocomplete="list"
    aria-controls="results-list"
    aria-activedescendant={activeOptionId}
    aria-describedby="search-hint"
  />
  <span id="search-hint" class="sr-only">Use Up and Down arrows to navigate options</span>
</div>`
    }
  },
  {
    id: 'meditrack-clinical',
    title: 'MediTrack: Real-time Patient Telemetry Dashboard',
    subtitle: 'High-density medical monitoring interface meeting WCAG 2.2 AA in emergency wards',
    category: 'Healthcare Systems',
    year: '2024',
    client: 'Northwest Medical Research',
    summary: 'Engineered an accessible clinical monitoring dashboard capable of handling 24 vital telemetry streams per bed, utilizing audible notifications, high contrast ratios (7.5:1), and motion reduction.',
    challenge: 'High visual noise, flickering real-time charts, and low contrast endangered medical staff ability to read vital metrics under stressful fluorescent hospital lighting.',
    solution: 'Introduced semantic `<figure>` and `<figcaption>` architectures with tabular fallbacks (`<table>` with `<caption>`, `<th scope="col">`), high-contrast dark palette, and polite ARIA live regions for critical alerts.',
    wcagCriteria: ['1.4.1 Use of Color', '1.4.6 Contrast (Enhanced)', '2.2.1 Timing Adjustable', '2.3.1 Three Flashes or Below'],
    metrics: [
      { label: 'Contrast Ratio', value: '7.8 : 1' },
      { label: 'Critical Alert Latency', value: '<50ms' },
      { label: 'Axe Core Clean Run', value: '0 Violations' }
    ],
    technologies: ['HTML5 Semantic Table', 'SVG with Accessible Titles', 'ARIA Live Regions', 'Web Audio API'],
    codeSnippet: {
      language: 'html',
      caption: 'Accessible real-time data table with captions and scoped header cells',
      code: `<table class="accessible-vitals-table">
  <caption>Live Patient Telemetry – Ward 4B, Bed 12</caption>
  <thead>
    <tr>
      <th scope="col">Metric</th>
      <th scope="col">Value</th>
      <th scope="col">Trend</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Heart Rate</th>
      <td>72 bpm</td>
      <td>Stable</td>
      <td><span class="sr-only">Status: </span>Normal</td>
    </tr>
  </tbody>
</table>`
    }
  },
  {
    id: 'core-web-vitals-a11y',
    title: 'Speed & Inclusivity: E-Commerce Architecture',
    subtitle: 'Re-engineering checkout flow to achieve 100/100 Lighthouse on both SEO and Accessibility',
    category: 'Core Web Vitals',
    year: '2023',
    client: 'Nordic Retail Group',
    summary: 'Eliminated cumulative layout shifts (CLS < 0.01) caused by dynamic cookie banners and accessible live announcements while elevating accessibility scores from 68 to 100.',
    challenge: 'Third-party scripts dynamically inserted modals that trapped screen reader users in infinite loops and degraded Lighthouse scores.',
    solution: 'Rebuilt payment authorization forms with accessible inline error validations (`aria-invalid`, `aria-errormessage`), lazy-loaded semantic SVG icons, and proper `<fieldset>` & `<legend>` grouping.',
    wcagCriteria: ['1.1.1 Non-text Content', '3.3.1 Error Identification', '3.3.3 Error Suggestion', '4.1.1 Parsing'],
    metrics: [
      { label: 'Lighthouse Accessibility', value: '100' },
      { label: 'Lighthouse SEO', value: '100' },
      { label: 'Checkout Drop-off Rate', value: '-19%' }
    ],
    technologies: ['Semantic Forms', 'Accessible Dialogs', 'ARIA Form Validation', 'Lighthouse CI'],
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'semantic-html5-foundations',
    title: 'The Unyielding Power of Semantic HTML5 Over ARIA Overload',
    slug: 'semantic-html5-foundations',
    publishDate: 'February 18, 2026',
    isoDate: '2026-02-18',
    readTime: '6 min read',
    tags: ['HTML5', 'Semantics', 'First Rule of ARIA', 'Screen Readers'],
    summary: 'Why reaching for <div> with role="button" is an anti-pattern, and how native semantic tags give you accessibility, keyboard handling, and SEO for free.',
    contentSections: [
      {
        heading: 'The First Rule of ARIA: Do Not Use ARIA',
        paragraphs: [
          'The W3C First Rule of ARIA states: If you can use a native HTML element or attribute with the semantics and behavior already built in, then do so instead of re-purposing an element and adding ARIA.',
          'Native HTML tags like <button>, <details>, <dialog>, <header>, <nav>, and <main> come with built-in keyboard event listeners, accessibility tree mappings, browser heuristics, and focus management. When you use <div onClick={...}>, you must manually rebuild Space/Enter key handlers, tabindex, focus rings, role attributes, and disabled states.'
        ],
        codeBlock: {
          caption: 'Native button vs fragile custom div reimplementation',
          code: `<!-- ❌ Over-engineered and fragile -->
<div role="button" tabindex="0" onclick="submit()" onkeydown="handleKey(event)">
  Save Changes
</div>

<!-- ✅ Pure semantic perfection: works with keyboard, touch, screen reader -->
<button type="button" onclick="submit()">
  Save Changes
</button>`
        }
      },
      {
        heading: 'Landmark Architecture for Screen Reader Efficiency',
        paragraphs: [
          'Blind and low-vision users do not navigate web pages linearly from top to bottom. Instead, screen reader tools like JAWS, NVDA, and VoiceOver allow users to press shortcut keys (like "D" in NVDA or "R" in VoiceOver) to jump directly between landmarks.',
          'When an application properly specifies <header>, <nav>, <main>, <section aria-labelledby>, <article>, <aside>, and <footer>, users can instantly skip past 50 lines of navigation menus directly to the main content or colophon.'
        ]
      }
    ]
  },
  {
    id: 'accessible-form-architecture',
    title: 'Architecting 100% Accessible, Error-Proof Forms',
    slug: 'accessible-form-architecture',
    publishDate: 'January 12, 2026',
    isoDate: '2026-01-12',
    readTime: '8 min read',
    tags: ['Forms', 'WCAG 3.3', 'Validation', 'ARIA Live'],
    summary: 'A step-by-step masterclass on building tab-navigable forms with explicit label association, fieldsets, live error announcements, and focus management.',
    contentSections: [
      {
        heading: 'Explicit Label Association & Describedby Chains',
        paragraphs: [
          'Every single interactive form control must have a programmatically determined accessible name. Placeholder attributes are not substitutes for <label> tags: placeholders disappear upon typing, often lack sufficient contrast, and are ignored by many cognitive assistive tools.',
          'Using aria-describedby allows you to seamlessly chain instructional hints and error messages to the input, ensuring screen readers announce both when the field receives focus.'
        ],
        codeBlock: {
          caption: 'Accessible input with helper text and live error link',
          code: `<div class="form-group">
  <label for="user-email">
    Work Email <span aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </label>
  <input
    id="user-email"
    name="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby="email-hint email-error"
  />
  <p id="email-hint" class="hint-text">We will send confirmation here.</p>
  {hasError && (
    <p id="email-error" class="error-text" role="alert">
      Please enter a valid business email address.
    </p>
  )}
</div>`
        }
      },
      {
        heading: 'Focus Management on Form Submission Failure',
        paragraphs: [
          'When a user submits a form with validation errors, silent inline red borders are useless to screen reader users and users with tunnel vision. The correct pattern is to render an error summary box at the top with role="alert" or aria-live="assertive", and programmatically shift DOM focus to the summary or the first invalid field.'
        ]
      }
    ]
  },
  {
    id: 'wcag-22-breakdown',
    title: 'What Changed in WCAG 2.2: Focus Appearance & Target Sizing',
    slug: 'wcag-22-breakdown',
    publishDate: 'November 29, 2025',
    isoDate: '2025-11-29',
    readTime: '5 min read',
    tags: ['WCAG 2.2', 'Focus Visible', 'Target Size', 'Standards'],
    summary: 'A practical guide to the newest W3C criteria: Focus Appearance (2.4.11), Target Size Minimum (2.5.8), and Redundant Entry (3.3.7).',
    contentSections: [
      {
        heading: 'Target Size (Minimum) – 2.5.8 (Level AA)',
        paragraphs: [
          'Interactive targets must have an area of at least 24 by 24 CSS pixels, or have sufficient spacing around them so that a 24px diameter circle centered on the target does not intersect any other target. For mobile experiences, targeting 44x44px or 48x48px guarantees comfort for tremors and motor-control variations.'
        ]
      }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2022 — Present',
    role: 'Principal Accessibility Architect',
    organization: 'Inclusive Architecture Labs',
    location: 'Seattle, WA & Remote',
    description: 'Leading enterprise accessibility audits, design system governance, and engineering workshops for Fortune 500 tech and government platforms.',
    achievements: [
      'Authored corporate WCAG 2.2 AAA engineering guidelines adopted across 18 business units.',
      'Constructed CI/CD axe-core and Cypress automation testing pipelines catching 85% of semantic flaws prior to merge.',
      'Audited over 400,000 lines of frontend code across React, Vue, and native HTML architectures.'
    ],
    standards: ['WCAG 2.2 AAA', 'Section 508', 'EN 301 549', 'WAI-ARIA 1.2']
  },
  {
    period: '2019 — 2022',
    role: 'Senior Frontend & Accessibility Engineer',
    organization: 'Veritas Health Digital',
    location: 'San Francisco, CA',
    description: 'Responsible for patient portal frontends, high-contrast theming, and screen reader certification on VoiceOver, NVDA, and JAWS.',
    achievements: [
      'Elevated portal accessibility audit score from 71 to 100 on Google Lighthouse.',
      'Implemented full keyboard navigability across complex medication interaction charts and appointment bookers.',
      'Spearheaded user research with participants using braille displays and switch access devices.'
    ],
    standards: ['WCAG 2.1 AA', 'HIPAA Accessible Records', 'ADA Title III']
  },
  {
    period: '2016 — 2019',
    role: 'UI Systems Engineer',
    organization: 'OpenGrid Cloud',
    location: 'Austin, TX',
    description: 'Architected scalable UI components, data visualization accessibility layers, and responsive web foundations.',
    achievements: [
      'Created open-source semantic chart table fallback library with over 45k monthly downloads.',
      'Mentored 35 junior developers on semantic HTML and keyboard event lifecycle handling.'
    ],
    standards: ['WAI-ARIA 1.1', 'HTML5 Semantic Spec']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Certified Professional in Accessibility Core Competencies (CPACC)',
    issuer: 'International Association of Accessibility Professionals (IAAP)',
    year: '2024',
    credentialId: 'IAAP-CPACC-884210',
    url: 'https://www.accessibilityassociation.org'
  },
  {
    title: 'Web Accessibility Specialist (WAS)',
    issuer: 'IAAP',
    year: '2023',
    credentialId: 'IAAP-WAS-55194',
    url: 'https://www.accessibilityassociation.org'
  },
  {
    title: 'DHS Section 508 Trusted Tester v5.1',
    issuer: 'U.S. Department of Homeland Security',
    year: '2023',
    credentialId: 'DHS-TT-2023-0941',
    url: 'https://www.dhs.gov/compliance-test-process'
  }
];

export const LIGHTHOUSE_AUDIT_ITEMS = [
  {
    category: 'Semantic HTML5 Structure',
    title: 'Proper Landmark Elements Defined',
    spec: '<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>',
    status: 'pass',
    description: 'All regions use HTML5 native landmarks with distinct aria-labels for multiple instances.',
    score: '100%'
  },
  {
    category: 'Accessibility',
    title: 'Logical Heading Order (H1 through H4)',
    spec: 'WCAG 1.3.1 Info and Relationships',
    status: 'pass',
    description: 'No skipped heading levels. Exactly one H1 per page view, followed by consecutive H2s and H3s.',
    score: '100%'
  },
  {
    category: 'Accessibility',
    title: 'Enhanced Color Contrast (WCAG AAA)',
    spec: 'WCAG 1.4.3 & 1.4.6 Contrast (Enhanced)',
    status: 'pass',
    description: 'Body text maintains at least 7.2:1 contrast against background; large headers maintain ≥ 4.5:1.',
    score: '100%'
  },
  {
    category: 'Accessibility',
    title: 'Focus Traps & Keyboard Navigability',
    spec: 'WCAG 2.1.1 Keyboard & 2.4.7 Focus Visible',
    status: 'pass',
    description: 'All buttons, links, inputs, and disclosures are fully reachable via Tab/Shift+Tab with visible focus indicator.',
    score: '100%'
  },
  {
    category: 'Forms & Inputs',
    title: 'Explicit Labeling & Validation ARIA',
    spec: 'WCAG 3.3.1 Error Identification & 3.3.2 Labels',
    status: 'pass',
    description: 'Every control has explicit htmlFor association, aria-required, aria-invalid, and live error summaries.',
    score: '100%'
  },
  {
    category: 'SEO & Metadata',
    title: 'Structured Data & Social Meta Tags',
    spec: 'Schema.org Person / WebSite & OpenGraph / Twitter Cards',
    status: 'pass',
    description: 'Complete JSON-LD graph, meta descriptions (120-160 chars), descriptive document title, and canonical links.',
    score: '100%'
  }
];

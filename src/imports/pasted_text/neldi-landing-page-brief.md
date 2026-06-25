# Figma Prompt: NELDI Landing Page

## Project Brief
Design a modern, mobile-first landing page for **NELDI** — a logistics and marketplace platform launching in Gombe State, Nigeria, under parent company **NELDI Digital Services**. NELDI connects food vendors with buyers and handles delivery/logistics end-to-end, with plans to expand beyond food to all vendor categories. The platform has two distinct user types — **Vendors** and **Customers** — each served by a dedicated mobile app (built in Flutter), so the landing page must speak to both audiences while driving a single primary action: waitlist signup.

This is a **pre-launch landing page**, not a full marketing site. Goal: build hype, explain the value prop simply, and convert visitors into waitlist signups.

---

## Brand System

### Colors (Design Tokens)
| Token | Hex | Usage |
|---|---|---|
| `primary/green-700` | #1B5E20 | Primary brand color — headers, primary buttons, nav |
| `accent/teal-500` | #008080 | Secondary accent — links, highlights, secondary buttons, icons |
| `neutral/white` | #FFFFFF | Background, button text on dark |
| `neutral/off-white` | #F7F9F7 | Section background alternation |
| `neutral/charcoal` | #1A1A1A | Body text |
| `neutral/gray-500` | #6B7280 | Secondary/muted text |
| `success/light-green` | #E8F5E9 | Badge backgrounds, subtle highlights |

Use **green-700** as the dominant brand color (headers, hero background or hero CTA), **teal-500** as the energetic accent for interactive elements — don't blend them into a gradient by default; keep them as distinct, deliberate color blocks for visual clarity.

### Typography
- **Font Family:** Poppins (all weights — Light, Regular, Medium, SemiBold, Bold)
- **Type Scale (Desktop):**
  - H1 / Hero: 56px / Bold / line-height 1.1
  - H2 / Section Header: 36px / SemiBold / line-height 1.2
  - H3 / Card Title: 22px / SemiBold
  - Body Large: 18px / Regular / line-height 1.6
  - Body: 16px / Regular / line-height 1.5
  - Caption/Label: 14px / Medium, uppercase letter-spacing 0.5px
- **Type Scale (Mobile):** Scale H1 down to 32px, H2 to 26px, body stays 16px for readability

### Spacing & Grid
- **Desktop:** 1440px frame, 12-column grid, 80px outer margins, 24px gutter
- **Tablet:** 768px frame, 8-column grid, 40px margins
- **Mobile:** 375px frame, 4-column grid, 20px margins
- **Spacing scale:** 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96px (use consistently for padding/margins between elements)
- **Corner radius:** 12px for cards/buttons, 24px for large containers/hero images, full-round for pill badges

### Iconography & Imagery
- **Icons:** Minimal line-art style, 2px stroke, rounded caps — consistent with delivery/logistics/food themes (bike/scooter, package, storefront, map pin, wallet, checkmark)
- **Photography:** Real or realistic-feel imagery of West African markets, food vendors, motorbike delivery riders, and mobile phone usage — avoid generic Western stock photography
- **Illustration option:** If using illustration instead of photography, keep it flat/geometric with brand colors (green/teal) and warm skin tones reflecting the Nigerian market
- **Logo:** Wordmark "NELDI" in Poppins Bold, paired with a simple icon mark (e.g., a stylized delivery/connection symbol) — place top-left in nav, centered in footer

---

## Page Architecture (Section-by-Section)

### 1. Navigation Bar (Sticky)
- Left: NELDI logo
- Center/Right: Anchor links — "How It Works," "For Vendors," "For Customers," "FAQ"
- Right: "Join Waitlist" button (green-700, pill-shaped, white text)
- Mobile: Collapse links into hamburger menu, keep CTA button visible

### 2. Hero Section
- **Layout:** Split layout — left 55% text content, right 45% hero image/illustration (stack vertically on mobile, image below text)
- **Eyebrow label:** Small teal pill badge — "Launching Soon in Gombe State"
- **Headline (H1):** "Your Marketplace. Your Delivery. One App."
- **Subheadline (Body Large):** One sentence explaining the dual-sided value — vendors sell more, customers get fresh goods delivered fast
- **Primary CTA:** "Join the Waitlist" (green-700 filled button)
- **Secondary CTA:** "See How It Works" (teal outline/ghost button, scrolls to section 4)
- **Hero visual:** Phone mockup showing the NELDI app UI (vendor or customer view), OR lifestyle photo of a vendor handing off a delivery
- **Trust strip below hero:** Small row of stats/badges — e.g., "Built for Nigerian Vendors," "Fast Local Delivery," "Secure Payments" — icon + label, 3 across

### 3. Dual-Audience Split Section
Two side-by-side cards (stack on mobile) directly addressing each user type:
- **Card 1 — "I'm a Vendor"**
  - Icon: storefront
  - Headline: "Sell More, Stress Less"
  - 3 bullet benefits (reach more customers, simple dashboard, get paid fast)
  - CTA: "Join as a Vendor" (teal outline button)
- **Card 2 — "I'm a Customer"**
  - Icon: shopping bag
  - Headline: "Fresh Goods, Delivered Fast"
  - 3 bullet benefits (browse local vendors, track orders live, pay securely)
  - CTA: "Join as a Customer" (green-700 outline button)
- Background: off-white section to create contrast from hero

### 4. How It Works (Numbered Process)
- Section header: "How NELDI Works"
- 4-step horizontal timeline (desktop) / vertical stack (mobile), numbered 01–04, connected by a thin teal line
- Steps: Browse & Order → Vendor Confirms → Rider Picks Up → Delivered to You
- Each step: number badge (teal circle), icon, short title, one-line description

### 5. Features Grid
- Section header: "Everything You Need, In One Platform"
- 3-column grid (desktop), 1-column stack (mobile) — 5–6 feature cards:
  - Easy Vendor Onboarding
  - Real-Time Order Tracking
  - Integrated Local Delivery
  - Secure In-App Payments
  - Vendor Earnings Dashboard
  - Built for Local Markets (Gombe-first, Nigeria-ready)
- Card style: white background, subtle shadow, icon top, H3 title, body text, 12px radius

### 6. "Why NELDI" / Differentiation Section
- Section header: "Why We're Different"
- 3-column layout with icon + short headline + description:
  - **Built Local First** — Designed for Gombe State markets before scaling nationally
  - **Fair for Vendors** — Transparent commission, no hidden fees
  - **One App, Two Sides** — Vendors and customers connect directly through one trusted platform
- Optional: Background in green-700 with white text for visual contrast against surrounding white/off-white sections

### 7. Waitlist CTA Section (Conversion Focus)
- Full-width band, green-700 or teal-500 background, centered content, white text
- Headline: "Be the First to Use NELDI"
- Subtext: "Sign up now and get early access plus exclusive launch perks"
- Form: Name, Email, dropdown (Vendor / Customer / Both) — inline horizontal form on desktop, stacked on mobile
- Button: "Join Waitlist" (white button, green/teal text — inverted from rest of page for contrast)
- Microcopy under form: "No spam. We'll only email you about launch updates."

### 8. FAQ Section (Accordion)
- Section header: "Questions? We've Got Answers"
- Accordion component, 5–6 questions (e.g., "When does NELDI launch?", "Which areas do you deliver to?", "How do I become a vendor?", "Is there a fee to join?")
- Single-column, max-width 720px, centered

### 9. Footer
- 4-column layout (desktop): Logo + tagline | Quick Links | For Vendors/Customers | Contact/Social
- Newsletter signup mini-form (optional, can mirror waitlist CTA)
- Bottom bar: "© 2026 NELDI Digital Services. All rights reserved." + legal links (Privacy, Terms)
- Background: charcoal or deep green-700, white/gray text

---

## Components to Build as Reusable Figma Components
- Button (Primary/Secondary/Ghost × Default/Hover/Disabled states)
- Input field (Default/Focus/Error states)
- Feature Card
- Step/Process Card
- FAQ Accordion Item (Collapsed/Expanded)
- Nav Bar (Desktop/Mobile)
- Badge/Pill Label

---

## Responsive Behavior Notes
- Mobile-first build: design the 375px frame first, then scale up to tablet/desktop, since the majority of target users (Nigerian market) will access via mobile
- Stack all multi-column sections vertically below 768px
- Hero image moves below text content on mobile
- Sticky nav collapses to hamburger + persistent CTA button on mobile
- Touch targets minimum 44x44px for all buttons/links on mobile frames

---

## Visual Mood/Tone Reference
Aim for a visual energy similar to modern African fintech and delivery apps (e.g., Paystack, Flutterwave, Bolt Food) — clean, confident, optimistic, and locally rooted rather than generic Silicon Valley minimalism. Avoid overly corporate or cold layouts; the brand should feel approachable, trustworthy, and built *for* the local market, not imported into it.

---

## Deliverables Requested
1. Desktop frame (1440px) — full landing page, all sections
2. Mobile frame (375px) — full landing page, all sections
3. Component library page (buttons, inputs, cards, nav states)
4. Color & type style guide page (tokens applied as Figma Styles/Variables)

---

## Final Notes for Figma AI
- Apply colors as Figma **Variables** (not just hex fills) so they can be reused/updated globally
- Apply typography as Figma **Text Styles** for the same reason
- Use **Auto Layout** on all sections, cards, and the nav bar so spacing stays consistent if content changes
- Name layers/frames clearly (e.g., "Hero/Desktop," "FeatureCard/Icon," "Footer/LinkColumn") for easy handoff to development (Flutter web/React build)
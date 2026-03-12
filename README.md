# Unity Metrix - React Website Replica

A complete React.js + Tailwind CSS replica of [unitymetrix.com](https://unitymetrix.com/), a UK cybersecurity services company.

## 📁 Project Structure

```
src/
├── components/         # Reusable components
│   ├── TopBar.jsx      # Top contact bar
│   ├── Navbar.jsx      # Navigation with dropdowns
│   ├── Footer.jsx      # Footer with links & contact
│   ├── Button.jsx      # Reusable button (variants: primary, outline, dark, white)
│   ├── SectionHeader.jsx  # Section title/subtitle
│   ├── ServiceCard.jsx    # Service tile card
│   ├── StatCard.jsx       # Animated stat counter
│   ├── ProcessStep.jsx    # Step in a process timeline
│   ├── TestimonialCard.jsx # Customer review card
│   ├── ContactForm.jsx    # Contact form with validation
│   └── CookieBanner.jsx   # GDPR cookie consent
│
└── pages/              # Full page components
    ├── Home.jsx         # Homepage (all sections)
    ├── WhatWeDo.jsx     # Services page (11 services)
    ├── WhoWeHelp.jsx    # Client profiles (SME, Entrepreneur, Director)
    ├── Pricing.jsx      # Pricing plans (6 tiers)
    ├── CaseStudies.jsx  # 4 detailed case studies
    ├── AboutUs.jsx      # Team, values, certifications
    ├── KnowledgeCentre.jsx # Filterable blog/articles
    └── Contact.jsx      # Contact form + info
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🛠️ Tech Stack

- **React 18** — component-based UI
- **Tailwind CSS 3** — utility-first styling
- **Vite** — fast dev server & build tool

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Primary | `#00d4ff` (cyan) |
| Dark | `#1a1a2e` (navy) |
| Font | Inter (Google Fonts) |

## 📄 Pages Included

| Page | Route (internal) | Description |
|------|-----------------|-------------|
| Home | `home` | Full landing page |
| What We Do | `what-we-do` | All 11 services |
| Who We Help | `who-we-help` | SME, Entrepreneur, Director profiles |
| Pricing | `pricing` | 6 pricing plans |
| Case Studies | `case-studies` | 4 client success stories |
| About Us | `about-us` | Team, values, certifications |
| Knowledge Centre | `knowledge-centre` | 10 articles with tag filters |
| Contact | `contact` | Form + contact details |

## 🔧 Customisation

Navigation uses a simple `currentPage` state in `App.jsx`. To add a page:
1. Create `src/pages/YourPage.jsx`
2. Import it in `App.jsx`
3. Add a case to the `renderPage()` switch
4. Add a nav link in `Navbar.jsx`

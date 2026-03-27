# RISLIX – Cybersecurity, GRC & AI Governance

## 📁 Project Structure

```
rohaan02-rislix/
├── README.md                  # Project documentation
├── index.html                # Root HTML file
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
├── .cpanel.yml               # Deployment config (cPanel)
│
└── src/
    ├── App.jsx               # Main app component (routes/layout)
    ├── index.jsx             # Entry point
    ├── index.css             # Global styles (Tailwind imports)
    │
    ├── components/           # Reusable UI components
    │   ├── TopBar.jsx            # Top contact/info bar
    │   ├── Navbar.jsx            # Navigation with dropdowns
    │   ├── Footer.jsx            # Footer section
    │   ├── Button.jsx            # Reusable button (variants)
    │   ├── SectionHeader.jsx     # Section title/subtitle
    │   ├── ServiceCard.jsx       # Service display card
    │   ├── StatCard.jsx          # Animated stats counter
    │   ├── ProcessStep.jsx       # Process timeline step
    │   ├── TestimonialCard.jsx   # Customer testimonial card
    │   ├── ContactForm.jsx       # Form with validation
    │   ├── CookieBanner.jsx      # Cookie consent banner
    │   ├── CustomCursor.jsx      # Custom cursor effect
    │   ├── HeroBg.jsx            # Hero section background visuals
    │   └── RislixLogo.jsx        # Logo component
    │
    └── pages/                # Page-level components (routes)
        ├── Home.jsx              # Homepage (all sections)
        ├── WhatWeDo.jsx         # Services (11 offerings)
        ├── WhoWeHelp.jsx        # Target clients (SME, Entrepreneurs, Directors)
        ├── Pricing.jsx          # Pricing plans (6 tiers)
        ├── CaseStudies.jsx      # Case studies showcase
        ├── AboutUs.jsx          # Company info, team, values
        ├── KnowledgeCentre.jsx  # Blog/articles (filterable)
        └── Contact.jsx          # Contact page
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

| Token | Value                |
| ----- | -------------------- |
| Font  | Inter (Google Fonts) |

## 📄 Pages Included

| Page             | Route (internal)   | Description                          |
| ---------------- | ------------------ | ------------------------------------ |
| Home             | `home`             | Full landing page                    |
| What We Do       | `what-we-do`       | All 11 services                      |
| Who We Help      | `who-we-help`      | SME, Entrepreneur, Director profiles |
| Pricing          | `pricing`          | 6 pricing plans                      |
| Case Studies     | `case-studies`     | 4 client success stories             |
| About Us         | `about-us`         | Team, values, certifications         |
| Knowledge Centre | `knowledge-centre` | 10 articles with tag filters         |
| Contact          | `contact`          | Form + contact details               |

## 🔧 Customisation

Navigation uses a simple `currentPage` state in `App.jsx`. To add a page:

1. Create `src/pages/YourPage.jsx`
2. Import it in `App.jsx`
3. Add a case to the `renderPage()` switch
4. Add a nav link in `Navbar.jsx`

## 📦 Deployment Instructions (cPanel)

If you are using the pre-built dist folder for production:

1. Push the dist folder to your GitHub repository.
2. Log in to cPanel → File Manager → repositories/rislix/.
3. Remove the previous dist folder from the server.
4. Go to cPanel → Git Version Control → Pull or Deploy.
5. Click “Update from Remote” to pull the latest changes.
6. Visit the deploy script in your browser:

```bash
https://rislix.com/deploy.php?key=rohaan123
```

7. Your website will now be live with the latest changes.
   ✅ This workflow avoids building on the server and ensures your latest production-ready frontend is deployed safely.

## 📦 Additional Packages

### For Lucide React (recommended)

```bash
npm install lucide-react
```

### SEO Support

```bash
npm i react-helmet-async
```

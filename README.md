# Sudhakar Kukatlapalli | Executive Portfolio & NIIXON Treasury Architecture

A high-performance, Apple-inspired executive portfolio website designed for **Sudhakar Kukatlapalli** (SAP Treasury & FSCM Solution Architect, Former Associate Director at Deloitte India, and Founder of **NIIXON Consulting**).

---

## 🌟 Key Highlights & Design Elements

- **Apple-Style Frosted Top Navigation:**
  - Glassmorphic navbar with dynamic blur (`backdrop-filter: blur(24px)`), smooth scrollspy, mobile drawer, and instant theme toggling (Light / Dark modes).
  - Co-branded identity displaying the **NIIXON** corporate emblem alongside Sudhakar Kukatlapalli's executive title.
- **Brand Palette:**
  - **Royal Sapphire Blue** (`#0B4FBF` / `#072E75`), **Niixon Mint & Emerald Green** (`#10B981` / `#059669`), **Pure White**, and sleek **Obsidian / Dark accents**.
- **Interactive Visual Effects & Charts (Chart.js):**
  - **Interactive Donut / Pie Chart:** Live Treasury Portfolio & Hedging Allocation Breakdown (Money Market, FX Forwards, Bonds, Liquid Cash, Trade Finance).
  - **Operational Impact Multi-Bar Chart:** Straight-Through Processing (STP) & Risk Reduction (Legacy Spreadsheets vs. SAP S/4HANA Implementation).
- **Interactive Calculation & Diagnostic Engines:**
  - **Enterprise Treasury ROI Calculator:** Dynamic dual-range sliders simulating annual financial savings, hours saved in reconciliation, and STP automation rate based on group turnover, bank accounts, monthly payments, and FX exposure.
  - **S/4HANA Treasury Readiness Diagnostic:** Instant architectural maturity audit with real-time circular gauge and tailored transformation recommendations.
- **Visual STP Treasury Architecture Canvas:**
  - 4-Tier Interactive Architecture Flow (Front Office -> Middle Office -> S/4HANA Core -> Multi-Bank Gateway) with a live Node Inspector showcasing technical protocols (MT300, MT320, ISO 20022 XML pain.001, camt.053, SWIFT gpi).
- **Comprehensive NIIXON Solutions & Services:**
  - Full inclusion of all 8 core enterprise capabilities from [niixon.co.in](https://niixon.co.in/): Gap Analysis, TRM Core, Cash & Liquidity (CLM/BAM), Bank Communication (BCM/MBC), Commodity & FX Risk (CMPM/IFRS 9), Market & Credit Risk Analyzers (MRA/CRA), Trading Portals (360T/Refinitiv), and SAP Resourcing/Training.
- **15+ Years Landmark Experience & Case Studies:**
  - Detailed interactive timeline covering **UCB Pharma (Belgium)**, **Deloitte India (Associate Director)**, **Dr. Reddy's**, **Sony Corporation**, **CapitaLand Singapore (PwC)**, **Mercuria Energy Trading (DXC)**, **KPMG**, **Hewlett-Packard**, **GE Medical**, and **UltraTech Cement**.
  - Interactive "View Deep Dive" case study modals for key client engagements.
- **Resume Dossier & Download Center:**
  - Direct download button for the official 5-page PDF resume (`assets/Sudhakar_Kukatlapalli_Resume.pdf`).
  - In-browser full-screen modal viewer with quick download options.
- **High-Conversion Executive Consultation Hub:**
  - Direct lines for Europe (`+32 465194970`) and India (`+91 9900409955`), email links, and an interactive briefing form that auto-generates structured emails and WhatsApp direct links.

---

## 📁 Directory Structure

```
sudhakar-portfolio/
├── index.html            # Main semantic HTML5 portfolio document
├── style.css             # Apple-inspired responsive CSS design system
├── app.js                # Interactive logic, Chart.js engine, ROI calculator
├── README.md             # Project documentation
└── assets/
    ├── Sudhakar_Kukatlapalli_Resume.pdf  # Official 5-page PDF resume
    ├── niixon-logo-transparent.png       # Transparent NIIXON logo (Light mode)
    ├── niixon-logo-dark.png              # Optimized NIIXON logo (Dark mode)
    ├── niixon-logo.png                   # Cropped high-res logo
    ├── niixon-emblem.png                 # NIIXON orbit emblem
    ├── sudhakar-profile-circle.png       # High-res circular portrait
    ├── sudhakar-profile.jpg              # Original portrait
    ├── favicon.png                       # Browser tab icon
    └── chart.min.js                      # Bundled Chart.js 4.4.1 (offline-ready)
```

---

## 🚀 Running & Deploying Locally

### Option 1: Direct File Opening
Double click `index.html` to open directly in any modern web browser (Google Chrome, Apple Safari, Microsoft Edge, Firefox).

### Option 2: Local HTTP Server (Recommended)
Run Python's built-in web server:
```bash
cd C:\Users\kumar\.gemini\antigravity\scratch\sudhakar-portfolio
python -m http.server 8085
```
Then visit: `http://localhost:8085/` in your browser.

### Option 3: Deploying to Free Web Hosting (Vercel, Netlify, or GitHub Pages)
Because this is a pure, zero-dependency static web application, it can be deployed in 30 seconds to:
- **GitHub Pages:** Push the folder to a GitHub repository and turn on Pages in repo Settings.
- **Vercel / Netlify:** Drag-and-drop the `sudhakar-portfolio` folder into the Netlify or Vercel dashboard to get a free live URL (e.g., `sudhakar-treasury.vercel.app` or connect to `niixon.co.in`).

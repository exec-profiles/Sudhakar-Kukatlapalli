/**
 * SUDHAKAR KUKATLAPALLI | NIIXON CONSULTING
 * Interactive Engine: Apple-Style Navigation, Live Charts, Treasury ROI Calculator,
 * STP Architecture Visualizer & Diagnostics
 */

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initAppleNavbar();
  initHeroCarousel();
  initAppleCarousel();
  initCharts();
  initCalculator();
  initDiagnostic();
  initServicesFilter();
  initStpInspector();
  initTimelineFilter();
  initModals();
  initContactForm();
  initFaqAccordion();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      updateChartsTheme(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeToggleIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

/* ==========================================================================
   2. Apple-Style Frosted Navbar & Mobile Navigation
   ========================================================================== */
function initAppleNavbar() {
  const navWrapper = document.getElementById('appleNavWrapper');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileMenuDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }
    updateActiveNavSection();
  });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Smooth scroll for Apple Nav links
  document.querySelectorAll('.apple-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const targetY = target.getBoundingClientRect().top + window.pageYOffset - 65;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    });
  });

  // Scrollspy for active nav links
  function updateActiveNavSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.apple-nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2.0 Hero Section 2-Slide Bright Slideshow Engine
   ========================================================================== */
function initHeroCarousel() {
  // Use globally exposed switchHeroSlide to maintain seamless sync
  if (typeof window.switchHeroSlide === 'function') {
    window.switchHeroSlide(0);
  }
}

/* ==========================================================================
   2.1 Apple-Style 4K UHD Flagship Showcase Carousel Engine
   ========================================================================== */
function initAppleCarousel() {
  const slides = document.querySelectorAll('.carousel-slide-item');
  const segmentBtns = document.querySelectorAll('.carousel-segment-btn');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const playPauseBtn = document.getElementById('carouselPlayPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const carouselContainer = document.getElementById('appleCarousel');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideDuration = 6500; // 6.5s per slide
  const stepInterval = 40; // update progress every 40ms
  let progress = 0;
  let isPlaying = true;
  let timerInterval = null;

  function setSlide(index) {
    // Clamp index
    currentSlide = (index + totalSlides) % totalSlides;

    // Update active slide class
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update active segment button class and reset progress bars
    segmentBtns.forEach((btn, i) => {
      const progressBar = btn.querySelector('.segment-progress-bar');
      if (i === currentSlide) {
        btn.classList.add('active');
        if (progressBar) progressBar.style.width = '0%';
      } else {
        btn.classList.remove('active');
        if (progressBar) progressBar.style.width = i < currentSlide ? '100%' : '0%';
      }
    });

    progress = 0;
  }

  function startTimer() {
    stopTimer();
    if (!isPlaying) return;

    timerInterval = setInterval(() => {
      progress += (stepInterval / slideDuration) * 100;
      const activeBar = document.getElementById(`progressBar${currentSlide}`);
      if (activeBar) {
        activeBar.style.width = `${Math.min(100, progress)}%`;
      }

      if (progress >= 100) {
        setSlide(currentSlide + 1);
      }
    }, stepInterval);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-pause';
      startTimer();
    } else {
      if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-play';
      stopTimer();
    }
  }

  // Segment click events
  segmentBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      setSlide(i);
      startTimer();
    });
  });

  // Prev / Next button events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setSlide(currentSlide - 1);
      startTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setSlide(currentSlide + 1);
      startTimer();
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  // Pause on hover
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      stopTimer();
    });
    carouselContainer.addEventListener('mouseleave', () => {
      if (isPlaying) startTimer();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        // Swipe left -> next
        setSlide(currentSlide + 1);
        startTimer();
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right -> prev
        setSlide(currentSlide - 1);
        startTimer();
      }
    }, { passive: true });
  }

  // Initialize
  setSlide(0);
  startTimer();
}

/* ==========================================================================
   3. Interactive Charts (Chart.js): Treasury Allocation & STP Impact
   ========================================================================== */
let allocationChartInstance = null;
let comparisonChartInstance = null;

function initCharts() {
  const pieCtx = document.getElementById('treasuryAllocationChart');
  const compCtx = document.getElementById('stpComparisonChart');

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  // Chart 1: Treasury Portfolio Allocation (Donut Chart)
  if (pieCtx && typeof Chart !== 'undefined') {
    allocationChartInstance = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Money Market & Term Deposits',
          'FX Forwards & Derivatives',
          'Sovereign / Corporate Bonds',
          'Liquid Cash & Pool Sweeps',
          'Trade Finance & Letters of Credit'
        ],
        datasets: [{
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            '#0b4fbf', // Royal Blue
            '#10b981', // Emerald Green
            '#2563eb', // Vibrant Blue
            '#059669', // Mint Green
            '#072e75'  // Deep Navy
          ],
          borderColor: isDark ? '#0d1527' : '#ffffff',
          borderWidth: 3,
          hoverOffset: 12
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Handled via custom HTML chips
          },
          tooltip: {
            backgroundColor: isDark ? '#1e293b' : '#0f172a',
            titleColor: '#ffffff',
            bodyColor: '#cbd5e1',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) {
                return ` ${ctx.label}: ${ctx.raw}% Portfolio Weight`;
              }
            }
          }
        },
        cutout: '66%',
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  // Chart 2: Operational Impact Comparison (Bar Chart)
  if (compCtx && typeof Chart !== 'undefined') {
    comparisonChartInstance = new Chart(compCtx, {
      type: 'bar',
      data: {
        labels: [
          'Bank Recs Automation',
          'STP Trade Execution',
          'Month-End Close Speed',
          'Spreadsheet Risk Mitigation'
        ],
        datasets: [
          {
            label: 'Legacy / Spreadsheet Model',
            data: [25, 15, 30, 20],
            backgroundColor: isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.25)',
            borderColor: isDark ? '#64748b' : '#94a3b8',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'NIIXON S/4HANA Treasury Hub',
            data: [99.4, 98.5, 94.0, 96.5],
            backgroundColor: '#059669', // Emerald Green
            borderColor: '#10b981',
            borderWidth: 1.5,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: textColor,
              callback: val => val + '%'
            },
            grid: {
              color: gridColor
            }
          },
          x: {
            ticks: {
              color: textColor,
              font: { size: 11, weight: '600' }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              font: { size: 12, weight: '600' }
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#1e293b' : '#0f172a',
            padding: 10,
            callbacks: {
              label: function (ctx) {
                return ` ${ctx.dataset.label}: ${ctx.raw}% efficiency index`;
              }
            }
          }
        }
      }
    });
  }
}

function updateChartsTheme(theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  if (allocationChartInstance) {
    allocationChartInstance.data.datasets[0].borderColor = isDark ? '#0d1527' : '#ffffff';
    allocationChartInstance.update();
  }

  if (comparisonChartInstance) {
    comparisonChartInstance.options.scales.y.ticks.color = textColor;
    comparisonChartInstance.options.scales.y.grid.color = gridColor;
    comparisonChartInstance.options.scales.x.ticks.color = textColor;
    comparisonChartInstance.options.plugins.legend.labels.color = textColor;
    comparisonChartInstance.update();
  }
}

/* ==========================================================================
   4. Enterprise Treasury ROI & STP Calculator Engine
   ========================================================================== */
function initCalculator() {
  const turnoverSlider = document.getElementById('calcTurnover');
  const accountsSlider = document.getElementById('calcAccounts');
  const paymentsSlider = document.getElementById('calcPayments');
  const fxSlider = document.getElementById('calcFxVolume');

  if (!turnoverSlider) return;

  function recalculateROI() {
    const turnover = parseFloat(turnoverSlider.value); // Millions €
    const accounts = parseInt(accountsSlider.value, 10);
    const payments = parseInt(paymentsSlider.value, 10);
    const fxVolume = parseFloat(fxSlider.value); // Millions €

    // Update Badges
    document.getElementById('turnoverVal').innerText = `€${turnover}M`;
    document.getElementById('accountsVal').innerText = `${accounts} Accounts`;
    document.getElementById('paymentsVal').innerText = `${payments.toLocaleString()} /mo`;
    document.getElementById('fxVal').innerText = `€${fxVolume}M`;

    // Mathematical Savings Formula
    // 1. Bank communication & payment factory savings (ISO 20022 STP eliminates €1.80 per manual transaction)
    const paymentFeeSavings = (payments * 12) * 1.65;
    // 2. Account rationalization & cash visibility interest optimization (approx 0.08% on turnover)
    const cashInterestOptimization = (turnover * 1000000) * 0.00065;
    // 3. FX slippage reduction via 360T/Refinitiv integration (approx 0.12% on FX volume)
    const fxSlippageSavings = (fxVolume * 1000000) * 0.0012;
    // 4. Manual audit & spreadsheet labor savings
    const laborSavings = accounts * 12 * 450;

    const totalAnnualSavings = paymentFeeSavings + cashInterestOptimization + fxSlippageSavings + laborSavings;
    const hoursSavedPerMonth = Math.round((accounts * 2.8) + (payments * 0.012));
    const stpRate = Math.min(99.6, 92.0 + (payments / 50000) * 7.5).toFixed(1);
    
    // Payback period in months (estimating typical advisory/implementation investment of ~€180k-€280k)
    const estimatedProjectCost = 210000;
    const paybackMonths = Math.max(2.4, ((estimatedProjectCost / totalAnnualSavings) * 12)).toFixed(1);

    // Format into results card
    const formattedSavings = totalAnnualSavings >= 1000000 
      ? `€${(totalAnnualSavings / 1000000).toFixed(2)}M` 
      : `€${Math.round(totalAnnualSavings / 1000)}k`;

    document.getElementById('calcResultSavings').innerText = formattedSavings;
    document.getElementById('calcResultHours').innerText = `${hoursSavedPerMonth} hrs/mo`;
    document.getElementById('calcResultStp').innerText = `${stpRate}%`;
    document.getElementById('calcResultPayback').innerText = `${paybackMonths} Months`;
  }

  [turnoverSlider, accountsSlider, paymentsSlider, fxSlider].forEach(slider => {
    slider.addEventListener('input', recalculateROI);
  });

  recalculateROI();
}

/* ==========================================================================
   5. S/4HANA Treasury Readiness & Diagnostic Tool
   ========================================================================== */
function initDiagnostic() {
  const erpSelect = document.getElementById('diagErp');
  const bankSelect = document.getElementById('diagBank');
  const riskSelect = document.getElementById('diagRisk');
  const hedgeSelect = document.getElementById('diagHedge');

  if (!erpSelect) return;

  function runDiagnostic() {
    let score = 20;

    // Weight 1: ERP
    const erp = erpSelect.value;
    if (erp === 's4_cloud') score += 25;
    else if (erp === 's4_onprem') score += 20;
    else if (erp === 'ecc') score += 10;
    else score += 5;

    // Weight 2: Banking
    const bank = bankSelect.value;
    if (bank === 'swift_mbc') score += 25;
    else if (bank === 'h2h') score += 18;
    else if (bank === 'portals') score += 8;
    else score += 4;

    // Weight 3: Risk & MTM
    const risk = riskSelect.value;
    if (risk === 'automated') score += 25;
    else if (risk === 'basic_sap') score += 14;
    else score += 5;

    // Weight 4: Hedge Accounting
    const hedge = hedgeSelect.value;
    if (hedge === 'ifrs9') score += 25;
    else if (hedge === 'spreadsheet') score += 6;
    else score += 10;

    score = Math.min(100, Math.round(score));

    // Gauge circle & score
    const gauge = document.getElementById('diagGaugeCircle');
    const scoreNum = document.getElementById('diagScoreNumber');
    const recTitle = document.getElementById('diagRecTitle');
    const recDesc = document.getElementById('diagRecDesc');

    if (scoreNum) scoreNum.innerText = `${score}%`;
    if (gauge) {
      gauge.style.background = `conic-gradient(#10b981 ${score}%, var(--bg-tertiary) 0)`;
    }

    if (score < 50) {
      recTitle.innerText = 'High Spreadsheet Risk & Fragmented Banking Detected';
      recDesc.innerText = 'Immediate opportunity to eliminate manual risk with an SAP Treasury Gap Analysis & Multi-Bank Connectivity (MBC / BCM) roadmap.';
    } else if (score < 80) {
      recTitle.innerText = 'Moderate Maturity: Ready for S/4HANA STP & Exposure 2.0';
      recDesc.innerText = 'Your core ERP is established. Next step is centralizing the Payment Factory and implementing automated IFRS 9 Hedge Management.';
    } else {
      recTitle.innerText = 'Advanced Foundation: Positioned for Real-Time Predictive Treasury';
      recDesc.innerText = 'Deploy advanced Cash Flow Analyzers, Refinitiv real-time automated feed syncing, and Machine Learning cash forecasting.';
    }
  }

  [erpSelect, bankSelect, riskSelect, hedgeSelect].forEach(sel => {
    sel.addEventListener('change', runDiagnostic);
  });

  runDiagnostic();
}

/* ==========================================================================
   6. Visual STP Architecture Node Inspector
   ========================================================================== */
const nodeDetailsData = {
  '360t': {
    title: '360T & FXall Trading Portal Direct Integration',
    desc: 'Seamless bilateral trade capture linking external multi-bank portals directly into SAP S/4HANA Transaction Manager. Eliminates re-keying errors and enforces instantaneous front-office deal verification.',
    tech: 'BAPI / Web Services',
    protocol: 'MT300 / FIX Protocol'
  },
  'refinitiv': {
    title: 'Refinitiv & Bloomberg Real-Time Market Data Feeds',
    desc: 'Automated ingestion of FX spot rates, swap curves, volatility matrices, and interest rate benchmark curves into SAP S/4HANA for dynamic valuation and risk modeling without manual input.',
    tech: 'Datafeed Engine',
    protocol: 'RFC / HTTPS API'
  },
  'mra': {
    title: 'Market Risk Analyzer (MRA) & Net Present Value (NPV)',
    desc: 'Multi-factor risk analysis including Net Present Value (NPV), Value-at-Risk (VaR), sensitivity analytics (Delta, Gamma, Vega), and regulatory stress testing for complex derivatives.',
    tech: 'S/4HANA Financials',
    protocol: 'Quantitative Valuation'
  },
  'exposure': {
    title: 'Exposure Management 2.0 & IFRS 9 / ASC 815 Hedge Engine',
    desc: 'Automated generation of raw and designated FX exposures directly from purchase orders, sales contracts, and balance sheet positions, with automatic hedge documentation and OCI postings.',
    tech: 'Hedge Management Cockpit',
    protocol: 'IFRS 9 / US GAAP'
  },
  'cra': {
    title: 'Credit Risk Analyzer & Dynamic Multi-Tier Limits',
    desc: 'Online counterparty settlement risk monitoring and real-time limit checks during front-office transaction booking. Prevents counterparty concentration breaches across global subsidiaries.',
    tech: 'Limit Management Engine',
    protocol: 'Real-Time Check'
  },
  'trm': {
    title: 'SAP S/4HANA Transaction Manager (TRM Core)',
    desc: 'The central transaction engine covering Money Market, Forex, Securities, Debt & Facility Management with automated straight-through accounting postings to General Ledger.',
    tech: 'S/4HANA TRM',
    protocol: 'Subledger to GL'
  },
  'clm': {
    title: 'Cash & Liquidity Management (CLM) & BAM',
    desc: 'Single pane of glass for real-time global cash visibility, intraday bank account balances, automated cash pooling, and Bank Account Management (BAM) with approval governance.',
    tech: 'Cash Flow Analyzer',
    protocol: 'Fiori 2023 / S/4HANA'
  },
  'bcm': {
    title: 'Bank Communication Management (BCM) & Payment Factory',
    desc: 'Centralized enterprise payment factory with multi-tier digital signatory approvals, automated batching, and real-time status tracking via SWIFT gpi.',
    tech: 'Payment Factory',
    protocol: 'ISO 20022 XML (pain.001)'
  },
  'mbc': {
    title: 'SAP Multi-Bank Connectivity (MBC) Cloud Gateway',
    desc: 'Zero-hardware cloud integration layer connecting SAP S/4HANA directly to SWIFT Alliance, EBICS, and Tier-1 bank APIs for secure, encrypted financial messaging.',
    tech: 'SAP BTP / MBC Gateway',
    protocol: 'SWIFT MT101 / MT940 / CAMT'
  },
  'swift': {
    title: 'SWIFT Alliance & Finastra Interface Integration',
    desc: 'End-to-end messaging pipeline for confirmations and payments: MT300 (FX), MT320 (Money Market), MT940 / CAMT.053 (electronic bank statement automated processing).',
    tech: 'Finastra / SWIFT',
    protocol: 'ISO 20022 / FIN MT'
  }
};

function initStpInspector() {
  const cards = document.querySelectorAll('.stp-node-card');
  const titleEl = document.getElementById('inspectTitle');
  const descEl = document.getElementById('inspectDesc');
  const techEl = document.getElementById('inspectTech');
  const protoEl = document.getElementById('inspectProtocol');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', function () {
      cards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const key = this.getAttribute('data-node');
      const data = nodeDetailsData[key];
      if (data && titleEl && descEl) {
        titleEl.innerText = data.title;
        descEl.innerText = data.desc;
        if (techEl) techEl.innerText = data.tech;
        if (protoEl) protoEl.innerText = data.protocol;
      }
    });
  });
}

/* ==========================================================================
   7. Services Category Filter
   ========================================================================== */
function initServicesFilter() {
  const buttons = document.querySelectorAll('.services-filter-nav .filter-btn');
  const cards = document.querySelectorAll('.service-card');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Career Journey Timeline Filter
   ========================================================================== */
function initTimelineFilter() {
  const buttons = document.querySelectorAll('.career-filter-btn');
  const items = document.querySelectorAll('.timeline-item');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-career-cat') || '';
        if (filter === 'all' || cat.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. Modals: Resume Preview & Project Deep-Dive Case Studies
   ========================================================================== */
const projectCaseStudies = {
  'ucb-pharma': {
    title: 'UCB Pharma (Belgium) | Bluefield S/4HANA Treasury Implementation',
    client: 'UCB Pharma | Period: August 2025 – Present | Location: Brussels, Belgium',
    overview: 'Spearheading the end-to-end architecture and implementation of Treasury modules (Money Market, Securities, FX, Derivatives, Credit Risk Analyzer, Limit Management, and Market Risk Analyzer).',
    highlights: [
      'Led treasury data migration using SNP tool with a rigorous table-to-table migration approach, ensuring 100% financial reconciliation.',
      'Directed Finastra integration for SWIFT messaging (MT300 for FX, MT320 for Money Market deals).',
      'Orchestrated System Integration Testing (SIT), cutover strategy, and front/back-office business user enablement.'
    ],
    tech: 'SAP S/4HANA Private Cloud, SNP Migration Tool, Finastra, SWIFT, Market Risk Analyzer, Credit Risk Analyzer'
  },
  'deloitte': {
    title: 'Deloitte India | Associate Director – SAP Treasury & FSCM Leader',
    client: 'Deloitte India | Period: Oct 2023 – Aug 2025 | South Region Practice Head',
    overview: 'Led the South Region SAP Treasury & FSCM Practice, growing an elite team of 30+ consultants and generating ₹25 Cr in Net Service Revenue (NSR) over 15 months.',
    highlights: [
      'Delivered Dr. Reddy\'s Laboratories Treasury transformation with automated Refinitiv FX/interest rate feeds.',
      'Architected Exposure 2.0 and Hedge Management engine with full accounting integration for Nestlé Health Science.',
      'Established the strategic Treasury POD for Sony Account to optimize offshore delivery costs.'
    ],
    tech: 'SAP S/4HANA 2020/2022, Exposure Management 2.0, Refinitiv Integration, Practice Leadership, Pre-Sales'
  },
  'sony': {
    title: 'Sony India Software Center | S/4HANA Upgrade & Cash Management',
    client: 'Sony Corporation | Deloitte | Version Upgrade 1709 to 2020',
    overview: 'Led version upgrade simplification checks, sandbox trials, and full rollout of Treasury, Cash Management, and Bank Communication Management (BCM) for new global entities.',
    highlights: [
      'Prepared Application Design Documents (ADD) and Detailed Design Documents (DDD).',
      'Implemented automated multi-tier BCM payment approval matrix.',
      'Conducted stress, regression, and UAT sign-offs with zero critical post-go-live incidents.'
    ],
    tech: 'SAP S/4HANA 2020, BCM, Cash Management, Upgrade Simplification Item Check'
  },
  'mercuria': {
    title: 'Mercuria Energy Trading | S/4HANA 1809 Transformation & BAM',
    client: 'Mercuria Energy Trading | DXC Technology | Feb 2018 – Dec 2020',
    overview: 'Designed and implemented TRM, Cash & Liquidity Management, and BCM modules across North America and Europe trading hubs.',
    highlights: [
      'Executed Software Update Manager (SUM) conversion from ECC to S/4HANA 1809.',
      'Led Customer/Vendor Synchronization (CVI) with Business Partners (BP) and Bank Account Management (BAM).',
      'Activated SAP Fiori Apps for Treasury & Cash Management and tested custom CDS views in BW HANA.'
    ],
    tech: 'SAP S/4HANA 1809, SUM Conversion, CVI, BAM, SAP Fiori, BW HANA CDS Views'
  },
  'capitaland': {
    title: 'CapitaLand Singapore | Greenfield S/4HANA Treasury Implementation',
    client: 'CapitaLand Singapore | PwC Singapore | May 2023 – Oct 2023',
    overview: 'Delivered greenfield Treasury architecture covering Money Market, Securities, FX, Derivatives, Credit Risk Analyzer, and Limit Management for Singapore\'s premier real estate group.',
    highlights: [
      'Formulated end-to-end data migration strategy and cutover plan ensuring zero business disruption.',
      'Trained treasury front-office and back-office teams on settlement, accounting postings, and month-end close.'
    ],
    tech: 'SAP S/4HANA Greenfield, TRM, MRA, CRA, PwC Singapore Advisory'
  }
};

function initModals() {
  const resumeModal = document.getElementById('resumeModal');
  const projectModal = document.getElementById('projectModal');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  // Open Resume Modal
  document.querySelectorAll('[data-open-resume]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open Project Modal
  document.querySelectorAll('[data-project-key]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const key = this.getAttribute('data-project-key');
      const data = projectCaseStudies[key];

      if (data && projectModal) {
        document.getElementById('modalProjectTitle').innerText = data.title;
        document.getElementById('modalProjectClient').innerText = data.client;
        document.getElementById('modalProjectOverview').innerText = data.overview;
        
        const highlightsEl = document.getElementById('modalProjectHighlights');
        highlightsEl.innerHTML = data.highlights.map(h => `<li><i class="fa-solid fa-check-circle" style="color:var(--green-vibrant);margin-right:8px;"></i>${h}</li>`).join('');

        document.getElementById('modalProjectTech').innerText = data.tech;

        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modals
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (e.target === this || this.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   10. Executive Contact & Consultation Booking Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultationBookingForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const org = document.getElementById('contactOrg').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value;

    const emailSubject = encodeURIComponent(`Treasury Advisory Request - ${org} (${name})`);
    const emailBody = encodeURIComponent(
      `Hello Sudhakar,\n\nI would like to schedule an advisory consultation regarding NIIXON Treasury Services.\n\nOrganization: ${org}\nContact: ${name}\nEmail: ${email}\nPhone: ${phone}\nService of Interest: ${service}\n\nProject Brief:\n${message}\n\nBest regards,\n${name}`
    );

    // Direct mailto trigger
    const mailtoUrl = `mailto:sudhakarvidhhu@gmail.com,info@niixon.co.in?subject=${emailSubject}&body=${emailBody}`;

    feedback.style.display = 'block';
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
      <strong>Inquiry Prepared Successfully!</strong><br>
      Thank you, ${name}. Your consultation request has been drafted. 
      <div style="margin-top:10px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <a href="${mailtoUrl}" class="btn-primary" style="padding:8px 16px; font-size:12px;">
          <i class="fa-solid fa-envelope"></i> Send via Email Client
        </a>
        <a href="https://wa.me/919902488856?text=${emailBody}" target="_blank" class="btn-accent" style="padding:8px 16px; font-size:12px;">
          <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
        </a>
      </div>
    `;

    // Attempt mailto
    window.location.href = mailtoUrl;
  });
}

/* ==========================================================================
   11. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

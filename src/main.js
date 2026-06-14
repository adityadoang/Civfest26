import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  // --- REGISTRATION PHASE LOGIC ---
  const config = {
    phases: [
      { name: "Pre-Registration", start: new Date(0), end: new Date('2026-05-18T00:00:00+07:00') },
      { name: "Early Bird Registration", start: new Date('2026-05-18T00:00:00+07:00'), end: new Date('2026-05-22T23:59:59+07:00') },
      { name: "Wave 1 Registration", start: new Date('2026-05-23T00:00:00+07:00'), end: new Date('2026-05-24T23:59:59+07:00') },
      { name: "Wave 2 Registration", start: new Date('2026-05-25T00:00:00+07:00'), end: new Date('2026-06-14T23:59:59+07:00') },
      { name: "Extended Registration", start: new Date('2026-06-15T09:00:00+07:00'), end: new Date('2026-06-17T23:59:59+07:00') }
    ]
  };

  function getPhase() {
    const now = new Date();
    if (now < config.phases[0].end) return { status: 'PRE', targetDate: config.phases[0].end, label: 'Opens In' };
    
    for (let i = 1; i <= 4; i++) {
      if (now >= config.phases[i].start && now <= config.phases[i].end) {
        if (i === 1) return { status: 'OPEN_EB', label: 'Early Bird Close In', targetDate: config.phases[1].end };
        if (i === 2) return { status: 'OPEN_W1', label: 'Wave 1 Close In', targetDate: config.phases[2].end };
        if (i === 3) return { status: 'OPEN_W2', label: 'Wave 2 Close In', targetDate: config.phases[3].end };
        if (i === 4) return { status: 'OPEN_EXT', label: 'Extend Close In', targetDate: config.phases[4].end };
      }
    }
    return { status: 'CLOSED', label: 'Registration Closed', targetDate: null };
  }

  function updateTimerUI(badgeEl, gridEl) {
    const currentPhase = getPhase();
    
    if (currentPhase.status === 'CLOSED') {
      badgeEl.textContent = 'Registration Closed';
      badgeEl.style.color = '#ef4444';
      badgeEl.style.borderColor = '#ef4444';
      gridEl.innerHTML = '';
      return;
    }
    
    const dict = { 'PRE': 'Registration Opens In:', 'OPEN_EB': 'Early Bird Closes In:', 'OPEN_W1': 'Wave 1 Closes In:', 'OPEN_W2': 'Wave 2 Closes In:', 'OPEN_EXT': 'Extension Period Closes In:' };
    badgeEl.textContent = dict[currentPhase.status];
    
    const target = currentPhase.targetDate.getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff < 0) return; 

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    gridEl.innerHTML = `
      <div class="countdown-box"><div class="number">${days}</div><div class="label">Days</div></div>
      <div class="countdown-box"><div class="number">${String(hours).padStart(2, '0')}</div><div class="label">Hours</div></div>
      <div class="countdown-box"><div class="number">${String(minutes).padStart(2, '0')}</div><div class="label">Mins</div></div>
      <div class="countdown-box"><div class="number">${String(seconds).padStart(2, '0')}</div><div class="label">Secs</div></div>
    `;
  }

  function updateRegistrationButtons() {
      const compLinks = document.querySelectorAll('#comp-detail-view .btn-primary');
      const currentPhase = getPhase();
      
      compLinks.forEach(link => {
         // Exclude links that aren't for competition registration if any leaked in (in this case all btn-primary in modal are comp registers)
         
         if (!link.dataset.targetLink) {
             link.dataset.targetLink = link.href;
         }

         if (currentPhase.status === 'PRE') {
             link.textContent = 'Opens May 18th';
             link.href = 'javascript:void(0)';
             link.removeAttribute('target');
             link.style.opacity = '0.5';
             link.style.cursor = 'not-allowed';
         } else if (currentPhase.status === 'CLOSED') {
             link.textContent = 'Registration Closed';
             link.href = 'javascript:void(0)';
             link.removeAttribute('target');
             link.style.opacity = '0.5';
             link.style.cursor = 'not-allowed';
         } else {
             const waveText = currentPhase.status === 'OPEN_EB' ? '(Early Bird)' : (currentPhase.status === 'OPEN_W1' ? '(Wave 1)' : (currentPhase.status === 'OPEN_W2' ? '(Wave 2)' : '(Extended)'));
             link.textContent = 'Register Now ' + waveText;
             link.href = link.dataset.targetLink;
             link.setAttribute('target', '_blank');
             link.style.opacity = '1';
             link.style.cursor = 'pointer';
         }
      });
  }
  function updatePricesUI() {
    const now = new Date();
    const earlyBirdStart = new Date('2026-05-18T00:00:00+07:00');
    const earlyBirdEnd = new Date('2026-05-22T23:59:59+07:00');
    const isEarlyBird = now >= earlyBirdStart && now <= earlyBirdEnd;
    
    const priceElements = document.querySelectorAll('.price-display');
    priceElements.forEach(el => {
      const basePrice = parseInt(el.getAttribute('data-base-price'), 10);
      if (isNaN(basePrice)) return;
      
      const discount = isEarlyBird ? 15000 : 0;
      const finalPrice = basePrice - discount;
      
      const formattedPrice = finalPrice.toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      el.textContent = `Rp. ${formattedPrice} / team`;
    });
  }

  const badgeEl = document.getElementById('phase-badge');
  const gridEl = document.getElementById('countdown-grid');
  
  if (badgeEl && gridEl) {
      setInterval(() => {
          updateTimerUI(badgeEl, gridEl);
          updateRegistrationButtons();
          updatePricesUI();
      }, 1000);
      updateTimerUI(badgeEl, gridEl);
  } else {
      setInterval(() => {
          updateRegistrationButtons();
          updatePricesUI();
      }, 1000);
  }
  updateRegistrationButtons();
  updatePricesUI();
  
  // Theme Toggler
  const themeToggles = document.querySelectorAll('.theme-btn');
  
  function updateThemeButton(theme) {
    themeToggles.forEach(btn => {
      btn.innerHTML = theme === 'light' ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>` : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    });
  }

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeButton('light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeButton('dark');
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButton(newTheme);
      window.dispatchEvent(new Event('themechanged'));
    });
  });

  // Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Trigger once on load
  handleScroll();

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      // Update toggle icon
      if (navLinks.classList.contains('show')) {
        menuToggle.innerHTML = '✕';
      } else {
        menuToggle.innerHTML = '☰';
      }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('show');
        menuToggle.innerHTML = '☰';
      }
    });
  }

  // Intersection Observer for Smooth Fade Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: Stop observing once animated in
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-fade-up');
  animatedElements.forEach(el => observer.observe(el));

  // Determine active link based on current page path
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(link => {
    // Basic logic to add 'active' class
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
      link.classList.add('active');
    }
  });

  // FOUC Fix & Page Transition
  document.body.classList.add('js-loaded');
  setTimeout(() => {
    document.body.classList.add('page-transition');
    setTimeout(() => {
      document.body.classList.remove('page-transition');
    }, 600); // Remove class after animation to release CSS containing blocks
  }, 10);

  // Intercept links for fade out
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Periksa apakah ini link internal dan bukan anchor link ke ID file yang sama
      const isInternal = href.startsWith('/') || href.startsWith('.') || (link.hostname === window.location.hostname && !href.startsWith('#'));
      const target = link.getAttribute('target');
      
      if (isInternal && !href.startsWith('#') && target !== '_blank' && !link.classList.contains('no-transition')) {
        e.preventDefault();
        document.body.classList.add('page-leave');
        setTimeout(() => {
          window.location.href = link.href;
        }, 400); // Wait for fadeOut animation
      }
    });
  });

  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  const modals = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow following links if they don't have preventDefault requirement, but we do for modal buttons
      const isALink = btn.tagName.toLowerCase() === 'a';
      if (isALink && (btn.getAttribute('href') === '#' || btn.getAttribute('href').startsWith('#'))) {
        e.preventDefault();
      } else if (isALink) {
         e.preventDefault(); // if it has data-open-modal, it shouldn't navigate
      }
      
      const targetId = btn.getAttribute('data-open-modal');
      const compTarget = btn.getAttribute('data-open-comp');
      const modal = document.getElementById(targetId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        if (targetId === 'modal-competitions' || targetId === 'modal-register-comps') {
          // If we are sharing the same id or injecting it, fetch references relative to document or modal
          const compListView = modal.querySelector('#comps-list') || document.getElementById('comps-list');
          const compDetailView = modal.querySelector('#comp-detail-view') || document.getElementById('comp-detail-view');
          const allCompDetails = modal.querySelectorAll('.comp-detail-content');
          
          if (compListView && compDetailView) {
            if (compTarget) {
              compListView.style.display = 'none';
              compDetailView.style.display = 'block';
              if(allCompDetails.length === 0) {
                 const documentDetails = document.querySelectorAll('.comp-detail-content');
                 documentDetails.forEach(detail => detail.style.display = 'none');
              } else {
                 allCompDetails.forEach(detail => detail.style.display = 'none');
              }
              const targetDetail = modal.querySelector(`#detail-${compTarget}`) || document.getElementById(`detail-${compTarget}`);
              if (targetDetail) {
                targetDetail.style.display = 'block';
              }
            } else {
              compListView.style.display = 'block';
              compDetailView.style.display = 'none';
            }
          }
        }
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal on click outside
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Nested Competitions Modal Logic
  const compListBlocks = document.querySelectorAll('.comp-item-card');
  const compListView = document.getElementById('comps-list');
  const compDetailView = document.getElementById('comp-detail-view');
  const compBackBtn = document.getElementById('comp-back-btn');
  const allCompDetails = document.querySelectorAll('.comp-detail-content');

  if (compListView && compDetailView) {
    compListBlocks.forEach(card => {
      card.addEventListener('click', () => {
        const compId = card.getAttribute('data-comp');
        
        compListView.style.display = 'none';
        compDetailView.style.display = 'block';
        
        allCompDetails.forEach(detail => detail.style.display = 'none');
        const targetDetail = document.getElementById(`detail-${compId}`);
        if (targetDetail) {
          targetDetail.style.display = 'block';
        }
      });
    });

    if (compBackBtn) {
      compBackBtn.addEventListener('click', () => {
        compDetailView.style.display = 'none';
        compListView.style.display = 'block';
      });
    }

    const modalCompetitionsCloseBtn = document.getElementById('close-modal-competitions');
    if (modalCompetitionsCloseBtn) {
      modalCompetitionsCloseBtn.addEventListener('click', () => {
         setTimeout(() => {
           compDetailView.style.display = 'none';
           compListView.style.display = 'block';
         }, 400); 
      });
    }
  }

  // Past Events Gallery Logic
  const galleries = document.querySelectorAll('.timeline-gallery');
  let lightboxModal = document.querySelector('.lightbox-modal');
  
  if (galleries.length > 0 && !lightboxModal) {
    lightboxModal = document.createElement('div');
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img class="lightbox-img" src="" alt="Enlarged view">
      </div>
    `;
    document.body.appendChild(lightboxModal);

    const closeBtn = lightboxModal.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  galleries.forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll('.gallery-img'));
    
    if (lightboxModal) {
      const lightboxImg = lightboxModal.querySelector('.lightbox-img');
      images.forEach(img => {
        img.addEventListener('click', () => {
          const bg = img.style.backgroundImage || img.style.background;
          const match = bg.match(/url\(['"]?(.*?)['"]?\)/i);
          if (match && match[1]) {
            lightboxImg.src = match[1];
            lightboxModal.classList.add('active');
          }
        });
      });
    }

    if (images.length > 2) {
      gallery.classList.add('is-carousel');
      
      const inner = document.createElement('div');
      inner.className = 'carousel-inner';
      images.forEach(img => inner.appendChild(img));
      gallery.appendChild(inner);

      let currentIndex = 0;
      setInterval(() => {
        currentIndex++;
        // If we reach the end, knowing 2 photos are shown at a time
        if (currentIndex > images.length - 2) {
          currentIndex = 0;
        }
        inner.style.transform = `translateX(calc(-${currentIndex * 50}% - ${currentIndex * 0.5}rem))`;
      }, 3500);
    }
  });

  // Hero Background Animations
  const cv = document.getElementById('tri');
  if (cv) {
    const cx = cv.getContext('2d');
    const darkPalette = [
      ['#0f2e12', '#0a1c0b'], ['#152e14', '#0c2010'], ['#1a4020', '#0e2812'],
      ['#0d1f0e', '#091508'], ['#1e4a22', '#132e15'], ['#112614', '#0a1b0c'],
      ['#163318', '#0f2511'], ['#081208', '#060e06'], ['#1c4420', '#122e14'],
      ['#244f27', '#163519'],
    ];
    const lightPalette = [
      ['#eaf3eb', '#e0ece2'], ['#daefdd', '#d1e6d4'], ['#cee7d1', '#c4dec7'],
      ['#f0f7f1', '#e8efe9'], ['#c1e5c5', '#b6dbba'], ['#e6f4e8', '#dcf0de'],
      ['#ddefdf', '#d4e8d6'], ['#f5faf6', '#ecf3ed'], ['#cae8cd', '#bedec1'],
      ['#b5dfb8', '#abdbaf'],
    ];

    function getPalette() {
      return document.documentElement.getAttribute('data-theme') === 'light' ? lightPalette : darkPalette;
    }

    function hash(r, c, s, palette) { return Math.abs((r * 73856093 ^ c * 19349663 ^ s * 83492791) % palette.length); }
    
    function drawTri() {
      const palette = getPalette();
      const parent = cv.parentElement;
      if (!parent) return;
      cv.width = parent.clientWidth; cv.height = parent.clientHeight;
      cx.clearRect(0, 0, cv.width, cv.height);
      const S = 60;
      const cols = Math.ceil(cv.width / S) + 1;
      const rows = Math.ceil(cv.height / S) + 1;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * S, y = r * S;
          const p = palette[hash(r, c, 0, palette)];
          const p2 = palette[hash(r, c, 1, palette)];
          cx.fillStyle = p[0]; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + S, y); cx.lineTo(x, y + S); cx.closePath(); cx.fill();
          cx.fillStyle = p[1]; cx.beginPath(); cx.moveTo(x + S, y); cx.lineTo(x + S, y + S); cx.lineTo(x, y + S); cx.closePath(); cx.fill();
          cx.strokeStyle = isLight ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,.3)'; 
          cx.lineWidth = .5; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + S, y + S); cx.stroke();
        }
      }
      cx.strokeStyle = isLight ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,.25)'; cx.lineWidth = .4;
      for (let r = 0; r <= rows; r++) { cx.beginPath(); cx.moveTo(0, r * S); cx.lineTo(cv.width, r * S); cx.stroke(); }
      for (let c = 0; c <= cols; c++) { cx.beginPath(); cx.moveTo(c * S, 0); cx.lineTo(c * S, cv.height); cx.stroke(); }
    }
    
    drawTri();
    window.addEventListener('resize', drawTri);
    window.addEventListener('themechanged', drawTri);
    // Only run shimmer on non-mobile to prevent flickering
    const isMobile = () => window.innerWidth <= 768 || ('ontouchstart' in window);
    if (!isMobile()) {
      let t = 0;
      (function shimmer() {
        t += .006;
        cv.style.opacity = (0.88 + Math.sin(t) * 0.05).toString();
        requestAnimationFrame(shimmer);
      })();
    }
  }

  const pc = document.getElementById('ptcl');
  if (pc) {
    const isMobileDevice = window.innerWidth <= 768 || ('ontouchstart' in window);
    const lc = ['#2d7a1f80', '#4caf2a60', '#86be2750', '#11481c70'];
    function mkLeaf() {
      const el = document.createElement('div'); el.className = 'lp';
      const sz = 7 + Math.random() * 14;
      const col = lc[Math.floor(Math.random() * lc.length)];
      el.innerHTML = `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${col}"><path d="M12 21C12 21 3 16 3 9.5C3 6 5.8 3 9 3C10.3 3 11.4 3.6 12 4C12.6 3.6 13.7 3 15 3C18.2 3 21 6 21 9.5C21 16 12 21 12 21Z"/></svg>`;
      const l = Math.random() * 100, dur = 10 + Math.random() * 13, dly = Math.random() * 9;
      el.style.cssText = `left:${l}%;animation-duration:${dur}s;animation-delay:${dly}s`;
      pc.appendChild(el);
      setTimeout(() => el.remove(), (dur + dly) * 1000);
    }
    // Fewer particles on mobile to reduce jank
    const initialCount = isMobileDevice ? 4 : 12;
    const intervalMs = isMobileDevice ? 4000 : 1900;
    for (let i = 0; i < initialCount; i++) mkLeaf();
    setInterval(mkLeaf, intervalMs);
  }

  // Parallax on about logos — desktop only (no mouse on touch devices)
  const hlLogos = document.querySelectorAll('.hl-container .hl');
  const isTouch = ('ontouchstart' in window) || window.innerWidth <= 768;
  if (hlLogos.length > 0 && !isTouch) {
    document.addEventListener('mousemove', e => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 20;
      const dy = (e.clientY / window.innerHeight - 0.5) * 20;
      hlLogos.forEach(logo => {
        logo.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    });
  }
});

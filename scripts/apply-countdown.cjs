const fs = require('fs');

/* 1. APPEND CSS */
const cssPath = 'c:/belajar/civest/src/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('/* Countdown Timer CSS */')) {
  css += `
/* Countdown Timer CSS */
.registration-status-container {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  margin-top: 3rem;
}
.phase-badge {
  display: inline-block; padding: 0.5rem 1.25rem; font-family: var(--font-heading);
  font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px;
  border-radius: 4px; border: 1px solid var(--color-border);
  background: var(--bg-overlay); color: var(--color-accent); margin-bottom: 1.5rem;
}
.countdown-grid {
  display: flex; gap: 1rem; align-items: center; justify-content: center;
  flex-wrap: wrap; text-align: center;
}
.countdown-box {
  background: var(--color-bg-card); border: 1px solid var(--color-border);
  padding: 1.5rem; border-radius: 8px; width: 100px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.countdown-box .number {
  font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900;
  color: var(--color-text-main); line-height: 1; margin-bottom: 0.5rem;
}
.countdown-box .label {
  font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;
  letter-spacing: 1px; font-weight: 600;
}
`;
  fs.writeFileSync(cssPath, css);
}

/* 2. UPDATE REGISTER.HTML */
const regPath = 'c:/belajar/civest/register.html';
let regHtml = fs.readFileSync(regPath, 'utf8');

const targetHeader = `<section class="page-header animate-fade-up">
        <div class="container">
          <h1>Join the Competition</h1>
          <p>Take the first step towards building resilient infrastructure. Secure your spot now.</p>
        </div>
      </section>`;

const newHeader = `<section class="page-header animate-fade-up">
        <div class="container">
          <h1>Join the Competition</h1>
          <p>Take the first step towards building resilient infrastructure. Secure your spot now.</p>
          
          <div class="registration-status-container" id="reg-status-section">
            <span class="phase-badge" id="phase-badge">Checking Status...</span>
            <div class="countdown-grid" id="countdown-grid"></div>
          </div>
        </div>
      </section>`;

regHtml = regHtml.replace(targetHeader, newHeader);
fs.writeFileSync(regPath, regHtml);

/* 3. INJECT JS INTO MAIN.JS */
const jsPath = 'c:/belajar/civest/src/main.js';
let mainJs = fs.readFileSync(jsPath, 'utf8');

if (!mainJs.includes('// --- REGISTRATION PHASE LOGIC ---')) {
  const logic = `
  // --- REGISTRATION PHASE LOGIC ---
  const config = {
    phases: [
      { name: "Pre-Registration", start: new Date(0), end: new Date('2026-05-18T00:00:00+07:00') },
      { name: "Wave 1 Registration", start: new Date('2026-05-18T00:00:00+07:00'), end: new Date('2026-05-24T23:59:59+07:00') },
      { name: "Wave 2 Registration", start: new Date('2026-05-25T00:00:00+07:00'), end: new Date('2026-06-10T23:59:59+07:00') },
      { name: "Extended Registration", start: new Date('2026-06-11T00:00:00+07:00'), end: new Date('2026-06-14T23:59:59+07:00') }
    ]
  };

  function getPhase() {
    const now = new Date();
    if (now < config.phases[0].end) return { status: 'PRE', targetDate: config.phases[0].end, label: 'Opens In' };
    
    for (let i = 1; i <= 3; i++) {
      if (now >= config.phases[i].start && now <= config.phases[i].end) {
        if (i === 1) return { status: 'OPEN_W1', label: 'Wave 1 Close In', targetDate: config.phases[1].end };
        if (i === 2) return { status: 'OPEN_W2', label: 'Wave 2 Close In', targetDate: config.phases[2].end };
        if (i === 3) return { status: 'OPEN_EXT', label: 'Extend Close In', targetDate: config.phases[3].end };
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
    
    const dict = { 'PRE': 'Registration Opens In:', 'OPEN_W1': 'Wave 1 Closes In:', 'OPEN_W2': 'Wave 2 Closes In:', 'OPEN_EXT': 'Extension Period Closes In:' };
    badgeEl.textContent = dict[currentPhase.status];
    
    const target = currentPhase.targetDate.getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff < 0) return; 

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    gridEl.innerHTML = \`
      <div class="countdown-box"><div class="number">\${days}</div><div class="label">Days</div></div>
      <div class="countdown-box"><div class="number">\${String(hours).padStart(2, '0')}</div><div class="label">Hours</div></div>
      <div class="countdown-box"><div class="number">\${String(minutes).padStart(2, '0')}</div><div class="label">Mins</div></div>
      <div class="countdown-box"><div class="number">\${String(seconds).padStart(2, '0')}</div><div class="label">Secs</div></div>
    \`;
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
             const waveText = currentPhase.status === 'OPEN_W1' ? '(Wave 1)' : (currentPhase.status === 'OPEN_W2' ? '(Wave 2)' : '(Extended)');
             link.textContent = 'Register Now ' + waveText;
             link.href = link.dataset.targetLink;
             link.setAttribute('target', '_blank');
             link.style.opacity = '1';
             link.style.cursor = 'pointer';
         }
      });
  }

  const badgeEl = document.getElementById('phase-badge');
  const gridEl = document.getElementById('countdown-grid');
  
  if (badgeEl && gridEl) {
      setInterval(() => {
          updateTimerUI(badgeEl, gridEl);
          updateRegistrationButtons();
      }, 1000);
      updateTimerUI(badgeEl, gridEl);
  } else {
      setInterval(updateRegistrationButtons, 1000);
  }
  updateRegistrationButtons();
  `;
  mainJs = mainJs.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', () => {\n' + logic);
  fs.writeFileSync(jsPath, mainJs);
}

console.log('Countdown System Deployed.');

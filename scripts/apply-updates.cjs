const fs = require('fs');

const svgSun = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const svgMoon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const newLogo = `<a href="/index.html" class="logo" style="display: flex; flex-direction: column; line-height: 1.2; text-decoration: none;">
          <span style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0;">CIVFEST <span style="color: var(--color-primary);">2026</span></span>
          <span style="font-size: 0.75rem; font-weight: 500; color: var(--color-text-muted); letter-spacing: 0;">Civil Engineering Festival</span>
        </a>`;

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');

  // Replace Logo
  content = content.replace(/<a href="\/index\.html" class="logo">.*?<\/a>/s, newLogo);

  // Replace Theme Emojis in HTML
  content = content.replace(/<button class="theme-btn"[^>]*>☀️<\/button>/g, `<button class="theme-btn" aria-label="Toggle Theme">${svgSun}</button>`);
  
  if (file === 'events.html') {
    content = content.replace('<div class="glass-grid">', '<div class="glass-grid-4">');
  }

  fs.writeFileSync('c:/belajar/civest/' + file, content);
}

// Update main.js
let mainJs = fs.readFileSync('c:/belajar/civest/src/main.js', 'utf8');
mainJs = mainJs.replace(/btn\.textContent = theme === 'light' \? '🌙' \: '☀️';/g, 
  `btn.innerHTML = theme === 'light' ? \`${svgMoon}\` : \`${svgSun}\`;`
);
mainJs = mainJs.replace(/btn\.textContent = '☀️'/g, `btn.innerHTML = \`${svgSun}\``);
mainJs = mainJs.replace(/btn\.textContent = '🌙'/g, `btn.innerHTML = \`${svgMoon}\``);

fs.writeFileSync('c:/belajar/civest/src/main.js', mainJs);

console.log('Applied updates successfully.');

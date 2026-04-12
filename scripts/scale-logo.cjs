const fs = require('fs');

const currentLogoBlock = `<a href="/index.html" class="logo" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
          <img src="/logo.png" alt="Civfest" style="height: 40px; width: auto; filter: drop-shadow(0 2px 4px rgba(134,190,39,0.2));" />
          <div style="display: flex; flex-direction: column; line-height: 1.2; text-decoration: none;">
            <span style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0;">CIVFEST <span style="color: var(--color-primary);">2026</span></span>
            <span style="font-size: 0.75rem; font-weight: 500; color: var(--color-text-muted); letter-spacing: 0;">Civil Engineering Festival</span>
          </div>
        </a>`;

const newLogoBlock = `<a href="/index.html" class="logo" style="display: flex; align-items: center; gap: 0.85rem; text-decoration: none;">
          <img src="/logo.png" alt="Civfest" style="height: 56px; width: auto; filter: drop-shadow(0 2px 5px rgba(134,190,39,0.25)); transform: scale(1.15);" />
          <div style="display: flex; flex-direction: column; line-height: 1.1; text-decoration: none;">
            <span style="font-size: 1.15rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0;">CIVFEST <span style="color: var(--color-primary);">2026</span></span>
            <span style="font-size: 0.65rem; font-weight: 600; color: var(--color-text-muted); letter-spacing: 0;">Civil Engineering Festival</span>
          </div>
        </a>`;

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');

  // Find exact exact match of old structure using regex
  content = content.replace(/<a href="\/index\.html" class="logo" style="display: flex; align-items: center; gap: 0\.75rem; text-decoration: none;">.*?<\/a>/s, newLogoBlock);

  fs.writeFileSync('c:/belajar/civest/' + file, content);
}

console.log('Scaled logo successfully');

const fs = require('fs');

const svgNBMDC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`;
const svgNPTC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
const svgNBDC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="20" x2="22" y2="20"></line><path d="M22 20v-8a10 10 0 0 0-20 0v8"></path><line x1="6" y1="10" x2="6" y2="20"></line><line x1="10" y1="7" x2="10" y2="20"></line><line x1="14" y1="7" x2="14" y2="20"></line><line x1="18" y1="10" x2="18" y2="20"></line></svg>`;
const svgNCC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="8" height="8" rx="1"></rect><rect x="14" y="14" width="8" height="8" rx="1"></rect><rect x="8" y="4" width="8" height="8" rx="1"></rect><path d="M6 14v-2c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2"></path></svg>`;
const svgNBC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;

const replacement = `<img src="/placeholder-logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.5;" />`;

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');
  let newContent = content.split(svgNBMDC).join(replacement)
                          .split(svgNPTC).join(replacement)
                          .split(svgNBDC).join(replacement)
                          .split(svgNCC).join(replacement)
                          .split(svgNBC).join(replacement);

  fs.writeFileSync('c:/belajar/civest/' + file, newContent);
}

// Make a small transparent placeholder-logo.png file in public so it doesn't 404
const base64Pixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
fs.writeFileSync('c:/belajar/civest/public/placeholder-logo.png', Buffer.from(base64Pixel, 'base64'));

console.log('Replaced competition icons with img tags.');

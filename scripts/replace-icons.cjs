const fs = require('fs');

const svgNBMDC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`;
const svgNPTC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
const svgNBDC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="20" x2="22" y2="20"></line><path d="M22 20v-8a10 10 0 0 0-20 0v8"></path><line x1="6" y1="10" x2="6" y2="20"></line><line x1="10" y1="7" x2="10" y2="20"></line><line x1="14" y1="7" x2="14" y2="20"></line><line x1="18" y1="10" x2="18" y2="20"></line></svg>`;
const svgNCC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="8" height="8" rx="1"></rect><rect x="14" y="14" width="8" height="8" rx="1"></rect><rect x="8" y="4" width="8" height="8" rx="1"></rect><path d="M6 14v-2c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2"></path></svg>`;
const svgNBC = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;

const svgStar = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
const svgBuilding = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`; 

const SVGMAP = {
  'NBMDC': svgNBMDC,
  'NPTC': svgNPTC,
  'NBDC': svgNBDC,
  'NCC': svgNCC,
  'NBC': svgNBC,
  'Generic': svgStar
};

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');
  let newContent = String(content);

  let offset = 0;
  while(true) {
    let idx = newContent.indexOf('<span>Logo</span>', offset);
    if(idx === -1) break;

    let subContext = newContent.substring(Math.max(0, idx - 100), Math.min(newContent.length, idx + 250));
    // Determine type based on subContext
    let replacement = SVGMAP['Generic'];
    if (subContext.includes('NBMDC')) replacement = SVGMAP['NBMDC'];
    else if (subContext.includes('NPTC')) replacement = SVGMAP['NPTC'];
    else if (subContext.includes('NBDC')) replacement = SVGMAP['NBDC'];
    else if (subContext.includes('NCC')) replacement = SVGMAP['NCC'];
    else if (subContext.includes('NBC')) replacement = SVGMAP['NBC'];

    newContent = newContent.substring(0, idx) + replacement + newContent.substring(idx + 17);
    offset = idx + replacement.length;
  }

  // specific fixes for vision and mission in index.html
  if (file === 'index.html') {
    // replace vision icon
    // M11 20A7 7... is the current Vision graphic
    newContent = newContent.replace(
      /<svg[^>]*viewBox="0 0 24 24"[^>]*>.*?M11 20A7 7(.*?)<\/svg>/s,
      `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
    );
    // replace mission icon
    // rect x="4"... path d="M9 22v-4h6v4"...
    newContent = newContent.replace(
      /<svg[^>]*viewBox="0 0 24 24"[^>]*>.*?rect x="4"(.*?)<\/svg>/s,
      `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`
    );
  }

  fs.writeFileSync('c:/belajar/civest/' + file, newContent);
}

console.log('Successfully replaced icons.');

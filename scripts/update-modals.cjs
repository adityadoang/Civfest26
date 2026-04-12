const fs = require('fs');

const events = fs.readFileSync('c:/belajar/civest/events.html', 'utf8');
// Extract the modal-competitions block
const startMarker = '<!-- Modal: Competitions -->';
let startIdx = events.indexOf(startMarker);
if (startIdx === -1) {
    console.error('Modal start not found');
    process.exit(1);
}
const endMarker = '<div class="modal-overlay" id="modal-seminar">';
let endIdx = events.indexOf(endMarker, startIdx);
if (endIdx === -1) {
    const endMarkerSingle = '<div class=\'modal-overlay\' id=\'modal-seminar\'>';
    endIdx = events.indexOf(endMarkerSingle, startIdx);
}

const modalHtml = events.substring(startIdx, endIdx);

// Process index.html
let indexHtml = fs.readFileSync('c:/belajar/civest/index.html', 'utf8');

// replace the links in index.html
indexHtml = indexHtml.replace(/<a href="\/events\.html" class="glass-card animate-fade-up delay-100">\s*<div class="comp-logo-box">[\s\S]*?<h3>NBMDC<\/h3>/, '<a href="#" data-open-modal="modal-competitions" data-open-comp="nbmdc" class="glass-card animate-fade-up delay-100">\n              <div class="comp-logo-box">\n                <div class="comp-item-logo-placeholder" style="width: 80px; height: 80px; font-size: 1rem; border-radius: 8px;"><span>Logo</span></div>\n              </div>\n              <h3>NBMDC</h3>');
indexHtml = indexHtml.replace(/<a href="\/events\.html" class="glass-card animate-fade-up delay-200">\s*<div class="comp-logo-box">[\s\S]*?<h3>NPTC<\/h3>/, '<a href="#" data-open-modal="modal-competitions" data-open-comp="nptc" class="glass-card animate-fade-up delay-200">\n              <div class="comp-logo-box">\n                <div class="comp-item-logo-placeholder" style="width: 80px; height: 80px; font-size: 1rem; border-radius: 8px;"><span>Logo</span></div>\n              </div>\n              <h3>NPTC</h3>');
indexHtml = indexHtml.replace(/<a href="\/events\.html" class="glass-card animate-fade-up delay-300">\s*<div class="comp-logo-box">[\s\S]*?<h3>NBDC<\/h3>/, '<a href="#" data-open-modal="modal-competitions" data-open-comp="nbdc" class="glass-card animate-fade-up delay-300">\n              <div class="comp-logo-box">\n                <div class="comp-item-logo-placeholder" style="width: 80px; height: 80px; font-size: 1rem; border-radius: 8px;"><span>Logo</span></div>\n              </div>\n              <h3>NBDC</h3>');
indexHtml = indexHtml.replace(/<a href="\/events\.html" class="glass-card animate-fade-up delay-100">\s*<div class="comp-logo-box">[\s\S]*?<h3>NCC<\/h3>/, '<a href="#" data-open-modal="modal-competitions" data-open-comp="ncc" class="glass-card animate-fade-up delay-100">\n              <div class="comp-logo-box">\n                <div class="comp-item-logo-placeholder" style="width: 80px; height: 80px; font-size: 1rem; border-radius: 8px;"><span>Logo</span></div>\n              </div>\n              <h3>NCC</h3>');
indexHtml = indexHtml.replace(/<a href="\/events\.html" class="glass-card animate-fade-up delay-200">\s*<div class="comp-logo-box">[\s\S]*?<h3>NBC<\/h3>/, '<a href="#" data-open-modal="modal-competitions" data-open-comp="nbc" class="glass-card animate-fade-up delay-200">\n              <div class="comp-logo-box">\n                <div class="comp-item-logo-placeholder" style="width: 80px; height: 80px; font-size: 1rem; border-radius: 8px;"><span>Logo</span></div>\n              </div>\n              <h3>NBC</h3>');

if (!indexHtml.includes('id="modal-competitions"')) {
    indexHtml = indexHtml.replace('</main>', '\n      ' + modalHtml + '\n    </main>');
}
fs.writeFileSync('c:/belajar/civest/index.html', indexHtml);

// Process register.html
let regHtml = fs.readFileSync('c:/belajar/civest/register.html', 'utf8');
regHtml = regHtml.replace('data-open-modal="modal-register-comps"', 'data-open-modal="modal-competitions"');
const regStartMarker = '<!-- Sub-register Competitions Modal -->';
let rStartIdx = regHtml.indexOf(regStartMarker);
if (rStartIdx !== -1) {
    let rEndIdx = regHtml.indexOf('</main>', rStartIdx);
    if (rEndIdx !== -1) {
        regHtml = regHtml.substring(0, rStartIdx) + modalHtml + '\n    ' + regHtml.substring(rEndIdx);
    }
}
fs.writeFileSync('c:/belajar/civest/register.html', regHtml);
console.log('Successfully updated files.');

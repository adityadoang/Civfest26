const fs = require('fs');

let css = fs.readFileSync('c:/belajar/civest/src/style.css', 'utf8');

// Inject CSS variables
if (!css.includes('--bg-overlay')) {
    css = css.replace(':root {', `:root {\n  --bg-overlay: rgba(255, 255, 255, 0.05);\n  --bg-overlay-hover: rgba(255, 255, 255, 0.1);\n  --border-light: rgba(255, 255, 255, 0.2);\n  --border-lighter: rgba(255, 255, 255, 0.4);`);
    css = css.replace('[data-theme="light"] {', `[data-theme="light"] {\n  --bg-overlay: rgba(0, 0, 0, 0.05);\n  --bg-overlay-hover: rgba(0, 0, 0, 0.1);\n  --border-light: rgba(0, 0, 0, 0.2);\n  --border-lighter: rgba(0, 0, 0, 0.4);`);
}

// Replace CSS raw values
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.4\)/g, 'var(--border-lighter)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.2\)/g, 'var(--border-light)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'var(--bg-overlay-hover)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'var(--bg-overlay)');

fs.writeFileSync('c:/belajar/civest/src/style.css', css);

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];
files.forEach(f => {
    let content = fs.readFileSync('c:/belajar/civest/' + f, 'utf8');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.4\)/g, 'var(--border-lighter)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.2\)/g, 'var(--border-light)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'var(--bg-overlay-hover)');
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'var(--bg-overlay)');
    fs.writeFileSync('c:/belajar/civest/' + f, content);
});

console.log('Fixed rgba opacity mappings');

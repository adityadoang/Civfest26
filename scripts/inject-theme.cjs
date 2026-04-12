const fs = require('fs');

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');

  // Insert button if not already there
  if (!content.includes('class="theme-btn"')) {
    content = content.replace(
      '<a href="/register.html" class="btn-register">Register Now</a>',
      '<button class="theme-btn" aria-label="Toggle Theme">☀️</button>\n          <a href="/register.html" class="btn-register">Register Now</a>'
    );
    fs.writeFileSync('c:/belajar/civest/' + file, content);
  }
}

let mainJs = fs.readFileSync('c:/belajar/civest/src/main.js', 'utf8');
if (!mainJs.includes('Theme Toggler')) {
  const themeLogic = `
  // Theme Toggler
  const themeToggles = document.querySelectorAll('.theme-btn');
  
  function updateThemeButton(theme) {
    themeToggles.forEach(btn => {
      btn.textContent = theme === 'light' ? '🌙' : '☀️';
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
    });
  });
`;

  mainJs = mainJs.replace('document.addEventListener(\'DOMContentLoaded\', () => {', 'document.addEventListener(\'DOMContentLoaded\', () => {' + themeLogic);
  fs.writeFileSync('c:/belajar/civest/src/main.js', mainJs);
}

console.log('Injected Theme Toggler');

const fs = require('fs');

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');

  // Insert favicon if not present
  if (!content.includes('rel="icon"')) {
    content = content.replace(
      '<title>Civfest PNJ 2026</title>',
      '<title>Civfest PNJ 2026</title>\n    <link rel="icon" type="image/png" href="/logo.png" />'
    );
    fs.writeFileSync('c:/belajar/civest/' + file, content);
  }
}

console.log('Favicon applied.');

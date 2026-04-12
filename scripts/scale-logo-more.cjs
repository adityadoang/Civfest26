const fs = require('fs');

const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

for (const file of files) {
  let content = fs.readFileSync('c:/belajar/civest/' + file, 'utf8');

  content = content.replace(
    'style="height: 56px; width: auto; filter: drop-shadow(0 2px 5px rgba(134,190,39,0.25)); transform: scale(1.15);"',
    'style="height: 75px; width: auto; filter: drop-shadow(0 2px 5px rgba(134,190,39,0.25)); transform: scale(1.25); transform-origin: left center;"'
  );

  fs.writeFileSync('c:/belajar/civest/' + file, content);
}

console.log('Scaled logo more successfully');

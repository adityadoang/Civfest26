const fs = require('fs');
const files = ['index.html', 'events.html', 'register.html', 'past-events.html'];

files.forEach(f => {
    const content = fs.readFileSync('c:/belajar/civest/' + f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.match(/white|#fff|rgba\(255/i)) {
            console.log(`[${f}] Line ${index + 1}: ${line.trim()}`);
        }
    });
});

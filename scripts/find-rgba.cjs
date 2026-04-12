const fs = require('fs');
const content = fs.readFileSync('c:/belajar/civest/src/style.css', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('rgba(255')) {
        console.log(`Line ${index + 1}: ${line.trim()}`);
    }
});

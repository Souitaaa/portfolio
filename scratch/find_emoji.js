const fs = require('fs');
const path = require('path');

function searchForEmoji(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchForEmoji(fullPath);
      }
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu;
        if (emojiRegex.test(content)) {
          console.log(`Found emoji in ${fullPath}`);
          const lines = content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            if (emojiRegex.test(lines[i])) {
              console.log(`${i + 1}: ${lines[i]}`);
            }
          }
        }
      }
    }
  }
}

searchForEmoji('./src');

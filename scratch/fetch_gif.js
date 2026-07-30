fetch('https://tenor.com/view/cat-scuba-dance-gif-5034219186050115128')
  .then(res => res.text())
  .then(text => {
    const match = text.match(/https:\/\/media\.tenor\.com\/[^"]*\.gif/);
    if (match) {
      console.log(match[0]);
    } else {
      console.log('No gif found');
    }
  });

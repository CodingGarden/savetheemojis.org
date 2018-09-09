const API_URL = 'https://api.emojitracker.com/v1/rankings';

async function getRandomEmojis() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const randomEndangered = [];
  const last100 = data.slice(-100);
  
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * last100.length);
    const randomEmoji = last100.splice(randomIndex, 1)[0];
    randomEndangered.push(randomEmoji);
  }
  return randomEndangered;
}

(async () => {
  const randomEmojis = await getRandomEmojis();
  const { labels, series } = randomEmojis.reduce((all, emoji) => {
    all.labels.push(emoji.char);
    all.series.push({
      value: emoji.score,
      meta: emoji.name
    });
    return all;
  }, {
    labels: [],
    series: []
  })

  new Chartist.Bar('.ct-chart', {
    labels,
    series
  }, {
    distributeSeries: true,
    plugins: [
      Chartist.plugins.tooltip()
    ]
  });
})();

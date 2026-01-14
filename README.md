# RANK EVERYTHING

> Universal Ranking Protocol v2.1  
> Rank anything in existence using ELO scoring

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## 🎯 What Is This?

A post-ironic ranking system that lets you rank **literally anything** against each other using proper ELO ratings. Think Hot or Not meets Everything in Existence.

**100,000 items** across 14 categories, ready to be ranked:
- 🎬 Pop Culture (movies, TV, music, celebrities)
- 🦁 Animals (every creature imaginable)
- 💻 Technology (devices, languages, frameworks)
- ⚽ Sports (athletes, teams, events)
- 🔬 Science (theories, discoveries, scientists)
- 📐 Mathematics (theorems, concepts)
- 🌍 Geography (countries, landmarks, cities)
- 🍕 Food & Drink (cuisines, dishes, beverages)
- 🚗 Vehicles (cars, planes, motorcycles)
- 🎨 Art & Literature (paintings, books, authors)
- 🏛️ Architecture (buildings, monuments)
- 👗 Fashion (brands, designers)
- ⚡ Mythology (gods, legends, creatures)
- 💭 Philosophy (philosophers, concepts)

## 🚀 Features

### Dual Ranking Modes
- **Category Mode**: Rank within specific categories (e.g., just movies)
- **Global Chaos Mode**: Rank EVERYTHING against EVERYTHING (is a tiger better than the Pythagorean theorem?)

### ELO Rating System
Proper competitive ranking algorithm that:
- Assigns each item an ELO score (starts at 1500)
- Updates based on head-to-head comparisons
- Calculates win probability based on rating differential
- Maintains rankings across all user sessions

### Anonymous Comments
4chan-style anonymous commenting:
- Random generated names (e.g., "AnonymousRanker4729")
- No login required
- Comments stored locally
- Full post-ironic discussion capability

### Post-Ironic Aesthetic
- Cyber/matrix theme inspired by MDE.tv
- Glitch effects and scanlines
- Neon color scheme (cyber blue + neon pink)
- Space Mono monospace font for that authentic terminal vibe
- Zero corporate design language

## 📦 Installation

### Quick Start (GitHub Pages)

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
3. **Visit**: `https://yourusername.github.io/rankeverything`

That's it. No build process, no dependencies, pure HTML/CSS/JS.

### Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/rankeverything.git
cd rankeverything

# Open in browser
open index.html
# or
python -m http.server 8000  # Then visit localhost:8000
```

## 🎮 How to Use

1. **Choose Your Mode**:
   - Category Mode: Pick a category and rank items within it
   - Global Chaos Mode: Rank everything against everything

2. **Start Ranking**:
   - You'll see two items side-by-side
   - Click the one you prefer
   - Repeat 15 times

3. **View Rankings**:
   - See the leaderboard sorted by ELO score
   - Top 50 items displayed
   - Win/loss records and match counts

4. **Comment** (Optional):
   - Add your thoughts anonymously
   - Join the discussion
   - Be weird, be yourself

## 🔧 Customization

### Add Your Own Items

Edit `data.csv`:

```csv
id,title,category,description,views,thumbnail_url
100001,Your Item,Your Category,Description here,0,https://your-image.jpg
```

### Adjust Ranking Settings

In `app.js`, modify:

```javascript
this.totalComparisons = 15;  // Number of comparisons per session
const K = 32;  // ELO K-factor (higher = more volatile ratings)
```

### Change Theme Colors

In `index.html` CSS:

```css
:root {
    --cyber-blue: #00ff9f;    /* Primary accent */
    --neon-pink: #ff006e;     /* Secondary accent */
    --deep-void: #0a0e27;     /* Background */
    --matrix-green: #39ff14;  /* Text highlights */
}
```

## 🧮 How ELO Works

The ELO rating system (invented for chess) calculates rankings based on head-to-head matchups:

1. **Initial Rating**: Every item starts at 1500
2. **Expected Score**: `E = 1 / (1 + 10^((Rb - Ra) / 400))`
3. **Rating Update**: `New Rating = Old Rating + K * (Actual - Expected)`

Where:
- `K = 32` (volatility factor)
- Actual = 1 for winner, 0 for loser
- Expected = probability of winning

### Example:
- Item A (1600) vs Item B (1400)
- A has ~76% chance to win
- If A wins: +6 points (expected outcome)
- If B wins: +26 points (upset!)

## 🗂️ File Structure

```
rankeverything/
├── index.html          # Main HTML (includes all styles)
├── app.js              # Application logic & ELO calculations
├── data.csv            # 100k item dataset
└── README.md           # You are here
```

## 🎨 Design Philosophy

### Post-Ironic Futurism
Taking the aesthetic seriously while being aware of its absurdity. The cyber/matrix theme is both genuine appreciation and knowing parody—like ranking the Mona Lisa against a cheeseburger with the same gravity as a chess tournament.

### No Accounts, No Tracking
Pure anonymous ranking. No login, no cookies (except localStorage for comments), no analytics. Just you vs the eternal question: "Which is better?"

### Everything Is Rankable
From abstract concepts to physical objects. Mathematics vs Animals. Philosophy vs Fast Food. If it exists (or doesn't), you can rank it.

## 🤝 Contributing

Contributions welcome! This is intentionally simple:

1. Fork it
2. Add features / fix bugs
3. Submit PR

### Ideas for Contributions:
- More items in dataset
- Additional categories
- Different ranking algorithms
- Export rankings as image
- Share rankings via URL
- Dark/light theme toggle
- Mobile swipe gestures
- Sound effects (please make them weird)

## 📊 Technical Details

**Frontend Only**: Pure vanilla JavaScript, no frameworks  
**Data Storage**: localStorage for comments, CSV for items  
**Hosting**: Static site (works on GitHub Pages)  
**Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🐛 Known Issues

- Very large datasets (500k+) may cause slowdowns
- CSV parsing is basic (handles most cases)
- Comments are per-device (no sync)
- No mobile swipe gestures yet

## 📜 License

MIT License - do whatever you want with this

## 🙏 Credits

- ELO algorithm: Arpad Elo (chess ratings)
- Dataset: Wikipedia top articles
- Aesthetic inspiration: MDE.tv
- Anonymous posting: 4chan model
- Everything else: Pure chaos

## 🔮 Philosophy

> "The urge to rank things is fundamental to human consciousness. From ancient hierarchies to modern algorithms, we ceaselessly organize reality into ordered lists. This app embraces that impulse while recognizing its absurdity—a tiger ranked against a theorem, judged by anonymous strangers, scored by an algorithm from chess. It's beautiful because it's pointless. It's pointless because it's beautiful."

---

**Built with ❤️ and existential dread**

Rank responsibly. Or don't. We're not your dad.

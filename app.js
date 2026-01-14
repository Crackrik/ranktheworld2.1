// RANK EVERYTHING v2.1
// Universal Ranking Protocol

class RankEverything {
    constructor() {
        this.dataset = [];
        this.categories = {};
        this.currentMode = 'category'; // 'category' or 'global'
        this.currentCategory = null;
        this.currentPair = null;
        this.rankings = {};
        this.comparisons = [];
        this.progress = 0;
        this.totalComparisons = 15;
        this.comments = this.loadComments();
        
        this.init();
    }
    
    async init() {
        await this.loadDataset();
        this.organizeCategories();
        this.setupEventListeners();
        this.renderCategories();
        this.updateStats();
    }
    
    async loadDataset() {
        try {
            const response = await fetch('data.csv');
            const csvText = await response.text();
            this.dataset = this.parseCSV(csvText);
            console.log(`Loaded ${this.dataset.length} items`);
        } catch (error) {
            console.error('Error loading dataset:', error);
            // Fallback to demo data if CSV not found
            this.generateDemoData();
        }
    }
    
    parseCSV(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = this.parseCSVLine(lines[i]);
            if (values.length < headers.length) continue;
            
            const item = {};
            headers.forEach((header, index) => {
                item[header] = values[index] ? values[index].replace(/"/g, '') : '';
            });
            
            // Convert numeric fields
            item.id = parseInt(item.id) || i;
            item.views = parseInt(item.views) || 0;
            
            data.push(item);
        }
        
        return data;
    }
    
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }
    
    generateDemoData() {
        // Fallback demo data if CSV doesn't load
        const categories = ['Pop Culture', 'Animals', 'Technology', 'Sports'];
        const demoCount = 100;
        
        for (let i = 1; i <= demoCount; i++) {
            this.dataset.push({
                id: i,
                title: `Item ${i}`,
                category: categories[i % categories.length],
                description: `Demo item for testing`,
                views: Math.floor(Math.random() * 1000000),
                thumbnail_url: `https://via.placeholder.com/400x300/0a0e27/00ff9f?text=Item+${i}`
            });
        }
    }
    
    organizeCategories() {
        this.categories = {};
        
        this.dataset.forEach(item => {
            const cat = item.category;
            if (!this.categories[cat]) {
                this.categories[cat] = {
                    name: cat,
                    icon: this.getCategoryIcon(cat),
                    items: []
                };
            }
            this.categories[cat].items.push(item);
        });
        
        // Initialize ELO ratings
        this.dataset.forEach(item => {
            this.rankings[item.id] = {
                id: item.id,
                elo: 1500,
                wins: 0,
                losses: 0,
                matches: 0
            };
        });
    }
    
    getCategoryIcon(category) {
        const icons = {
            'Pop Culture': '🎬',
            'Animals': '🦁',
            'Technology': '💻',
            'Sports': '⚽',
            'Science': '🔬',
            'Mathematics': '📐',
            'Geography': '🌍',
            'Food & Drink': '🍕',
            'Vehicles': '🚗',
            'Art & Literature': '🎨',
            'Architecture': '🏛️',
            'Fashion': '👗',
            'Mythology': '⚡',
            'Philosophy': '💭'
        };
        return icons[category] || '📊';
    }
    
    setupEventListeners() {
        // Mode selector
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });
        
        // Item card clicks
        document.getElementById('item-a').addEventListener('click', () => this.selectItem('a'));
        document.getElementById('item-b').addEventListener('click', () => this.selectItem('b'));
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        if (mode === 'global') {
            // Start global ranking immediately
            this.currentCategory = null;
            document.getElementById('active-category').textContent = 'ALL';
            this.startRanking();
        } else {
            // Show category selection
            this.reset();
        }
    }
    
    renderCategories() {
        const grid = document.getElementById('category-grid');
        grid.innerHTML = '';
        
        Object.entries(this.categories).forEach(([key, cat]) => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon">${cat.icon}</div>
                <div class="category-name">${cat.name}</div>
                <div class="category-count">${cat.items.length} ITEMS</div>
            `;
            card.addEventListener('click', () => this.selectCategory(key));
            grid.appendChild(card);
        });
    }
    
    selectCategory(category) {
        this.currentCategory = category;
        document.getElementById('active-category').textContent = category.toUpperCase();
        this.startRanking();
    }
    
    startRanking() {
        this.progress = 0;
        this.comparisons = [];
        this.updateProgress();
        
        // Hide categories, show arena
        document.getElementById('category-grid').classList.add('hidden');
        document.getElementById('ranking-arena').classList.remove('hidden');
        document.getElementById('leaderboard').classList.add('hidden');
        
        this.showNextPair();
    }
    
    showNextPair() {
        if (this.progress >= this.totalComparisons) {
            this.showResults();
            return;
        }
        
        // Get items based on mode
        let pool;
        if (this.currentMode === 'global') {
            pool = this.dataset;
        } else {
            pool = this.categories[this.currentCategory].items;
        }
        
        // Select two random items
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const itemA = shuffled[0];
        const itemB = shuffled[1];
        
        this.currentPair = { a: itemA, b: itemB };
        this.renderPair(itemA, itemB);
    }
    
    renderPair(itemA, itemB) {
        // Item A
        document.getElementById('item-a-title').textContent = itemA.title;
        document.getElementById('item-a-description').textContent = itemA.description.substring(0, 150);
        document.getElementById('item-a-image').src = itemA.thumbnail_url || itemA.image_url || 
            `https://via.placeholder.com/400x300/0a0e27/00ff9f?text=${encodeURIComponent(itemA.title.substring(0, 20))}`;
        
        // Item B
        document.getElementById('item-b-title').textContent = itemB.title;
        document.getElementById('item-b-description').textContent = itemB.description.substring(0, 150);
        document.getElementById('item-b-image').src = itemB.thumbnail_url || itemB.image_url || 
            `https://via.placeholder.com/400x300/0a0e27/ff006e?text=${encodeURIComponent(itemB.title.substring(0, 20))}`;
        
        // Reset selection
        document.getElementById('item-a').classList.remove('selected');
        document.getElementById('item-b').classList.remove('selected');
    }
    
    selectItem(winner) {
        if (!this.currentPair) return;
        
        const winnerItem = this.currentPair[winner];
        const loserItem = winner === 'a' ? this.currentPair.b : this.currentPair.a;
        
        // Update ELO
        this.updateELO(winnerItem.id, loserItem.id);
        
        // Record comparison
        this.comparisons.push({
            winner: winnerItem.id,
            loser: loserItem.id,
            timestamp: Date.now()
        });
        
        // Visual feedback
        document.getElementById(`item-${winner}`).classList.add('selected');
        
        // Next pair
        this.progress++;
        this.updateProgress();
        
        setTimeout(() => {
            this.showNextPair();
        }, 500);
    }
    
    updateELO(winnerId, loserId) {
        const K = 32; // K-factor
        
        const winnerRating = this.rankings[winnerId];
        const loserRating = this.rankings[loserId];
        
        // Expected scores
        const expectedWinner = 1 / (1 + Math.pow(10, (loserRating.elo - winnerRating.elo) / 400));
        const expectedLoser = 1 / (1 + Math.pow(10, (winnerRating.elo - loserRating.elo) / 400));
        
        // Update ratings
        winnerRating.elo += K * (1 - expectedWinner);
        loserRating.elo += K * (0 - expectedLoser);
        
        // Update stats
        winnerRating.wins++;
        winnerRating.matches++;
        loserRating.losses++;
        loserRating.matches++;
    }
    
    updateProgress() {
        const percent = (this.progress / this.totalComparisons) * 100;
        document.getElementById('progress-bar').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${this.progress} / ${this.totalComparisons}`;
        document.getElementById('total-comparisons').textContent = this.progress;
    }
    
    updateStats() {
        document.getElementById('total-items').textContent = this.dataset.length.toLocaleString();
    }
    
    showResults() {
        // Hide arena, show leaderboard
        document.getElementById('ranking-arena').classList.add('hidden');
        document.getElementById('leaderboard').classList.remove('hidden');
        
        // Calculate rankings
        let items;
        if (this.currentMode === 'global') {
            items = this.dataset;
        } else {
            items = this.categories[this.currentCategory].items;
        }
        
        const ranked = items
            .map(item => ({
                ...item,
                ...this.rankings[item.id]
            }))
            .sort((a, b) => b.elo - a.elo)
            .slice(0, 50);
        
        // Update title
        const title = this.currentMode === 'global' 
            ? 'GLOBAL RANKINGS'
            : `TOP ${this.currentCategory.toUpperCase()}`;
        document.getElementById('leaderboard-title').textContent = title;
        
        // Render rankings
        this.renderLeaderboard(ranked);
        
        // Render comments
        this.renderComments();
    }
    
    renderLeaderboard(ranked) {
        const list = document.getElementById('leaderboard-list');
        list.innerHTML = '';
        
        ranked.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'rank-item';
            div.innerHTML = `
                <div class="rank-number">#${index + 1}</div>
                <div class="rank-details">
                    <div class="rank-title">${item.title}</div>
                    <div class="rank-meta">${item.category} • ${item.matches} matches • ${item.wins}W-${item.losses}L</div>
                </div>
                <div class="elo-score">${Math.round(item.elo)}</div>
            `;
            list.appendChild(div);
        });
    }
    
    loadComments() {
        const stored = localStorage.getItem('rankeverything_comments');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveComments() {
        localStorage.setItem('rankeverything_comments', JSON.stringify(this.comments));
    }
    
    renderComments() {
        const list = document.getElementById('comments-list');
        list.innerHTML = '';
        
        // Show last 10 comments
        const recent = this.comments.slice(-10).reverse();
        
        recent.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `
                <div class="comment-header">
                    <span class="anon-name">${comment.name}</span>
                    <span class="comment-time">${this.formatTime(comment.timestamp)}</span>
                </div>
                <div class="comment-text">${this.escapeHtml(comment.text)}</div>
            `;
            list.appendChild(div);
        });
        
        if (recent.length === 0) {
            list.innerHTML = '<div style="color: var(--text-dim); text-align: center; padding: 20px;">No comments yet. Be the first!</div>';
        }
    }
    
    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    generateAnonName() {
        const adjectives = ['Anonymous', 'Mysterious', 'Shadow', 'Ghost', 'Phantom', 'Cryptic', 'Hidden', 'Silent'];
        const nouns = ['Ranker', 'Judge', 'Critic', 'User', 'Viewer', 'Voter', 'Analyst', 'Expert'];
        const num = Math.floor(Math.random() * 9999);
        
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        return `${adj}${noun}${num}`;
    }
    
    reset() {
        this.currentCategory = null;
        document.getElementById('active-category').textContent = '—';
        document.getElementById('category-grid').classList.remove('hidden');
        document.getElementById('ranking-arena').classList.add('hidden');
        document.getElementById('leaderboard').classList.add('hidden');
        this.progress = 0;
        this.updateProgress();
    }
}

// Global functions
let app;

function skipPair() {
    app.progress++;
    app.updateProgress();
    app.showNextPair();
}

function dontKnow() {
    app.progress++;
    app.updateProgress();
    app.showNextPair();
}

function viewResults() {
    app.showResults();
}

function postComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    const comment = {
        name: app.generateAnonName(),
        text: text,
        timestamp: Date.now()
    };
    
    app.comments.push(comment);
    app.saveComments();
    app.renderComments();
    
    input.value = '';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app = new RankEverything();
});

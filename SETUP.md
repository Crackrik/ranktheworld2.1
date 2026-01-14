# SETUP INSTRUCTIONS

## For Complete Noobs 🤓

### Option 1: Use GitHub Pages (Easiest - No Coding!)

1. **Create a GitHub account** (if you don't have one)
   - Go to github.com
   - Click "Sign up"
   - Follow the steps

2. **Upload this project**:
   - Download all the files in this folder
   - Go to github.com and click the "+" in top right
   - Select "New repository"
   - Name it `rankeverything` (or whatever you want)
   - Click "Create repository"
   - Click "uploading an existing file"
   - Drag all the files into the box
   - Click "Commit changes"

3. **Turn on GitHub Pages**:
   - In your repository, click "Settings" (top right)
   - Click "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Branch: select "main" 
   - Folder: select "/ (root)"
   - Click "Save"

4. **Wait 2 minutes**, then visit:
   ```
   https://YOUR-USERNAME.github.io/rankeverything
   ```

DONE! Your site is live and free forever.

---

### Option 2: Run Locally on Your Computer

1. **Download the files**:
   - Click the green "Code" button on GitHub
   - Select "Download ZIP"
   - Unzip the folder

2. **Open in browser**:
   - Find `index.html` in the folder
   - Double-click it
   - It opens in your browser!

That's it. Works offline, no server needed.

---

### Option 3: Use Python (If You Want a Local Server)

1. **Open Terminal** (Mac/Linux) or **Command Prompt** (Windows)

2. **Navigate to the folder**:
   ```bash
   cd path/to/rankeverything
   ```

3. **Start server**:
   ```bash
   python -m http.server 8000
   ```
   (If that doesn't work, try `python3 -m http.server 8000`)

4. **Open browser** and go to:
   ```
   http://localhost:8000
   ```

---

## Customization

### Add Your Own Items

1. Open `data.csv` in Excel, Google Sheets, or a text editor
2. Add a new row following this format:
   ```
   100001,Your Item Name,Category,Description,0,https://image-url.jpg
   ```
3. Save the file
4. Refresh your browser

### Change Colors

1. Open `index.html` in a text editor
2. Find the `:root` section (around line 10)
3. Change the color values:
   ```css
   --cyber-blue: #00ff9f;    /* Make it red: #ff0000 */
   --neon-pink: #ff006e;     /* Make it blue: #0066ff */
   ```
4. Save and refresh

### Change How Many Comparisons

1. Open `app.js` in a text editor
2. Find line 12: `this.totalComparisons = 15;`
3. Change `15` to whatever number you want
4. Save and refresh

---

## Troubleshooting

**"It's just a blank page!"**
- Make sure `data.csv` is in the same folder as `index.html`
- Check the browser console (F12) for errors

**"Images don't show"**
- The CSV has placeholder images
- They should still work, just generic colored boxes

**"Comments don't save"**
- Comments save to your browser's localStorage
- They won't sync between devices
- Clearing browser data will delete them

**"Can I use this on my phone?"**
- Yes! Just visit your GitHub Pages URL
- Works on mobile browsers

---

## Support

Need help? Options:
1. Google your error message (seriously, this works)
2. Ask ChatGPT or Claude
3. Check GitHub Issues for this repo
4. Read the code—it's intentionally simple

---

**You got this! 🚀**

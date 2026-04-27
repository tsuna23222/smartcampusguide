# SmartCampus Web App

React web app — ready for Vercel deployment.

---

## Run Locally in VS Code

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm start
```

Open http://localhost:3000 in your browser.

---

## Deploy to Vercel (Free — Get a Live URL)

### Option A: Drag & Drop (Easiest)
1. Run `npm run build` — this creates a `build/` folder
2. Go to https://vercel.com and create a free account
3. Click "Add New Project" → "Browse" → Upload the `build/` folder
4. Done! You get a live URL like `smartcampus-xxx.vercel.app`

### Option B: GitHub + Vercel (Best for updates)
1. Create a GitHub account at https://github.com
2. Create a new repository called `smartcampus`
3. Upload all these files to the repo
4. Go to https://vercel.com → "Add New Project" → Import from GitHub
5. Select your repo → Click Deploy
6. Every time you push changes to GitHub, Vercel auto-deploys!

---

## Pages Included

| Page | Description |
|------|-------------|
| Splash | Welcome / landing screen |
| Login | Student login form |
| Register | Student registration form |
| Dashboard | Today's classes + quick access |
| Schedule | Full weekly schedule (Mon–Fri) |
| Map | Campus map + room directions |
| Notifications | Alerts and announcements |
| Profile | Student info + settings |

---

## Customize Mock Data

Edit `src/data/mockData.js` to change:
- Student name and info
- Class schedules
- Rooms and buildings
- Notifications

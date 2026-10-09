bebii.os — ONE React app (terminal + birthday website)

Everything is now a single Vite + React app.

How it works
------------
1. npm run dev  (or npm run build && serve dist)
2. You land on the Birthday OS TERMINAL first
3. Type:  pkg install birthday-os
4. Type:  open birthday
5. The birthday website (bow, heart, tree, memories) opens INSIDE the same app
   — no blank page, no separate folder, no external link

Commands
--------
cd birthday   # project root is now the React app folder
npm install
npm run dev      # development
npm run build    # production → dist/

Deploy the contents of dist/ to Netlify / any static host.

.gitignore already ignores node_modules and dist.

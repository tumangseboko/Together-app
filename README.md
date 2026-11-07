# Together ❤️ — starter app

This is the first working front-end prototype for the Together couples app. It is a mobile-friendly website and an installable Progressive Web App (PWA).

## What works in this first stage
- Create a demo account and log in on the same device/browser
- Home dashboard and navigation
- Generate and copy a demo partner invite code
- Play starter couples question games
- Save a special date and see a countdown
- PWA manifest and service worker for installation/offline app shell

## Important prototype limitations
This version is a front-end prototype. Accounts, passwords, invite codes and dates are stored in browser local storage on the current device. They are **not secure real accounts**, do not sync between phones, and must not be used for real private conversations. Do not enter a password you use elsewhere.

The partner invite code is currently a visual/demo feature. Secure cross-device pairing, real messaging, photo storage, notifications and video calls will be added after we connect a backend such as Supabase.

## Run it on your computer
1. Install Node.js (LTS) from https://nodejs.org/
2. Open a terminal in this folder.
3. Run: `npx serve .`
4. Open the local address printed in the terminal.

For PWA installation, browsers generally require HTTPS (or localhost). A plain file:// preview will not enable installation.

## Publish a free first version
A simple option is to create a GitHub repository, upload these files, and import the repository into a static hosting provider such as Vercel or Netlify. Enable HTTPS. Then open the published URL in Chrome on Android and choose **Install app** or **Add to Home screen**.

Free hosting and database plans have usage limits and may change. Video calls and media storage may need paid infrastructure as the app grows.

## Next development stage
Connect Supabase for real authentication, database tables, row-level security, partner invitations and real-time messaging. Remove the demo local-storage authentication before inviting real users.

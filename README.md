# Jamoveo Client

This is the React frontend for **Jamoveo**, a collaborative jam session app allowing musicians to join virtual rehearsals, see synchronized song lyrics and chords, and follow the admin's live control.

Link to Vercel - client-7umyigmjq-yuval-dadons-projects.vercel.app

## Features

- Login and Signup pages for musicians
- Admin view to search and select songs
- Player view that updates in real time
- Role-based rendering (lyrics only for singers)
- Automatic scrolling toggle
- Responsive, high-contrast UI optimized for performance rooms
- Real-time socket communication for song updates

## Pages

- `/login` – User login
- `/signup` – Register as a player
- `/admin-signup` – Register as an admin
- `/` – Main page: shows "Waiting for next song"
- `/session/:sessionId` – Live session display for players
- `/admin` – Admin control panel
- `/admin/results` – Search results page

## Technologies

- React + Chakra UI
- React Router
- Axios
- Socket.IO Client
- React Toastify

## Setup

```bash
npm install
npm run dev

## Deployment

Deployed using Vercel.

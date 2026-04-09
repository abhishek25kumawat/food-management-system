# Zomato Clone (MERN)

Full-stack Zomato-style food ordering app built with MongoDB, Express, React and Node.js.

## Features

- User signup and login with JWT auth
- Restaurant listing and restaurant menu pages
- Cart with quantity controls
- Place order flow with delivery address
- My orders page with order history and status

## Project structure

- `backend` - Express API + MongoDB models
- `frontend` - React (Vite) client app

## Backend setup

1. Go to `backend`
2. Copy `.env.example` to `.env` and update values
3. Install dependencies: `npm install`
4. Seed restaurants: `npm run seed`
5. Start server: `npm run dev`

## Frontend setup

1. Go to `frontend`
2. Copy `.env.example` to `.env`
3. Install dependencies: `npm install`
4. Start frontend: `npm run dev`

Frontend runs on Vite dev server and calls backend at `VITE_API_URL`.

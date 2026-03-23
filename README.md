<div align="center">

# Sponso 🤝

### A brand deal marketplace for Indian creators

Connect creators with brands. No middlemen. No cold DMs. Just deals.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made with MERN](https://img.shields.io/badge/stack-MERN-blue.svg)](#tech-stack)
[![Made for India](https://img.shields.io/badge/made%20for-🇮🇳%20India-orange.svg)](#)

</div>

---

## What is Sponso?

Sponso is an open-source platform where **Indian creators** (Instagram, YouTube, Moj, Josh) can find brand sponsorships — and where **brands** can discover the right creator for their campaign.

Think of it like a job board, but for brand deals. A creator in Jaipur can find a fashion brand's campaign just as easily as a tech YouTuber in Bangalore can find a gadget deal.

**No agency. No commission. No gatekeeping.**

---

## Screenshots

> Coming soon — feel free to add yours after cloning!

---

## Features

**For Creators**
- Build a public profile with niche tags, platforms, follower count, and media kit
- Browse and filter brand campaigns (by niche, platform, budget)
- Send proposals with your rate and pitch
- Negotiate deals with counter-offers
- Real-time chat once a deal is in progress
- View your full deal history and ratings

**For Brands**
- Post campaigns with deliverables, budget range, and deadline
- Search creators by niche, platform, follower count, and language
- Review proposals and accept / reject / counter-offer
- Rate creators after a deal closes

**Platform**
- Admin panel for creator verification and content moderation
- In-app notifications + email alerts on key actions
- Mobile-responsive UI

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Real-time | Socket.IO |
| Auth | JWT + bcrypt |
| Media | Cloudinary |
| Email | Nodemailer + Gmail SMTP |
| Hosting | Vercel (frontend) + Render (backend) + MongoDB Atlas |

**Total hosting cost: ₹0/month** — everything runs on free tiers.

---

## Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)
- A free [MongoDB Atlas](https://cloud.mongodb.com/) account
- A free [Cloudinary](https://cloudinary.com/) account

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/sponso.git
cd sponso
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in your `.env` (see [Environment Variables](#environment-variables) below), then:

```bash
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

Set `VITE_API_URL=http://localhost:5000` in the client `.env`, then:

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment Variables

### `server/.env`

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_secret_string
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GMAIL_USER=yourapp@gmail.com
GMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:5173
PORT=5000
```

> For Gmail, enable 2-factor auth on your Google account, then generate an [App Password](https://support.google.com/accounts/answer/185833). Use that as `GMAIL_PASS` — not your real password.

### `client/.env`

```env
VITE_API_URL=http://localhost:5000
```

---

## Project Structure

```
sponso/
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── api/              # Axios API calls
│       ├── components/       # Reusable UI components
│       ├── context/          # AuthContext, SocketContext
│       └── pages/            # All page-level components
│           ├── auth/         # Login, Register
│           ├── creator/      # Creator dashboard, profile
│           ├── brand/        # Brand dashboard, campaign management
│           ├── campaigns/    # Browse, detail pages
│           └── chat/         # Real-time messaging
│
├── server/                   # Express backend
│   ├── controllers/          # Route handler logic
│   ├── middleware/           # Auth guard, error handler
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Campaign.js
│   │   ├── Proposal.js
│   │   └── Message.js
│   ├── routes/               # API route definitions
│   ├── socket/               # Socket.IO event handlers
│   └── utils/                # Email helper, Cloudinary config
│
└── README.md
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register as creator or brand |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/campaigns` | Browse campaigns (with filters) |
| POST | `/api/campaigns` | Brand creates a campaign |
| POST | `/api/proposals` | Creator submits a proposal |
| PUT | `/api/proposals/:id/status` | Brand accepts / rejects |
| PUT | `/api/proposals/:id/counter` | Counter-offer (negotiation) |
| GET | `/api/creators` | Search creators by niche, platform, followers |
| GET | `/api/messages/:roomId` | Fetch chat messages |

Full API docs coming soon. For now, check the `server/routes/` folder — every route has comments.

---

## Deployment

### Free deployment in 3 steps

**1. MongoDB Atlas**
- Go to [cloud.mongodb.com](https://cloud.mongodb.com)
- Create a free M0 cluster
- Whitelist `0.0.0.0/0` under Network Access
- Copy your connection string into `MONGO_URI`

**2. Backend → Render**
- Push your `server/` folder to a GitHub repo
- Go to [render.com](https://render.com) → New Web Service
- Connect your repo, set all env vars from `server/.env`
- Build command: `npm install` | Start command: `npm start`
- Copy your Render URL (you'll need it for the frontend)

**3. Frontend → Vercel**
- Push your `client/` folder to GitHub
- Go to [vercel.com](https://vercel.com) → Import project
- Set `VITE_API_URL` to your Render backend URL
- Deploy — Vercel handles the rest

Done. Zero monthly cost.

---

## Contributing

Contributions are welcome! Here's how to get involved:

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "add: your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please keep PRs focused — one feature or fix per PR makes review much faster.

**Not sure where to start?** Look for issues tagged `good first issue`.

---

## Roadmap

- [x] Auth system (JWT, roles)
- [x] Creator & brand profiles
- [x] Campaign CRUD
- [x] Proposal & negotiation flow
- [x] Real-time chat
- [x] Admin panel
- [ ] AI-based creator-brand matching (v2)
- [ ] Analytics dashboard for creators
- [ ] PWA / mobile support
- [ ] Multi-language UI (Hindi, Tamil, Telugu)

---

## A Note on Payments

Sponso does not process payments. When a deal closes, both parties coordinate payment outside the platform (UPI, bank transfer, etc.). This is intentional for v1 — integrating a payment gateway with proper RBI compliance is a v2 problem.

---

## License

MIT — free to use, fork, and build on. See [LICENSE](LICENSE) for details.

---

## Author

Built by [Your Name](https://github.com/yourusername) — open to collaborators.

If you find this useful, a ⭐ on GitHub goes a long way!

---

*Built with chai and ambition. 🇮🇳*

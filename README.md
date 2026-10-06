# 🎰 Thai Lottery Checker

A modern web application to check Thai lottery results and verify your ticket numbers.

## Features

- 🔐 User authentication (Register & Login)
- 🔍 Search ticket numbers against past draws
- 📊 Browse historical lottery results
- 🎨 Modern, responsive UI with Tailwind CSS
- 🗄️ MongoDB database for data persistence
- ⚡ Fast API with Next.js

## Tech Stack

- **Frontend**: React, Next.js 13+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Deployment**: Vercel
- **Authentication**: JWT + bcrypt

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- Vercel account (for deployment)

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd ตรวจหวย
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lottery_db
   JWT_SECRET=your_secure_random_string_here
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   To get MongoDB URI:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account and cluster
   - Get your connection string and replace username/password

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## Seed Database

To populate test data:

```bash
curl -X POST http://localhost:3000/api/lottery/seed
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Lottery
- `GET /api/lottery/results?page=1` - Get paginated results
- `GET /api/lottery/search?ticket=123456` - Search ticket number
- `POST /api/lottery/seed` - Populate sample data

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/lottery-checker.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── lottery/        # Lottery data endpoints
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── dashboard/          # Main dashboard (protected)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── AuthForm.tsx        # Login/Register form component
│   ├── LotterySearch.tsx   # Ticket search component
│   └── LotteryResults.tsx  # Results display component
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   └── auth.ts             # JWT & bcrypt utilities
└── public/                 # Static files
```

## Usage

1. **Register Account**
   - Click "Get Started" on home page
   - Fill in email, username, password
   - Account created automatically with JWT token

2. **Search Ticket**
   - Go to Dashboard → Search Tab
   - Enter your ticket number
   - See results if ticket won

3. **View Results**
   - Go to Dashboard → Past Results Tab
   - Browse through historical draws
   - See all prize categories

## Security Notes

⚠️ **For Production:**
- Change `JWT_SECRET` to a strong random string
- Use HTTPS for all connections
- Implement rate limiting on API endpoints
- Add CORS configuration if needed
- Use environment variables for sensitive data

## Contributing

Feel free to fork and submit pull requests.

## License

MIT License - Feel free to use this project for personal or commercial use.

## Support

For issues or questions, please open an issue on GitHub or contact support.

---

Made with ❤️ for Thai Lottery enthusiasts

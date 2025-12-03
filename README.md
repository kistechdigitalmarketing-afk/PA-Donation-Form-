# PA Donation Form

A Next.js donation form application with admin dashboard for managing donations.

## Features

- Donation form with M-Pesa and Bank Transfer payment options
- Admin dashboard for viewing donations
- Secure authentication for admin access
- JSON file-based storage for donations

## Setup

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

Default admin credentials:
- **Email:** `admin@example.com`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials in production by setting the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables in a `.env.local` file.

## Project Structure

```
├── app/
│   ├── admin/          # Admin dashboard and login
│   ├── api/            # API routes
│   └── page.tsx        # Main donation form page
├── components/         # React components
├── data/               # JSON file storage for donations
├── lib/
│   ├── auth.ts        # Authentication logic
│   └── storage.ts     # File system storage operations
├── types/             # TypeScript type definitions
```

## Data Storage

Donations are stored in `data/donations.json`. The file is automatically created when the first donation is submitted.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables if needed (ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET)
4. Deploy!

### Other Platforms

Make sure to set environment variables in your hosting platform's configuration if needed.

## License

Private project for Possibilities Africa.

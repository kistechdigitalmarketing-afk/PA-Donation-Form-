# PA Donation Form

A Next.js donation form plugin for WordPress integration.

## Features

- Multi-step donation form (3 steps)
- Payment method selection (M-Pesa and Bank Transfer)
- Admin authentication
- Admin dashboard to view submissions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

Create a `.env.local` file in the root directory (optional, defaults are provided):

```env
JWT_SECRET=your-secret-key-change-in-production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## Admin Access

Default admin credentials:
- Email: admin@example.com
- Password: admin123

**Note:** Change these credentials in production by setting environment variables!

Access the admin dashboard at `/admin/login` or click the "Admin Sign In" button in the top-right corner of the donation form.

## Project Structure

- `/app` - Next.js App Router pages
  - `/api` - API routes for donations and authentication
  - `/admin` - Admin login and dashboard pages
- `/components` - React components
  - `DonationForm.tsx` - Main multi-step form component
  - `Step1.tsx`, `Step2.tsx`, `Step3.tsx` - Form steps
  - `AdminLink.tsx` - Admin sign-in link component
- `/lib` - Utility functions and data storage
  - `storage.ts` - Data persistence (file-based for server, localStorage for client)
  - `auth.ts` - Admin authentication utilities
- `/types` - TypeScript type definitions
- `/data` - Data storage directory (created automatically)

## WordPress Integration

This form can be embedded in a WordPress site by:
1. Building the Next.js app: `npm run build`
2. Deploying to a hosting service (Vercel, Netlify, etc.)
3. Adding a button/link in WordPress that points to your deployed form URL

The form is designed to work as a standalone page that can be opened from a WordPress button click.


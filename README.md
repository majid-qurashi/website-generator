This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Currently website is deployed on vercel at : https://schoolgenerator.vercel.app

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```text
website-generator/
├── backend/                # Node.js backend with Express
│   ├── uploads/            # Directory for school logo uploads
│   ├── db.js               # Database connection and schema
│   ├── server.js           # Main API server
│   └── package.json        # Backend dependencies
├── public/                 # Static assets (images, icons)
├── src/                    # Frontend source code
│   ├── app/                # Next.js App Router
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── templates/      # Template preview pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   └── components/         # Reusable React components
│       ├── templates/      # Website template variations
│       ├── Navigation.tsx  # Navbar component
│       ├── Footer.tsx      # Footer component
│       └── ...
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Frontend dependencies
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Developer

**Majid Qurashi**
- **Portfolio:** [qurashi.vercel.app](https://qurashi.vercel.app)
- **Role:** Full Stack Developer

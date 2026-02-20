# CVEngine

CVEngine — build ATS-friendly CVs from Markdown. Paste or upload `.md`, preview live, and download a PDF.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (cvengine.space)

1. **Push your code to GitHub** (or GitLab / Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "CVEngine initial"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub and click **Import** next to your CVEngine repo
   - Leave **Framework Preset** as Next.js (auto-detected)
   - Click **Deploy**

3. **Add your domain**
   - After deploy, open the project → **Settings** → **Domains**
   - Add **cvengine.space** and follow the DNS steps (add the CNAME or A record your registrar shows)

4. **Optional env (recommended)**
   - **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SITE_URL` = `https://cvengine.space` (so all links use your domain)

Redeploys happen automatically on every push to `main`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Olistade videosidor

1. Öppna [Sanity Studio](https://next-portfolio-fawn-zeta.vercel.app/studio).
2. Välj **Videosidor (olistade)** och skapa ett dokument.
3. Fyll i **Titel** och **Sidnamn efter /**. Exempel: `min-film` ger
   `https://next-portfolio-fawn-zeta.vercel.app/min-film`. Skriv inte hela URL:en.
   **Generate** ger ett förslag från titeln; du kan ändra det själv.
4. Ladda upp en MP4 (H.264) eller WebM i **Video**. Omslagsbild och beskrivning är valfria.
5. Klicka **Publish** och öppna adressen. Nya sidor och ändringar kräver ingen ny driftsättning.

Sidnamn måste vara unika och innehålla små bokstäver a–z, siffror och bindestreck.
`studio`, `api` och `images` är reserverade. Ändrar du namnet slutar den gamla
adressen fungera. Välj **Unpublish** för att ta bort sidan från webben.

Videosidor använder en separat dokumenttyp (`videoPage`) och hämtas endast på
`/[slug]`. De ingår inte i startsidans projekt, navigering eller någon sitemap.
De skickar `noindex, nofollow, noarchive`; inga video-adresser listas i robots.txt.
Endast publicerat innehåll med en uppladdad videofil visas. Okända adresser och
avpublicerade sidor ger 404. Sidorna och filerna är olistade, inte åtkomstskyddade:
den som har länken kan öppna dem.

Studio och servern använder samma befintliga `NEXT_PUBLIC_SANITY_PROJECT_ID` och
`NEXT_PUBLIC_SANITY_DATASET`. Ett privat dataset behöver även
`SANITY_API_READ_TOKEN` på servern. Inga nya nycklar behövs för funktionen.

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

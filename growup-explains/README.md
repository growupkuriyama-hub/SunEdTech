# Growup Explains

An independent English-language educational journal: *Good questions deserve better answers.*

This is a standalone **static HTML/CSS/JS** site inside the existing `SunEdTech` repository. The directory is independent and does not modify other projects.

## Initial content

- Homepage with subject filters
- Three original science/math explainers
  - `articles/copper-sulfuric-acid/`
  - `articles/water-steam-volume/`
  - `articles/sum-of-cubes/`
- Working three-case interactive acid-reaction explorer
- About page and resources-in-development page
- Responsive layout, keyboard-friendly controls, metadata, favicon and basic security headers

## Publish using Cloudflare Pages (one-time user setup)

1. Cloudflare Dashboard → Workers & Pages → Create application → Pages → **Connect to Git**.
2. Connect GitHub and choose **growupkuriyama-hub/SunEdTech**.
3. Production branch: **main**.
4. Framework preset: **None**.
5. Root directory (advanced): **growup-explains**.
6. Build command: leave blank (or `exit 0`).
7. Build output directory: **.** (one dot; relative to the project root).
8. Save and Deploy. Cloudflare will provide a `*.pages.dev` URL.
9. Recommended optional build watch include path: `growup-explains/**` to avoid triggering a build when other SunEdTech projects change.

After that, edits pushed to this directory will deploy automatically. The site does not require npm, Node, APIs or a paid hosting plan.

## Notes

- First practice pack is linked to Payhip: https://payhip.com/b/4Bnzc. The product needs an independent seller-side checkout / download smoke test before promotion.
- Online free sample: `resources/free-redox-sample/` with five questions and revealable answers; browser print supports Save as PDF.
- Only the seller can verify the Payhip buyer download path and payout verification; the `Buy Now` link itself is not proof of successful delivery.
- Once the production domain is known, add canonical URLs, Open Graph images and an accurate sitemap.
- Published text is AI-assisted; the owner should review and approve content before promoting it.
- Do not put passwords, payment credentials, student information or private research in this public repository.

## Adding another article

1. Create `articles/<slug>/index.html` using a previous article as a starting point.
2. Add a link to it in `index.html` (and update the article count if needed).
3. Commit to main. Cloudflare Pages will update the site automatically.

Created November 2026.

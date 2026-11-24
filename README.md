# AVEROS — Beta starter

A mobile-first static front-end foundation for AVEROS, a creative marketplace.

## Included in this first build
- Responsive homepage and navigation
- Artwork discovery grid with category filters and text search
- Artwork detail dialog
- Save/favourites using browser local storage
- Artist introduction and beta-interest email link

## Run locally
Open `index.html` in a browser. For best results, use a local static server or the Acode preview feature.

## Deploy to GitHub Pages
1. Create a new public GitHub repository named `averos`.
2. Upload `index.html`, `styles.css`, `app.js`, and this README to the repository root.
3. In the repository, open Settings → Pages.
4. Choose Deploy from a branch, select `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to publish the site.

## Important beta limitations
This is the first front-end milestone, not yet a production marketplace. The sample artwork and artist names are demonstration content; replace them with permissioned work before public launch. Favourites are saved only in the visitor's browser. Artist registration, secure accounts, image uploads, database-backed portfolios, moderation and enquiry management require a backend integration, planned for the next milestone.

## Next milestone
Connect Supabase for authentication, database records and artwork storage. Do not put service-role keys or private credentials in browser code.

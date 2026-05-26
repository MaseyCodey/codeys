# KeyForge Demo Lab

A super aesthetic GitHub Pages website that generates Steam-style **fake demo keys**.

This is only for UI testing, fake storefronts, game menus, dashboards, and demos.

It does **not**:
- validate keys
- redeem keys
- test keys against Steam
- scrape or brute force
- contact Steam or Valve

## Files

- `index.html` - website
- `style.css` - aesthetic styling
- `script.js` - browser demo key generator
- `scripts/generate_keys.py` - scheduled fake key batch generator
- `.github/workflows/generate-demo-keys.yml` - GitHub Actions schedule
- `data/generated-keys.json` - generated batch output

## GitHub setup

1. Create a new GitHub repo.
2. Upload all files from this folder.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Go to **Actions**.
6. Open **Generate demo keys**.
7. Click **Run workflow** once.
8. After that, it will run every 30 minutes.

## Important

GitHub Actions is not a true 24/7 server. It runs scheduled jobs. Long infinite loops are not the right setup and may be stopped by GitHub.

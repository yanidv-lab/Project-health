# Plant-Based Functional Mixtures Website 🌿

A responsive, interactive Hebrew (RTL) website showcasing ~30 evidence-based plant mixtures (drinks, soups, stews, snacks) for various health goals. All content is driven by a single CSV data source.

## Features

- 🎠 **Carousel & Grid views** – Browse mixtures with swipe support on mobile
- 🔍 **Filter by health goal** – Sleep, anxiety, memory, blood pressure, digestion, and more
- 📋 **Detailed modal** – Full recipe info with ingredients, preparation, evidence, and scientific references
- 🔗 **Clickable references** – PubMed, PMC, DOI, and journal links auto-detected
- 📱 **Fully responsive** – Mobile-first design with RTL Hebrew layout
- ⚡ **Static site** – No backend required, works on GitHub Pages

## Quick Start

### Run Locally

1. You need a local HTTP server (CSV fetch requires it). Use any of:

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if you have npx)
   npx serve .

   # VS Code Live Server extension
   ```

2. Open `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. Push the entire repository to GitHub.
2. Go to **Settings → Pages**.
3. Set source to **main branch**, root `/`.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

## Updating the Data

1. Edit `data/plant_mixtures_recipes.csv` (the single source of truth).
2. Add new rows following the existing column format.
3. The UI adapts automatically — no code changes needed.

### CSV Columns

| Column | Description |
|--------|-------------|
| `recipe_id` | Unique ID (e.g., `R1`, `R31`) |
| `name_he` | Hebrew recipe name |
| `name_en` | English recipe name |
| `type` | Category (`hot_drink`, `cold_drink`, `soup`, etc.) |
| `ingredients` | Semicolon-separated ingredient list |
| `preparation` | Preparation instructions |
| `frequency_duration` | Suggested usage frequency |
| `targets` | Semicolon-separated health targets |
| `evidence_summary` | Plain-language evidence summary |
| `main_ingredients_with_evidence` | Key evidence-backed ingredients |
| `primary_refs` | PubMed IDs, PMC IDs, DOIs, or URLs |

## Project Structure

```
├── index.html                          # Main entry point
├── data/
│   └── plant_mixtures_recipes.csv      # Data source (CSV)
├── styles/
│   └── main.css                        # RTL mobile-first stylesheet
├── scripts/
│   └── app.js                          # CSV parsing, UI logic
├── assets/
│   └── images/                         # (Optional) local images
└── README.md
```

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Google Fonts (Rubik, Noto Sans Hebrew)
- Unsplash for recipe images (runtime, no API key)
- No build step required

## License

This project is for educational and informational purposes. The health information is based on published scientific literature and does not constitute medical advice.

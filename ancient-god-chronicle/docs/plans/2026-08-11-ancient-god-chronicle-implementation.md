# Ancient God Chronicle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Build a searchable static “古神编年史” database website from the 0.3.2.0 workbook.

**Architecture:** A Python extraction utility converts workbook cells, embedded drawing images, and VML comment images into normalized browser data and local assets. A dependency-free HTML/CSS/JavaScript frontend renders navigation, filters, cards, and a responsive detail drawer.

**Tech Stack:** Python 3 + openpyxl/OOXML parsing; semantic HTML; modern CSS; vanilla JavaScript.

---

### Task 1: Workbook extraction

**Files:**
- Create: `tools/extract_workbook.py`
- Create: `data.js`
- Create: `assets/`

1. Parse workbook sheets and sheet relationships.
2. Map anchored icons and VML note images to cells.
3. Normalize equipment, skills, runes, rune words, base gear and consumables.
4. Export browser-ready data and only the referenced image assets.
5. Verify entity counts, names and asset references.

### Task 2: Application shell and visual system

**Files:**
- Create: `index.html`
- Create: `styles.css`

1. Build accessible header, navigation, hero, filter bar, catalog, detail drawer and mobile navigation.
2. Implement the dark teal/red/gold “ancient archive” design system.
3. Add responsive layouts for desktop, tablet and mobile.

### Task 3: Catalog interactions

**Files:**
- Create: `app.js`

1. Implement global search, category switching, chips, sorting and reset.
2. Render summary statistics and result cards.
3. Implement keyboard-accessible detail drawer and URL hash state.
4. Add empty states and resilient image fallbacks.

### Task 4: Verification

1. Run the extractor and verify generated data.
2. Check JavaScript and Python syntax.
3. Start a local server and exercise search, filters and detail opening.
4. Check missing asset references, console errors and mobile overflow.

# YouTube De-Algo

**Stop the Habit Loop. Use YouTube with Intention.**

YouTube is an incredible tool for learning and entertainment, but its algorithm is engineered to capture and hold your attention as long as possible. We often find ourselves in a "habit loop": opening a new tab, typing "y", hitting enter, and suddenly 30 minutes are gone because of a catchy thumbnail.

**YouTube De-Algo** is a lightweight, aggressive browser extension designed to break this cycle entirely. It strips YouTube down to its core utility: a search engine for videos.

## Why is this different from other extensions?

There are many extensions that hide recommendations, but they often fail to address the core issue: **The unconscious habit of opening YouTube in the first place.**

If you just hide the feed, you might still open the page and stare at a blank screen out of pure muscle memory. **YouTube De-Algo** solves this with the **Intent Filter**.

When you open YouTube's homepage, before you can do *anything*, the screen goes dark and asks you one question:
**"What do you want to do here today?"**

You are forced to type exactly what you are looking for into a dedicated search bar. If you don't know what you want to watch, you have no reason to be there. 

## Features

* **The Intent Filter**: An overlay that blocks the empty homepage and forces you to type a search query.
* **Complete Algorithmic Purge**: Hides the Homepage Feed, Sidebar Recommendations, and End-Screen video suggestions.
* **Zero Shorts**: Removes the "Shorts" tab, sidebar links, shelves, and any URL associated with YouTube Shorts.
* **Aggressive Autoplay Disabler**: Actively clicks off the "Autoplay" toggle and cancels the "Up Next" countdown timer.
* **No "Discover" Temptations**: Removes algorithmic side menus like Trending, Music, Gaming, and Podcasts.

## Installation

Currently, this extension is loaded manually via Developer Mode. 

### Chrome / Brave / Edge
1. Download or clone this repository to your computer.
2. Open your browser and navigate to the Extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Toggle on **Developer mode** (usually in the top right corner).
4. Click the **Load unpacked** (Entpackte Erweiterung laden) button in the top left.
5. Select the `youtube-de-algo-ext` folder you downloaded.

### Firefox
1. Download or clone this repository to your computer.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click on **Load Temporary Add-on...** (Temporäres Add-on laden...).
4. Select the `manifest.json` file inside the `youtube-de-algo-ext` folder.
*(Hinweis: Temporäre Add-ons in Firefox werden nach einem Neustart des Browsers entfernt, bis sie offiziell signiert sind.)*

### Aktivierung
**6. Öffne YouTube und genieße deine fokussierte, ungestörte Erfahrung!**

## Privacy

This extension runs completely locally. It contains no tracking, no analytics, and does not send your data anywhere. It only uses simple CSS to hide elements and basic JavaScript to manage the Intent Filter and disable Autoplay. 

---
*Take back control over your attention.*

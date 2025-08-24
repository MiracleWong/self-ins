# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal website project for creating static HTML resume websites. The project contains resume and job description documents that are used to generate customized personal websites.

## Common Commands

### Development Server
```bash
# Start Python HTTP server for local development (Windows)
python -m http.server 8000
# Access at http://localhost:8000

# Alternative with Python 3
python3 -m http.server 8000
```

### File Structure
- `docs/resume.md` - Personal resume in Markdown format
- `docs/jd.md` - Target job description
- `website-developer-style.md` - Output style configuration for personal website development workflow
- Generated website files will be placed in the root directory:
  - `index.html` - Main HTML file
  - `styles.css` - CSS styling
  - `script.js` - JavaScript functionality

## Development Notes
- This project focuses on creating static HTML websites using pure HTML, CSS, and JavaScript
- The website should be responsive and optimized for modern browsers
- Use Python's built-in HTTP server for local testing on Windows systems
- All generated code should be production-ready and immediately deployable
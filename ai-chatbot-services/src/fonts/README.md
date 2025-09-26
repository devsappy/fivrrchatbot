# Font Installation Instructions

## Bitcount Single Ink Font

The navbar logo uses the **Bitcount Single Ink** font.

### Option 1: Purchase the Font
1. Purchase Bitcount Single Ink from a font marketplace
2. Download the font files (preferably .woff2, .woff, and .ttf formats)
3. Place the font files in this directory with these names:
   - BitcountSingleInk.woff2
   - BitcountSingleInk.woff
   - BitcountSingleInk.ttf

### Option 2: Use the Fallback Fonts
If you don't have the Bitcount Single Ink font, the logo will automatically use these fallback fonts in order:
1. **Orbitron** - A futuristic, geometric font (loaded from Google Fonts)
2. **Bebas Neue** - A bold, condensed sans-serif (loaded from Google Fonts)
3. System sans-serif fonts

The fallback fonts provide a similar modern, tech-oriented aesthetic to Bitcount Single Ink.

### Current Implementation
The logo text "CHATTERIFY" in the navbar now:
- Uses the `logo-bitcount` CSS class
- Displays in uppercase
- Has increased letter spacing for better readability
- Maintains the gradient effect (white to gray)
- Scales up slightly from 2xl to 3xl for better prominence

### Testing the Font
After adding the font files:
1. Restart the development server
2. Clear your browser cache
3. The logo should now display with the Bitcount Single Ink font
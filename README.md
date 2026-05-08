# AuraLogic 灵觉星盘

A modern destiny chart application combining Eastern wisdom (Ziwei Duoshu & Ba Zi) with AI-powered insights.

![AuraLogic](https://img.shields.io/badge/AuraLogic-Destiny%20Chart-7055B8?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

- **Ziwei Duoshu (紫微斗数)** - Traditional Chinese astrology with 12 palaces
- **Ba Zi (八字四柱)** - Four Pillars of Destiny analysis
- **Real-time Chart Generation** - Generate accurate destiny charts from birth info
- **Dark Cosmic Theme** - Beautiful dark UI with purple and gold accents
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chenyu86214-eng/AuraLogic.git

# Navigate to the project directory
cd AuraLogic/web-app/auralogic

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Production files will be generated in the `dist` folder.

## 📁 Project Structure

```
auralogic/
├── src/
│   ├── components/
│   │   ├── Layout/          # App layout with navigation
│   │   ├── BirthInput/      # Birth information form
│   │   ├── AstroChart/      # Ziwei chart visualization
│   │   └── DailyFortune/    # Daily fortune display
│   ├── lib/
│   │   ├── astro/
│   │   │   ├── ziwei.js     # Ziwei Duoshu calculations (iztro)
│   │   │   └── bazi.js      # Ba Zi calculations (lunar-javascript)
│   │   └── utils/           # Utility functions
│   ├── pages/
│   │   ├── Home.jsx         # Home dashboard
│   │   ├── Input.jsx        # Birth info input page
│   │   └── Chart.jsx        # Detailed chart page
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json
```

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **iztro** - Ziwei Duoshu calculation library
- **lunar-javascript** - Chinese lunar calendar library

## 📖 Usage

### Enter Birth Information

1. Click "Enter Birth Info" or navigate to the Input page
2. Fill in:
   - Name (optional)
   - Birth date (required)
   - Birth hour (required, 0-23)
   - Gender (required)
   - Calendar type (Solar/Lunar)
   - Location (optional, for true solar time adjustment)
3. Click "Generate Your Destiny Chart"

### View Your Chart

- **Home Page**: Overview with energy score, personality insights, and daily fortune
- **Chart Page**: Detailed view with:
  - Ziwei Duoshu tab - 12 palaces with main stars
  - Ba Zi tab - Four pillars of destiny

## 🎨 Design Tokens

The app uses a cosmic dark theme with purple and gold accents:

| Token | Color | Usage |
|-------|-------|-------|
| void | #0D0A1A | Background |
| violet | #7055B8 | Primary accent |
| gold | #F2D97A | Highlights |
| lavender | #C4B0E8 | Text accent |
| lilac | #9B84D4 | Secondary accent |

## 📱 Mobile Support

The app is fully responsive and works on mobile devices. For the best experience on iOS:

1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

## 🔮 Libraries Used

### iztro
Ziwei Duoshu calculation library by SylarLong.
- GitHub: https://github.com/SylarLong/iztro
- Documentation: https://docs.iztro.com/

### lunar-javascript
Chinese lunar calendar library by 6tail.
- GitHub: https://github.com/6tail/lunar-javascript

## 📄 License

MIT License

## 🙏 Acknowledgments

- Original HTML prototype designed with Claude
- Icons and visual elements inspired by traditional Chinese astrology
- Built with modern web technologies for the best user experience

---

**Note**: This app is for entertainment and self-reflection purposes only. The readings should not be taken as professional medical, financial, or legal advice.

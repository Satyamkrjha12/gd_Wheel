<<<<<<< HEAD
# GD Spin Wheel · React Edition

A fully-featured React conversion of the GD Spin Wheel application with responsive HTML5 Canvas spinning wheel, countdown timer with Web Audio API chime, structured GD pointers, and campus placement guidelines.

---

## 🚀 Features

- **Interactive Canvas Wheel**: 16 topics with smooth cubic-bezier ease-out spin animation, high-DPI crisp rendering, and topic tracking.
- **Dynamic Topic & Pointers**: Displays category, core prompt, and 4-part structured pointers (`One side`, `Other side`, `Angle`, `Balanced close`).
- **Discussion Timer**: 5, 10, and 15-minute presets with real-time progress bar, phase indicators (Opening, Body, Close, Wrap-up), warning color, and Web Audio API chime.
- **GD Strategy Framework**: Structured cheat sheet (`SPEAK` principle, opening/body/close, Do's & Don'ts).
- **Topic Browser**: All 16 topics clickable for review, with visual strikethrough for topics already spun.
- **Theming**: Automatic Dark / Light mode with user toggle (`🌓 System`, `☀️ Light`, `🌙 Dark`).

---

## 🛠️ Project Structure

```text
GD Wheel/
├── index.html                 # Entry HTML
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── standalone.html            # Standalone zero-install React HTML version
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Modular application root
    ├── App.css                # App styles with CSS variables & responsive layout
    ├── GDSpinWheel.jsx        # Complete standalone all-in-one React component
    ├── data/
    │   └── topics.js          # Topic dataset, colors, and labels
    └── components/
        ├── SpinWheel.jsx      # Canvas wheel & animation
        ├── TopicCard.jsx      # Selected topic & structured arguments
        ├── Timer.jsx          # Countdown timer, progress bar & audio
        ├── GdStructure.jsx    # GD rules & framework
        └── TopicList.jsx      # All topics chip selector
```

---

## 💻 Running the App

### Option 1: Standard Vite Development Server

Run from the project directory:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

---

### Option 2: Copy-Paste Single Component (`GDSpinWheel.jsx`)

If you already have an existing React or Next.js app, copy `src/GDSpinWheel.jsx` and `src/App.css` directly into your project:

```jsx
import GDSpinWheel from "./GDSpinWheel";
import "./App.css";

export default function Page() {
  return <GDSpinWheel />;
}
```

---

### Option 3: Double-Click `standalone.html`

Open `standalone.html` directly in your browser without any terminal or node setup required.
=======
# gd_Wheel
An Application to train your Group Discussion Skills
>>>>>>> 71f7caf40a4333d670ea8fd7481075f09553b624

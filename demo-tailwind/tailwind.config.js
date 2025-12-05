// In a real project, you'd use:
// import effectiveShadow from "@effective/shadow/tailwind"
//
// For this demo, we import from the local source:
import effectiveShadow from "../dist/tailwind.js"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [effectiveShadow]
}


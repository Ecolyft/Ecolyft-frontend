/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: "#1A2B4C",
                    blue: "#3B82F6",
                    accent: "#10B981", // Emerald green for Eco theme
                    light: "#F3F4F6",
                    dark: "#0F172A",
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Outfit", "sans-serif"],
            }
        },
    },
    plugins: [],
}

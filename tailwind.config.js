/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 }
        }
      },
      colors: {
        primary: {
          light: "#60A5FA", // blue-400
          DEFAULT: "#3B82F6", // blue-500
          dark: "#2563EB" // blue-600
        },
        background: {
          light: "#F9FAFB", // gray-50
          DEFAULT: "#111827", // gray-900
          dark: "#030712" // gray-950
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "none",
              fontWeight: "500"
            },
            strong: {
              color: "inherit"
            },
            h1: {
              color: "inherit"
            },
            h2: {
              color: "inherit"
            },
            h3: {
              color: "inherit"
            },
            h4: {
              color: "inherit"
            }
          }
        }
      },
      animationDelay: {
        2000: "2000ms"
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".animation-delay-2000": {
          "animation-delay": "2000ms"
        }
      };
      addUtilities(newUtilities);
    }
  ]
};

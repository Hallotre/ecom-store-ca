module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A', // Deep navy blue as primary color
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1', 
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A', // Same as DEFAULT
          950: '#020617',
        },
        accent: '#3B82F6', // Accent color for CTAs and highlights
        danger: '#EF4444', // Red for errors, discounts, etc.
        success: '#10B981', // Green for success messages
        text: {
          primary: '#0F172A', // Deep blue-gray for main text
          secondary: '#475569', // Medium gray for secondary text
          muted: '#64748B',    // Light gray for less important text
        },
        background: {
          light: '#FFFFFF',    // White background
          default: '#F8FAFC',  // Very light gray background
          contrast: '#F1F5F9', // Slight contrast for alternating elements
        },
      },
      borderRadius: {
        'modern': '0.5rem', // Slightly rounded corners for main elements
        'modern-sm': '0.375rem', // Smaller rounded corners for buttons and inputs
      },
      boxShadow: {
        'modern': '0px 1px 3px rgba(0, 0, 0, 0.08)',
        'modern-hover': '0px 4px 6px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.08)',
      },
    },
    fontFamily: {
      sans: [
        'Inter', 
        'system-ui',
        '-apple-system', 
        'Segoe UI', 
        'sans-serif',
      ],
    },
  },
  plugins: [],
}
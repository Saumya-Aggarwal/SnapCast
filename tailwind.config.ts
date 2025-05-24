/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        blue: {
          100: '#2c325d',
        },
        light: {
          100: '#fff8fb',
        },
        dark: {
          100: '#212121',
        },
        gray: {
          20: 'rgba(108, 102, 133, 0.2)',
          25: 'rgba(108, 102, 133, 0.25)',
          40: 'rgba(58, 56, 77, 0.04)',
          100: '#6c6685',
        },
        pink: {
          10: '#ffeef5',
          100: '#ff4393',
        },
        orange: {
          100: '#fe6247',
        },
      },
      fontSize: {
        '28': '1.75rem',
      },
      boxShadow: {
        '10': '0px 6px 24px 0px rgba(0, 0, 0, 0.1)',
        '15': '0px 8px 24px 0px rgba(0, 0, 0, 0.15)',
        '20': '0px 10px 30px 0px rgba(0, 0, 0, 0.2)',
        'inset-20': '0px 10px 40px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 1px #d7d5dd inset',
      },
      borderRadius: {
        '18': '18px',
        '20': '20px',
        '4xl': '2rem',
      },
      backgroundImage: {
        'radial-100': `radial-gradient(
          79.36% 59.94% at 101.94% -1.83%,
          #ffe5f0 0%,
          #fff 42%,
          rgba(0, 0, 0, 0) 42%
        ),
        radial-gradient(
          60.29% 53.62% at 0% 100%,
          #ffd8e9 0%,
          #fff 42%,
          rgba(0, 0, 0, 0) 42%
        )`,
      },
      spacing: {
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '12.5': '3.125rem',
      },
      fontFamily: {
        'satoshi': 'var(--font-satoshi)',
        'karla': 'var(--font-karla)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
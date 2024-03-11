const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

const screens = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px'
}

const colors = {
  transparent: 'transparent',
  gray: {
      0: "#000000",
      1: "#080808",
      2: "#101010",
      3: "#181818",
      4: "#202020",
      5: "#282828",
      6: "#303030",
      7: "#383838",
      8: "#404040",
      9: "#484848",
      10: "#505050",
      11: "#585858",
      12: "#606060",
      13: "#686868",
      14: "#696969",
      15: "#707070",
      16: "#787878",
      17: "#808080",
      18: "#888888",
      19: "#909090",
      20: "#989898",
      21: "#A0A0A0",
      22: "#A8A8A8",
      23: "#A9A9A9",
      24: "#B0B0B0",
      25: "#B8B8B8",
      26: "#BEBEBE",
      27: "#C0C0C0",
      28: "#C8C8C8",
      29: "#D0D0D0",
      30: "#D3D3D3",
      31: "#D8D8D8",
      32: "#DCDCDC",
      33: "#E0E0E0",
      34: "#e8e8e8",
      35: "#F0F0F0", 
      36: "#F5F5F5",
      37: "#F8F8F8",
      38: "#FFFFFF"
  },
  blue: {
      900: "#1B4F72",
      850: "#21618C",
      800: "#2874A6",
      750: "#3282B8",
      700: "#488FB1",
  },
  darkbg: {
      100: "#181818", // gray-3
      200: "#202020", // gray-4
      300: "#282828", // gray-5
      400: "#303030", // gray-6
      500: "#383838", // gray-7
      600: "#404040", // gray-8
  },
  lightbg: {
      100: "#e8e8e8", // gray-34
      200: "#E0E0E0", // gray-33
      300: "#D8D8D8", // gray-31
      400: "#D3D3D3", // gray-30
      500: "#D0D0D0", // gray-29
      600: "#C8C8C8", // gray-28
  },
  darktext: {
      100: "#D3D3D3", // gray-30
      200: "#BEBEBE", // gray-26
      300: "#787878", // gray-16
  },
  lighttext: {
      100: "#505050", // gray-10
      200: "#787878", // gray-16
      300: "#989898", // gray-20
  },
  dark: {
      'invalid': "#9d0050",
      'valid': "#1C7947"
  },
  light: {
      'invalid': "#c20055",
      'valid': "#00a86f" // green-600
  }
}

const borderRadius = {
  'none': '0',
  'sm': '.125rem',
  DEFAULT: '.25rem',
  'lg': '.5rem',
  'full': '9999px',
}

const fontFamily = {
  sans: ['Poppins', ...defaultTheme.fontFamily.sans], // default font family
  alt: ['Montreau'] // for ex.
}

// const spacing = {
//   sm: 'var(--spacing-sm)',
//   md: 'var(--spacing-md)',
//   lg: 'var(--spacing-lg)',
//   xl: 'var(--spacing-xl)'
// }

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    screens,
    colors,
    // spacing,
    fontFamily,
    borderRadius,
    extend: {
      boxShadow: {
        'custom-1': '0 3px 10px var(--p-box-shadow)'
      },
      screens: {
        'short': { 'raw': '(max-height: 699px)' },
        'tall': { 'raw': '(min-height: 700px)' }
      }
    }
  },
  plugins: [

  ],
  // corePlugins: {
  //   preflight: false,
  // }
};

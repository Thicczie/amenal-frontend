/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors: {
        // Add the important colors from your variables.css here
        // primary colors
        'ion-primary': {
          DEFAULT: '#3880ff',
          contrast: '#ffffff',
          shade: '#3171e0',
          tint: '#4c8dff',
        },
        'ion-secondary': {
          DEFAULT: '#3dc2ff',
          contrast: '#ffffff',
          shade: '#36abe0',
          tint: '#50c8ff',
        },
        'ion-tertiary': {
          DEFAULT: '#5260ff',
          contrast: '#ffffff',
          shade: '#4854e0',
          tint: '#6370ff',
        },
        'ion-success': {
          DEFAULT: '#2dd36f',
          contrast: '#ffffff',
          shade: '#28ba62',
          tint: '#42d77d',
        },
        'ion-warning': {
          DEFAULT: '#ffc409',
          contrast: '#000000',
          shade: '#e0ac08',
          tint: '#ffca22',
        },
        'ion-danger': {
          DEFAULT: '#eb445a',
          contrast: '#ffffff',
          shade: '#cf3c4f',
          tint: '#ed576b',
        },
        'ion-dark': {
          DEFAULT: '#222428',
          contrast: '#ffffff',
          shade: '#1e2023',
          tint: '#383a3e',
        },
        'ion-medium': {
          DEFAULT: '#92949c',
          contrast: '#ffffff',
          shade: '#808289',
          tint: '#9d9fa6',
        },
        'ion-light': {
          DEFAULT: '#f4f5f8',
          contrast: '#000000',
          shade: '#d7d8da',
          tint: '#f5f6f9',
        },

        'ion-bg-primary': '#fafafa',
        'ion-bg-secondary': '#e4e5f1',
        'ion-bg-tertiary': '#d2d3db',
        'ion-bg-success': '#9394a5',
        'ion-bg-warning': '#484b6a',
        'ion-item-background': '#1e1e1e',

        'ion-toolbar-background': '#1f1f1f',

        'ion-tab-bar-background': '#1f1f1f',

        'ion-card-background': '#1e1e1e',
        // Feel free to add more colors as needed
      },
    },
  },
  plugins: [],
}

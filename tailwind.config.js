/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: { // extend serve ad AGGIUNGERE o OVERRIDARE; se non lo usassi e' come se dicessi a Tailwind "guarda, mi bastano i seguenti colori o font", quindi se non usassi "extend" sarebbe "esclusivo"

      // --------- Functional colors --------- //
      // QUA DENTRO butto tutti i colori che mi danno i designerz. Dagli dei nomi FUNZTIONALI
      // OCCHIO che NON posso definirne uno chiamato "primary", xke va in conflitto con quello di nuxt-ui, quindi uso "brand".
      // nota: se vuoi generare colori in piu, usa https://uicolors.app/
      colors: {
        brand: { // aka "primary"
          '50': '#fff2fd',
          '100': '#ffe3fc',
          '200': '#ffc6f8',
          '300': '#ff99ed',
          '400': '#ff5de2',
          '500': '#ff21df',
          '600': '#ff00ea',
          '700': '#cf00b9',
          '800': '#a90096',
          '900': '#890677',
          DEFAULT: '#ff21df', // nota DEFAULT VA SEMPRE MESSO, ed e' === 500
        },
        secondary: { // blue
          '50': '#edfcff',
          '100': '#d6f6ff',
          '200': '#b5f1ff',
          '300': '#83eaff',
          '400': '#48dbff',
          '500': '#1ec0ff',
          '600': '#06a4ff',
          '700': '#0091ff',
          '800': '#086ec5',
          '900': '#0d5e9b',
          DEFAULT: '#1ec0ff',
        },
        neutral: {
          '50': '#f5f5f6',
          '100': '#e6e6e7',
          '200': '#cfcfd2',
          '300': '#afaeb2',
          '400': '#87858b',
          '500': '#6c6a70',
          '600': '#626066',
          '700': '#4f4d51',
          '800': '#454347',
          '900': '#3c3b3e',
          DEFAULT: '#6c6a70',
        },
        success: {
          500: '#00ff04',
          DEFAULT: '#00ff04',
        },
        danger: {
          500: '#ff000d',
          DEFAULT: '#ff000d',
        },
      },

      // Questa soluzione e' se definisco variabili CSS dentro /assets/css/tailwind.css
      // colors: {
        // primary: 'rgb(var(--color-primary) / <alpha-value>)',
        // secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      // },
    },

    // In sto caso, siccome non uso "extend" sto dicendo a tailwind "usami SOLO sti spazi"
    // Nota: NON sto usando la sua notazione in numeri, uso 
    // spacing: {
    //   0: '0px',
    //   1: '1px',
    //   xs: '4px',
    //   sm: '8px',
    //   md: '12px',
    //   lg: '16px',
    //   xl: '24px',
    // },

    // stessa roba x i breakpoints: (nota che se faccio cosi' dovrei attivare /assets/css/tailwind.css)
    // screens: {
    //   'sm': 'var(--bp-sm)',
    //   'md': 'var(--bp-md)',
    //   'lg': 'var(--bp-lg)',
    // },

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};

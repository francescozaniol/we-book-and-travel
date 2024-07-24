export default defineAppConfig({
  ui: {
    // global: true, // boh

    // NOTA: da questo file posso cambiare, di colri, SOLO "primary" e "grey", xke TUTTI i componenti sono basati solo su questi due colori (di default). Se voglio aggiungere colori, devo farlo da tailwind.config.js
    primary: 'brand', // nota: brand e neutral sono i colori "funzionali" definiti dentro tailwind.config.js
    grey: 'neutral',

    button: { // override dello stile di default del bottone
      default: {
        size: 'xl',
        color: 'secondary',
      },
    },

    icons: {
      dynamic: true, // questo forza l'utilizzo di @nuxt/icon, che e' na bomba
    },
  },
});
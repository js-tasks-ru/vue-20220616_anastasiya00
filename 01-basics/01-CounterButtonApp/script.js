import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const vm = createApp({
  data() {
    return {
      cnt: 0,
    };
  },
}).mount('#app');

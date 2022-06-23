import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const vm = createApp({
  data() {
    return {
      left: 0,
      right: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      const { left, right } = this;
      
      switch (this.operator) {
        case 'sum': return left + right;
        case 'subtract': return left - right;
        case 'multiply': return left * right;
        case 'divide': return left / right;
      }
    },
  },
}).mount('#app');

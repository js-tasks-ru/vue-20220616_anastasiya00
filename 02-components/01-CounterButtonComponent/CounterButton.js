import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  // Шаблон потребуется отредактировать
  template: `<button @click="$emit('update:count', count + 1)" type="button">{{ count }}</button>`,

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
});

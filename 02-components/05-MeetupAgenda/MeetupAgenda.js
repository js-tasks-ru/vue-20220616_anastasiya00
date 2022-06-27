import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  template: `
    <ul class="agenda">
      <li v-for="agendaItem of agenda" class="agenda__item">
        <meetup-agenda-item :agenda-item="agendaItem" />
      </li>
    </ul>`,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
});

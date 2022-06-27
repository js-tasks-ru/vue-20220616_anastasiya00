import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView'

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  template: `
    <div class="page-meetup">
      <ui-container v-if="loading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="error">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>

      <meetup-view v-else-if="meetup" :meetup="meetup" />
    </div>`,

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      loading: false,
      error: null,
    }
  },

  watch: {
    meetupId: {
      handler(newQuestion) {
        this.fetchMeetup();
      },
      immediate: true
    },
  },

  methods: {
    async fetchMeetup() {
      this.loading = true;
      this.error = null;

      try {
        this.meetup = await fetchMeetupById(this.meetupId);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
});

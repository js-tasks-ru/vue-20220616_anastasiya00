import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const vm = createApp({
  data() {
    return {
      id: null,
      meetup: null,
    };
  },

  watch: {
    async id() {
      this.meetup = await fetchMeetupById(this.id);
    },
  },

  computed: {
    cnt() {
      return 5;
    },
    meetupTitle() {
      return this.meetup?.title;
    },
  },
}).mount('#app');

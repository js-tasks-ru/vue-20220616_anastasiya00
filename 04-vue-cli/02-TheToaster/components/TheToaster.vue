<template>
  <div class="toasts">
    <UiToast v-for="{ id, type, icon, text } of toasts" :key="id"
             :type="type" :icon="icon" :text="text" />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  data() {
    return {
      toasts: [],
      id: 0,
    };
  },

  methods: {
    addToast({ type, icon, text }, timeout=5000) {
      const id = this.id++;
      this.toasts.push({ id, type, icon, text });

      setTimeout(() => this.close(id), timeout);
    },

    success(text) {
      const type = 'success';
      const icon = 'check-circle';
      this.addToast({ type, icon, text });
    },

    error(text) {
      const type = 'error';
      const icon = 'alert-circle';
      this.addToast({ type, icon, text });
    },

    close(id) {
      const index = this.toasts.findIndex(item => item.id === id);
      if (index !== -1) this.toasts.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>

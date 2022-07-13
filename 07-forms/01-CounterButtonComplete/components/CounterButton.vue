<template>
  <button @click="$emit('update:count', ++localCount)">
    {{localCount}}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: this.count,
    }
  },

  watch: {
    count() {
      this.localCount = this.count;
    },
  },

  emits: ['update:count'],
};
</script>

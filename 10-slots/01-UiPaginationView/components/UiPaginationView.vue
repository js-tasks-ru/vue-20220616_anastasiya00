<template>
  <div class="pagination-container">
    <slot v-for="item in limitedItems" v-bind="{ item }" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    limitedItems() {
      const { page, perPage } = this;

      const start = (page - 1) * perPage;
      const end = start + perPage;

      return this.items.slice(start, end);
    },
  }
};
</script>

<style></style>

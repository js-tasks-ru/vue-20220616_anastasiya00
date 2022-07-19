<template>
  <slot v-if="pending" name="pending" />
  <slot v-else-if="result" name="fulfilled" v-bind="{ result }" />
  <slot v-else name="rejected" v-bind="{ error }" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      pending: false,
      result: null,
      error: null,
    }
  },

  watch: {
    promise: {
      async handler() {
        this.pending = true;
        this.result = null;
        this.error = null;

        try {
          this.result = await this.promise;
        }
        catch (e) {
          this.error = e;
        }
        finally {
          this.pending = false;
        }
      },
      immediate: true
    }
  },
};
</script>

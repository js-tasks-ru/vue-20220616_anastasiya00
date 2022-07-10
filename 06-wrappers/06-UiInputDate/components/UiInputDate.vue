<template>
  <ui-input :model-value="proxyModelValue"
            @change="update" :type="type">
    <template v-for="(slot, index) of Object.keys($slots)" :key="index" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import dayjs from 'dayjs';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: Number,
  },

  emits: ['update:modelValue'],

  computed: {
    proxyModelValue() {
      if (!this.modelValue) return '';
      const value = this.modelValue - (dayjs().utcOffset() * 60 * 1000);
      switch (this.type) {
        case 'date': return dayjs(value).format('YYYY-MM-DD');
        case 'time': return dayjs(value).format('HH:mm');
        case 'datetime-local': return dayjs(value).format('YYYY-MM-DDTHH:mm');
      }
    },
  },

  methods: {
    update(e) {
      this.$emit('update:modelValue', e.target.valueAsNumber)
    },
  },
};
</script>

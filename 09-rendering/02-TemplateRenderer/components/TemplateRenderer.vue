<script>
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    component() {
      return defineComponent({
        render: compile(this.template),
        components: this.components,
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          },
        },
      });
    },
  },

  render() {
    return h(this.component, { bindings: this.bindings });
  },
};
</script>

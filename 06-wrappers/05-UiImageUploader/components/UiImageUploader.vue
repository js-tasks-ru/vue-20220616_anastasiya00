<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
           :class="{ 'image-uploader__preview-loading': loading }"
           :style="`--bg-url: url('${image}')`">
      <span class="image-uploader__text">{{ text }}</span>
      <input ref="input"
             type="file" accept="image/*"
             @change="upload"
             @click="remove"
             v-bind="$attrs"
             class="image-uploader__input" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'remove', 'error'],

  data() {
    return {
      loading: false,
      image: this.preview,
    }
  },

  computed: {
    text() {
      if (this.image) return "Удалить изображение";
      if (this.loading) return "Загрузка...";
      return "Загрузить изображение";
    },
  },

  methods: {
    async upload() {
      const file = this.$refs.input.files[0];
      this.$refs.input.value = '';

      this.loading = true;
      try {
        if (this.uploader) {
          const data = await this.uploader(file);
          this.$emit('upload', data);
        }
        this.$emit('select', file);
        this.image = URL.createObjectURL(file);
      } catch (e) {
        this.$emit('error', e);
      } finally {
        this.loading = false;
      }
    },

    remove(e) {
      if (!this.image) return;

      e.preventDefault();

      this.$refs.input.value = '';
      this.image = null;

      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>

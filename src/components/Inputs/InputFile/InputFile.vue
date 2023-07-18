<template>
    <label for="images" class="drop-container" @dragover="onDragover" @drop="onDrop" v-if="!isPhotoLoaded">
      <p class="text text_prim text_underline">Перетащите файл в область или нажмите для загрузки</p>
      <p class="text text_disabled">
        Расширение: jpg, png<br />Максимально допустимый размер: 1 Мб<br />Максимальное количество файлов: 1
      </p>

      <input class="drop-container__input" type="file" id="images" accept="image/jpg, image/jpeg, image/png" @change="UploadNewFile" required>
    </label>
    <div class="input-file__wrapper" v-else>
      <div class="input-file" :class="[{ 'error' : isErrorSize || isErrorFormat }]">
        <div class="input-file__info">
          <span class="file__title-text text text_prim text_underline">{{ this.currentImage.file.name }}</span>

          <span class="file__info-text text_disabled">{{ validFileFormat }}, {{ validFileSizeString }}</span>
        </div>

        <BaseButton class="button__second button_small" :nameIcon="'delete-icon'" @onButtonClick="ClearCurrentFile"></BaseButton>
      </div>

      <div class="error-message" v-if="isErrorFormat">
        <span class="text text_error">Неверный формат файла</span>
      </div>

      <div class="error-message" v-if="isErrorSize">
        <span class="text text_error">Превышен максимальный размер файла</span>
      </div>
    </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue'

export default {
  props: {
    currentImage: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isErrorSize: {
      type: Boolean,
      default: false
    },
    isErrorFormat: {
      type: Boolean,
      default: false
    },
    isPhotoLoaded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  components: { BaseButton },
  computed: {
    validFileSizeString() {
      return (this.currentImage.file.size / 1048576).toLocaleString( undefined, { minimumFractionDigits: 3 }) + " МБ";
    },

    validFileFormat() {
      let splitedImageName = this.currentImage.file.name.split(".")
      return splitedImageName[splitedImageName.length - 1]
    }
  },
  watch: {},
  methods: {
    onDragover: function(event) {
      event.preventDefault()
    },

    onDrop: function(event) {
      event.preventDefault()

      this.$emit("onFileChange", {
        photo: {
          file: event.dataTransfer.files[0],
          url: URL.createObjectURL(event.dataTransfer.files[0])
        }
      })
    },

    UploadNewFile: function(event) {
      this.$emit("onFileChange", {
        photo: {
          file: event.target.files[0],
          url: URL.createObjectURL(event.target.files[0])
        }
      })
    },

    ClearCurrentFile: function() {
      this.$emit("onFileChange", {
        photo: {
          file: null,
          url: null
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
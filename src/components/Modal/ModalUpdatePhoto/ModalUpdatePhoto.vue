<template>
  <div class="modal-photo" v-if="isShowModal">
    <div class="modal-photo__wrapper">
      <h2 class="modal-photo__title text text_h2 text_prim">Редактирование фото</h2>

      <div class="modal-photo__rows-wrapper">
        <div class="modal-photo__row">
          <InputFile :isErrorFormat="isErrorFormat" :isErrorSize="isErrorSize" :isPhotoLoaded="isPhotoLoaded" :currentImage="uploadedImage" @onFileChange="onSelectNewFile"></InputFile>
        </div>

        <div class="modal-photo__row" v-if="isPhotoLoaded && !isErrorFormat && !isErrorSize">
          <img class="modal-photo__image" :src="uploadedImage.url" alt="New Photo">
        </div>
      </div>

      <div class="modal-photo__buttons">
        <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onClick(false)"></BaseButton>

        <BaseButton class="button__primary" :title="'Сохранить изменения'" @onButtonClick="onClick(true)"></BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue'
import InputFile from '@/components/Inputs/InputFile/InputFile.vue'

export default {
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      validFormatsArray: ['jpg', 'png'],

      uploadedImage: {
        file: null,
        url: null
      },
    }
  },
  components: {
    BaseButton, InputFile
  },
  computed: {
    isPhotoLoaded() {
      return this.uploadedImage.url !== null && this.uploadedImage.file !== null;
    },

    isErrorSize() {
      return this.isPhotoLoaded && (this.uploadedImage.file.size / 1048576) > 1;
    },

    isErrorFormat() {
      if (!this.isPhotoLoaded) return false;
      let splitedImageName = this.uploadedImage.file.name.split(".")
      return !this.validFormatsArray.includes(splitedImageName[splitedImageName.length - 1]);
    },
  },
  watch: {},
  methods: {
    onSelectNewFile: function(event) {
      this.uploadedImage.file = event.photo.file;
      this.uploadedImage.url = event.photo.url;
    },

    onClick: function(answer) {
      if (answer && this.isPhotoLoaded && !this.isErrorFormat && !this.isErrorSize ) {
        this.$emit("onPhotoSelected", {
          imageFile : this.uploadedImage.file,
          imageType : this.validFileFormat,
        })

        this.uploadedImage.file = null;
        this.uploadedImage.url = null;
      } else if (!answer) {
        this.uploadedImage.file = null;
        this.uploadedImage.url = null;

        this.$emit("CloseModal", {})
      } else {
        return
      }
    },
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
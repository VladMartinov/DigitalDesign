<template>
  <div class="modal-project">
    <div class="modal-project__wrapper">
      <h2 class="modal-project__title text text_h2 text_prim">{{ validTitleText }}</h2>
      
      <div class="modal-project__rows-wrapper">
        <div class="modal-project__row">
          <span class="modal-project__input-title text text_disabled">Код<span class="text_error">*</span></span>

          <Input maxlength="63" :currFilterValue="currentData.code" :textPlaceholder="'Введите текст...'" :hideIcons="true" @updateValue="idChanged"></Input>

          <span v-if="isIdError" class="text text_error">Указан некорректный код.</span>
        </div>

        <div class="modal-project__row">
          <span class="modal-project__input-title text text_disabled">Название<span class="text_error">*</span></span>

          <Textarea :noInitHeight="true" :initValue="currentData.name" maxlength='255' placeholder="Введите текст..." rows="1" @onValueChange="nameChanged"></Textarea>
        </div>
      </div>

      <div class="modal-project__buttons">
        <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onClick(false)"></BaseButton>

        <BaseButton class="button__primary" :title="validButtonText" @onButtonClick="onClick(true)"></BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue'

import Input from '@/components/Inputs/Input.vue'
import Textarea from '@/components/Inputs/Textarea/Textarea.vue'

export default {
  props: {
    typeAction: {
      type: String,
      default: ""
    },
    projectItem: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      currentData: {
        code: "",
        name: ""
      },

      isIdError: false
    }
  },
  components: {
    BaseButton,
    Input ,Textarea
  },
  created() {
    if (Object.keys(this.projectItem).length === 0) return;
    this.currentData = Object.assign({}, this.projectItem);
  },
  computed: {
    validTitleText() {
      if (this.typeAction === 'update') {
        return "Редактирование проекта"
      } else {
        return "Создание проекта"
      }
    },

    validButtonText() {
      if (this.typeAction === 'update') {
        return "Сохранить"
      } else {
        return "Создать проект"
      }
    }
  },
  watch: {},
  methods: {
    idChanged: function(event) {
      this.currentData.code = event.value
      this.isIdError = false;
    },

    nameChanged: function(event) {
      this.currentData.name = event.value
    },

    onClick: function(answer) {
      if (!answer) {
        this.$emit('onSelectedAction', {
          isAccept : answer,
        });
      };

      let regEx = /[^a-zA-Z0-9_-]*/

      if (this.currentData.code.match(regEx) && this.answer) {
        this.isIdError = true;
        return;
      }

      if ( this.currentData.code !== "" && this.currentData.name !== "" ) {
        this.$emit('onSelectedAction', {
          isAccept : answer,
          item: {
            "name": this.currentData.name,
            "code": this.currentData.code
            }
        })
      };
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
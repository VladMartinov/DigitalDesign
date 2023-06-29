<template>
  <section class="create-task">
    <div class="container container_full-height">
      <div class="create-task__wrapper">
        <div class="create-task__title">
          <h1 class="text text_prim text_h1">Создание задачи</h1>
        </div>

        <div class="create-task__line">
        </div>

        <form class="create-task__form">
          <div class="create-task__row">
            <label class="create-task__text text text_disabled">Название<span class="text text_error">*</span></label>
            <Input :hideIcons="true" :textPlaceholder="'Введите текст...'" @updateValue="onInputValue"></Input>
          </div>

          <div class="create-task__row">
            <label class="create-task__text text text_disabled">Описание</label>
            <Textarea placeholder="Введите текст..." @onValueChange="onTextAreaValue"></Textarea>
          </div>

          <div class="create-task__row">
            <label class="create-task__text text text_disabled">Проект<span class="text text_error">*</span></label>
            <InputSelect :inputValueArray="testSelectData" @onValueSelected="onSelectProjectValue"></InputSelect>
          </div>

          <div class="create-task__row">
            <label class="create-task__text text text_disabled">Исполнитель</label>
            <InputSelect :inputValueArray="testSelectData" :isProfile="true" :isProfileSearch="true" @onValueSelected="onSelectUserValue"></InputSelect>
          </div>
        </form>

        <div class="create-task__line">
        </div>

        <div class="create-task__actions">
          <div class="create-task__cancel">
            <Button :title="'Отмена'">Отмена</Button>
          </div>

          <Button :isPrim="true" :title="'Создать задачу'" @click.native="onSendValue">Создать задачу</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import imgProfile from "@/assets/images/profile-img.jpg"

import Input from "@/components/Inputs/Input.vue"
import InputSelect from "@/components/Inputs/InputSelect/InputSelect.vue"

import Textarea from "@/components/Inputs/Textarea/Textarea.vue"

import Button from "@/components/Buttons/Button/Button.vue"

export default {
  props: {},
  data() {
    return {
      testSelectData: [
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-1",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-2",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-3",
          profileImg: imgProfile
        },
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-4",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-5",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-6",
          profileImg: imgProfile
        },
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-7",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-8",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-9",
          profileImg: imgProfile
        },
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-10",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-11",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-12",
          profileImg: imgProfile
        },
      ],
      
      model: {
        name: "",
        desc: "",
        project: "",
        user: ""
      }
    }
  },
  components: {
    Input, InputSelect,
    Textarea,
    Button,
  },
  computed: {},
  watch: {},
  methods: {
    onInputValue: function(event) {
      this.model.name = event.value
    },

    onTextAreaValue: function(event) {
      this.model.desc = event.value
    },
    
    onSelectProjectValue: function(event) {
      this.model.project = event.valId
    },
    
    onSelectUserValue: function(event) {
      this.model.user = event.valId
    },

    onSendValue() {
      if (this.model.name !== "" && this.model.project !== "") {
        console.log("The object has been sent:", this.model);
        
        this.$emit("onCreateTask", {
          taskData: this.model
        })
      } else {
        console.log("Not all values were filled in!");
      }
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
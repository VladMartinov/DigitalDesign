<template>
  <section class="paging">
    <div class="paging-buttons">
      <BaseButton class="button__second button_small" :class="classPrevButton" :nameIcon="'arrow-left'" @onButtonClick="onClickPrevPage"></BaseButton>
      <BaseButton v-for="index in totalButtons" :key="index" :data-page="index" :class="isActivePage(index)" :title="`${index}`" @onButtonClick="onClickButtonPage"></BaseButton>
      <BaseButton class="button__second button_small" :class="classNextButton" :nameIcon="'arrow-right'" @onButtonClick="onClickNextPage"></BaseButton>
    </div>

    <div class="paging-input">
      <span class="text text_disabled">Перейти к странице</span>

      <div class="paging-input__wrapper">
        <Input :hideIcons="true" :textPlaceholder="''" @updateValue="selectInputPage"></Input>
      </div>
    </div>

    <div class="paging-info">
      <p class="text text_disabled">{{ startNumItem }}-{{ endNumItem }} из {{ currentCountItems }}</p>
    </div>
  </section>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
import Input from "@/components/Inputs/Input.vue"

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    countPages: {
      type: Number,
      default: 0
    },
    isProject: {
      type: Boolean,
      default: false
    },
    isUsers: {
      type: Boolean,
      default: false
    },
    isTask: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {}
  },
  components: {
    BaseButton, Input
  },
  computed: {
    ...mapGetters('projectsStore', { projectGetNumPage :'getNumPage' }),
    ...mapGetters('usersStore', { usersGetNumPage :'getNumPage' }),
    ...mapGetters('tasksStore', { tasksGetNumPage :'getNumPage' }),

    getCurrentNumPage() {
      if (this.isProject) {
        return this.projectGetNumPage
      } else if (this.isUsers) {
        return this.usersGetNumPage
      } else if (this.isTask) {
        return this.tasksGetNumPage
      } else {
        return NaN
      }
    },

    totalButtons() {
      let newCountPages = this.countPages;

      if (this.countPages > 3) {
        if (this.getCurrentNumPage != 1 && this.getCurrentNumPage != this.countPages) {
          newCountPages = [this.getCurrentNumPage - 1, this.getCurrentNumPage, this.getCurrentNumPage + 1]
        } else {
          if (this.getCurrentNumPage === 1) {
            newCountPages = 3
          } else {
            newCountPages = [this.getCurrentNumPage - 2, this.getCurrentNumPage - 1, this.getCurrentNumPage]
          }
        }
      }

      return newCountPages
    },

    currentCountItems() {
      let val = this.countPages * 10;

      return val
    },

    startNumItem() {
      return 1 + (10 * (this.getCurrentNumPage - 1))
    },

    endNumItem() {
      let val = 10 * this.getCurrentNumPage

      return val > this.countItems ? this.countItems : val 
    },

    classPrevButton() {
      return this.getCurrentNumPage < 2 ? 'button__second_disabled' : ''
    },

    classNextButton() {
      return this.getCurrentNumPage + 1 > this.countPages ? 'button__second_disabled' : ''
    }
  },
  watch: {},
  methods: {
    ...mapActions('projectsStore', { projectSetNumPage :'setNumPage'}),
    ...mapActions('usersStore', { usersSetNumPage :'setNumPage' }),
    ...mapActions('tasksStore', { tasksSetNumPage :'setNumPage' }),

    isActivePage(index) {
      return index === this.getCurrentNumPage ? "button__primary" : "button__second"
    },

    selectInputPage(event) {
      let val = +event.value

      if (val < this.countPages + 1 && val > 0) {
        if (this.isProject) {
          this.projectSetNumPage(val)
        } else if (this.isUsers) {
          this.usersSetNumPage(val)
        } else if (this.isTask) {
          this.tasksSetNumPage(val)
        }
      }
    },

    onClickButtonPage(event) {
      if (this.isProject) {
          this.projectSetNumPage(+event.dataValue.page)
      } else if (this.isUsers) {
        this.usersSetNumPage(+event.dataValue.page)
      } else if (this.isTask) {
        this.tasksSetNumPage(+event.dataValue.page)
      }
    },
      
    onClickPrevPage() {
      if (this.getCurrentNumPage > 1) {
        if (this.isProject) {
          this.projectSetNumPage(this.getCurrentNumPage - 1)
        } else if (this.isUsers) {
          this.usersSetNumPage(this.getCurrentNumPage - 1)
        } else if (this.isTask) {
          this.tasksSetNumPage(this.getCurrentNumPage - 1)
        }
      }
    },

    onClickNextPage() {
      if (this.getCurrentNumPage < this.countPages) {
        if (this.isProject) {
          this.projectSetNumPage(this.getCurrentNumPage + 1)
        } else if (this.isUsers) {
          this.usersSetNumPage(this.getCurrentNumPage + 1)
        } else if (this.isTask) {
          this.tasksSetNumPage(this.getCurrentNumPage + 1)
        }
      }
    },
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
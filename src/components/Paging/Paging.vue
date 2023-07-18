<template>
  <section class="paging">
    <div class="paging-buttons">
      <BaseButton class="button__second button_small" :class="classPrevButton" :nameIcon="'arrow-left'" @onButtonClick="selectNewPage(currentPage - 1)"></BaseButton>
      <div class="paging-buttons__wrap" v-for="index in dynamicButtonsArray.index" :key="index">
        <BaseButton v-if="(dynamicButtonsArray.isFirst && index === 2) || (dynamicButtonsArray.isLast && index === 6)" class="button__second" :title="'...'"></BaseButton>
        <BaseButton v-else :class="isActivePage(validButtonText(index))" 
        :title="'' + validButtonText(index)" @onButtonClick="selectNewPage(+validButtonText(index))"></BaseButton>
      </div>
      <BaseButton class="button__second button_small" :class="classNextButton" :nameIcon="'arrow-right'" @onButtonClick="selectNewPage(currentPage + 1)"></BaseButton>
    </div>

    <div class="paging-input">
      <span class="text text_disabled">Перейти к странице</span>

      <div class="paging-input__wrapper">
        <Input :hideIcons="true" :textPlaceholder="''" @onPressEnter="selectNewPage(+$event.value)"></Input>
      </div>
    </div>

    <div class="paging-info">
      <p class="text text_disabled">{{ rangeCountItems }}</p>
    </div>
  </section>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
import Input from "@/components/Inputs/Input.vue"

export default {
  props: {
    countPages: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    countItemsOnPage: {
      type: Number,
      default: 0
    },
    // Total count items (optional) //
    totalCountItems: {
      type: Number,
      default: NaN
    },
    // end //
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
    rangeCountItems() {
      let startNum = 1 + (10 * (this.currentPage - 1))
      let endNum = 10 * this.currentPage
      
      let result = `${startNum}-${ this.countItemsOnPage < 10 ? endNum - 10 + this.countItemsOnPage : endNum}`
      if (!isNaN(this.totalCountItems)) {
        result += ` из ${this.totalCountItems}`
      }
      return result
    },

    classPrevButton() {
      return this.currentPage < 2 ? 'disabled' : ''
    },

    classNextButton() {
      return this.currentPage + 1 > this.countPages ? 'disabled' : ''
    },

    dynamicButtonsArray() {
      if (this.countPages < 8) return { index: this.countPages };
      else if (this.currentPage > 4 && this.countPages - 2 > this.currentPage ) return { index: 7, 'isFirst': true, 'isLast': true };
      else if (this.countPages - 2 > this.currentPage) return { index: 7, 'isLast': true };
      else if (this.currentPage > 4) return { index: 7, 'isFirst': true };
      else return { index: 7, 'isFirst': true, 'isLast': true };
    },

  },
  watch: {},
  methods: {
    validButtonText(index) {
      if (this.countPages < 8) return index;
      else if (this.currentPage < 5 && index != 7) return index;
      else if (index === 1) return index;
      else if (index === 7) return this.countPages;
      else if (this.countPages - 3 < this.currentPage) return this.countPages - (7 - index);
      else if (index === 3) return this.currentPage - 1;
      else if (index === 5) return this.currentPage + 1;
      else return this.currentPage;
    },

    isActivePage(index) {
      return index === this.currentPage ? "button__primary" : "button__second"
    },

    selectNewPage: function(num) {
      if (num > this.countPages) {
        this.$emit('SelectPage', {
          value: this.countPages
        })
      } else if (num < 1) {
        this.$emit('SelectPage', {
          value: 1
        })
      } else {
        this.$emit('SelectPage', {
          value: num
        })
      }

    },
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
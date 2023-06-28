<template>
  <div :class="wrapperClassName" >
    <input class="input text text_prim" 
      type="text" v-model="inputVal" :placeholder="placeholder"
      :disabled="isDisabled"
    >

    <button v-if="isEmpty && !hideIcons" :disabled="isDisabled" @click="clearData()" class="input__button-clear">
      <SvgIcon :size="{ width: 16, height: 16 }" :name="'clear-icon'"></SvgIcon>
    </button>

    <button v-if="!hideIcons" :class="searchButtonClass" :disabled="isDisabled">
      <SvgIcon :name="'search-icon'"></SvgIcon>
    </button>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

export default {
  inheritAttrs: false,
  props: {
    isSmall: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hideIcons: {
      type: Boolean,
      default: false
    },
    textPlaceholder: {
      type: String,
      default: "Введите значение"
    }
  },
  data() {
    return {
      inputVal: '',
    }
  },
  components: { SvgIcon },
  computed: {
    wrapperClassName() {
      let wrapperName = ''
      if (this.isSmall) {
        wrapperName += "input-small__wrapper"
      
        if (this.isDisabled) {
            wrapperName += " input-small__wrapper_disabled"
        }
      } else {
        wrapperName += "input__wrapper"
        
        if (this.isDisabled) {
          wrapperName += " input__wrapper_disabled"
        }
      }
      return wrapperName
    },

    searchButtonClass() {
      if (this.isSmall) {
        return "input-small__button-search"
      } else {
        return "input__button-search"
      }
    },

    placeholder() {
      return this.isDisabled ? '' : this.textPlaceholder
    },
    
    isEmpty() {
      return this.inputVal == '' ? false: true
    }
  },
  watch: {},
  methods: {
    clearData() {
      this.inputVal = '';
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
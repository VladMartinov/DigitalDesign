<template>
  <div :class="wrapperClassName" >
    <input class="input-search text text_prim" 
      type="text" v-model="inputVal" 
      :placeholder="placeholder" :disabled="isDisabled"
    >

    <button v-if="isEmpty" :disabled="isDisabled" @click="clearData()" class="input-search__button-clear">
      <SvgIcon :isSmall="true" :name="'clear-icon'"></SvgIcon>
    </button>

    <button :class="searchButtonClass" :disabled="isDisabled">
      <SvgIcon :name="'search-icon'"></SvgIcon>
    </button>
  </div>
</template>

<script>
import SvgIcon from "@/components/svg-icon/SvgIcon.vue"

export default {
  props: {
    isSmall: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
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
        wrapperName += "input-search-small__wrapper"
      
        if (this.isDisabled) {
            wrapperName += " input-search-small__wrapper_disabled"
        }
      } else {
        wrapperName += "input-search__wrapper"
        
        if (this.isDisabled) {
          wrapperName += " input-search__wrapper_disabled"
        }
      }
      return wrapperName
    },

    searchButtonClass() {
      if (this.isSmall) {
        return "input-search-small__button-search"
      } else {
        return "input-search__button-search"
      }
    },

    placeholder() {
      return this.isDisabled ? '' : 'Поиск...'
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
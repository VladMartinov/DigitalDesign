<template>
  <div :class="wrapperClassName" >
    <input v-if="hideIcons" class="input text text_prim" 
      type="text" v-model="inputVal" :placeholder="placeholder"
      :disabled="isDisabled" @input="doUpdateValue" @keyup.enter="onPressEnter"
      v-bind="$attrs"
    >
    <input v-else class="input text text_prim" 
      type="text" v-model="inputVal" :placeholder="placeholder"
      :disabled="isDisabled" v-bind="$attrs"
    >

    <button v-if="isEmpty && !hideIcons" :disabled="isDisabled" @click="clearData" class="input__button-clear" type="button">
      <SvgIcon :size="{ width: 16, height: 16 }" :name="'clear-icon'"></SvgIcon>
    </button>

    <button v-if="!hideIcons" :class="searchButtonClass" :disabled="isDisabled" v-on:click="doUpdateValue" type="button">
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
    isError: {
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
    },
    initValue: {
      type: String,
      default: ""
    },
    currFilterValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputVal: this.currFilterValue,
    }
  },
  components: { SvgIcon },
  computed: {
    wrapperClassName() {
      let wrapperName = ''
      if (this.isSmall) {
        wrapperName += "input-small__wrapper"
      
        if (this.isError) {
          wrapperName += " error"
        } else if (this.isDisabled) {
          wrapperName += " input-small__wrapper_disabled"
        }

      } else {
        wrapperName += "input__wrapper"
        
        if (this.isError) {
          wrapperName += " error"
        } else if (this.isDisabled) {
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
  mounted() {
    if (this.initValue === "" && this.currFilterValue !== "") this.inputVal = this.currFilterValue;
    else this.inputVal = this.initValue;
  },
  watch: {
    initValue() {
      this.inputVal = this.initValue;
    }
  },
  methods: {
    clearData() {
      this.inputVal = '';
      this.doUpdateValue()
    },

    doUpdateValue() {
      this.$emit('updateValue', {
        value: this.inputVal,
      })
    },
    
    onPressEnter: function() {
      this.$emit('onPressEnter', {
        value: this.inputVal,
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
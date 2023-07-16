<template>
  <div class="input-pass__wrapper" :class="{ 'error' : isError, 'disabled' : isDisabled }">
    <input class="input-pass text text_prim" v-bind="$attrs" :type="isShowPassword || isHideIcon ? 'text' : 'password'" :value="currentVal" @input="doUpdateValue">

    <button class="input-pass__icon" @click="onChangeShowPassword" type="button" v-if="!isHideIcon">
      <SvgIcon :name="iconInputName"></SvgIcon>
    </button>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

export default {
  inheritAttrs: false,
  props: {
    isHideIcon: {
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
    currentVal: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShowPassword: false,
    }
  },
  components: {
    SvgIcon
  },
  computed: {
    iconInputName() {
      return this.isShowPassword ? "eye-open-icon" : "eye-close-icon";
    }
  },
  watch: {
    },
  methods: {
    doUpdateValue: function(event) {
      this.$emit("onValueChanged", {
        value: event.target.value
      })
    },

    onChangeShowPassword: function() {
      this.isShowPassword = !this.isShowPassword;
    },
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
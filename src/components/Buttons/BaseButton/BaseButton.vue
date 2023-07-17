<template>
  <div :class="[{'active' : isActive}, {'disabled' : isDisabled}, 'button']" @click="onClick" v-if="!isSwap">
    <p v-if="!hideText && title !== ''" :class="validTextClassName">{{ title }}</p>

    <SvgIcon v-if="!hideIcon && nameIcon !== ''" :name="nameIcon" :flipImg="isFlip"></SvgIcon>
  </div>
  <div :class="[{'active' : isActive}, {'disabled' : isDisabled}, 'button']" @click="onClick" v-else>
    <SvgIcon v-if="!hideIcon && nameIcon !== ''" :name="nameIcon" :flipImg="isFlip"></SvgIcon>

    <p v-if="!hideText && title !== ''" :class="validTextClassName">{{ title }}</p>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    nameIcon: {
      type: String,
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hideText: {
      type: Boolean,
      default: false
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isFlip: {
      type: Boolean,
      default: false
    },
    isSwap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  components: { SvgIcon },
  computed: {
    validTextClassName() {
      let newClassName = "button__text text"

      if (this.isDisabled) {
        newClassName += " text_disabled"
      }

      return newClassName
    }
  },
  watch: {},
  methods: {
    onClick: function(event) {
      if (this.isDisabled) return;

      this.$emit("onButtonClick", {
        dataValue: event.currentTarget.dataset
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
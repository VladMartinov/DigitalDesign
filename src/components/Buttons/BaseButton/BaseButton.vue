<template>
  <div :class="[{'active' : isActive}, 'button']" @click="onClick">
    <p v-if="!hideText && title !== ''" :class="validTextClassName">{{ title }}</p>

    <SvgIcon v-if="!hideIcon && nameIcon !== ''" :name="nameIcon" :flipImg="isActive"></SvgIcon>
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
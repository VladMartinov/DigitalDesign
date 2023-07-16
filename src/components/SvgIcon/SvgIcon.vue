<template>
  <svg :class="className" :width="size.width" :height="size.height" >
    <use :xlink:href="'#' + iconPath" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',

  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Object,
      default: function() {
        return { width: 24, height: 24 }
      }
    },
    flipImg: {
      type: Boolean,
      default: false
    },
    isAnim: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    iconPath() {
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }

      return icon.id;
    },

    className() {
      let newClassName = 'svg-icon svg-icon--' + this.name

      if (this.flipImg) {
        newClassName += " svg-icon_flipped"
      }
      if (this.isAnim) {
        newClassName += " svg-icon_anim"
      }

      return newClassName;
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>

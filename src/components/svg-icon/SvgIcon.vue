<template>
  <svg :class="className" >
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
    isSmall: {
      type: Boolean,
      default:false
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
      if (this.isSmall) {
        return 'svg-icon svg-icon_small svg-icon--' + this.name;
      } else {
        return 'svg-icon svg-icon--' + this.name;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>

<template>
  <span
    :class="'status-item ' + ('status-item_' + validClass + ' ') + 'text'"
    >
    {{ validText }}
  </span>

</template>

<script>
import { Tags } from "@/components/Status/tags";

export default {
  props: {
    tag: {
      type: String,
      default: "DRAFT"
    }, 
  },
  data() {
    return {}
  },
  components: {},
  computed: {

    validClass() {
      return Tags[this.tag].tagClass;
    },

    validText() {
      return Tags[this.tag].name;
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
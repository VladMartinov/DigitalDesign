<template>
  <div v-if="getLoadingState || isComponentsLoaded" class="loading-state">
    <SvgIcon :name="'loading-icon'" :isAnim="true"></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"
import { mapGetters } from "vuex"

export default {
  props: {
    isComponentsLoaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  components: { SvgIcon },
  computed: {
    ...mapGetters(['getLoadingState']),
  },
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
.loading-state {
  position: absolute;

  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  z-index: 29;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: $border-def-color;
}
</style>
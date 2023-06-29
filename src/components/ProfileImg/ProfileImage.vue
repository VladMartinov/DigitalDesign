<template>
  <img class="profile-img" :src="profileImg" alt="Profile image" />
</template>

<script>
export default {
  props: {
    profileImg: {
      type: String,
      default: "default"
    },
  },
  data() {
    return {
      image: {}
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
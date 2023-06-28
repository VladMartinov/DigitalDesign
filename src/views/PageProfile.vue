<template>
  <div id="app">
    <Navigation :profile="true"></Navigation>
    <Profile></Profile>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"
import Profile from "@/components/Profile/Profile.vue"

export default {
  props: [],
  data() {
    return {}
  },
  components: {
    Navigation, Profile
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
</style>
<template>
  <div id="app">
    <Navigation :activePageArray="[false, true, false]"></Navigation>
    <CreateTask></CreateTask>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"
import CreateTask from "@/components/CreateTask/CreateTask.vue"

export default {
  props: {},
  data() {
    return {}
  },
  components: { Navigation, CreateTask },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
</style>
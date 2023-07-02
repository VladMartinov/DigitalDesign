<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Navigation
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

.container {
  width: 1024px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;

  /* Mobile */
  @media (min-width: 1025px) {
    width: 100%;
  }

  &_full-height {
    height: 100%;
  }
}
</style>

<template>
  <div id="app">
    <Navigation v-if="!isTokenEmpty"></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Navigation,
  },
  computed: {
    ...mapGetters(['getToken']),

    isTokenEmpty() {
      return this.getToken === ""
    }
  },
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 100%;
  overflow-x: hidden;
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
    display: flex;
    flex-direction: column;

    flex-grow: 1;
  }
}

.visually-hidden {
  opacity: 0;
  visibility: hidden;
  width: 0px;
  height: 0px;
  display: block;
  margin-left: -10000px;
  background: transparent;
  font-size: 0;
}
</style>

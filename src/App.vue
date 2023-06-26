<template>
  <PageProjects></PageProjects>
  <!--<PageTasks></PageTasks>-->
  <!--<PageProfile></PageProfile>-->
  <!--<TestView></TestView>-->
</template>
<script>
import PageProjects from "@/views/PageProjects.vue"
import PageTasks from "@/views/PageTasks.vue"
import PageProfile from "@/views/PageProfile.vue"

import TestView from "@/views/TestView.vue"

export default {
  name: 'App',
  components: {
    PageTasks, PageProjects, PageProfile, TestView
  }
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

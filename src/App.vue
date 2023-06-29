<template>
  <div id="app">
    <Navigation :activePageArray="activePages" @pageSelected="onSelectTab"></Navigation>
    <component v-bind:is="currentTab"></component>
  </div>
  <!--<PageCreateTask></PageCreateTask>-->
  <!--<?TestView></TestView>-->
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"

import PageProjects from "@/views/PageProjects.vue"
import PageTasks from "@/views/PageTasks.vue"
import PageProfile from "@/views/PageProfile.vue"
import PageCreateTask from "@/views/PageCreateTask.vue"

import TestView from "@/views/TestView.vue"

export default {
  name: 'App',
  data() {
    return {
      projects: PageProjects,
      tasks: PageTasks,
      profile: PageProfile,

      activePages: [true, false, false],
      selectedTab: "projects"
    }
  },
  components: {
    Navigation, PageTasks, PageProjects, PageProfile, PageCreateTask, TestView
  },
  computed: {
    currentTab() {
      if (this.selectedTab === "projects") {
        this.activePages = [true, false, false]
        return this.projects
      } else if (this.selectedTab === "tasks") {
        this.activePages = [false , true, false]
        return this.tasks
      } else {
        this.activePages = [false , false, true]
        return this.profile
      }
    }
  },
  methods: {
    onSelectTab: function(event) {
      this.selectedTab = event.page
    }
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

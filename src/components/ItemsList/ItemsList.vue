<template>
  <section class="section-items">
    <div class="container">
      <div class="item" v-for="(initDataProp, index) in initDataProps" :key="index">
        <TaskItem v-if="isTask" :dataProp="initDataProp" :profileImg="getProfileImg()"></TaskItem>
        <ProjectItem v-else-if="isProject" :dataProp="initDataProp" :profileImg="getProfileImg()"></ProjectItem>
        <UserItem v-else-if="isUser" :dataProp="initDataProp" :profileImg="getProfileImg()"></UserItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProjectItem from "@/components/ProjectItem/ProjectItem.vue"
import TaskItem from "@/components/TaskItem/TaskItem.vue"
import UserItem from "@/components/UserItem/UserItem.vue"

import ProfileImg from "@/assets/images/profile-img.jpg";

export default {
  props: {
    initDataProps: {
      type: Array,
      default: function() {
        return []
      }
    },
    project: {
      type: Boolean,
      default: false
    },
    task: {
      type: Boolean,
      default: false
    },
    user: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isProject: this.project,
      isTask: this.task,
      isUser: this.user
    }
  },
  components: {TaskItem, ProjectItem, UserItem},
  computed: {},
  watch: {},
  methods: {
    getProfileImg() {
      /* Заготовка на будущее */
      return ProfileImg
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
<template>
  <section class="section-items">
    <div class="container">
      <div class="item" v-for="(initDataProp, index) in initDataProps" :key="index">
        <TaskItem v-if="isTask" :dataProp="initDataProp" :profileImg="getProfileImg()"></TaskItem>
        <ProjectItem v-else-if="isProject" :dataProp="initDataProp" :profileImg="getProfileImg()"></ProjectItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProjectItem from "@/components/ProjectItem/ProjectItem.vue"
import TaskItem from "@/components/TaskItem/TaskItem.vue"
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
  },
  data() {
    return {
      isProject: this.project,
      isTask: this.task
    }
  },
  components: {TaskItem, ProjectItem},
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
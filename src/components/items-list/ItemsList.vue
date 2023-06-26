<template>
  <section class="section-items">
    <div class="container">
      <div class="item" v-for="(itemData, index) in itemsData" :key="index">
        <TaskItem v-if="isTask" :itemData="itemData" :profileImg="getProfileImg()"></TaskItem>
        <ProjectItem v-else-if="isProject" :itemData="itemData" :profileImg="getProfileImg()"></ProjectItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProjectItem from "@/components/project-item/ProjectItem.vue"
import TaskItem from "@/components/task-item/TaskItem.vue"
import ProfileImg from "@/assets/images/profile-img.jpg";

export default {
  props: {
    data: Array,
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
      itemsData: this.data,
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
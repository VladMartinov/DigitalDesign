<template>
  <section class="section-items">
    <div class="item__list">
      <div class="item" v-for="(itemData, index) in validItemsData" :key="index">
        <ProjectItem v-if="isProject" :currentUser="currentUser" :dataProp="itemData"></ProjectItem>
        <UserItem v-else-if="isUsers" :currentUser="currentUser" :dataProp="itemData"></UserItem>
        <TaskItem v-else-if="isTask && itemData.status !== 'DELETED'" :currentUser="currentUser" :dataProp="itemData"></TaskItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProjectItem from "@/components/ProjectItem/ProjectItem.vue"
import TaskItem from "@/components/TaskItem/TaskItem.vue"
import UserItem from "@/components/UserItem/UserItem.vue"

export default {
  props: {
    dataProps: {
      type: Object,
      default: function() {
        return {}
      }
    },
    currentUser: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isProject: {
      type: Boolean,
      default: false
    },
    isTask: {
      type: Boolean,
      default: false
    },
    isUsers: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dataPropsObjArray: [],
    }
  },
  components: {
    TaskItem, ProjectItem, UserItem,
  },
  computed: {
    validItemsData() {
      if (this.isProject){
        return this.dataProps.projects;
      } else if (this.isTask) {
        return this.dataProps.tasks;
      } else if (this.isUsers) {
        return this.dataProps.users
      }
    },
  },
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
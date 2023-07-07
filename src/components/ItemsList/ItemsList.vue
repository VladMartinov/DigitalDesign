<template>
  <section class="section-items">
    <div class="item__list">
      <div class="item" v-for="(itemData, index) in validItemsData" :key="index">
        <TaskItem v-if="isTask" :dataProp="itemData" :profileImg="getProfileImg()"></TaskItem>
        <ProjectItem v-else-if="isProject" :dataProp="itemData"></ProjectItem>
        <UserItem v-else-if="isUsers" :dataProp="itemData" :profileImg="getProfileImg()"></UserItem>
      </div>
    </div>

    <div v-if="getLoadingState" class="section-items__wrapper">
      <SvgIcon :name="'loading-icon'" :isAnim="true"></SvgIcon>
    </div>
  </section>
</template>

<script>
import ProjectItem from "@/components/ProjectItem/ProjectItem.vue"
import TaskItem from "@/components/TaskItem/TaskItem.vue"
import UserItem from "@/components/UserItem/UserItem.vue"

import ProfileImg from "@/assets/images/profile-img.jpg";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"
import { mapGetters } from 'vuex';

export default {
  props: {
    dataProps: {
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
    }
  },
  data() {
    return {
      dataPropsObjArray: [],
    }
  },
  components: {
    TaskItem, ProjectItem, UserItem,
    SvgIcon
  },
  computed: {
    ...mapGetters(['getLoadingState']),

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
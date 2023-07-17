<template>
  <div class="task__aside">
    <!-- aside-row -->
    <div class="task__aside-row">
      <div class="task__aside-label">
        <span class="text text_prim text_bold">Исполнитель</span>
      </div>

      <InputSelectProfile :isSearch="true" :inputValueArray="users" :currentValId="task.executor" :textPlaceholder="'Не назначен'" @onValueSelected="ExecutorChanged"></InputSelectProfile>
    </div>
    <!-- // aside-row -->

    <div class="task__aside-line"></div>

    <!-- aside-row -->
    <div class="task__aside-row">
      <div class="task__aside-label">
        <span class="text text_prim text_bold">Статус</span>
      </div>

      <InputSelect :isTag="true" :hideClearButton="true" :inputValueArray="tagsDropdownData" :currentValId="task.status" :isDisabled="(!currentUserRole.isAuthor && !currentUserRole.isExecutor &&!currentUserRole.isAdmin)" @onValueSelected="StatusChanged"></InputSelect>
    </div>
    <!-- // aside-row -->

    <div class="task__aside-line" v-if="!currentUserRole.isAuthor || currentUserRole.isExecutor || currentUserRole.isAdmin"></div>

    <!-- aside-row -->
    <div class="task__aside-row" v-if="!currentUserRole.isAuthor || currentUserRole.isExecutor || currentUserRole.isAdmin">
      <div class="task__aside-label">
        <span class="text text_prim text_bold">Затрачено</span>
      </div>

      <span class="text text_prim">{{ taskTimeToView(task.time) }}</span>
    </div>
    <!-- // aside-row -->

    <div class="task__asize-spent-input" v-if="currentUserRole.isExecutor || currentUserRole.isAdmin">
      <div class="task__asize-input">
        <Input :hideIcons="true" :isDisabled="isDraft" :initValue="inputTimeSpent" :textPlaceholder="'Введите значение...'" @updateValue="inputTimeSpent = $event.value"></Input>
      </div>

      <BaseButton class="button__primary button_small" :nameIcon="'done-icon'" :isDisabled="isInputTimeSpentEmpty" @onButtonClick="SpentTimeChanged"></BaseButton>
    </div>

    <BaseButton v-if="(currentUserRole.isExecutor || currentUserRole.isAuthor || currentUserRole.isAdmin) && (isDraft || isInProcess || isCompleted || isTesting)" :isDisabled="isTestingDone" 
    class="button__second" :title="'Переместить в проект'" @onButtonClick="modalMoveToProject = true"></BaseButton>

    <ModalSelectProject v-if="modalMoveToProject && projectsDropdownData !== null" :currentProject="task.projectId" :inputUsersData="projectsDropdownData" @onSelectProject="ProjectChanged"></ModalSelectProject>
  </div>
</template>

<script>
import { Tags } from "@/components/Status/tags";
import { ItemDate } from "@/components/mixins/itemDate"
import { mapGetters, mapActions } from "vuex";

import InputSelectProfile from '@/components/Inputs/InputSelectProfile/InputSelectProfile.vue';
import InputSelect from '@/components/Inputs/InputSelect/InputSelect.vue';
import Input from '@/components/Inputs/Input.vue';

import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue';

import ModalSelectProject from '@/components/Modal/ModalSelectProject/ModalSelectProject.vue';

export default {
  mixins: [ItemDate],
  props: {
    currentUserRole: {
      type: Object,
      default: function() {
        return {};
      }
    },
    task: {
      type: Object,
      default: function() {
        return {};
      }
    },
    users: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      tagsDropdownData: Object.values(Tags),
      projectsDropdownData: null,

      inputTimeSpent: null,

      modalMoveToProject: false,
    }
  },
  components: {
    InputSelectProfile, InputSelect, Input,
    BaseButton,
    ModalSelectProject
  },
  computed: {
    ...mapGetters(['getToken']),

    isInputTimeSpentEmpty() {
      return this.inputTimeSpent === null || this.inputTimeSpent === "";
    },

    isDeleted() {
      return this.task.status === "DELETED";
    },
    isDraft() {
      return this.task.status === "DRAFT";
    },
    isInProcess() {
      return this.task.status === "IN_PROCESS";
    },
    isCompleted() {
      return this.task.status === "COMPLETED";
    },
    isTesting() {
      return this.task.status === "TESTING";
    },
    isTestingDone() {
      return this.task.status === "TESTING_DONE";
    }
  },
  mounted() {
    if (this.currentUserRole.isExecutor || this.currentUserRole.isAdmin) {
      this.setLoadingState(true);
      let token = this.getToken;

      this.$api.post.searchProjects({ "limit": 10000 }, token)
        .then(({data}) => {
          this.projectsDropdownData = data.projects.map((project) => { return Object.assign({}, project) });
          this.setLoadingState(false)

          return true;
        })
        .catch(e => {
          console.log(e)
          this.setLoadingState(false)

          return false;
        })
    }
  },
  watch: {},
  methods: {
    ...mapActions(['setLoadingState']),

    ExecutorChanged: function(event) {
      this.$emit('ChangeTask', {
        data: { "executor": event.valId }
      })
    },

    StatusChanged: function(event) {
      this.$emit('ChangeTask', {
        data: { "status": event.valId }
      })
    },

    SpentTimeChanged: function() {
      if (this.isInputTimeSpentEmpty) return;

      this.$emit('ChangeTaskTime', {
        data: { 
          "taskId": this.task._id,
          "time": this.toTaskTime(this.inputTimeSpent)
        }
      })

      this.inputTimeSpent = null;
    },

    ProjectChanged: function(event) {
      this.modalMoveToProject = false;
      if (!event.isAccept || event.id === "" || event.id === null) return;

      this.$emit('ChangeTask', {
        data: { "projectId": event.id }
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
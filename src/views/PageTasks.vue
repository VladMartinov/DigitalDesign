<template>
  <div id="tasks" >
    <div class="container" :class="{ 'container_full-height' : isFilterDateEmpty }" v-if="!isTasksDataEmpty && !isCurrentUserDataEmpty">
      <FilterBar :isTask="true" :filterObj="getFilterObject" :dropdownFilter="dataFilterArray" @onSetNewFilterVal="changeFilterValueDetect" @onAddItem="onCreateTask"></FilterBar>

      <EmptyFilter v-if="isFilterDateEmpty" :inputText="'Ни одна задача не соответствует результатам поиска/фильтрации'"></EmptyFilter>

      <div class="tasks__list">
        <TaskItem v-for="(task, index) in dataOfTasks.tasks" :key="index" :dataProp="task" :currentUser="currentUser" @TaskDeleted="UpdateTasks"></TaskItem>
      </div>
      
      <Paging v-if="isShowPaging" :currentPage="getNumPage" :countPages="this.dataOfTasks.total" :countItemsOnPage="this.dataOfTasks.tasks.length" :isTask="true" @SelectPage="onSelectPage"></Paging>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :typeItem="'task'"></EmptyItems>
    </div>

    <LoadingState></LoadingState>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar/FilterBar.vue"
import Paging from "@/components/Paging/Paging.vue"

import TaskItem from "@/components/TaskItem/TaskItem.vue"
import EmptyFilter from '@/components/EmptyFilter/EmptyFilter.vue'
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"

import LoadingState from '@/components/LoadingState/LoadingState.vue'

import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      dataOfTasks: {},
      currentUser: {},

      watchDetected: false,

      dataFilterArray: [
        {
          _id: 'name',
          name: 'По названию'
        },
        {
          _id: 'author',
          name: 'По автору'
        },
        {
          _id: 'status',
          name: 'По статусу'
        },
        {
          _id: 'executor',
          name: 'По исполнителю'
        },
        {
          _id: 'dateCreated',
          name: 'По дате создания'
        },
        {
          _id: 'dateEdited',
          name: 'По дате обновления'
        },
      ]
    }
  },
  components: {
    FilterBar, TaskItem, Paging,
    EmptyItems, EmptyFilter, LoadingState
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('tasksStore', ['getFilterObject', 'getNumPage']),

    isFilterDateEmpty() {
      return !this.isTasksDataEmpty && this.dataOfTasks.tasks.length < 1;
    },
    isTasksDataEmpty() {
      return Object.keys(this.dataOfTasks).length === 0;
    },
    isCurrentUserDataEmpty() {
      return Object.keys(this.currentUser).length === 0;
    },

    isShowPaging() {
      return !this.isTasksDataEmpty && this.dataOfTasks.total > 1;
    },
  },
  async mounted() {
    this.setLoadingState(true);

    await Promise.all([this.ReciveNewObjects(), this.ReciveCurrentUser()])
      .then((data) => {
        this.dataOfTasks = data[0];
        this.currentUser = data[1];
      });

    this.setLoadingState(false);
  },
  watch: {
    "getFilterObject.name": function() { this.UpdateTasks(); },
    "getFilterObject.sortId": function() { this.UpdateTasks(); },
    "getFilterObject.projectId": function() { this.UpdateTasks(); },
    "getFilterObject.orderType": function() { this.UpdateTasks(); },
    "getFilterObject.status": function() { this.UpdateTasks(); },
    "getFilterObject.author": function() { this.UpdateTasks(); },
    "getFilterObject.executor": function() { this.UpdateTasks(); },
    "getFilterObject.dateStart": function() { this.UpdateTasks(); },
    "getFilterObject.dateEnd": function() { this.UpdateTasks(); },

    getNumPage(newValue, oldValue) { if ( newValue !== oldValue ) this.UpdateTasks(); }
  },
  methods: {
    ...mapActions(['setLoadingState', 'setToken']),
    ...mapActions('tasksStore', ['setFilter', 'setNumPage']),

    onCreateTask: function() {
      this.$router.push({ name: 'PageCreateTask' })
    },

    changeFilterValueDetect(event) {
      this.setFilter(event.newValue)
    },

    onSelectPage: function(event) {
      this.setNumPage(event.value);
    },

    ReciveNewObjects: async function() {
      let filterObj = this.getFilterObject;
      let page = this.getNumPage;
      let token = this.getToken;

      let data = {
        "page": page,
        "limit": 10,
        "filter": {
          "name": filterObj.name === "" ? null : filterObj.name,
          "status" : filterObj.status.length < 1 ? null : filterObj.status,
          "author" : filterObj.author.length < 1 ? null : filterObj.author,
          "executor" : filterObj.executor.length < 1 ? null : filterObj.executor,
          "projectId" : filterObj.projectId === "" ? null : filterObj.projectId,
          "dateStart" : filterObj.dateStart === "" ? null : filterObj.dateStart,
          "dateEnd" :filterObj.dateEnd === "" ? null : filterObj.dateEnd 
        },
        "sort": {
          "field": filterObj.sortId,
          "type": filterObj.orderType
        }
      }

      return await this.$api.post.searchTasks(data, token)
        .then(({data}) => {
          return Object.assign({}, data);
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else console.log(e);

            return {};
        })
    },

    ReciveCurrentUser: async function() {
      return await this.$api.get.currentUser(this.getToken)
              .then(({data}) => {
                return Object.assign({}, data);
              })
              .catch(e => {
                if (e.status === 401) {
                  this.setToken("");
                  this.$router.push({ nmae: "LoginForm" });
                } else console.log(e);

                return {};
              })
    },

    UpdateTasks: async function() {
      if (this.watchDetected) return;

      this.watchDetected = true;
      await this.ReciveNewObjects().then((data) => { 
        this.dataOfTasks = data;
        this.watchDetected = false;
      });
    },

  }
}
</script>

<style lang="scss">
#tasks {
  display: flex;
  flex-direction: column;
  
  flex-grow: 1;
  padding: 24px 0;
}

.tasks__list {
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
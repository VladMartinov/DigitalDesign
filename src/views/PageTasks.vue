<template>
  <div id="tasks" >
    <div class="container" :class="{ 'container_full-height' : isFilterDateEmpty }" v-if="!isTaskDataEmpty">
      <FilterBar :isTask="true" :filterObj="getFilterObject" :dropdownFilter="dataFilterArray" @onSetNewFilterVal="changeFilterValueDetect" @onAddItem="onCreateTask"></FilterBar>

      <EmptyFilter :inputText="'Ни одна задача не соответствует результатам поиска/фильтрации'" v-if="isFilterDateEmpty"></EmptyFilter>

      <ItemsList v-if="isUserDataLoaded" :currentUser="currentUser" :dataProps="dataOfTasks" :isTask="true"></ItemsList>
      
      <Paging v-if="isShowPaging" :currentPage="getNumPage" :countPages="dataOfTasks.total" :countItemsOnPage="this.dataOfTasks.tasks.length" :isTask="true" @SelectPage="onSelectPage"></Paging>

      <LoadingState></LoadingState>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :typeItem="'task'"></EmptyItems>
    </div>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar/FilterBar.vue"
import Paging from "@/components/Paging/Paging.vue"

import EmptyFilter from '@/components/EmptyFilter/EmptyFilter.vue'
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import ItemsList from "@/components/ItemsList/ItemsList.vue"

import LoadingState from '@/components/LoadingState/LoadingState.vue'

import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      dataOfTasks: {},
      currentUser: null,

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
    FilterBar, Paging,
    ItemsList,
    EmptyItems, EmptyFilter,
    LoadingState
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('tasksStore', ['getFilterObject', 'getNumPage']),

    isFilterDateEmpty() {
      return this.dataOfTasks && this.dataOfTasks.tasks && this.dataOfTasks.tasks.length < 1
    },

    isTaskDataEmpty() {
      return Object.keys(this.dataOfTasks).length === 0 && !this.getToken
    },

    isShowPaging() {
      return this.dataOfTasks && this.dataOfTasks.total > 1
    },

    isUserDataLoaded() {
      return this.currentUser !== null;
    }
  },
  mounted() {
    this.ReciveNewObjects();

    let token = this.getToken;
    this.$api.get.currentUser(token)
          .then(({data}) => {
            this.currentUser = Object.assign({}, data);
            this.setLoadingState(false);
          })
          .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
            this.setLoadingState(false);
          })
  },
  watch: {
    "getFilterObject.name": function() { this.ReciveNewObjects() },
    "getFilterObject.sortId": function() { this.ReciveNewObjects() },
    "getFilterObject.projectId": function() { this.ReciveNewObjects() },
    "getFilterObject.orderType": function() { this.ReciveNewObjects() },
    "getFilterObject.status": function() { this.ReciveNewObjects() },
    "getFilterObject.author": function() { this.ReciveNewObjects() },
    "getFilterObject.executor": function() { this.ReciveNewObjects() },
    "getFilterObject.dateStart": function() { this.ReciveNewObjects() },
    "getFilterObject.dateEnd": function() { this.ReciveNewObjects() },

    getNumPage(newValue, oldValue) {
      this.ReciveNewObjects()
    }
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
      this.setLoadingState(true);

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

      this.$api.post.searchTasks(data, token)
        .then(({data}) => {
          this.dataOfTasks = Object.assign({}, data);
          this.setLoadingState(false)
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
          this.setLoadingState(false)
        })
    }
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
</style>
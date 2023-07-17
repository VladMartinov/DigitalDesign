<template>
  <div id="projects" >
    <div class="container" :class="{ 'container_full-height' : isFilterDateEmpty }" v-if="!isProjectsDataEmpty && !isCurrentUserDataEmpty">
      <FilterBar :isProject="true" :filterObj="getFilterObject" :dropdownFilter="dropdownFilterArray" @onSetNewFilterVal="changeFilterValueDetect" @onAddItem="onAddButtonClick"></FilterBar>

      <EmptyFilter v-if="isFilterDateEmpty" :inputText="'Ни один проект не соответствует результатам поиска'"></EmptyFilter>

      <div class="projects__list">
        <ProjectItem v-for="(project, index) in dataOfProjects.projects" :key="index" :dataProp="project" :currentUser="currentUser" @ProjectsChanged="UpdateProjects"></ProjectItem>
      </div>

      <Paging v-if="isShowPaging" :currentPage="getNumPage" :countPages="dataOfProjects.total" :countItemsOnPage="this.dataOfProjects.projects.length" :isProject="true" @SelectPage="onSelectPage"></Paging>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :typeItem="'project'"></EmptyItems>
    </div>

    <LoadingState></LoadingState>
    <ModalProject v-if="isModalAddActive" :typeAction="'add'" @onSelectedAction="onAddAction"></ModalProject>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar/FilterBar.vue"
import Paging from "@/components/Paging/Paging.vue"

import ProjectItem from '@/components/ProjectItem/ProjectItem.vue'
import EmptyFilter from '@/components/EmptyFilter/EmptyFilter.vue'
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"

import LoadingState from '@/components/LoadingState/LoadingState.vue'
import ModalProject from '@/components/Modal/ModalProject/ModalProject.vue'

import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      dataOfProjects: {},
      currentUser: {},

      dropdownFilterArray: [
        {
          _id: 'name',
          name: 'По названию'
        },
        {
          _id: 'author',
          name: 'По автору'
        },
        {
          _id: 'dateCreated',
          name: 'По дате создания'
        },
        {
          _id: 'dateEdited',
          name: 'По дате обновления'
        }
      ],

      isModalAddActive: false,
      watchDetected: false,
    }
  },
  components: {
    FilterBar, ProjectItem, Paging,
    EmptyItems, ModalProject, EmptyFilter,
    LoadingState
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('projectsStore', ['getFilterObject', 'getNumPage']),

    isFilterDateEmpty() {
      return !this.isProjectsDataEmpty && this.dataOfProjects.projects.length < 1;
    },
    isProjectsDataEmpty() {
      return Object.keys(this.dataOfProjects).length === 0;
    },
    isCurrentUserDataEmpty() {
      return Object.keys(this.currentUser).length === 0;
    },

    isShowPaging() {
      return !this.isProjectsDataEmpty && this.dataOfProjects.total > 1;
    },
  },
  async mounted() {
    this.setLoadingState(true);

    await Promise.all([this.ReciveNewObjects(), this.ReciveCurrentUser()])
      .then((data) => {
        this.dataOfProjects = data[0];
        this.currentUser = data[1];
      });

    this.setLoadingState(false);
  },
  watch: {
    "getFilterObject.name": function() { this.UpdateProjects() },
    "getFilterObject.sortId": function() { this.UpdateProjects() },
    "getFilterObject.orderType": function() { this.UpdateProjects() },

    getNumPage(newValue, oldValue) { if ( newValue !== oldValue ) this.UpdateProjects(); }
  },
  methods: {
    ...mapActions(['setLoadingState', 'setToken']),
    ...mapActions('projectsStore', ['setFilter', 'setNumPage']),

    changeFilterValueDetect(event) {
      this.setFilter(event.newValue)
    },

    onAddButtonClick: function() {
      this.isModalAddActive = true
    },

    onSelectPage: function(event) {
      this.setNumPage(event.value);
    },

    onAddAction: function(event) {
      if (event.isAccept) {
        this.setLoadingState(true)

        let token = this.getToken;

        this.$api.post.project({ name: event.item.name, code: event.item.code }, token)
          .then(() => {
            this.isModalAddActive = false
            this.ReciveNewObjects()
            this.setLoadingState(false)
          })
          .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
            this.isModalAddActive = false
            this.setLoadingState(false)
          })
      } else {
        this.isModalAddActive = false
      }
    },

    ReciveNewObjects: async function() {
      let filterObj = this.getFilterObject;
      let token = this.getToken;

      let data = {
        "page": this.getNumPage,
        "limit": 10,
        "filter": {
          "name": filterObj.name === "" ? null : filterObj.name
        },
        "sort": {
          "field": filterObj.sortId,
          "type": filterObj.orderType
        }
      }

      return await this.$api.post.searchProjects(data, token)
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

    UpdateProjects: async function() {
      if (this.watchDetected) return;

      this.watchDetected = true;
      await this.ReciveNewObjects().then((data) => { 
        this.dataOfProjects = data;
        this.watchDetected = false;
      });
    },
  }
}
</script>

<style lang="scss">
#projects {
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  padding: 24px 0;
}

.projects__list {
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
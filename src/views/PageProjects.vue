<template>
  <div id="projects" >
    <div class="container" :class="{ 'container_full-height' : isFilterDateEmpty }" v-if="!isProjectDataEmpty">
      <FilterBar :isProject="true" :filterObj="getFilterObject" :dropdownFilter="dropdownFilterArray" @onSetNewFilterVal="changeFilterValueDetect" @onAddItem="onAddButtonClick"></FilterBar>

      <EmptyFilter :inputText="'Ни один проект не соответствует результатам поиска'" v-if="isFilterDateEmpty"></EmptyFilter>

      <ItemsList v-if="isUserDataLoaded" :currentUser="currentUser" :dataProps="dataOfProjects" :isProject="true"></ItemsList>
      
      <Paging v-if="isShowPaging" :currentPage="getNumPage" :countPages="dataOfProjects.total" :countItemsOnPage="this.dataOfProjects.projects.length" :isProject="true" @SelectPage="onSelectPage"></Paging>

      <LoadingState></LoadingState>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :typeItem="'task'"></EmptyItems>
    </div>

    <ModalProject v-if="isModalAddActive" :typeAction="'add'" @onSelectedAction="onAddAction"></ModalProject>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar/FilterBar.vue"
import Paging from "@/components/Paging/Paging.vue"

import EmptyFilter from '@/components/EmptyFilter/EmptyFilter.vue'
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import ItemsList from "@/components/ItemsList/ItemsList.vue"

import ModalProject from '@/components/Modal/ModalProject/ModalProject.vue'

import LoadingState from '@/components/LoadingState/LoadingState.vue'

import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      dataOfProjects: {},
      currentUser: null,

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

      isModalAddActive: false
    }
  },
  components: {
    FilterBar, Paging,
    ItemsList,
    EmptyItems, ModalProject, EmptyFilter,
    LoadingState
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('projectsStore', ['getFilterObject', 'getNumPage']),

    isFilterDateEmpty() {
      return this.dataOfProjects && this.dataOfProjects.projects && this.dataOfProjects.projects.length < 1
    },

    isProjectDataEmpty() {
      return Object.keys(this.dataOfProjects).length === 0 && !this.getToken
    },

    isShowPaging() {
      return this.dataOfProjects && this.dataOfProjects.total > 1
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
    "getFilterObject.orderType": function() { this.ReciveNewObjects() },

    getNumPage(newValue, oldValue) {
      this.ReciveNewObjects()
    }
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

    ReciveNewObjects: function() {
      this.setLoadingState(true);

      let filterObj = this.getFilterObject;
      let page = this.getNumPage;
      let token = this.getToken;

      let data = {
        "page": page,
        "limit": 10,
        "filter": {
          "name": filterObj.name === "" ? null : filterObj.name
        },
        "sort": {
          "field": filterObj.sortId,
          "type": filterObj.orderType
        }
      }

      this.$api.post.searchProjects(data, token)
        .then(({data}) => {
          this.dataOfProjects = Object.assign({}, data);
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
#projects {
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  padding: 24px 0;
}
</style>
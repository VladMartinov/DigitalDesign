<template>
  <div id="projects" >
    <div class="container" v-if="!isProjectDataEmpty">
      <FilterBar :isProject="true" :filterObj="getFilterObject" :dropdownFilter="dropdownFilterArray"></FilterBar>
      
      <ItemsList :dataProps="dataOfProjects" :isProject="true"></ItemsList>
      
      <Paging v-if="isShowPaging" :countPages="dataOfProjects.total" :isProject="true"></Paging>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :typeItem="'task'"></EmptyItems>
    </div>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar/FilterBar.vue"
import Paging from "@/components/Paging/Paging.vue"

import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import ItemsList from "@/components/ItemsList/ItemsList.vue"

import { POSTFunc } from '@/api/APIFunc'
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      url: "http://45.12.239.156:8081/api/projects",
      dataOfProjects: {},

      dropdownFilterArray: [
        {
          id: 'name',
          text: 'По названию'
        },
        {
          id: 'author',
          text: 'По автору'
        },
        {
          id: 'date-create',
          text: 'По дате создания'
        },
        {
          id: 'date-update',
          text: 'По дате обновления'
        }
      ]
    }
  },
  components: {
    FilterBar, Paging,
    ItemsList,
    EmptyItems,
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('projectsStore', ['getFilterObject', 'getNumPage']),

    isProjectDataEmpty() {
      if (Object.keys(this.dataOfProjects).length === 0 && !this.getToken) { return true }
      else if (this.dataOfProjects && this.dataOfProjects.projects && this.dataOfProjects.projects.length < 1) { return true }
      else { return false }
    },

    isShowPaging() {
      return this.dataOfProjects && this.dataOfProjects.total > 1
    }
  },
  mounted() {
    this.ReciveNewObjects();
  },
  watch: {
    "getFilterObject.filterName": function() { this.ReciveNewObjects() },
    "getFilterObject.filterSortId": function() { this.ReciveNewObjects() },
    "getFilterObject.filterOrderType": function() { this.ReciveNewObjects() },

    getNumPage(newValue, oldValue) {
      this.ReciveNewObjects()
    }
  },
  methods: {
    ...mapActions(['setLoadingState']),

    ReciveNewObjects: function() {
      this.setLoadingState(true);

      let filterObj = this.getFilterObject;
      let page = this.getNumPage;
      let token = this.getToken;

      if (!token) {
        console.log("Token is empty or undefind: ", token);
        this.setLoadingState(false);

        return
      }

      let data;

      if (filterObj.filterName === "") {
        data = {
          "page": page, // нумерация страниц с единицы
          "limit": 10,
          "sort": {
            "field": filterObj.filterSortId, // name, author, status, executor, dateCreated, dateEdited
            "type": filterObj.filterOrderType  // asc, des
          }
        }
      } else {
        data = {
          "page": page,
          "limit": 10,
          "filter": {
            "name": filterObj.filterName
          },
          "sort": {
            "field": filterObj.filterSortId, // name, author, dateCreated, dateEdited
            "type": filterObj.filterOrderType // asc, desc
          }
        }
      }

      POSTFunc(this.url + "/search", data, token).then((responseData) => {
        this.dataOfProjects = responseData;
        
        this.setLoadingState(false)
      });
    }
  }  
}
</script>

<style lang="scss">
#projects {
  height: 100%;
  padding: 24px 0;
}
</style>
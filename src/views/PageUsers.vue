<template>
  <div id="users">
    <div class="container" v-if="!isUserDataEmpty">
      <FilterBar :isUsers="true"></FilterBar>
      
      <ItemsList :dataProps="dataOfUsers" :isUsers="true"></ItemsList>
      
      <Paging v-if="isShowPaging" :countPages="dataOfUsers.total" :isUsers="true"></Paging>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :typeItem="'user'"></EmptyItems>
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
      url: "http://45.12.239.156:8081/api/users",
      dataOfUsers: {}
    }
  },
  components: {
    FilterBar, Paging,
    ItemsList,
    EmptyItems,
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('usersStore', ['getFilterObject', 'getNumPage']),

    isUserDataEmpty() {
      if (Object.keys(this.dataOfUsers).length === 0 && !this.getToken) { return true }
      else if (this.dataOfUsers && this.dataOfUsers.projects && this.dataOfUsers.projects.length < 1) { return true }
      else { return false }
    },

    isShowPaging() {
      return this.dataOfUsers && this.dataOfUsers.total > 1
    }
  },
  mounted() {
    this.ReciveNewObjects();
  },
  watch: {
    "getFilterObject.filterName": function() { this.ReciveNewObjects() },
    "getFilterObject.filterOrderType": function() { this.ReciveNewObjects() },

    getNumPage(newValue, oldValue) {
      this.ReciveNewObjects()
    }
  },
  methods: {
    ...mapActions(['setLoadingState']),

    ReciveNewObjects: async function() {
      this.setLoadingState(true)

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
          "sort": filterObj.filterOrderType // asc, desc
        }
      } else {
        data = {
          "page": page,
          "limit": 10,
          "filter": {
            "name": filterObj.filterName
          },
          "sort": filterObj.filterOrderType // asc, desc
        }
      }

      await POSTFunc(this.url + "/search", data, token).then((responseData) => {
        this.dataOfUsers = responseData;
      
        this.setLoadingState(false)
      });
    }
  }
}
</script>

<style lang="scss">
#users {
  height: 100%;
  padding: 24px 0;
}
</style>
<template>
  <div id="users">
    <div class="container" :class="{ 'container_full-height' : isFilterDateEmpty }" v-if="!isUserDataEmpty">
      <FilterBar :isUsers="true" :isAdmin="currentUser?.roles[0] === 'ADMIN'" :filterObj="getFilterObject" @onSetNewFilterVal="changeFilterValueDetect" @onAddItem="onAddUser"></FilterBar>

      <EmptyFilter :inputText="'Ни один пользователь не соответствует результатам поиска'" v-if="isFilterDateEmpty"></EmptyFilter>

      <ItemsList v-if="isUserDataLoaded" :currentUser="currentUser" :dataProps="dataOfUsers" :isUsers="true"></ItemsList>
      
      <Paging v-if="isShowPaging" :currentPage="getNumPage" :countPages="dataOfUsers.total" :countItemsOnPage="getCountItemsOnPage" :isUsers="true" @SelectPage="onSelectPage"></Paging>

      <LoadingState></LoadingState>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :isAdmin="currentUser?.roles[0] === 'ADMIN'" :typeItem="'user'"></EmptyItems>
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
  props: {},
  data() {
    return {
      dataOfUsers: {},
      currentUser: null,
    }
  },
  components: {
    FilterBar, Paging,
    ItemsList,
    EmptyItems, LoadingState, EmptyFilter
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('usersStore', ['getFilterObject', 'getNumPage']),

    isFilterDateEmpty() {
      return this.dataOfUsers && this.dataOfUsers.users && this.dataOfUsers.users.length < 1
    },

    isUserDataEmpty() {
      return Object.keys(this.dataOfUsers).length === 0 && !this.getToken
    },

    getCountItemsOnPage() {
      return this.dataOfUsers?.users ? this.dataOfUsers.users.length : NaN
    },

    isShowPaging() {
      return this.dataOfUsers && this.dataOfUsers.total > 1
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
              this.$router.push({ nmae: "LoginForm" });
            } else {
              console.log(e);
            }
            this.setLoadingState(false);
          })
  },
  watch: {
    "getFilterObject.name": function() { this.ReciveNewObjects() },
    "getFilterObject.orderType": function() { this.ReciveNewObjects() },

    getNumPage(newValue, oldValue) {
      this.ReciveNewObjects()
    }
  },
  methods: {
    ...mapActions(['setLoadingState', 'setToken']),
    ...mapActions('usersStore', ['setFilter', 'setNumPage']),

    changeFilterValueDetect(event) {
      this.setFilter(event.newValue)
    },

    onSelectPage: function(event) {
      this.setNumPage(event.value);
    },

    ReciveNewObjects: async function() {
      this.setLoadingState(true)

      let filterObj = this.getFilterObject;
      let page = this.getNumPage;
      let token = this.getToken;

      let data = {
        "page": page,
        "limit": 10,
        "filter": {
          "name": filterObj.name === "" ? null : filterObj.name
        },
        "sort": filterObj.orderType
      }

      this.$api.post.searchUsers(data, token)
        .then(({data}) => {
          this.dataOfUsers = Object.assign({}, data);
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
    },

    onAddUser: function() {
      this.$router.push({ name: "PageUserCreate" })
    }
  }
}
</script>

<style lang="scss">
#users {
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  padding: 24px 0;
}
</style>
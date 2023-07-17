<template>
  <div id="users">
    <div class="container" :class="{ 'container_full-height' : isFilterDateEmpty }" v-if="!isUsersDataEmpty && !isCurrentUserDataEmpty">
      <FilterBar :isUsers="true" :isAdmin="currentUser?.roles[0] === 'ADMIN'" :filterObj="getFilterObject" @onSetNewFilterVal="changeFilterValueDetect" @onAddItem="onAddUser"></FilterBar>

      <EmptyFilter v-if="isFilterDateEmpty" :inputText="'Ни один пользователь не соответствует результатам поиска'"></EmptyFilter>

      <div class="users__list">
        <UserItem v-for="(user, index) in dataOfUsers.users" :key="index" :dataProp="user" :currentUser="currentUser" :updating="updatingUsers" @UserDeleted="UpdateUsers"></UserItem>
      </div>

      <Paging v-if="isShowPaging" :currentPage="getNumPage" :countPages="dataOfUsers.total" :countItemsOnPage="this.dataOfUsers.users.length" :isUsers="true" @SelectPage="onSelectPage"></Paging>
    </div>

    <div class="container container_full-height" v-else>
      <EmptyItems :isAdmin="!isCurrentUserDataEmpty && currentUser?.roles[0] === 'ADMIN'" :typeItem="'user'"></EmptyItems>
    </div>

    <LoadingState></LoadingState>
  </div>
</template>

<script>
import FilterBar from "@/components/FilterBar/FilterBar.vue"
import Paging from "@/components/Paging/Paging.vue"

import EmptyFilter from '@/components/EmptyFilter/EmptyFilter.vue'
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import UserItem from "@/components/UserItem/UserItem.vue"

import LoadingState from '@/components/LoadingState/LoadingState.vue'

import { mapGetters, mapActions } from "vuex"

export default {
  props: {},
  data() {
    return {
      dataOfUsers: {},
      currentUser: {},

      updatingUsers: false,
    }
  },
  components: {
    FilterBar, UserItem, Paging,
    EmptyItems, EmptyFilter, LoadingState
  },
  computed: {
    ...mapGetters(['getToken', 'getLoadingState']),
    ...mapGetters('usersStore', ['getFilterObject', 'getNumPage']),

    isFilterDateEmpty() {
      return !this.isUsersDataEmpty && this.dataOfUsers.users.length < 1;
    },
    isUsersDataEmpty() {
      return Object.keys(this.dataOfUsers).length === 0;
    },
    isCurrentUserDataEmpty() {
      return Object.keys(this.currentUser).length === 0;
    },

    isShowPaging() {
      return !this.isUsersDataEmpty && this.dataOfUsers.total > 1;
    },
  },
  async mounted() {
    this.setLoadingState(true);

    await Promise.all([this.ReciveNewObjects(), this.ReciveCurrentUser()])
      .then((data) => {
        this.dataOfUsers = data[0];
        this.currentUser = data[1];
      });

    this.setLoadingState(false);
  },
  watch: {
    "getFilterObject.name": function() { this.UpdateUsers(); },
    "getFilterObject.orderType": function() { this.UpdateUsers(); },

    getNumPage(newValue, oldValue) { if ( newValue !== oldValue ) this.UpdateUsers(); }
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
      let filterObj = this.getFilterObject;

      let data = {
        "page": this.getNumPage,
        "limit": 10,
        "filter": {
          "name": filterObj.name === "" ? null : filterObj.name
        },
        "sort": filterObj.orderType
      }

      return await this.$api.post.searchUsers(data, this.getToken)
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

    UpdateUsers: async function() {
      this.updatingUsers = true;
      await this.ReciveNewObjects().then((data) => { this.dataOfUsers = data });
      this.updatingUsers = false;
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

.users__list {
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>
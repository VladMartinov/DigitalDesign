<template>
  <div id="task">
    <div class="container container_full-height">
      <div class="task__button-back">
        <BaseButton class="button__second" :isSwap="true" :title="'Вернуться к списку задач'" :nameIcon="'arrow-left'" @onButtonClick="RedirectToTasks"></BaseButton>
      </div>

      <div class="task__content">
        <TaskContent v-if="isAllDataLoaded" :currentUserId="currentUser._id" :currentUserRole="{ 'isAuthor': isAuthor, 'isExecutor': isExecutor, 'isAdmin': isAdmin }" 
          :users="usersData" :task="itemData" :comments="commentsData" :history="historyData" :project="projectData"
          @CreateComment="onCreateNewComment" @DeleteTask="onDeleteTask" @DeleteComment="onDeleteComment" @UpdateComment="onUpdateComment"
        ></TaskContent>
        <TaskAside v-if="isAllDataLoaded" :task="itemData" :users="usersData" :currentUserRole="{ 'isAuthor': isAuthor, 'isExecutor': isExecutor, 'isAdmin': isAdmin }" 
          @ChangeTask="onChangeTask" @ChangeTaskTime="onChangeTaskTime"
        ></TaskAside>
      </div>
    </div>

    <LoadingState></LoadingState>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue";

import TaskContent from '@/components/Task/TaskContent/TaskContent.vue';
import TaskAside from '@/components/Task/TaskAside/TaskAside.vue';

import LoadingState from '@/components/LoadingState/LoadingState.vue';

import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    taskId: {
      type: String,
      default: "Not found"
    },
  },
  data() {
    return {
      currentUser: null,

      itemData: null,
      usersData: null,
      projectData: null,
      commentsData: null,
      historyData: null,
    }
  },
  components: {
    BaseButton,
    TaskContent, TaskAside,
    LoadingState
  },
  computed: {
    ...mapGetters(['getToken']),

    isAllDataLoaded() {
      return this.currentUser !== null &&
        this.usersData !== null &&
        this.itemData !== null &&
        this.commentsData !== null &&
        this.historyData !== null
    },

    isCurrentUserDataEmpty() {
      return Object.keys(this.currentUser).length === 0;
    },

    isAuthor() {
      if (this.isCurrentUserDataEmpty) return false;

      return this.currentUser._id === this.itemData.author;
    },

    isExecutor() {
      if (this.isCurrentUserDataEmpty) return false;

      return this.currentUser._id === this.itemData.executor;
    },

    isAdmin() {
      if (this.isCurrentUserDataEmpty) return false;

      return this.currentUser.roles[0] === "ADMIN";
    }
  },
  async mounted() {
    this.setLoadingState(true);
    let token = this.getToken;

    await this.$api.get.currentUser(token)
      .then(({data}) => {
        this.currentUser = Object.assign({}, data);
      })
      .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
        this.setLoadingState(false);

        return false;
      })

    await this.updateItemData();

    await this.$api.get.taskComments(this.taskId, token)
      .then(({data}) => {
        this.commentsData = data.map((item) => Object.assign({}, item));
        return true;
      })
      .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
        this.setLoadingState(false);

        return false;
      })

    await this.$api.get.taskHistory(this.taskId, token)
      .then(({data}) => {
        this.historyData = data.map((item) => Object.assign({}, item));
        return true;
      })
      .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
        this.setLoadingState(false);

        return false;
      })

    let data = {
      "limit" : 10000,
    };

    await this.$api.post.searchUsers(data, token)
      .then((response) => {
        this.usersData = response.data.users.map((user) => {
          return Object.assign({}, user)
        });

        return true
      })
      .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
        this.setLoadingState(false);

        return false;
      });

    await this.$api.get.project(this.itemData.projectId, token)
        .then(({data}) => {
          this.projectData = Object.assign({}, data);
          return true;
        })
        .catch(e => {
          if (e.status === 400) {
            console.log(this.itemData);
            this.projectData = {
              code: "None",
            }
          }
          console.log(e);
        })

    this.setLoadingState(false);
  },
  watch: {
    taskId() {
      this.updateItemData();
    }
  },
  methods: {
    ...mapActions(['setLoadingState', 'setToken']),

    updateItemData: async function() {
      let token = this.getToken;

      await this.$api.get.task(this.taskId, token)
        .then(async ({data}) => {
          this.itemData = Object.assign({}, data);
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

    RedirectToTasks: function() {
      this.$router.push({ name: 'PageTasks' });
    },

    onChangeTask: function(event) {
      this.setLoadingState(true);

      let token = this.getToken;

      let data = event.data;
      data._id = this.itemData._id;

      this.$api.put.task(data, token)
        .then(({data}) => {
          this.itemData = Object.assign({}, data);
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

    onChangeTaskTime: function(event) {
      this.setLoadingState(true);

      let token = this.getToken;

      this.$api.put.times(event.data, token)
        .then(({data}) => {
          this.itemData = Object.assign({}, data);
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

    onDeleteTask: function() {
      let id = this.itemData._id;
      let token = this.getToken;

      this.$api.delete.task(id, token)
        .then(({data}) => {
          return true;
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
          return false;
        })
    },

    onDeleteComment: async function(event) {
      this.setLoadingState(true);
      let token = this.getToken;

      await this.$api.delete.comment(event._id, token)
        .then(({data}) => {
          this.setLoadingState(false);
          return true;
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
          console.log(e);

          return false;
        });

      await this.updateComments();
      this.setLoadingState(false);
    },

    onCreateNewComment: async function(event) {
      this.setLoadingState(true);

      let token = this.getToken;

      await this.$api.post.comment(event.data, token)
        .then(({data}) => {
          return true;
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
          return false;
        });

      await this.updateComments();
      this.setLoadingState(false);
    },

    onUpdateComment: async function(event) {
      this.setLoadingState(true);

      let token = this.getToken;

      await this.$api.put.comment(event.data, token)
        .then(({data}) => {
          return true;
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
          return false;
        });

      await this.updateComments();
      this.setLoadingState(false);
    },

    updateComments: async function() {
      let token = this.getToken;

      await this.$api.get.taskComments(this.itemData._id, token)
        .then(({data}) => {
          this.commentsData = data.map((item) => Object.assign({}, item));
          return true;
        })
        .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ name: "LoginForm" });
            } else {
              console.log(e);
            }
          return false;
        });
    }
  }
}
</script>

<style lang="scss">
#task {
  display: flex;
  flex-direction: column;
  
  flex-grow: 1;
  padding: 24px 0;
}

.task__button-back {
  margin-bottom: 24px;
}

.task__content {
  display: flex;

  border-radius: 4px;
  border: 1px solid $border-def-color;

  flex-grow: 1;
}
</style>
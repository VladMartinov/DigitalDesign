<template>
  <div class="task-item__wrapper">
    <div class="task-item" v-if="isDataLoaded">
      <div class="task-item-content">
        <div class="task-item-content-row">
          <router-link class="task-item__title" :to="{name: 'PageTaskInfo', params: { taskId: itemData._id} }">
            <Tooltip :textInner="titleToView" :textTooltip="itemData.name" :isTwoLine="true"></Tooltip>
          </router-link>

          <div class="task-item__profile" v-if="!isUserDataEmpty">
            <Tooltip :img="{ imgName: taskAuthor.picture, fullName: taskAuthor.name }" :textTooltip="`Исполнитель:<br />${taskAuthor.name}`"></Tooltip>
          </div>
        </div>

        <div class="task-item-content-info">
          <div class="task-content__id">
            <Tooltip :textInner="'#' + projectData.code" :textTooltip="'#' + projectData.code"></Tooltip>
          </div>

          <div class="task-content__text" v-if="!isUserDataEmpty">
            <Tooltip :textInner="validAuthorInfoText" :time="itemData.dateCreated"></Tooltip>
          </div>

          <div class="task-content-info__status">
            <StatusTag :tag="itemData.status"></StatusTag>
          </div>

          <div class="task-content__user-info" v-if="!isEditAuthorEmpty && !isUserDataEmpty" @mouseover="timeUpdateActive = true">
            <Tooltip :textInner="validEditAuthorInfoText" :time="itemData.dateEdited"></Tooltip>
          </div>
        </div>
      </div>

      <div class="task-item-more" v-if="isAdminOrAuthor">
        <DropdownIcon :buttonsInitArray="dropDownData" @ActionSelected="onAction"></DropdownIcon>
      </div>

      <LoadingState :isComponentsLoaded="!isUpdated"></LoadingState>
    </div>

    <ModalDelete v-if="isModalDeleteActive" :title="itemData.name" :typeItem="'задачу'" @onSelectedAction="onDeleteAction"></ModalDelete>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"
import ProfileImage from "@/components/ProfileImg/ProfileImage.vue"
import StatusTag from "@/components/Status/StatusTag.vue"
import Tooltip from '../ToolTip/Tooltip/Tooltip.vue'

import LoadingState from '../LoadingState/LoadingState.vue'
import ModalDelete from '../Modal/ModalDelete/ModalDelete.vue'


import { ItemDate } from "@/components/mixins/itemDate"

import { mapGetters } from "vuex"

export default {
  mixins: [ ItemDate ],
  props: {
    dataProp: {
      type: Object,
      default: function() {
        return {}
      }
    },
    currentUser: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      itemData: {},
      usersInfo: [],
      projectData: {},

      isUpdated: true,

      dropDownData: [
        {
          id: 'update',
          text: 'Редактировать',
        },
        {
          id: 'delete',
          text: 'Удалить',
          isAttention: true
        }
      ],

      isModalDeleteActive: false,
    }
  },
  components: {
    DropdownIcon, ProfileImage, StatusTag, Tooltip,
    LoadingState, ModalDelete
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('tasksStore', ['getFilterObject']),

    isDataLoaded() {
      return Object.keys(this.itemData).length !== 0
    },
    isAdminOrAuthor() {
      return this.currentUser.roles[0] === "ADMIN" || this.currentUser._id === this.itemData.author;
    },

    isEditAuthorEmpty() {
      if (this.isDataLoaded && this.itemData.authorEdited) return this.itemData.authorEdited === "";
      else return true;
    },
    isUserDataEmpty() {
      if (!this.usersInfo) return true;

      if (this.isEditAuthorEmpty) return this.usersInfo.length ? this.usersInfo.length < 1 : true
      else return this.usersInfo.length ? this.usersInfo.length < 2 : true
    },

    taskAuthor: function() {
      if (this.isUserDataEmpty) return { };

      return this.usersInfo.find((user) => { if (this.itemData.author === user._id) return user; });
    },
    taskAuthorEditerd: function() {
      if (this.isUserDataEmpty) return { };

      return this.usersInfo.find((user) => { if (this.itemData.authorEdited === user._id) return user; });
    },

    validAuthorInfoText() {
      let resultText = this.taskAuthor.name;
      let correctTime = this.correctTimeToString(this.itemData.dateCreated);
      resultText += " создал(а)" + correctTime.date;
      this.timeCreateNotFull = !correctTime.isFull;

      return resultText;
    },
    validEditAuthorInfoText() {
      let resultText = this.taskAuthorEditerd.name;
      let correctTime = this.correctTimeToString(this.itemData.dateEdited);
      resultText += " изменил(а)" + correctTime.date;
      this.timeUpdateNotFull = !correctTime.isFull;

      return resultText;
    },

    titleToView() {
      if (this.getFilterObject.name === "") return this.itemData.name
      else {
        let regexp = new RegExp(this.getFilterObject.name, 'g');
        let text = this.itemData.name;

        return text.replace(regexp, '<span class="text_filter">' + this.getFilterObject.name + '</span>')
      }
    }
  },
  async mounted() {
    this.isUpdated = false;

    this.itemData = Object.assign({}, this.dataProp);

    await Promise.all([this.getUserInfo(), this.getProjectInfo()])
            .then((data) => {
              this.usersInfo = data[0];
              this.projectData = data[1];
            });

    this.isUpdated = true;
  },
  watch: {
    async dataProp() {
      this.isUpdated = false;

      this.itemData = {};
      this.usersInfo = {};
      this.itemData = Object.assign({}, this.dataProp);

      await Promise.all([this.getUserInfo(), this.getProjectInfo()])
              .then((data) => {
                this.usersInfo = data[0];
                this.projectData = data[1];
              });

      this.isUpdated = true;
    }
  },
  methods: {
    onAction: function(event) {
      if (event.id === 'update') this.$router.push({ name: 'PageUpdateTask', params: { isCreate: false, idTask : this.itemData._id } })
      else if (event.id === 'delete') this.isModalDeleteActive = true;
    },

    onDeleteAction: function(event) {
      this.isModalDeleteActive = false;
      if (!event.isAccept) return;

      return this.$api.delete.task(this.itemData._id, this.getToken)
                .then(() => {
                  this.$emit("TaskDeleted");
                  return true;
                })
                .catch(e => {
                  if (e.status === 401) {
                    this.setToken("");
                    this.$router.push({ name: "LoginForm" });
                  } else console.log(e);

                  return {};
                })
    },

    getUserInfo: async function() {
      let idArray = this.isEditAuthorEmpty ? [ this.itemData.author ] : [this.itemData.author, this.itemData.authorEdited];
      let data = {
        "filter": {
            "_id": idArray
          }
      };

      return await this.$api.post.searchUsers(data, this.getToken)
                      .then((response) => {
                        let usersArray = response.data.users.map((user) => { return Object.assign({}, user) });

                        if (idArray.length > 1 && idArray[0] === idArray[1]) usersArray.push(usersArray[0])
                        return usersArray;
                      })
                      .catch(e => {
                        if (e.status === 401) {
                          this.setToken("");
                          this.$router.push({ name: "LoginForm" });
                        } else console.log(e);

                        return {};
                      })
    },

    getProjectInfo: async function() {
      if (this.itemData.projectId === "") return { };

      return await this.$api.get.project(this.itemData.projectId, this.getToken)
                      .then(({data}) => {
                        return Object.assign({}, data);;
                      })
                      .catch(e => {
                        if (e.status === 400) {
                          console.log("Error 400: Project not found. Info about sended data: ", this.itemData);
                          return {
                            code: "None",
                          }
                        } else if (e.status === 401) {
                          this.setToken("");
                          this.$router.push({ name: "LoginForm" });
                        } else console.log("Unknown error: ", e, this.itemData);

                        return {};
                      })
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
<template>
  <div class="project-item__wrapper">
    <div class="project-item" v-if="isDataLoaded">
      <div class="project-item-content">
        <Tooltip :textTooltip="titleToView" :textInner="titleToView" :isTwoLine="true" @click.native="onRedirectToTasks"></Tooltip>

        <div class="project-item-content-info">
          <div class="project-content__id">
            <Tooltip :textTooltip="'#' + itemData.code" :textInner="'#' + itemData.code"></Tooltip>
          </div>

          <div class="project-content__text" v-if="!isUserDataEmpty">
            <Tooltip :textInner="validAuthorInfoText" :time="itemData.dateCreated"></Tooltip>
          </div>

          <div class="project-content__user-info" v-if="!isEditAuthorEmpty && !isUserDataEmpty">
            <Tooltip :textInner="validEditAuthorInfoText" :time="itemData.dateEdited"></Tooltip>
          </div>
        </div>
      </div>

      <div class="project-item-more" v-if="isAdminOrAuthor">
        <DropdownIcon :buttonsInitArray="dropDownData" @ActionSelected="onAction"></DropdownIcon>
      </div>

      <LoadingState :isComponentsLoaded="!isUpdated"></LoadingState>
    </div>

    <ModalProject v-if="isModalUpdateActive" :typeAction="'update'" :projectItem="itemData" @onSelectedAction="onUpdateAction"></ModalProject>
    <ModalDelete v-if="isModalDeleteActive" :title="itemData.name" :typeItem="'задачу'" @onSelectedAction="onDeleteAction"></ModalDelete>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

import LoadingState from '../LoadingState/LoadingState.vue'
import ModalDelete from '@/components/Modal/ModalDelete/ModalDelete.vue'
import ModalProject from '@/components/Modal/ModalProject/ModalProject.vue'
import Tooltip from '../ToolTip/Tooltip/Tooltip.vue'

import { ItemDate } from "@/components/mixins/itemDate"

import { mapGetters, mapActions } from "vuex"

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

      isModalUpdateActive: false,
      isModalDeleteActive: false,
    }
  },
  components: {
    DropdownIcon, Tooltip,
    LoadingState, ModalDelete, ModalProject
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('projectsStore', ['getFilterObject']),

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
      if (!this.isDataLoaded) return;
      if (this.getFilterObject.name === "") return this.itemData.name;

      let regexp = new RegExp(this.getFilterObject.name, 'g');
      let text = this.itemData.name;

      return text.replace(regexp, '<span class="text_filter">' + this.getFilterObject.name + '</span>')
    }
  },
  async mounted() {
    this.isUpdated = false;

    this.itemData = Object.assign({}, this.dataProp);

    this.usersInfo = await this.getUserInfo();

    this.isUpdated = true;
  },
  watch: {
    async dataProp() {
      this.isUpdated = false;

      this.itemData = {};
      this.usersInfo = [];
      this.itemData = Object.assign({}, this.dataProp);

      this.usersInfo = await this.getUserInfo();

      this.isUpdated = true;
    }
  },
  methods: {
    ...mapActions('tasksStore', ['setFilter', 'setNumPage']),

    onAction: function(event) {
      if (event.id === 'update') this.isModalUpdateActive = true;
      else if (event.id === 'delete') this.isModalDeleteActive = true;
    },

    onUpdateAction: function(event) {
      this.isModalUpdateActive = false;
      if (!event.isAccept) return;

      let data = event.item;
      data._id = this.itemData._id;

      return this.$api.put.project(data, this.getToken)
                .then(() => {
                  this.$emit("ProjectsChanged");
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

    onDeleteAction: function(event) {
      this.isModalDeleteActive = false;
      if (!event.isAccept) return;

      return this.$api.delete.project(this.itemData._id, this.getToken)
                .then(() => {
                  this.$emit("ProjectsChanged");
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

    onRedirectToTasks: function() {
      let newFilter = {
        name: "",
        status: [],
        author: [],
        executor: [],
        projectId: this.itemData._id,
        dateStart: "",
        dateEnd: "",
        sortId: "name",
        orderType: "asc",
      }

      this.setFilter(newFilter);
      this.setNumPage(1);

      this.$router.push({ name: 'PageTasks' })
    },
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
<template>
  <div class="task-item-wrapper">
    <div class="task-item">
      <div class="task-item-content">
        <div class="task-item-content-row">
          <router-link class="task-item__title" :to="{name: 'PageTaskInfo', params: { taskId: itemData._id} }">
            <p class="text text_prim" @mouseenter="tooltipTitleActive = true" @mousemove="setTooltipTitlePosition" @mouseleave="tooltipTitleActive = false" v-html="titleToView"></p>
          </router-link>

          <div class="task-item__profile" v-if="!isUserDataEmpty" @mouseover="tooltipAuthorActive = true" @mousemove="setTooltipAuthorPosition" @mouseleave="tooltipAuthorActive = false">
            <ProfileImage :profileImg="usersInfo[0].picture || ''" :profileFullName="usersInfo[0].name"></ProfileImage>
          </div>
        </div>

        <div class="task-item-content-info">
          <div class="task-content__id">
            <span class="text text_prim" @mouseover="tooltipIdActive = true" @mousemove="setTooltipIdPosition" @mouseleave="tooltipIdActive = false">#{{projectData.code}}</span>
          </div>

          <div class="task-content__text" v-if="!isUserDataEmpty" @mouseover="timeCreateActive = true" @mousemove="setTooltipDateCreate" @mouseleave="timeCreateActive = false">
            <p class="text text_disabled">{{ validUserInfoText }}</p>
          </div>

          <div class="task-content-info__status">
            <StatusTag :tag="itemData.status"></StatusTag>
          </div>

          <div class="task-content__user-info" v-if="!isEditAuthorEmpty && !isUserDataEmpty" @mouseover="timeUpdateActive = true" @mousemove="setTooltipDateUpdate" @mouseleave="timeUpdateActive = false">
            <p class="text text_disabled">{{ validEditAuthorInfoText }}</p>
          </div>
        </div>

        <div class="tooltip title-tooltip" v-if="tooltipTitleActive && tooltipTitleOverflow">
          <span class="text text_prim" >{{itemData.name}}</span>
        </div>

        <div class="tooltip id-tooltip" v-if="tooltipIdActive && tooltipIdOverflow">
          <span class="text text_prim">#{{projectData.code}}</span>
        </div>

        <div class="tooltip create-tooltip" v-if="timeCreateActive && timeCreateNotFull">
          <span class="text text_prim" >{{ getFullTime(this.itemData.dateCreated) }}</span>
        </div>

        <div class="tooltip update-tooltip" v-if="timeUpdateActive && timeUpdateNotFull">
          <span class="text text_prim">{{ getFullTime(this.itemData.dateEdited) }}</span>
        </div>

        <div class="tooltip author-tooltip" v-if="tooltipAuthorActive">
          <span class="text text_prim">Исполнитель:<br />{{ usersInfo[0].name }}</span>
        </div>
      </div>

      <div class="task-item-more" v-if="isAdminOrAuthor">
        <DropdownIcon :buttonsInitArray="dropDownData" @ActionSelected="onAction"></DropdownIcon>
      </div>

    </div>

    <ModalDelete v-if="isModalDeleteActive" :title="itemData.name" :typeItem="'задачу'" @onSelectedAction="onDeleteAction"></ModalDelete>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"
import ProfileImage from "@/components/ProfileImg/ProfileImage.vue"
import StatusTag from "@/components/Status/StatusTag.vue"

import ModalDelete from '../Modal/ModalDelete/ModalDelete.vue'

import { ItemDate } from "@/components/mixins/itemDate"

import { mapState, mapGetters, mapActions } from "vuex"

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
      usersInfo: {},
      projectData: {},

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

      tooltipTitleActive: false,
      tooltipTitleOverflow: false,

      tooltipIdActive: false,
      tooltipIdOverflow: false,

      tooltipAuthorActive: false,

      timeCreateActive: false,
      timeUpdateActive: false,

      timeCreateNotFull: false,
      timeUpdateNotFull: false,
    }
  },
  components: { DropdownIcon, ProfileImage, StatusTag, ModalDelete},
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('tasksStore', ['getFilterObject']),

    isEditAuthorEmpty() {
      if (this.itemData?.authorEdited) {
        return this.itemData.authorEdited === "" && this.itemdata.author === null
      } else {
        return true
      }
    },

    isUserDataEmpty() {
      if (this.usersInfo) {
        if (this.isEditAuthorEmpty) {
          return this.usersInfo.length ? this.usersInfo.length < 1 : true
        } else {
          return this.usersInfo.length ? this.usersInfo.length < 2 : true
        }
      } else {
        return true
      }
    },

    validUserInfoText() {
      let resultText = this.usersInfo[0].name;
      let correctTime = this.correctTimeToString(this.itemData.dateCreated);
      resultText += " создал(а)" + correctTime.date;
      this.timeCreateNotFull = !correctTime.isFull;

      return resultText;
    },

    validEditAuthorInfoText() {
      let resultText = this.usersInfo[1].name;
      let correctTime = this.correctTimeToString(this.itemData.dateEdited);
      resultText += " изменил(а)" + correctTime.date;
      this.timeUpdateNotFull = !correctTime.isFull;

      return resultText;
    },

    isAdminOrAuthor() {
      return this.currentUser.roles[0] === "ADMIN" || this.currentUser._id === this.itemData.author;
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
    this.updateBaseItemData();
    this.getUserInfo();
    this.getProjectInfo();
  },
  watch: {
    dataProp() {
      this.updateBaseItemData();
      this.getUserInfo();
      this.getProjectInfo();
    }
  },
  methods: {
    updateBaseItemData: function() {
      this.itemData = Object.assign({}, this.dataProp);
      return;
    },

    setTooltipAuthorPosition: function(event) {
      let author = this.$el.querySelector('.task-item__profile');

      let currentDOMElBox = this.$el.getBoundingClientRect();
      let authorBox = author.getBoundingClientRect();

      if (this.tooltipAuthorActive) {
        let authorTooltip = this.$el.querySelector('.author-tooltip');

        if (authorTooltip) {
          authorTooltip.style.left = `${ authorBox.x - authorBox.width / 2 }px`
          authorTooltip.style.top = `${(authorBox.y - currentDOMElBox.y) + authorBox.height + 22}px`
        }
      }
    },
    
    setTooltipTitlePosition: function(event) {
      let title = this.$el.querySelector('.task-item__title');

      let currentDOMElBox = this.$el.getBoundingClientRect();
      let titleBox = title.getBoundingClientRect();

      this.tooltipTitleOverflow = title.scrollHeight > title.clientHeight;

      if (this.tooltipTitleOverflow) {
        let titleTooltip = this.$el.querySelector('.title-tooltip');

        if (titleTooltip) {
          titleTooltip.style.left = `${event.clientX - currentDOMElBox.x}px`
          titleTooltip.style.top = `${titleBox.height + 22}px`
        }
      }
    },

    setTooltipIdPosition: function(event) {
      let id = this.$el.querySelector('.task-content__id');

      let currentDOMElBox = this.$el.getBoundingClientRect();
      let idBox = id.getBoundingClientRect();

      this.tooltipIdOverflow = id.scrollWidth > id.clientWidth;

      if (this.tooltipIdOverflow && this.tooltipIdActive) {
        let idTooltip = this.$el.querySelector('.id-tooltip');

        if (idTooltip) {
          idTooltip.style.left = `${event.clientX - currentDOMElBox.x}px`
          idTooltip.style.top = `${(idBox.y - currentDOMElBox.y) + idBox.height + 22}px`
        }
      }
    },

    setTooltipDateUpdate: function(event) {
      let dateUpdate = this.$el.querySelector('.task-content__user-info');

      let currentDOMElBox = this.$el.getBoundingClientRect();
      let dateUpdateBox = dateUpdate.getBoundingClientRect();

      if (this.timeUpdateNotFull) {
        let dateUpdateTooltip = this.$el.querySelector('.update-tooltip');

        if (dateUpdateTooltip) {
          dateUpdateTooltip.style.left = `${event.clientX - currentDOMElBox.x}px`
          dateUpdateTooltip.style.top = `${(dateUpdateBox.y - currentDOMElBox.y) + dateUpdateBox.height + 22}px`
        }
      }
    },

    setTooltipDateCreate: function(event) {
      let dateCreate = this.$el.querySelector('.task-content__text');

      let currentDOMElBox = this.$el.getBoundingClientRect();
      let dateCreateBox = dateCreate.getBoundingClientRect();

      if (this.timeCreateNotFull) {
        let dateCreateTooltip = this.$el.querySelector('.create-tooltip');

        if (dateCreateTooltip) {
          dateCreateTooltip.style.left = `${event.clientX - currentDOMElBox.x}px`
          dateCreateTooltip.style.top = `${(dateCreateBox.y - currentDOMElBox.y) + dateCreateBox.height + 22}px`
        }
      }
    },

    onAction: function(event) {
      if (event.id === 'update') {
        this.$router.push({ name: 'PageUpdateTask', params: { isCreate: false, idTask : this.itemData._id } })
      } else if (event.id === 'delete') {
        this.isModalDeleteActive = true;
      }
    },

    onDeleteAction: function(event) {
      if (event.isAccept) {
        let id = this.itemData._id;
        let token = this.getToken;

        this.$api.delete.task(id, token)
          .then(() => {
            this.isModalDeleteActive = false;
          })
          .catch(e => {
            console.log(e);
            this.isModalDeleteActive = false;
          })
      } else {
          this.isModalDeleteActive = false;
      }
    },

    getUserInfo: function() {
      let idUser;
      if (this.isEditAuthorEmpty) {
        idUser = {
          "filter": {
            "_id": [this.itemData.author]
          }
        };
      } else {
        idUser = {
          "filter": {
            "_id": [this.itemData.author, this.itemData.authorEdited]
          }
        };
      }

      let token = this.getToken;

      this.$api.post.searchUsers(idUser, token)
        .then((response) => {
          this.usersInfo = response.data.users.map((item) => {
            return Object.assign({}, item)
          });

          if (idUser.filter._id.length > 1 && idUser.filter._id[0] === idUser.filter._id[1]) {
            this.usersInfo.push(this.usersInfo[0])
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    getProjectInfo: function() {
      this.$api.get.project(this.itemData.projectId, this.getToken)
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
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
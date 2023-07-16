<template>
  <div class="project-item-wrapper">
    <div class="project-item">
      <div class="project-item-content">
        <div class="project-item__title" @click="onRedirectToTasks">
          <p class="text text_prim" @mouseenter="tooltipTitleActive = true" @mousemove="setTooltipTitlePosition" @mouseleave="tooltipTitleActive = false" v-html="titleToView"></p>
        </div>

        <div class="project-item-content-info">
          <div class="project-content__id">
            <span class="text text_prim" @mouseover="tooltipIdActive = true" @mousemove="setTooltipIdPosition" @mouseleave="tooltipIdActive = false">#{{itemData.code}}</span>
          </div>

          <div class="project-content__text" v-if="!isUserDataEmpty" @mouseover="timeCreateActive = true" @mousemove="setTooltipDateCreate" @mouseleave="timeCreateActive = false">
            <p class="text text_disabled">{{ validUserInfoText }}</p>
          </div>

          <div class="project-content__user-info" v-if="!isEditAuthorEmpty && !isUserDataEmpty" @mouseover="timeUpdateActive = true" @mousemove="setTooltipDateUpdate" @mouseleave="timeUpdateActive = false">
            <p class="text text_disabled">{{ validExecutorInfoText }}</p>
          </div>
        </div>

        <div class="tooltip title-tooltip" v-if="tooltipTitleActive && tooltipTitleOverflow">
          <span class="text text_prim" >{{itemData.name}}</span>
        </div>

        <div class="tooltip id-tooltip" v-if="tooltipIdActive && tooltipIdOverflow">
          <span class="text text_prim">#{{itemData._id}}</span>
        </div>

        <div class="tooltip create-tooltip" v-if="timeCreateActive && timeCreateNotFull">
          <span class="text text_prim" >{{ getFullTime(this.itemData.dateCreated) }}</span>
        </div>

        <div class="tooltip update-tooltip" v-if="timeUpdateActive && timeUpdateNotFull">
          <span class="text text_prim">{{ getFullTime(this.itemData.dateEdited) }}</span>
        </div>
      </div>

      <div class="project-item-more" v-if="isAdminOrAuthor">
        <DropdownIcon :buttonsInitArray="dropDownData" @ActionSelected="onAction"></DropdownIcon>
      </div>
    </div>

    <ModalProject v-if="isModalUpdateActive" :typeAction="'update'" :projectItem="itemData" @onSelectedAction="onUpdateAction"></ModalProject>
    <ModalDelete v-if="isModalDeleteActive" :title="itemData.name" :typeItem="'задачу'" @onSelectedAction="onDeleteAction"></ModalDelete>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

import ModalDelete from '@/components/Modal/ModalDelete/ModalDelete.vue'
import ModalProject from '@/components/Modal/ModalProject/ModalProject.vue'

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

      tooltipTitleActive: false,
      tooltipIdActive: false,

      tooltipTitleOverflow: false,
      tooltipIdOverflow: false,

      timeCreateActive: false,
      timeUpdateActive: false,

      timeCreateNotFull: false,
      timeUpdateNotFull: false,
    }
  },
  components: { DropdownIcon, ModalDelete, ModalProject },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('projectsStore', ['getFilterObject']),

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
      let correctTime = this.correctTimeToString(this.itemData.dateCreated)
      resultText += " создал(а)" + correctTime.date;
      this.timeCreateNotFull = !correctTime.isFull;

      return resultText;
    },

    validExecutorInfoText() {
      let resultText = this.usersInfo[1].name;
      let correctTime = this.correctTimeToString(this.itemData.dateEdited)
      resultText += " изменил(а)" + correctTime.date;
      this.timeUpdateNotFull = !correctTime.isFull;

      return resultText;
    },

    isAdminOrAuthor() {
      return this.currentUser.roles[0] === "ADMIN" || this.currentUser._id === this.itemData.author;
    },

    titleToView() {
      if (Object.keys(this.itemData).length === 0) return;
      if (this.getFilterObject.name === "") return this.itemData.name
      else {
        let regexp = new RegExp(this.getFilterObject.name, 'g');
        let text = this.itemData.name;

        return text.replace(regexp, '<span class="text_filter">' + this.getFilterObject.name + '</span>')
      }
    }
  },
  mounted() {
    this.updateBaseItemData();
    this.getUserInfo();
  },
  watch: {
    dataProp() {
      this.updateBaseItemData();
      this.getUserInfo();
    }
  },
  methods: {
    ...mapActions('tasksStore', ['setFilter', 'setNumPage']),

    updateBaseItemData: function() {
      this.itemData = Object.assign({}, this.dataProp)
    },

    setTooltipTitlePosition: function(event) {
      let title = this.$el.querySelector('.project-item__title');

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
      let id = this.$el.querySelector('.project-content__id');

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
      let dateUpdate = this.$el.querySelector('.project-content__user-info');

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
      let dateCreate = this.$el.querySelector('.project-content__text');

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

    onUpdateAction: function(event) {
      if (event.isAccept) {
        let token = this.getToken;

        let data = event.item;
        data._id = this.itemData._id;

        this.$api.put.project(data, token)
          .then(() => {
            this.isModalUpdateActive = false;
          })
          .catch(e => {
            console.log(e);
            this.isModalUpdateActive = false
          })
      } else {
        this.isModalUpdateActive = false
      }
    },

    onAction: function(event) {
      if (event.id === 'update') {
        this.isModalUpdateActive = true;
      } else if (event.id === 'delete') {
        this.isModalDeleteActive = true;
      }
    },

    onDeleteAction: function(event) {
      if (event.isAccept) {
        let id = this.itemData._id;
        let token = this.getToken;

        this.$api.delete.project(id, token)
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
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
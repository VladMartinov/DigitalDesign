<template>
  <div class="user-item__wrapper">
    <div class="user-item" v-if="isDataLoaded">
      <div class="user-item-content">
        <div class="user-item-content__wrapper">
          <ProfileImage :profileImg="validProfileImg" :profileFullName="itemData.name"></ProfileImage>

          <router-link class="user-item-content__link" :to="{ name: 'ProfileUser', params: { userId: itemData._id } }">
            <p class="text text_prim" v-if="itemData.name" v-html="titleToView"></p>
          </router-link>
        </div>

        <StatusTag v-if="itemData.status" :tag="itemData.status"></StatusTag>
      </div>

      <div class="user-item-more" v-if="isAdmin">
        <DropdownIcon :buttonsInitArray="dropDownData" @ActionSelected="onActionSelected"></DropdownIcon>
      </div>

      <LoadingState :isComponentsLoaded="updating"></LoadingState>
    </div>

    <ModalDelete v-if="isShowModal" :title="itemData.name" :typeItem="'пользователя'" @onSelectedAction="onConfirmDelete"></ModalDelete>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"
import ProfileImage from "@/components/ProfileImg/ProfileImage.vue"
import StatusTag from "@/components/Status/StatusTag.vue"

import LoadingState from '../LoadingState/LoadingState.vue'
import ModalDelete from '../Modal/ModalDelete/ModalDelete.vue'

import { mapGetters } from 'vuex'

export default {
  props: {
    dataProp: {
      type: Object,
      default: function() {
        return {};
      }
    },
    currentUser: {
      type: Object,
      default: function() {
        return {};
      }
    },
    updating: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      itemData: {},

      dropDownData: [
        {
          id: "update",
          text: 'Редактировать',
        },
        {
          id: "delete",
          text: 'Удалить',
          isAttention: true
        }
      ],

      isShowModal: false,
    }
  },
  components: {
    DropdownIcon, ProfileImage, StatusTag,
    LoadingState, ModalDelete
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('usersStore', ['getFilterObject']),

    isDataLoaded() {
      return Object.keys(this.itemData).length !== 0
    },
    isAdmin() {
      return this.currentUser.roles[0] === "ADMIN";
    },

    titleToView() {
      if (this.getFilterObject.name === "") return this.itemData.name
      else {
        let regexp = new RegExp(this.getFilterObject.name, 'g');
        let text = this.itemData.name;

        return text.replace(regexp, '<span class="text_filter">' + this.getFilterObject.name + '</span>')
      }
    },

    validProfileImg() {
      return this.itemData.picture === null ? "" : this.itemData.picture;
    },
  },
  mounted() {
    this.itemData = Object.assign({}, this.dataProp);
  },
  watch: {
    dataProp() {
      this.itemData = {};
      this.itemData = Object.assign({}, this.dataProp);
    }
  },
  methods: {
    onActionSelected: function(event) {
      if (event.id === "update") this.$router.push({ name: "PageUserUpdate", params: { userId : this.itemData._id } });
      else if (this.itemData.status !== "DELETED") this.isShowModal = true;
    },

    onConfirmDelete: function(event) {
      this.isShowModal = false;
      if (!event.isAccept) return;

      let data = {
        "_id": this.itemData._id,
        "status": "DELETED"
      }

      return this.$api.put.userStatus(data, this.getToken)
                .then(() => {
                  this.$emit("UserDeleted");
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
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
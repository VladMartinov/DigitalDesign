<template>
  <section class="profile">
    <div class="container">
      <div class="profile__button-back" v-if="userId !== null">
        <BaseButton class="button__second" :isSwap="true" :title="'Вернуться к списку пользователей'" :nameIcon="'arrow-left'" @onButtonClick="onRedirectToUserPage"></BaseButton>
      </div>

      <div class="profile__wrapper">
        <div class="profile-info-img" v-if="!isUserDataEmpty">
          <img :src="'http://45.12.239.156:8081/' + userData.picture" alt="Profile Image" v-if="!isPictureProfileEmpty">
          <span class="profile-info-img__text" v-else>{{ textPicture }}</span>

          <div class="profile-info-img__dropdown" v-if="isDataLoaded && (isAdmin || currentUser._id === userData._id)">
            <DropdownIcon :buttonsInitArray="dropDownDataImg" @ActionSelected="onSelectActionImage"></DropdownIcon>
          </div>
        </div>

        <div class="profile-info" v-if="!isUserDataEmpty">
          <div class="profile-info__header">
            <div class="profile-info__full-name">
              <h2 class="text text_prim text_h2">{{userData.name}}</h2>
            </div>
            
            <div class="profile-info__status">
              <StatusTag :tag="userData.status"></StatusTag>
            </div>
            
            <DropdownIcon v-if="isDataLoaded && (isAdmin || currentUser._id === userData._id)" :buttonsInitArray="dropDownData" @ActionSelected="onSelectActionProfile"></DropdownIcon>
          </div>

          <div class="profile-info__title">
            <p class="text text_disabled">О себе:</p>
          </div>

          <div class="profile-info__text">
            <p class="text text_black">
              {{userData.description || ""}}
            </p>
          </div>
        </div>
      </div>

      <ModalDelete v-if="showDeleteModal" :title="userData.name" :typeItem="'пользователя'" @onSelectedAction="onDeleteCurrentUser"></ModalDelete>
      <ModalPassword :isShowModal="showUpdPassword" @CloseModal="showUpdPassword = false" @setNewPassword="onSetPassword"></ModalPassword>
      <ModalUpdatePhoto :isShowModal="showLoadPicture" @CloseModal="showLoadPicture = false" @onPhotoSelected="onSetPicture"></ModalUpdatePhoto>

      <LoadingState></LoadingState>
    </div>
  </section>
</template>

<script>
import StatusTag from "@/components/Status/StatusTag.vue"

import BaseButton from '../Buttons/BaseButton/BaseButton.vue'
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

import ModalPassword from '../Modal/ModalPassword/ModalPassword.vue'
import ModalUpdatePhoto from '../Modal/ModalUpdatePhoto/ModalUpdatePhoto.vue'
import ModalDelete from '../Modal/ModalDelete/ModalDelete.vue'

import LoadingState from '../LoadingState/LoadingState.vue'

import { mapGetters, mapActions } from "vuex"

export default {
  props: {
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      userData: {},
      currentUser: null,

      dropDownDataImg: [
        {
          id: "update-image",
          text: "Редактировать"
        },
        {
          id: "delete-image",
          text: "Удалить",
          isAttention: !this.isPictureProfileEmpty,
          isDisabled: this.isPictureProfileEmpty
        }
      ],
      dropDownData: [
        {
          id: "update-profile",
          text: 'Редактировать',
        },
        {
          id: "update-password",
          text: 'Изменить пароль',
        },
        {
          id: "check-tasks",
          text: 'Просмотр задач пользователя',
        },
      ],

      showUpdPassword: false,
      showLoadPicture: false,
      showDeleteModal: false,

      isDataLoaded: false,
    }
  },
  components: {
    StatusTag, DropdownIcon, BaseButton,
    ModalPassword, ModalUpdatePhoto, ModalDelete,
    LoadingState
  },
  computed: {
    ...mapGetters(['getToken', 'getRole']),

    isAdmin() {
      return this.currentUser.roles[0] === "ADMIN";
    },

    isUserDataEmpty() {
      return Object.keys(this.userData).length === 0;
    },

    isPictureProfileEmpty() {
      return this.userData.picture === null;
    },

    textPicture() {
      let splitedName = this.userData.name.split(' ')
      let resultText = ""

      for (let splitedItem in splitedName) {
        resultText += splitedName[splitedItem][0]
      }

      return resultText
    }
  },
  async mounted() {
    let token = this.getToken;
    this.currentUser = await this.$api.get.currentUser(token)
          .then(({data}) => {
            return Object.assign({}, data);
          })
          .catch(e => {
            console.log(e);

            return null;
          })

    if (this.userId === null || this.userId === this.currentUser._id) this.userData = Object.assign({}, this.currentUser);
    else this.onLoadProfileData();

    if (this.isAdmin) this.dropDownData.push({ id: "delete", text: "Удалить", isAttention: true })

    this.isDataLoaded = true;
    this.setLoadingState(false);
  },
  watch: {
    isPictureProfileEmpty() {
      this.dropDownDataImg[1].isAttention = !this.isPictureProfileEmpty;
      this.dropDownDataImg[1].isDisabled = this.isPictureProfileEmpty;
    }
  },
  methods: {
    ...mapActions(['setToken', 'setLoadingState']),
    ...mapActions('tasksStore', ['setFilter', 'setNumPage']),

    onSelectActionProfile: function(event) {
      if ( event.id === "update-password" ) {
        this.showUpdPassword = true;
      } else if (event.id === "update-profile") {
        console.log(this.userId);
        if (this.userId === null) this.$router.push({ name: 'ProfileUpdate' });
        else this.$router.push({ name: "PageUserUpdate", params: { userId: this.userId } });
      } else if (event.id === "check-tasks") {
        let newFilter = {
          name: "",
          status: [],
          author: [],
          executor: [this.userData._id],
          projectId: "",
          dateStart: "",
          dateEnd: "",
          sortId: "name",
          orderType: "asc",
        }

        this.setFilter(newFilter);
        this.setNumPage(1);
        this.$router.push({ name: 'PageTasks' })
      } else if (event.id === "delete") {
        this.showDeleteModal = true;
      }
    },

    onSelectActionImage: function(event) {
      if (event.id === "update-image") {
        this.showLoadPicture = true;
      } else if (event.id === "delete-image") {
        let data = {
          imageFile: null,
          imageType: 'jpg'
        }

        this.onSetPicture(data);
      } else {
        return
      }
    },

    onLoadProfileData: function() {
      this.setLoadingState(true)
      let token = this.getToken;

      let data = {
        "filter": {
          "_id" : this.userId
        }
      }

      this.$api.post.searchUsers(data, token)
        .then(async ({data}) => {
          this.userData = Object.assign({}, data.users[0]);
          this.setLoadingState(false);
        })
        .catch(e => {
          console.log(e)
          this.setLoadingState(false);
        });
    },

    onSetPassword: function(event) {
      let token = this.getToken;

      let data = {
        "_id" : this.userData._id,
        "password" : event.password
      }

      this.$api.put.userPass(data, token)
        .then(() => {
          this.showUpdPassword = false;
        })
        .catch(e => {
          console.log(e);
          this.showUpdPassword = false;
        })
    },

    onSetPicture: function(event) {
      this.setLoadingState(true)
      let token = this.getToken;

      let data = new FormData();
      data.append("_id", this.userData._id);
      data.append("picture", event.imageFile);

      this.$api.put.userPicture(data, event.imageType, token)
        .then(({data}) => {
          this.showLoadPicture = false;

          this.userData = Object.assign({}, data);
          this.setLoadingState(false);
        })
        .catch(e => {
          console.log(e);
          this.showLoadPicture = false;
          this.setLoadingState(false);
        })
    },

    onDeleteCurrentUser: function(event) {
      this.showDeleteModal = false;
      if (!event.isAccept) return;

      this.setLoadingState(true)

      let token = this.getToken;
      let data = {
        "_id": this.userData._id,
        "status": "DELETED"
      }

      return this.$api.put.userStatus(data, token)
        .then(() => {
          this.setLoadingState(false)
        }).catch((e) => {
          console.log(e);
          this.setLoadingState(false)
          return false
        })
    },

    onRedirectToUserPage: function() {
      this.$router.push({ name: 'PageUsers' })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
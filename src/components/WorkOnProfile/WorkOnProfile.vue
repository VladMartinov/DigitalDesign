<template>
  <section class="task-worker">
    <div class="container container_full-height">
      <div class="task-worker__wrapper">
        <div class="task-worker__title">
          <h1 class="text text_prim text_h1">Редактирование профиля</h1>
        </div>

        <div class="task-worker__line">
        </div>

        <div class="task-worker__form-wrapper">
          <form class="task-worker__form">
            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">ФИО<span class="text text_error">*</span></label>
              <Input maxlength="255" :hideIcons="true" :textPlaceholder="'Введите текст...'" :initValue="userData.name" @updateValue="onInputValue"></Input>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">Логин<span class="text text_error">*</span></label>
              <p class="text text_prim">{{ userData.login }}</p>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">О себе</label>
              <Textarea :initValue="userData.description" maxlength="2047" placeholder="Введите текст..." @onValueChange="onTextAreaValue"></Textarea>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">Фото</label>
              <InputFile :currentImage="model.picture" :isErrorFormat="isErrorFormat" :isErrorSize="isErrorSize" :isPhotoLoaded="isPhotoLoaded" @onFileChange="onInputPicture"></InputFile>
            </div>
          </form>

          <div class="task-worker__aside" v-if="isAdmin">
            <div class="task-worker__toggle">
              <p class="task-worker__toggle-text text text_prim">Активен</p>
              <Toggle :name="'active-state'" :currentValue="model.active" @onToggle="onToggleChange"></Toggle>
            </div>

            <div class="task-worker__line">
            </div>

            <div class="task-worker__radio">
              <p class="task-worker__radio-text text text_prim">Пользователь</p>
              <RadioButton name="user-role" :unicName="'user-user'" :currentValue="model.role" :value="'USER'" @onRadioClick="onRadioChange"></RadioButton>
            </div>

            <div class="task-worker__radio">
              <p class="task-worker__radio-text text text_prim">Администратор</p>
              <RadioButton name="user-role" :unicName="'user-admin'" :currentValue="model.role" :value="'ADMIN'" @onRadioClick="onRadioChange"></RadioButton>
            </div>
          </div>
        </div>

        <div class="task-worker__line">
        </div>

        <div class="task-worker__actions">
          <div class="task-worker__cancel">
            <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onGetBack"></BaseButton>
          </div>

          <BaseButton class="button__primary" :title="'Сохранить изменения'" @onButtonClick="onSendValue"></BaseButton>
        </div>
        
      </div>
    </div>

    <ModalConfirm v-if="isRoleModal || isStatusModal" :confirmButtonText="'Да, продолжить'" :text="modalText" :title="modalTitle" :minAnswer="true" @onSelectedAction="onModalSelectStatus"></ModalConfirm>
    <ModalConfirm v-if="isShowModal" :confirmButtonText="'Да, сохранить'" :title="'Имеются несохраненные изменения'" :text="'Вы хотите их сохранить?'" @onSelectedAction="onModalSelect"></ModalConfirm>
    <LoadingState></LoadingState>
  </section>
</template>

<script>
import Input from "@/components/Inputs/Input.vue"
import InputFile from '@/components/Inputs/InputFile/InputFile.vue'

import Textarea from "@/components/Inputs/Textarea/Textarea.vue"

import LoadingState from '@/components/LoadingState/LoadingState.vue'

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

import ModalConfirm from '@/components/Modal/ModalConfirm/ModalConfirm.vue'

import Toggle from '@/components/Toggle/Toggle.vue'
import RadioButton from '@/components/Buttons/RadioButton/RadioButton.vue'

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    userId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      userData: {},
      validFormatsArray: ['jpg', 'png'],

      model: {
        name: "",
        desc: "",
        active: false,
        picture:{
          file: null,
          url: null
        },
        role: "",
      },

      isShowModal: false,
      isPictureModif: false,

      eventModalObj: null,

      isStatusModal: false,
      isRoleModal: false,

      isDataModif: false,
    }
  },
  components: {
    Input, InputFile,
    Textarea, BaseButton,
    Toggle, RadioButton,
    ModalConfirm,
    LoadingState,
  },
  computed: {
    ...mapGetters(['getToken', "getRole", 'getLoadingState']),

    isAdmin() {
      return this.getRole === "ADMIN";
    },

    modalTitle() {
      return this.isStatusModal ? 'Изменение статуса' : 'Изменение роли';
    },

    modalText() {
      return this.isStatusModal ? 'Вы уверены, что хотите изменить статус пользователя?' : 'Вы уверены, что хотите изменить роль пользователя?';
    },

    isPhotoLoaded() {
      return this.model.picture && this.model.picture.file !== null;
    },

    isErrorSize() {
      return this.isPhotoLoaded && (this.model.picture.file.size / 1048576) > 1;
    },

    isErrorFormat() {
      if (!this.isPhotoLoaded) return false;
      let splitedImageName = this.model.picture.file.name.split(".")
      return !this.validFormatsArray.includes(splitedImageName[splitedImageName.length - 1]);
    },

    modelIsNotEmpty() {
      return this.model.name !== "" || this.model.desc !== "" || this.model.picture.file !== null;
    },
  },
  async mounted() {
    let token = this.getToken;
    let imageName = null;

    this.setLoadingState(true)

    if (this.isAdmin && this.userId !== "") {
      let data = {
        "filter": {
          "_id" : this.userId
        }
      }

      await this.$api.post.searchUsers(data, token)
        .then(async ({data}) => {
          this.userData = Object.assign({}, data.users[0]);

          imageName = data.users[0].picture;
          this.model.name = data.users[0].name;
          this.model.desc = data.users[0].description;
          this.model.role = data.users[0].roles[0];
          this.model.active = data.users[0].status === "ACTIVE" ? true : false;
        })
        .catch(e => {
          console.log(e)
        });
    } else {
      await this.$api.get.currentUser(token)
        .then(async ({data}) => {
          imageName = data.picture;
          this.model.name = data.name;
          this.model.desc = data.description;
          this.model.role = data.roles[0];
          this.model.active = data.status === "ACTIVE" ? true : false;

          this.userData = Object.assign({}, data);
        })
        .catch(e => {
          console.log(e)
        })
    }
    if (imageName !== null) {
      this.model.picture.file = await this.$api.get.blobPicture(imageName).then(({data}) => {
        let modfiResponse = data;

        return modfiResponse;
      }).catch(e => {
        console.log(e);
        return null;
      });
      this.model.picture.file.name = imageName
    }
    this.setLoadingState(false);
  },
  watch: {
    isStatusModal() {
      if ((this.isStatusModal && this.eventModalObj !== null) || (!this.isStatusModal && this.eventModalObj === null)) return;

      this.model.active = this.eventModalObj;
      this.eventModalObj = null;
    },

    isRoleModal() {
      if ((this.isRoleModal && this.eventModalObj !== null) || (!this.isRoleModal && this.eventModalObj === null)) return;

      this.model.role = this.eventModalObj;
      this.eventModalObj = null;
    }
  },
  methods: {
    ...mapActions(['setLoadingState']),

    onInputValue: function(event) {
      this.model.name = event.value;

      this.isDataModif = true;
    },

    onTextAreaValue: function(event) {
      this.model.desc = event.value;

      this.isDataModif = true;
    },

    onInputPicture: function(event) {
      this.model.picture.file = event.photo.file;
      this.isPictureModif = true;
    },

    onToggleChange: function(event) {
      this.eventModalObj = event.value;
      this.isStatusModal = true;
    },

    onRadioChange: function(event) {
      this.eventModalObj = event.value;
      this.isRoleModal = true;
    },

    onGetBack: function() {
      if (this.modelIsNotEmpty && this.isDataModif) {
        this.isShowModal = true;
      } else {
        this.$router.go(-1);
      }
    },

    onModalSelectStatus: function(event) {
      if (!event.isAccept) this.eventModalObj = null;

      this.isRoleModal = false;
      this.isStatusModal = false;
    },

    onSendValue: async function() {
      if (this.model.name === "") return false;

      this.setLoadingState(true);
      let token = this.getToken;

      let data = {
        "_id": this.userData._id,
        "name": this.model.name,
      }

      if (this.model.desc !== "") data.description = this.model.desc;
      if (this.isAdmin) data.roles = [this.model.role];

      let answer = await this.$api.put.user(data, token)
        .then(({data}) => {
          this.model.name = data.name;
          this.model.desc = data.description;

          this.isDataModif = false;

          return true;
        })
        .catch(e => {
          console.log(e)
          return false;
        })

      if (this.isPictureModif && answer && !this.isErrorFormat && !this.isErrorSize) {
        this.setLoadingState(true);
        data = new FormData();

        data.append("_id", this.userData._id);
        data.append("picture", this.model.picture.file);

        answer = await this.$api.put.userPicture(data, event.imageType, token)
          .then(async ({data}) => {
            let imageName = data.picture;

            this.model.picture.file = await this.$api.get.blobPicture(imageName).then(({data}) => {
              this.isPictureModif = false;
              return data;
            }).catch(e => {
              console.log(e);
              return null;
            });
            this.model.picture.file.name = imageName;

            return true
          })
          .catch(e => {
            console.log(e);
            return false;
          })
      }
      if (this.isAdmin && answer) {
        data = {
          "_id": this.userData._id,
          "status": this.model.active ? "ACTIVE" : "BLOCKED"
        }

        return this.$api.put.userStatus(data, token)
          .then(() => {
            this.setLoadingState(false)
          }).catch((e) => {
            console.log(e);
            this.setLoadingState(false)
            return false
          })
      } else {
        this.setLoadingState(false);
        return answer;
      }
    },

    onModalSelect: async function(event) {
      this.isShowModal = false;

      if (!event.isAccept) return;
      if (!event.isSave && event.isAccept) {
        this.$router.go(-1);
        return;
      }

      let answer = await this.onSendValue();
      if (answer) this.$router.go(-1);
      else return;
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
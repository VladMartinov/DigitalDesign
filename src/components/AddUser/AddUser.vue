<template>
  <section class="task-worker">
    <div class="container container_full-height">
      <div class="task-worker__wrapper">
        <div class="task-worker__title">
          <h1 class="text text_prim text_h1">Создание профиля сотрудника</h1>
        </div>

        <div class="task-worker__line">
        </div>

        <div class="task-worker__form-wrapper">
          <form class="task-worker__form">
            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">ФИО<span class="text text_error">*</span></label>
              <Input :hideIcons="true" maxlength="255" :textPlaceholder="'Введите текст...'" :initValue="model.name" @updateValue="model.name = $event.value"></Input>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">Логин<span class="text text_error">*</span></label>
              <Input :hideIcons="true" maxlength="15" :textPlaceholder="'Введите текст...'" :initValue="model.login" @updateValue="InputLogin"></Input>
            </div>

            <div class="task-worker__row" v-if="isLoginError">
              <label class="task-worker__text text text_disabled"></label>
              <span class="text text_error">Неверный формат логина или его длинна не больше 3-х символов.</span>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">Пароль<span class="text text_error">*</span></label>
              <InputPassword maxlength="15" :currentVal="model.password" @onValueChanged="InputPassword"></InputPassword>
            </div>
            
            <div class="task-worker__row" v-if="isPasswordError">
              <label class="task-worker__text text text_disabled"></label>
              <span class="text text_error">Минимальное длинна пароля составлят 6 символов.</span>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">О себе</label>
              <Textarea :initValue="model.desc" maxlength="2047" placeholder="Введите текст..." @onValueChange="model.desc = $event.value"></Textarea>
            </div>

            <div class="task-worker__row">
              <label class="task-worker__text text text_disabled">Фото</label>
              <InputFile :currentImage="model.picture" :isErrorFormat="isErrorFormat" :isErrorSize="isErrorSize" :isPhotoLoaded="isPhotoLoaded" @onFileChange="onInputPicture"></InputFile>
            </div>
          </form>

          <div class="task-worker__aside">
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
import InputPassword from '../Inputs/InputPassword/InputPassword.vue'

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
      validFormatsArray: ['jpg', 'png'],
      userData: {},

      model: {
        name: "",
        login: "",
        password: "",
        desc: "",
        picture:{
          file: null,
          url: null
        },
        active: false,
        role: "",
      },

      isDataUnsaved: false,

      isShowModal: false,
      isPictureModif: false,

      eventModalObj: null,

      isStatusModal: false,
      isRoleModal: false,
      isLoginError: false,
      isPasswordError: false,
    }
  },
  components: {
    Input, InputFile, InputPassword,
    Textarea, BaseButton,
    Toggle, RadioButton,
    ModalConfirm,
    LoadingState,
  },
  computed: {
    ...mapGetters(['getToken', "getRole", 'getLoadingState']),

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

    InputLogin: function(event) {
      this.model.login = event.value;

      this.isDataUnsaved = true;
      this.isLoginError = false;
    },

    InputPassword: function(event) {
      this.model.password = event.value;

      this.isDataUnsaved = true;
      this.isPasswordError = false;
    },

    onInputPicture: function(event) {
      this.model.picture.file = event.photo.file;
      this.isDataUnsaved = true;
      this.isPictureModif = true;
    },

    onToggleChange: function(event) {
      this.eventModalObj = event.value;
      this.isDataUnsaved = true;
      this.isStatusModal = true;
    },

    onRadioChange: function(event) {
      this.eventModalObj = event.value;
      this.isDataUnsaved = true;
      this.isRoleModal = true;
    },

    onGetBack: function() {
      if (this.modelIsNotEmpty && this.isDataUnsaved) {
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
      let regExLogin = /[^a-zA-Z0-9_\-.@]/;

      if (this.model.login.match(regExLogin) || this.model.name.login < 3) {
        this.isLoginError = true;
        return;
      }

      if (this.model.name.password < 6) {
        this.isPasswordError = true;
        return;
      }

      if (this.model.name === "" || this.model.login === "" || this.model.password === "") return false;

      this.setLoadingState(true);
      let token = this.getToken;

      let data = {
        "name": this.model.name,
        "login": this.model.login,
        "password": this.model.password,
      }

      let answer = await this.$api.post.registration(data, token)
        .then(({data}) => {
          this.userData = Object.assign({}, data);

          this.isDataUnsaved = false;
          return true;
        })
        .catch(e => {
          if (e.status === 401) {
            this.setToken("");
            this.$router.push({ nmae: "LoginForm" });
          } else console.log(e);

          return false;
        });

      if (!answer) return false;

      data = {
        "_id": this.userData._id,
        "roles": [this.model.role],
      }

      if (this.model.desc !== "") data.description = this.model.desc;

      answer = await this.$api.put.user(data, token)
        .then(({data}) => {
          return true;
        })
        .catch(e => {
          if (e.status === 401) {
            this.setToken("");
            this.$router.push({ nmae: "LoginForm" });
          } else console.log(e);

          return false;
        });

      if (this.isPictureModif && answer && !this.isErrorFormat && !this.isErrorSize) {
        this.setLoadingState(true);
        data = new FormData();

        data.append("_id", this.userData._id);
        data.append("picture", this.model.picture.file);

        answer = await this.$api.put.userPicture(data, event.imageType, token)
          .then(async ({data}) => {
            let imageName = data.picture;

            await this.$api.get.blobPicture(imageName).then(({data}) => {
              return data;
            })
        .catch(e => {
          if (e.status === 401) {
            this.setToken("");
            this.$router.push({ nmae: "LoginForm" });
          } else console.log(e);

          return null;
        });

            return true
          })
          .catch(e => {
            if (e.status === 401) {
              this.setToken("");
              this.$router.push({ nmae: "LoginForm" });
            } else console.log(e);

            return false;
          });
      }
      if (answer) {
        data = {
          "_id": this.userData._id,
          "status": this.model.active ? "ACTIVE" : "BLOCKED"
        }

        return this.$api.put.userStatus(data, token)
          .then(() => {
            this.setLoadingState(false)
          })
        .catch(e => {
          if (e.status === 401) {
            this.setToken("");
            this.$router.push({ nmae: "LoginForm" });
          } else console.log(e);

          this.setLoadingState(false);

          return false;
        });
      } else {
        this.setLoadingState(false);
        return answer;
      }
    },

    onModalSelect: async function(event) {
      this.isShowModal = false;
      if (!event.isAccept) return;
      if (!event.isSave) this.$router.go(-1);

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
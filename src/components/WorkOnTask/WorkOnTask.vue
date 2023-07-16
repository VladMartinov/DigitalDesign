<template>
  <section class="task-worker">
    <div class="container container_full-height">
      <div class="task-worker__wrapper">
        <div class="task-worker__title">
          <h1 class="text text_prim text_h1">{{ validTitle }}</h1>
        </div>

        <div class="task-worker__line">
        </div>

        <form class="task-worker__form">
          <div class="task-worker__row">
            <label class="task-worker__text text text_disabled">Название<span class="text text_error">*</span></label>
            <Input maxlength="256" :hideIcons="true" :textPlaceholder="'Введите текст...'" :initValue="model.name" @updateValue="onInputValue"></Input>

          </div>

          <div class="task-worker__row" v-if="isMinNameError">
            <label class="task-worker__text text text_disabled"></label>
            <span class="text text_error">Минимальная длинна названия - 3 символа</span>
          </div>


          <div class="task-worker__row">
            <label class="task-worker__text text text_disabled">Описание<span class="text text_error" v-if="isCreate">*</span></label>
            <Textarea maxlength="2047" placeholder="Введите текст..." :initValue="model.desc" @onValueChange="onTextAreaValue"></Textarea>
          </div>

          <div class="task-worker__row">
            <label class="task-worker__text text text_disabled">Проект<span class="text text_error">*</span></label>
            <InputSelect :currentValId="model.project" :inputValueArray="selectProjectData" :textPlaceholder="'Не назначен'" @onValueSelected="onSelectProjectValue"></InputSelect>
          </div>

          <div class="task-worker__row">
            <label class="task-worker__text text text_disabled">Исполнитель</label>
            <InputSelectProfile :currentValId="model.user" :inputValueArray="selectUsersData" :textPlaceholder="'Не назначен'" :isSearch="true" @onValueSelected="onSelectUserValue"></InputSelectProfile>
          </div>
        </form>

        <div class="task-worker__line">
        </div>

        <div class="task-worker__actions">
          <div class="task-worker__cancel">
            <BaseButton class="button__second" :title="'Отмена'" @onButtonClick="onGetBack"></BaseButton>
          </div>

          <BaseButton class="button__primary" :title="validButtonText" @onButtonClick="onSendValue"></BaseButton>
        </div>
        
      </div>
    </div>

    <ModalConfirm v-if="isShowModal" :confirmButtonText="'Да, сохранить'" :title="'Имеются несохраненные изменения'" :text="'Вы хотите их сохранить?'" @onSelectedAction="onModalSelect"></ModalConfirm>
    <LoadingState></LoadingState>
  </section>
</template>

<script>
import Input from "@/components/Inputs/Input.vue"
import InputSelect from "@/components/Inputs/InputSelect/InputSelect.vue"
import InputSelectProfile from '@/components/Inputs/InputSelectProfile/InputSelectProfile.vue'

import Textarea from "@/components/Inputs/Textarea/Textarea.vue"

import LoadingState from '@/components/LoadingState/LoadingState.vue'

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

import ModalConfirm from '@/components/Modal/ModalConfirm/ModalConfirm.vue'

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    isCreate: {
      type: Boolean,
      default: true
    },
    idTask: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectUsersData: [],
      selectProjectData: [],
      currentUser: null,

      projectData: {},

      model: {
        name: null,
        desc: null,
        project: null,
        user: null
      },

      isShowModal: false,
      isModifExist: false,

      redirectInfo: null,
      isUpdatePage: false,

      isMinNameError: false
    }
  },
  components: {
    Input, InputSelect, InputSelectProfile,
    Textarea,
    BaseButton,
    LoadingState,
    ModalConfirm
  },
  computed: {
    ...mapGetters(['getToken', 'getLoadingState']),

    validTitle() {
      return this.isCreate ? 'Создание задачи' : 'Редактирование задачи';
    },

    validButtonText() {
      return this.isCreate ? 'Создать задачу' : 'Сохранить изменения';
    },

    modelIsNotEmpty() {
      return this.model.name !== "" || this.model.desc !== "" || this.model.project !== "" || this.model.user !== "";
    }
  },
  created() {
    window.addEventListener('beforeunload', this.updatePage)
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.updatePage)
  },
  async mounted() {
    let token = this.getToken;

    if (!this.isCreate) {
      this.setLoadingState(true)

      await this.$api.get.task(this.idTask, token)
        .then(({data}) => {
          this.model.name = data.name;
          this.model.desc = data.description;
          this.model.project = data.projectId;
          this.model.user = data.executor;

          this.setLoadingState(false)

          return true;
        })
        .catch(e => {
          console.log(e)
          this.setLoadingState(false)
          return false;
        });
    }

    await this.$api.get.currentUser(token)
          .then(({data}) => {
            this.currentUser = Object.assign({}, data);
            this.setLoadingState(false);
          })
          .catch(e => {
            console.log(e);
            this.setLoadingState(false);
          })

    let data = {
      limit: 10000
    }

    await this.$api.post.searchUsers(data, token)
      .then(({data}) => {
        this.selectUsersData = data.users;
      }).catch(e => {
        console.log(e)
      });

    this.$api.post.searchProjects(data, token)
      .then(({data}) => {
        this.selectProjectData = data.projects.map((project) => { return Object.assign({}, project) })
        if (this.model.project === null) this.model.project = this.selectProjectData[0]._id;
      }).catch(e => {
        console.log(e)
      });
  },
  watch: {},
  methods: {
    ...mapActions(['setLoadingState']),

    onInputValue: function(event) {
      this.model.name = event.value

      this.isModifExist = true;
      this.isMinNameError = false;
    },

    onTextAreaValue: function(event) {
      this.model.desc = event.value

      this.isModifExist = true;
    },
    
    onSelectProjectValue: function(event) {
      this.model.project = event.valId

      this.isModifExist = true;
    },
    
    onSelectUserValue: function(event) {
      this.model.user = event.valId

      this.isModifExist = true;
    },

    onGetBack: function() {
      if (this.modelIsNotEmpty && this.isModifExist) {
        this.isShowModal = true;
      } else {
        this.$router.go(-1);
      }
    },

    updatePage: function(event) {
      event.preventDefault();
      event.returnValue = false;

      if (this.modelIsNotEmpty && this.isModifExist) {
        this.isShowModal = true;
        this.isUpdatePage = true;

        return false;
      }
      else return false;
    },

    onSendValue: async function() {
      if (this.model.name.length < 3) {
        this.isMinNameError = true;
        return false;
      }
      if (this.model.name === "" || this.model.name === null || this.model.project === "" || this.model.project === null) return false;
      if (this.isCreate) {
        if (this.model.desc === "" || this.model.desc === null) return false;

        this.setLoadingState(true);
        let token = this.getToken;

        let data = {
          "name": this.model.name,
          "projectId": this.model.project,
          "description" : this.model.desc,
        }

        if (this.model.user !== "" && this.model.user !== null) data.executor = this.model.user;

        let taskData = await this.$api.post.task(data, token)
          .then(({data}) => {
            this.setLoadingState(false)

            return Object.assign({}, data);
          })
          .catch(e => {
            console.log(e)
            this.setLoadingState(false)

            return false;
          })

        this.isModifExist = false;
        if (this.redirectInfo !== null) this.$router.push(this.redirectInfo);
        else this.$router.push({ name: 'PageTaskInfo', params: { taskId: taskData._id } });
      } else {
        this.setLoadingState(true);
        let token = this.getToken;

        let data = {
          "_id": this.idTask,
          "name": this.model.name,
          "projectId": this.model.project,
        }

        if (this.model.desc !== "") data.description = this.model.desc;
        if (this.model.user !== "") data.executor = this.model.user;

        await this.$api.put.task(data, token)
          .then(({data}) => {
            this.dataOfTasks = Object.assign({}, data);
            this.setLoadingState(false);

            return true;
          })
          .catch(e => {
            console.log(e)
            this.setLoadingState(false)

            return false;
          });

        this.isModifExist = false;
        if (this.redirectInfo !== null) this.$router.push(this.redirectInfo);
        else this.$router.push({ name: 'PageTaskInfo', params: { taskId: this.dataOfTasks._id } });
      }
    },

    onModalSelect: async function(event) {
      this.isShowModal = false;
      this.isModifExist = false;

      if (!event.isAccept) return;

      if (!event.isSave) {
        if (this.isUpdatePage) {
          this.isUpdatePage = false;
          this.$forceUpdate();
          return;
        } else if (this.redirectInfo !== null) this.$router.push(this.redirectInfo);
        else this.$router.go(-1);
      }
      else {
        let answer = await this.onSendValue();
        if (!answer) return;

        if (this.isUpdatePage) {
          this.isUpdatePage = false;
          this.$forceUpdate();
          return;
        } else if (this.redirectInfo !== null) this.$router.push(this.redirectInfo);
        else this.$router.go(-1);
      }
    }
  },
  beforeRouteUpdate(to,from, next) {
    if (this.isModifExist) {
      console.log(to);
      this.isShowModal = true;
      this.redirectInfo = to;
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isModifExist) {
      this.isShowModal = true;
      this.redirectInfo = to;
    } else {
      next();
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
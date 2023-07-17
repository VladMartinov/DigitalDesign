<template>
  <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <nav class="header__nav">
            <router-link to="/projects">
              <BaseButton class="" :class="['button__nav', $route.fullPath ==='/projects' ? 'active'  : '']" :title="'Проекты'"></BaseButton>
            </router-link>

            <BaseButton :class="['button__nav', $route.fullPath.match(/tasks/) ? 'active' : '']" :title="'Задачи'" @onButtonClick="moveToTask"></BaseButton>

            <router-link to="/users">
              <BaseButton :class="['button__nav', $route.fullPath ==='/users' ? 'active' : '']" :title="'Пользователи'"></BaseButton>
            </router-link>
          </nav>

          <div class="header-profile" v-click-outside="hideDropdown">
            <div class="header-profile__wrapper" :class="{ 'active' : !isHidden || $route.fullPath ==='/profile'}" @click="changeDropdownState">
              <div class="header-profile__img" v-if="!isUserDataEmpty">
                <ProfileImage :profileImg="pictureProfile" :profileFullName="profile.name"></ProfileImage>
              </div>

              <button class="header-profile__button">
                <SvgIcon :name="'arrow-bottom'"></SvgIcon>
              </button>
            </div>

            <DropdownMenu :buttonsArray="dropDownData" :isHidden="isHidden" @onSelectAction="onProfileAction"></DropdownMenu>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
import ProfileImage from "@/components/ProfileImg/ProfileImage.vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue";
import DropdownMenu from "@/components/Dropdown/DropdownMenu/DropdownMenu.vue";

import { mapGetters, mapActions } from "vuex"

export default {
  props: {},
  data() {
    return {
      profile: {},

      isHidden: true,
      dropDownData: [
        {
          id: "profile",
          text: "Профиль"
          }, 
        {
          id: "exit",
          text: "Выход"
        }
      ],
    }
  },
  components: {
    BaseButton, SvgIcon, ProfileImage, DropdownMenu
  },
  computed: {
    ...mapGetters(['getToken']),

    isUserDataEmpty() {
      return Object.keys(this.profile).length === 0
    },

    pictureProfile() {
      return this.profile.picture === null ? "" : this.profile.picture
    }
  },
  mounted() {
    this.ReciveNewObjects();
  },
  watch: {},
  methods: {
    ...mapActions(['setToken', 'setLoadingState']),
    ...mapActions('tasksStore', ['setFilter', 'setNumPage']),

    changeDropdownState: function() {
      this.isHidden = !this.isHidden;
    },
    hideDropdown: function() {
      this.isHidden = true;
    },

    ReciveNewObjects: function() {
      this.setLoadingState(true)
      let token = this.getToken;

      this.$api.get.currentUser(token)
        .then(({data}) => {
          this.profile = Object.assign({}, data);
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

    onProfileAction: function(event) {
      if (event.id === "profile") {
        if (this.$route.name !== 'Profile') this.$router.push({ name: 'Profile' });

        this.isHidden = true;
      } else {
        this.setToken("");
        this.$router.push({ name: 'LoginForm' });
      }
    },

    moveToTask: function() {
        this.setFilter({ executor: [this.profile._id], projectId: "" });
        this.setNumPage(1);

        if (this.$route.name === 'PageTasks') return;
        else this.$router.push({ name: 'PageTasks' })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
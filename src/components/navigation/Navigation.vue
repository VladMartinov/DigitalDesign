<template>
  <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <nav class="header__nav">
            <NavButton :title="'Проекты'" :isActive="isProject"></NavButton>
            <NavButton :title="'Задачи'" :isActive="isTask  "></NavButton>
            <NavButton :title="'Пользователи'" :isActive="isProfile"></NavButton>
          </nav>

          <div :class="profileClass" v-on:click="hideDropdown">
            <div class="header-profile__img">
              <ProfileImage :profileImg="ProfileImg"></ProfileImage>
            </div>

            <button class="header-profile__button">
              <SvgIcon :name="'arrow-bottom'"></SvgIcon>
            </button>

            <DropdownMenu :buttonArray="dropDownData" :isHidden="isHidden"></DropdownMenu>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
import ProfileImg from "@/assets/images/profile-img.jpg";

import ProfileImage from "@/components/profile-img/ProfileImage.vue"
import SvgIcon from "@/components/svg-icon/SvgIcon.vue"

import NavButton from "@/components/buttons/nav-button/NavButton.vue"
import DropdownMenu from "@/components/dropdown/dropdown-menu/DropdownMenu.vue"

export default {
  props: {
    project: {
      type: Boolean,
      default: false
    },
    task: {
      type: Boolean,
      default: false
    },
    profile: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      ProfileImg: ProfileImg,
      isHidden: true,
      dropDownData: [
        {text: "Профиль"}, 
        {text: "Выход"}
        ],
      isProject: this.project,
      isTask: this.task,
      isProfile: this.profile
    }
  },
  components: {
    NavButton, SvgIcon, ProfileImage, DropdownMenu
  },
  computed: {
    profileClass() {
      return this.isHidden ? "header-profile" : "header-profile header-profile_active"
    }
  },
  watch: {},
  methods: {
    hideDropdown: function(event) {
      this.isHidden = !this.isHidden
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
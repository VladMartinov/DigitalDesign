<template>
  <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <nav class="header__nav">
            <NavButton :title="'Проекты'" :typePage="'projects'" :isActive="activePageArray[0]" @onNavButtonClick="onNavClick"></NavButton>
            <NavButton :title="'Задачи'" :typePage="'tasks'" :isActive="activePageArray[1]" @onNavButtonClick="onNavClick"></NavButton>
            <NavButton :title="'Пользователи'" :typePage="'profile'" :isActive="activePageArray[2]" @onNavButtonClick="onNavClick"></NavButton>
          </nav>

          <div :class="profileClass" v-on:click="hideDropdown">
            <div class="header-profile__img">
              <ProfileImage :profileImg="ProfileImg"></ProfileImage>
            </div>

            <button class="header-profile__button">
              <SvgIcon :name="'arrow-bottom'"></SvgIcon>
            </button>

            <DropdownMenu :buttonsArray="dropDownData" :isHidden="isHidden"></DropdownMenu>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
import ProfileImg from "@/assets/images/profile-img.jpg";

import ProfileImage from "@/components/ProfileImg/ProfileImage.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

import NavButton from "@/components/Buttons/NavButton/NavButton.vue"
import DropdownMenu from "@/components/Dropdown/DropdownMenu/DropdownMenu.vue"

export default {
  props: {
    activePageArray: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      ProfileImg: ProfileImg,
      isHidden: true,
      activePages: [],
      dropDownData: [
        {text: "Профиль"}, 
        {text: "Выход"}
        ],
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
  mounted() {
    this.activePages = Object.assign([], this.activePageArray)
  },
  watch: {},
  methods: {
    hideDropdown: function() {
      this.isHidden = !this.isHidden
    },

    onNavClick : function(event) {
      this.isProject = false;
      this.isTask = false;
      this.isProfile = false

      if(event.page === "projects") {
        this.isProject = true
      } else if (event.page === "tasks") {
        this.isTask = true
      } else if (event.page === "profile") {
        this.isProfile = true
      }

      this.$emit("pageSelected", {
        page: event.page
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
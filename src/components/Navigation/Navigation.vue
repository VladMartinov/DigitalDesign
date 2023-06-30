<template>
  <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <nav class="header__nav">
            <BaseButton :title="'Проекты'" :isNav="true" data-typePage="projects" :isActive="activePageArray[0]" @onButtonClick="onNavClick"></BaseButton>
            <BaseButton :title="'Задачи'" :isNav="true" data-typePage="tasks" :isActive="activePageArray[1]" @onButtonClick="onNavClick"></BaseButton>
            <BaseButton :title="'Пользователи'" :isNav="true" data-typePage="profile" :isActive="activePageArray[2]" @onButtonClick="onNavClick"></BaseButton>
          </nav>

          <div :class="profileClass" @click="changeDropdownState" v-click-outside="hideDropdown">
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

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
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
      dropDownData: [
        {text: "Профиль"}, 
        {text: "Выход"}
        ],
    }
  },
  components: {
    BaseButton, SvgIcon, ProfileImage, DropdownMenu
  },
  computed: {
    profileClass() {
      return this.isHidden ? "header-profile" : "header-profile header-profile_active"
    }
  },
  watch: {},
  methods: {
    changeDropdownState: function() {
      this.isHidden = !this.isHidden
    },

    hideDropdown: function() {
      this.isHidden = true
    },

    onNavClick : function(event) {
      this.isProject = false;
      this.isTask = false;
      this.isProfile = false

      if(event.dataValue.typepage === "projects") {
        this.isProject = true
      } else if (event.dataValue.typepage === "tasks") {
        this.isTask = true
      } else if (event.dataValue.typepage === "profile") {
        this.isProfile = true
      }

      this.$emit("pageSelected", {
        page: event.dataValue.typepage
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
<template>
  <div :class="dropdownClass">
    <div class="dropdown-select-profile__search-wrapper">
      <Input :isSmall="true" :textPlaceholder="'Поиск...'" @updateValue="onSearchValueUpd"></Input>
    </div>

    <div v-for="value in filteredArray" :key="value._id" :data-value="value._id" :class="{'active' : isActiveCheckBox(value._id)}" @click="onSelectValue">
      <div v-if="value.status !== 'DELETED'" class="dropdown-select-profile__button-wrapper" :class="{ 'active' : isActiveCheckBox(value._id) }">
        <div  class="dropdown-multiselect__icon" :class="{'active' : isActiveCheckBox(value._id)}">
          <SvgIcon :name="nameIconCheckBox(value._id)"></SvgIcon>
        </div>
        
        <ProfileImage :profileImg="value.picture" :profileFullName="value.name"></ProfileImage>

        <p class="dropdown-select-profile__text text text_prim" v-html="textToRender(value.name)"></p>
      </div>
    </div>

    <div class="dropdown-select-profile__empty-text" v-if="searchEmpty">
      <p class="text text_disabled">Пользователь не найден</p>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Inputs/Input.vue"

import ProfileImage from "@/components/ProfileImg/ProfileImage.vue"
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() { 
        return []
      }
    },
    selectedValues: {
      type: Array,
      default: function() {
        return []
      }
    },
    isHidden: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "Выберите значение..."
    }
  },
  data() {
    return {
      valueSearch: ""
    }
  },
  components: { Input, ProfileImage, SvgIcon },
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown-select-profile dropdown-select-profile_hidden' : 'dropdown-select-profile'
    },

    filteredArray() {
      return this.inputValueArray.filter((value) => {
        return this.isSearch(value.name)
      })
    },

    searchEmpty() {
      return (this.filteredArray.length === 0 && this.valueSearch.length > 0)
    }
  },
  watch: {},
  methods: {
    isActiveCheckBox(currentId) {
      return this.selectedValues.find((value) => value === currentId) || false
    },

    nameIconCheckBox(currentId) {
      return this.isActiveCheckBox(currentId) ? 'check-active-icon' : 'check-icon'
    },

    onSelectValue(event) {
      this.$emit("onMultiValueSelected", {
        value: event.currentTarget.dataset.value,
        isInArray: this.isActiveCheckBox(event.currentTarget.dataset.value),
      })
    },

    onSearchValueUpd(event) {
      this.valueSearch = event.value
    },

    isSearch(text) {
      if (this.valueSearch === "") return true;

      let regexp = new RegExp(this.valueSearch, 'gi');
      return regexp.test(text);
    },

    textToRender(text) {
      if (this.valueSearch === "") return text;

      let regexp = new RegExp(this.valueSearch, 'g');

      return text.replace(regexp, '<span class="text_filter">' + this.valueSearch + '</span>')
    },
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
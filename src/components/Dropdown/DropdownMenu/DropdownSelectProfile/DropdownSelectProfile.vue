<template>
  <div :class="dropdownClass">
    <div class="dropdown-select-profile__search-wrapper" v-if="isNeedSearch">
      <Input :isSmall="true" :textPlaceholder="'Поиск...'" @updateValue="onSearchValueUpd"></Input>
    </div>

    <div class="wrapper" v-for="value in filteredArray" :key="value._id">
      <div v-if="value.status !== 'DELETED'" :data-value="value._id" :class="buttonClass(value._id)" @click="onSelectValue">
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

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() { 
        return []
      }
    },
    currentSelectedValId: {
      type: String,
      default: ""
    },
    isHidden: {
      type: Boolean,
      default: true
    },
    isNeedSearch: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Выберите значение..."
    }
  },
  data() {
    return {
      valueArray: [],
      valueSearch: ""
    }
  },
  components: { Input, ProfileImage },
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown-select-profile dropdown-select-profile_hidden' : 'dropdown-select-profile'
    },

    filteredArray() {
      return this.valueArray.filter((value) => {
        return this.isSearch(value.name)
      })
    },

    searchEmpty() {
      return (this.filteredArray.length === 0 && this.valueSearch.length > 0)
    }
  },
  watch: {
    inputValueArray() {
      this.valueArray = this.inputValueArray.map(value => {
        return Object.assign({}, value)
      })
    }
  },
  mounted() {
    this.valueArray = this.inputValueArray.map(value => {
        return Object.assign({}, value)
      })
  },
  methods: {
    onSelectValue(event) {
      let currVal = this.filteredArray.find((value) => {
        return value._id == event.currentTarget.dataset.value
      })

      this.$emit("onValueSelected", {
        value: currVal._id,
        valueArray: this.valueArray,
        text: currVal.name
      })
    },

    onSearchValueUpd(event) {
      this.valueSearch = event.value
    },

    isSearch(text) {
      if (this.valueSearch === "") {
        return true
      }

      let regexp = new RegExp(this.valueSearch)

      return regexp.test(text)
    },

    textToRender(text) {
      if (this.valueSearch === "") {
        return text
      } else {
        let regexp = new RegExp(this.valueSearch, 'g');

        return text.replace(regexp, '<span class="text_filter">' + this.valueSearch + '</span>')
      }
    },
    
    buttonClass(valId) {
      return this.currentSelectedValId == valId ?
        "dropdown-select-profile__button-wrapper dropdown-select-profile__button-wrapper_active" :
        "dropdown-select-profile__button-wrapper"
    },
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
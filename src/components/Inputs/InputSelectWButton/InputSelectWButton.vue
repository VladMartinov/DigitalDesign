<template>
  <div class="select-with-btn__wrapper" v-click-outside="closeDropdown">
    <div v-if="!isUsers" :class="inputWrapperClass" @click="changeStateDropdown">
      
      <p :class="textClass">{{ currentVal }}</p>

      <button class="button-select__button-open" :disabled="isDisabled" type="button">
        <SvgIcon :name="'arrow-bottom'" :flipImg="isOpened"></SvgIcon>
      </button>

      <DropdownSelect :inputValueArray="inputValueArray" :isHidden="!isOpened" :isProject="isProject" :isTask="isTask" @onValueSelected="selectValue"></DropdownSelect>
    </div>

    <div class="button-type-order" @click="selectOrder">
      <SvgIcon name="filter-arrow-icon" :flipImg="!isDescending"></SvgIcon>
    </div>
  </div>
</template>

<script>
import DropdownSelect from "@/components/Dropdown/DropdownMenu/DropdownSelect/DropdownSelect.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() {
        return []
      }
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    hideDropdown: {
      type: Boolean,
      default: false
    },
    isProject: {
      type: Boolean,
      default: false
    },
    isUsers: {
      type: Boolean,
      default: false
    },
    isTask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentVal: "",
      currentValId: "",

      order: 'asc',

      isOpened: false,
    }
  },
  components: {
    SvgIcon, DropdownSelect
  },
  computed: {
    ...mapGetters('projectsStore', {projectGetFilterObject :'getFilterObject'}),
    ...mapGetters('usersStore', {userGetFilterObject :'getFilterObject'}),
    ...mapGetters('tasksStore', {taskGetFilterObject :'getFilterObject'}),

    currentFilterObj() {
      if (this.isProject) {
        return this.projectGetFilterObject
      } else if (this.isUsers) {
        return this.userGetFilterObject
      } else if (this.isTask) {
        return this.taskGetFilterObject
      }
    },

    inputWrapperClass() {
      let newClass = 'button-sort__wrapper'

      if (this.isDisabled) {
        newClass += " button-sort__wrapper_disabled"
      } else if (this.isOpened) {
        newClass += " button-sort__wrapper_active"
      }

      return newClass
    },

    textClass() {
      return this.isDisabled ? "button-sort__value text text_disabled" : "button-sort__value text text_prim"
    },

    isDescending() {
      return this.order === 'desc'
    }
  },
  mounted() {
    this.setCurrentValue();
  },
  watch: {
    currentFilterObj() {
      this.setCurrentValue()
    }
  },
  methods: {
    setCurrentValue() {
      if (!this.isUsers) {
        this.currentVal = this.currentFilterObj.filterSortText;
        this.currentValId = this.currentFilterObj.filterSortId;
      }

      this.order = this.currentFilterObj.filterOrderType;
    },

    selectValue(event) {
      this.currentValId = event.value;
      this.currentVal = event.text;

      this.$emit("onSortedValueSelected", {
        valId: this.currentValId,
        val: this.currentVal,
      })
    },

    selectOrder() {
      this.order = this.order === 'asc' ? 'desc' : 'asc'

      this.$emit("onOrderValueSelected", {
        filterOrder: this.order
      })
    },

    changeStateDropdown: function() {
      this.isOpened = !this.isOpened
    },

    closeDropdown: function() {
      this.isOpened = false;
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
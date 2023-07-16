<template>
  <section class="filters">
    <div class="filters__wrapper">
      <div class="filters__input">
        <Input :textPlaceholder="'Поиск...'" @updateValue="onChangeTextFilter" :currFilterValue="filterObj.name || ''"></Input>
      </div>

      <div class="filters__filter-form" v-if="!isProject && !isUsers" v-click-outside="CloseForm">
        <BaseButton class="button__second button_small" :isActive="isFilterFormActive" :nameIcon="'filter-form-icon'" @onButtonClick="changeStateFilterForm"></BaseButton>

        <DropdownFilterForm :class="filterFormClass" :filterObj="filterObj" @onClearForm="FormAction" @onAcceptForm="FormAction" ></DropdownFilterForm>
      </div>

      <div v-if="!isUsers" class="filters__select">
        <InputSelectWButton :inputValueArray="dropdownFilter" :isUsers="isUsers" :isProject="isProject" :isTask="isTask" :currFilterObj="filterObj" @onSortedValueSelected="onSortedSelectChange" @onOrderValueSelected="onOrderSelectChange"></InputSelectWButton>
      </div>
      <BaseButton v-else class="button__second button_small" :isFlip="!isDescending" :nameIcon="'filter-arrow-icon'" @onButtonClick="onOrderSelectChange"></BaseButton>

      <div class="filters__add-button" :class="{ 'user' : isUsers && isAdmin }" v-if="!isUsers || (isUsers && isAdmin)">
        <BaseButton :class="isUsers && isAdmin ? 'button__primary' : 'button__second'" :title="isUsers && isAdmin ? 'Добавить пользователя' : 'Добавить'" @onButtonClick="onAddItem"></BaseButton>
      </div>
    </div>
  </section>

</template>

<script>
import Input from "@/components/Inputs/Input.vue"
import InputSelect from "@/components/Inputs/InputSelect/InputSelect.vue"
import InputSelectWButton from "@/components/Inputs/InputSelectWButton/InputSelectWButton.vue"

import DropdownFilterForm from "@/components/Dropdown/DropdownFilterForm/DropdownFilterForm.vue"

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

import { mapGetters } from 'vuex'

export default {
  props: {
    isProject: {
      type: Boolean,
      default: false
    },
    isAdmin: {
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
    },
    filterObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dropdownFilter: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dropdownArray: [],

      isFilterFormActive: false
    }
  },
  components: { 
    Input, InputSelect, InputSelectWButton,
    DropdownFilterForm,
    BaseButton, SvgIcon
  },
  computed: {
    ...mapGetters(['getRole']),

    filterFormClass() {
      return this.isFilterFormActive ? '' : 'filter-form_hidden'
    },
    
    isDescending() {
      return this.filterObj.orderType === "desc"
    },
  },
  watch: {
  },
  methods: {
    changeStateFilterForm: function() {
      this.isFilterFormActive = !this.isFilterFormActive
    },

    onSortedSelectChange: function(event) {
      console.log("Sort ID: ",event.valId);

      let val = {
        sortId: event.valId,
      };

      this.EmitNewVal(val)
    },

    onOrderSelectChange: function(event) {
      let newVal = this.filterObj.orderType === "asc" ? "desc" : "asc"

      let val = {
        orderType: newVal
      }

      this.EmitNewVal(val)
    },

    onChangeTextFilter: function(event) {
      let val = {
        name: event.value
      }

      this.EmitNewVal(val);
    },

    CloseForm: function(event) {
      if (this.$el.contains(event.target)) return;

      this.isFilterFormActive = false;
    },

    FormAction: function(event) {
      this.isFilterFormActive = false;

      this.EmitNewVal(event.filterObj);
    },

    onAddItem: function() {
      this.$emit("onAddItem", {})
    },

    EmitNewVal: function(val) {
      this.$emit('onSetNewFilterVal', {
        newValue: val
      })
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
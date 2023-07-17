<template>
  <div class="dropdown-multiselect" :class="dropdownClass">
    <div class="dropdown-multiselect__wrapper" :class="{'active' : isActiveCheckBox(value.id)}" v-for="value in valueArray" :key="value.id" :data-value="value.id" @click="onSelectValue">
      <div class="dropdown-multiselect__icon" :class="{'active' : isActiveCheckBox(value.id)}">
        <SvgIcon :name="nameIconCheckBox(value.id)"></SvgIcon>
      </div>

      <p class="text text_prim">{{ value.text }}</p>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

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
      default: []
    },
    isHidden: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      valueArray: [],
    }
  },
  components: {
    SvgIcon
  },
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown-multiselect_hidden' : ''
    },
  },
  watch: {},
  mounted() {
    this.valueArray = this.inputValueArray.map(value => {
        return Object.assign({}, value)
      })
  },
  methods: {
    isActiveCheckBox(currentId) {
      return this.selectedValues.find((value) => value === currentId)
    },

    nameIconCheckBox(currentId) {
      return this.isActiveCheckBox(currentId) ? 'check-active-icon' : 'check-icon'
    },

    onSelectValue(event) {
      this.$emit("onMultiValueSelected", {
        value: event.currentTarget.dataset.value,
        isInArray: this.isActiveCheckBox(event.currentTarget.dataset.value),
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
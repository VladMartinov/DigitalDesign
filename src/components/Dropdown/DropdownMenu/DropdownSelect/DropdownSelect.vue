<template>
  <div :class="dropdownClass">
    <button v-for="value in valueArray" :key="value.id" :data-value="value.id" class="dropdown-select__button text text_prim" @click="onSelectValue" type="button">
      {{ value.text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    inputValueArray: {
      type: Array,
      default: function() { 
        return []
      }
    },
    isHidden: {
      type: Boolean,
      default: true
    },
    isSelectDefValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueArray: [],
    }
  },
  components: {},
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown-select dropdown-select_hidden' : 'dropdown-select'
    },
  },
  watch: {},
  mounted() {
    this.valueArray = this.inputValueArray.map(value => {
        return Object.assign({}, value)
      })
    
    if (this.isSelectDefValue) {
      this.$emit("onValueSelected", {
        value: this.valueArray[0].id,
        valueArray: this.valueArray,
        text: this.valueArray[0].text
      })
    }
  },
  methods: {
    onSelectValue(event) {
      this.$emit("onValueSelected", {
        value: event.target.dataset.value,
        valueArray: this.valueArray,
        text: event.target.innerText
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
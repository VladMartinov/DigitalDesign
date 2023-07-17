<template>
  <div :class="dropdownClass">
    <div v-for="value in inputValueArray" :key="value._id">
      <button class="dropdown-select__button text text_prim" :class="{ 'active' : isActive(value._id) }"
        :data-value="value._id" type="button" 
        @click="onSelectValue" v-if="isTagAccess(value)">
        {{ value.name }}
      </button>
    </div>
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
    isTag: {
      type: Boolean,
      default: false
    },
    currentVal: {
      type: String,
      default: ""
    },
    isSelectDefValueById: {
      type: Number,
      default: NaN
    },
    isSelectDefValueByValue: {
      type: Number,
      default: NaN
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown-select dropdown-select_hidden' : 'dropdown-select'
    },
  },
  watch: {},
  mounted() {
    if (!isNaN(this.isSelectDefValue)) {
      let val = this.inputValueArray.find((value) => {
        if (this.isSelectDefValueById) {
          return value._id === this.inputValueArray[this.isSelectDefValue]?._id ? this.inputValueArray[this.isSelectDefValue]?._id : "";
        } else {
          return value._id === this.isSelectDefValueByValue;
        }
      })

      this.$emit("onValueSelected", {
        value: val?._id ? val._id : 0,
      })
    }
  },
  methods: {
    onSelectValue(event) {
      this.$emit("onValueSelected", {
        value: event.target.dataset.value,
      })
    },

    isActive(currId) {
      return this.currentVal === currId;
    },

    isTagAccess(value) {
      if (!this.isTag) return true;
      if (!value.availableOptions) return false;

      let currentValue = this.inputValueArray.find((item) => { return item._id === this.currentVal; });

      if (!currentValue) return false;
      return currentValue.availableOptions.includes(value._id);
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
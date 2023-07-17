<template>
  <div :class="dropdownClass">
    <button v-for="button in buttonsArray" :key="button.text"
      class="dropdown__button text"
      :class="[{ 'text_error' : button.isAttention, 'disabled text_disabled' : button.isDisabled, 'text_prim' : !button.isAttention && !button.isDisabled }]" 
      type="button" :data-value="button.id" @click="onSelectAction">
      {{ button.text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonsArray: {
      type: Array,
      default: function() { 
        return []
      }
    },
    isHidden: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      buttonsItems: [],
    }
  },
  components: {},
  computed: {
    dropdownClass() {
      return this.isHidden ? 'dropdown dropdown_hidden' : 'dropdown'
    },
  },
  watch: {},
  methods: {
    onSelectAction: function(event) {
      this.$emit('onSelectAction', {
        id: event.target.dataset.value
      })
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
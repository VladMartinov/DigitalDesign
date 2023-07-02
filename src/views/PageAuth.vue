<template>
  <div id="app">
    <div class="page__wrapper">
      <BaseButton class="button__primary" :title="'Авторизироваться'" @onButtonClick="authorize"></BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

export default {
  data() {
    return {}
  },
  components: {
    BaseButton
  },
  computed: {},
  watch: {},
  methods: {
    authorize: function() {
      if (localStorage.getItem("authToken") === null) {
        localStorage.setItem("authToken", true);
      } else {
        delete localStorage.authToken
      }
    }
  }  
}
</script>

<style lang="scss">
.page__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-grow: 1;
}
</style>
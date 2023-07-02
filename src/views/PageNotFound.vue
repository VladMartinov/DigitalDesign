<template>
  <div id="app">
    <div class="page__wrapper">
      <h1 class="text text_h1 text_prim">Ошибка 404. Page not found.</h1>
      <router-link to="/tasks">
        <BaseButton class="button__primary" :title="'На главную'"></BaseButton>
      </router-link>
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
  methods: {}
}
</script>

<style lang="scss">
.page__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  flex-grow: 1;

  row-gap: 25px;
}
</style>
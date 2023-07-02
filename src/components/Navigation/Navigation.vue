<template>
  <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <nav class="header__nav">
            <router-link to="/tasks">
              <BaseButton :class="['button__nav', $route.fullPath ==='/tasks' ? 'active' : '']" :title="'Задачи'"></BaseButton>
            </router-link>

            <router-link to="/users">
              <BaseButton :class="['button__nav', $route.fullPath ==='/users' ? 'active' : '']" :title="'Пользователи'"></BaseButton>
            </router-link>
            
            <router-link to="/auth">
              <BaseButton :class="['button__nav', $route.fullPath ==='/auth' ? 'active'  : '']" :title="'Авторизироваться'"></BaseButton>
            </router-link>
          </nav>
        </div>
      </div>
    </header>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

export default {
  props: {},
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
@import "./index.scss";
</style>
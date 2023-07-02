<template>
  <div class="page__wrapper">
    <h1 class="text text_prim text_h1">Task info:</h1>
    
    <div class="page__info">
      <h2 class="text text_prim text_h2">Task id: {{ taskId }}</h2>
      <h2 class="text text_prim text_h2">Task title: {{ taskTitle }}</h2>
      <h2 class="text text_prim text_h2">Editor full name: {{ editorName }}</h2>
      <h2 class="text text_prim text_h2">Author full name: {{ authorName }}</h2>
    </div>

    <router-link to="/tasks">
      <BaseButton class="button__primary" :title="'Вернуться на главную'"></BaseButton>
    </router-link>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

export default {
  props: {
    taskId: {
      type: Number,
    },
    taskTitle: {
      type: String,
      default: "Not found"
    },
    editorName: {
      type: String,
      default: "Not found"
    },
    authorName: {
      type: String,
      default: "Not found"
    },
  },
  data() {
    return {}
  },
  components: { BaseButton },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
.page__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  flex-grow: 1;

  .page__info {
    margin-bottom: 25px;
  }
}
</style>
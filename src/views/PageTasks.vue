<template>
  <div id="app">
    <ItemsList v-if="!isTaskDataEmpty" :initDataProps="taskItemsData" :task="true"></ItemsList>
    <EmptyItems v-else :typeItem="'task'"></EmptyItems>
  </div>
</template>

<script>
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import ItemsList from "@/components/ItemsList/ItemsList.vue"

export default {
  data() {
    return {
      taskItemsData: [
        {
          title: "Название",
          id: 1,
          author: "Иванов И.И. создал(а) 4 час назад",
          tagStatus: "draft",
          tagText: "Черновик",
          userChanged: "Баранов В.В. изменил(а) 2 минуту назад",
        },
        {
          title: "Название #2",
          id: 2,
          author: "Иванов И.И. создал(а) 2 час назад",
          tagStatus: "draft",
          tagText: "Черновик",
          userChanged: "Баранов В.В. изменил(а) 31 минуту назад",
        },
        {
          title: "Название #####3",
          id: 3,
          author: "Иванов И.И. создал(а) 23 час назад",
          tagStatus: "draft",
          tagText: "Черновик",
          userChanged: "Баранов В.В. изменил(а) 12 минуту назад",
        },
        {
          title: "Название #$4",
          id: 4,
          author: "Иванов И.И. создал(а) 12 час назад",
          tagStatus: "draft",
          tagText: "Черновик",
          userChanged: "Баранов В.В. изменил(а) 54 минуту назад",
        },
        {
          title: "Название ##@5",
          id: 5,
          author: "Иванов И.И. создал(а) 5 час назад",
          tagStatus: "draft",
          tagText: "Черновик",
          userChanged: "Баранов В.В. изменил(а) 14 минуту назад",
        }
      ]
    }
  },
  components: {
    EmptyItems, ItemsList
  },
  computed: {
    isTaskDataEmpty() {
      return this.taskItemsData.length < 1 ? true : false
    }
  },
  watch: {},
  methods: {}  
}
</script>

<style lang="scss">

</style>
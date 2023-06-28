<template>
  <div id="app">
    <Navigation :project="true"></Navigation>
    <ItemsList v-if="!isProjectDataEmpty" :initDataProps="projectItemsData" :project="true"></ItemsList>
    <EmptyItems v-else :typeItem="'project'"></EmptyItems>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import ItemsList from "@/components/ItemsList/ItemsList.vue"

export default {
  data() {
    return {
      projectItemsData: [
        {
          title: "Название",
          id: "1",
          author: "Иванов И.И. создал(а) 1 час назад",
          userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
        },
        {
          title: "Название",
          id: "2",
          author: "Иванов И.И. создал(а) 1 час назад",
          userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
        },
        {
          title: "Название",
          id: "3",
          author: "Иванов И.И. создал(а) 1 час назад",
          userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
        },
        {
          title: "Название",
          id: "4",
          author: "Иванов И.И. создал(а) 1 час назад",
          userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
        },
        {
          title: "Название",
          id: "5",
          author: "Иванов И.И. создал(а) 1 час назад",
          userChanged: "Баранов В.В. изменил(а) 1 минуту назад",
        },
      ]
    }
  },
  components: {
    Navigation, ItemsList, EmptyItems
  },
  computed: {
    isProjectDataEmpty() {
      return this.projectItemsData.length < 1 ? true : false
    }
  },
  watch: {},
  methods: {}  
}
</script>

<style lang="scss">

</style>
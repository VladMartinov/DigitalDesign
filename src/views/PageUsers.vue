<template>
  <div id="app">
    <ItemsList v-if="!isUserDataEmpty" :initDataProps="userItemsData" :user="true"></ItemsList>
    <EmptyItems v-else :typeItem="'user'"></EmptyItems>
  </div>
</template>

<script>
import EmptyItems from "@/components/EmptyItem/EmptyItems.vue"
import ItemsList from "@/components/ItemsList/ItemsList.vue"

export default {
  data() {
    return {
      userItemsData: [
        {
          fullName: "Иванов Иван Иванович",
          userId: 1,
        },
        {
          fullName: "Иванов Иван Иванович",
          userId: 2,
          tagStatus: "not-active",
          tagText: "Не активен"
        },
        {
          fullName: "Иванов Иван Иванович",
          userId: 3,
        }
      ]
    }
  },
  components: {
    EmptyItems, ItemsList
  },
  computed: {
    isUserDataEmpty() {
      return this.userItemsData.length < 1 ? true : false
    }
  },
  watch: {},
  methods: {}  
}
</script>

<style lang="scss">

</style>
<template>
  <div class="page__wrapper">
    <h1 class="text text_prim text_h1">Task info:</h1>
    
    <div class="page__info">
      <h2 class="text text_prim text_h2">Task id: {{ itemData._id }}</h2>
      <h2 class="text text_prim text_h2">Task title: {{ itemData.name }}</h2>
      <h2 class="text text_prim text_h2">Task description: {{ itemData.description }}</h2>
      <h2 class="text text_prim text_h2">Task status: {{ itemData.status }}</h2>
      <h2 class="text text_prim text_h2">Editor full name: {{ itemData.authorEdited }}</h2>
      <h2 class="text text_prim text_h2">Author full name: {{ itemData.author }}</h2>
    </div>

    <router-link to="/tasks">
      <BaseButton class="button__primary" :title="'Вернуться на главную'"></BaseButton>
    </router-link>
    
    <div v-if="getLoadingState" class="page-loading__wrapper">
      <SvgIcon :name="'loading-icon'" :isAnim="true"></SvgIcon>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue"

import { GETFunc } from '@/api/APIFunc'
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    taskId: {
      type: String,
      default: "Not found"
    },
  },
  data() {
    return {
      url: "http://45.12.239.156:8081/api/tasks",
      itemData: {}
    }
  },
  components: { BaseButton, SvgIcon },
  computed: {
    ...mapGetters(['getToken', 'getLoadingState']),
  },
  mounted() {
    this.updateItemData();
  },
  watch: {
    projectId() {
      this.updateItemData();
    }
  },
  methods: {
    ...mapActions(['setLoadingState']),

    updateItemData: function() {
      this.setLoadingState(true)
      let token = this.getToken;

      if (!token) {
        console.log("Token is empty or undefind: ", token);
        this.setLoadingState(false)
        
        return
      }

      GETFunc(this.url + `/${this.taskId}`, token).then((responseData) => {
        this.itemData = Object.assign({}, responseData);
        
        this.setLoadingState(false)
      });
    }
  }
}
</script>

<style lang="scss">
.page__wrapper {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  flex-grow: 1;

  .page__info {
    margin-bottom: 25px;
  }
}

.page-loading__wrapper {
  position: absolute;

  left: 0;
  top: 0;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: $border-def-color;
}
</style>
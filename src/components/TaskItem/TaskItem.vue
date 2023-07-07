<template>
  <div class="task-item">
    <router-link class="task-item__link" :to="{name: 'PageTaskInfo', params: { taskId: itemData._id} }">
      <div class="task-item-content">
        <div class="task-item-content-row">
          <p class="task-item__title text text_prim">{{itemData.name}}</p>

          <div class="roject-item__profile">
            <ProfileImage :profileImg="profileImg"></ProfileImage>
          </div>
        </div>

        <div class="task-item-content-info">
          <span class="task-content__id text text_prim">
            #{{itemData._id}}
          </span>

          <p class="task-content__text text text_disabled">
            {{itemData.author}}
          </p>

          <StatusTag :tagText="itemData.status" :tagStatus="itemData.status"></StatusTag>

          <p class="task-content__user-info text text_disabled">
            {{itemData.authorEdited}}
          </p>
        </div>
      </div>
    </router-link>
  
    <div class="task-item-more">
      <DropdownIcon :buttonsInitArray="dropDownData"></DropdownIcon>
    </div>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"
import ProfileImage from "@/components/ProfileImg/ProfileImage.vue"
import StatusTag from "@/components/Status/StatusTag.vue"

export default {
  props: {
    dataProp: {
      type: Object,
      default: function() {
        return {}
      }
    }, 
    profileImg: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      itemData: {},

      dropDownData: [
        {
          text: 'Редактировать',
        },
        {
          text: 'Удалить',
          isAttention: true
        }
      ],
    }
  },
  components: { DropdownIcon, ProfileImage, StatusTag},
  computed: {},
  mounted() {
    this.updateBaseItemData();
  },
  watch: {
    dataProp() {
      this.updateBaseItemData();
    }
  },
  methods: {
    updateBaseItemData: function() {
      this.itemData = Object.assign({}, this.dataProp)
    }
  }
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
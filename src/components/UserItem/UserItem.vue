<template>
  <div class="user-item">
    <div class="user-item-content">
      <div class="user-item-content__wrapper">
        <ProfileImage :profileImg="profileImg"></ProfileImage>
        
        <p class="text text_prim">{{ itemData.name }}</p>
      </div>

      <StatusTag v-if="itemData.status" :tag="itemData.status"></StatusTag>
    </div>

    <div class="user-item-more">
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
    profileImg : {
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
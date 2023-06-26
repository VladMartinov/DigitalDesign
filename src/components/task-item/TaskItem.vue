<template>
  <div class="task-item">
    <div class="task-item-content">
      <div class="task-item-content-row">
        <p class="task-item__title text text_prim">{{item.title}}</p>

        <div class="roject-item__profile">
          <ProfileImage :profileImg="image"></ProfileImage>
        </div>
      </div>

      <div class="task-item-content-info">
        <span class="task-content__id text text_prim">
          #{{item.info.id}}
        </span>

        <p class="task-content__text text text_disabled">
          {{item.info.author}}
        </p>

        <StatusTag :tagText="item.info.tagText" :tagStatus="item.info.tagStatus"></StatusTag>

        <p class="task-content__user-info text text_disabled">
          {{item.info.userChanged}}
        </p>
      </div>
    </div>

  
    <div class="task-item-more">
      <DropdownIcon :buttonArray="dropDownData"></DropdownIcon>
    </div>
  </div>
</template>

<script>
import DropdownIcon from "@/components/dropdown/dropdown-icon/DropdownIcon.vue"
import ProfileImage from "@/components/profile-img/ProfileImage.vue"
import StatusTag from "@/components/status/StatusTag.vue"

export default {
  props: ['itemData', 'profileImg'],
  data() {
    return {
      item: this.itemData,
      image: this.profileImg,

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
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
  @import './index.scss';
</style>
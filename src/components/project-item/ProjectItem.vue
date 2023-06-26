<template>
  <div class="project-item">
    <div class="project-item-content">
      <div class="project-item__title">
        <p class="text text_prim">{{item.title}}</p>
      </div>

      <div class="project-item-content-info">
        <span class="project-content__id text text_prim">
          #{{item.info.id}}
          </span>

        <p class="project-content__text text text_disabled">
          {{item.info.author}}
        </p>
        <p class="project-content__user-info text text_disabled">
          {{item.info.userChanged}}
        </p>
      </div>
    </div>

    <div class="project-item-more">
      <DropdownIcon :buttonArray="dropDownData"></DropdownIcon>
    </div>
  </div>
</template>

<script>
import DropdownIcon from "@/components/dropdown/dropdown-icon/DropdownIcon.vue"

export default {
  props: ['itemData'],
  data() {
    return {
      item: this.itemData,
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
  components: { DropdownIcon },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
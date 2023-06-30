<template>
  <div class="project-item">
    <div class="project-item-content">
      <div class="project-item__title">
        <p class="text text_prim">{{item.title}}</p>
      </div>

      <div class="project-item-content-info">
        <span class="project-content__id text text_prim">
          #{{item.id}}
          </span>

        <p class="project-content__text text text_disabled">
          {{item.author}}
        </p>
        <p class="project-content__user-info text text_disabled">
          {{item.userChanged}}
        </p>
      </div>
    </div>

    <div class="project-item-more">
      <DropdownIcon :buttonsInitArray="dropDownData"></DropdownIcon>
    </div>
  </div>
</template>

<script>
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

export default {
  props: {
    dataProp: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      item: {},
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
  mounted() {
    this.item = Object.assign({}, this.dataProp)
  },
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
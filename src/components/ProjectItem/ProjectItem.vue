<template>
  <div class="project-item">
    <router-link class="project-item__link" :to="{name: 'PageProjectInfo', params: { projectId: itemData._id} }">
      <div class="project-item-content">
        <div class="project-item__title">
          <p class="text text_prim">{{itemData.name}}</p>
        </div>

        <div class="project-item-content-info">
          <span class="project-content__id text text_prim">
            #{{itemData._id}}
            </span>

          <p class="project-content__text text text_disabled">
            {{itemData.author}}
          </p>
          <p class="project-content__user-info text text_disabled">
            {{itemData.authorEdited}}
          </p>
        </div>
      </div>
    </router-link>

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
  components: { DropdownIcon },
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
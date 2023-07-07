<template>
  <span
    v-if="!isBlocked" :class="'task-content__status status-item ' + ('status-item_' + validClass + ' ') + 'text'"
    >
    {{ validText }}
  </span>

</template>

<script>
export const Tags = {
  DRAFT: {
    tagText: "Черновик",
    tagClass: "draft"
  },
  IN_PROCESS: {
    tagText: "В работе",
    tagClass: "in-process"
  },
  COMPLETED: {
    tagText: "Завершена",
    tagClass: "completed"
  },
  TESTING: {
    tagText: "Тестирование",
    tagClass: "testing"
  },
  TESTING_DONE: {
    tagText: "Выполнена",
    tagClass: "testing-done"
  },
  CLOSED: {
    tagText: "Закрыта",
    tagClass: "closed"
  },
  DELETED: {
    tagText: "Удалена",
    tagClass: "deleted"
  },
  ACTIVE: {
    tagText: "Активен",
    tagClass: "active"
  },
  BLOCKED: {
    tagText: "Заблокирован",
    tagClass: "blocked"
  }
}

export default {
  props: {
    tag: {
      type: String,
      default: "DRAFT"
    }, 
  },
  data() {
    return {}
  },
  components: {},
  computed: {

    isBlocked() {
      return this.tag === "BLOCKED"
    },

    validClass() {
      return Tags[this.tag].tagClass;
    },

    validText() {
      return Tags[this.tag].tagText;
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
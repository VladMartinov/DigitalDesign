<template>
  <div class="user-tag">
    <div class="user-tag__image">
      <ProfileImage :profileImg="user.picture" :profileFullName="user.name"></ProfileImage>
    </div>

    <div class="user-tag__name">
      <span class="text text_prim">{{ getFullNameToView }}</span>
    </div>
  </div>
</template>

<script>
import ProfileImage from '../ProfileImg/ProfileImage.vue'

export default {
  props: {
    user: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {}
  },
  components: { ProfileImage },
  computed: {
    getFullNameToView() {
      let fullName = this.user.name ? this.user.name : "Пользователь не найден";

      let splitedName = fullName.split(" ");
      fullName = "";

      for (let index in splitedName) {
        if (!+index) fullName += `${splitedName[index]} `;
        else fullName += `${splitedName[index][0].toUpperCase()}.`;
      }

      return fullName;
    },
  },
  watch: {},
  methods: {
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
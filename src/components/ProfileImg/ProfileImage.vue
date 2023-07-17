<template>
  <img class="profile-img" :src="'http://45.12.239.156:8081/' + profileImg" alt="Profile image" v-if="profileImg !== '' && profileImg !== null" />
  <div class="profile-img" v-else>
    <span class="profile-img__text text text_profile text_prim">{{ validImageText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    profileImg: {
      type: String,
      default: ""
    },
    profileFullName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      image: {}
    }
  },
  components: {},
  computed: {
    validImageText() {
      if (this.profileFullName) {
        let splitedName = this.profileFullName.split(' ')
        let resultText = ""

        for (let splitedItem in splitedName) {
          resultText += splitedName[splitedItem][0]
        }

        return resultText
      } else {
        return "Undf"
      }
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
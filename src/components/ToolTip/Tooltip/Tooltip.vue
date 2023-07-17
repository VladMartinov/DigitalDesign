<template>
  <div class="tooltip">
    <ProfileImage v-if="imgIsNotEmpty" :profileImg="img.imgName" :profileFullName="img.fullName"
      @mousemove.native="onChangePosition" @mouseenter.native="isHovered = true;" @mouseleave.native="isHovered = false;"></ProfileImage>
    <div v-else class="tooltip__main-text" :class="{ 'two-line': isTwoLine }" @mousemove="onChangePosition" @mouseenter="isHovered = true;" @mouseleave="isHovered = false;">
      <span class="text" :class="isTime ? 'text_disabled' : 'text_prim'" v-html=" textInner"></span>
    </div>

    <div class="tooltip__hidden-wrapper" :class="{ 'shown': (isOverflow || imgIsNotEmpty || (isTime && !isFullTime ) ) && isHovered }">
      <span class="tooltip__hidden-text text" :class="isTime ? 'text_disabled' : 'text_prim'" v-html="isTime ? getFullTime(time) : textTooltip"></span>
    </div>
  </div>
</template>

<script>
import ProfileImage from '@/components/ProfileImg/ProfileImage.vue';
import { ItemDate } from "@/components/mixins/itemDate"

export default {
  mixins: [ ItemDate ],
  props: {
    textInner: {
      type: String,
      default: "",
    },
    img: {
      type: Object,
      default: function() {
        return { imgName: "", fullName: "" };
      }
    },
    time: {
      type: String,
      default: ""
    },
    textTooltip: {
      type: String,
      default: "",
    },
    isTwoLine: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOverflow: false,
      isHovered: false
    }
  },
  components: { ProfileImage },
  computed: {
    imgIsNotEmpty() {
      return this.img.imgName !== "" || this.img.fullName !== "";
    },
    isTime() {
      return this.time !== "";
    },

    isFullTime() {
      return this.correctTimeToString(this.time).isFull;
    },
  },
  watch: {},
  methods: {
    onChangePosition: function(event) {
      let toolTipHiddenText = this.$el.querySelector(".tooltip__hidden-wrapper");
      let currentDOMBox = event.currentTarget.getBoundingClientRect();

      toolTipHiddenText.style.left = `${event.clientX - currentDOMBox.x}px`
      toolTipHiddenText.style.top = `${currentDOMBox.height + 22}px`

      if (this.imgIsNotEmpty || this.isTime) return;

      let textEl = this.$el.querySelector('.tooltip__main-text');
      if (textEl.scrollHeight > textEl.clientHeight || textEl.scrollWidth> textEl.clientWidth) this.isOverflow = true;
      else this.isOverflow = false;
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>
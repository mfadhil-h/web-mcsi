<template lang="pug">
.page-nav
  b-container
    b-row
      b-col(cols="6", :style="styleHideLeft", @click="clickLeft")
        b-card
          b-button.page-nav__button(variant="link")
            font-awesome-icon.fa-fw(icon="arrow-left")
            span.ml-2 {{ leftButtonText }}
          .page-nav__text {{ leftText }}
      b-col(cols="6", :style="styleHideRight", @click="clickRight")
        b-card
          b-button.page-nav__button(variant="link")
            span.mr-2 {{ rightButtonText }}
            font-awesome-icon.fa-fw(icon="arrow-right")
          h3.page-nav__text {{ rightText }}
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PageNav",
  props: {
    leftButtonText: String,
    leftText: String,
    hideLeft: {
      type: Boolean,
      default: false,
    },
    rightButtonText: String,
    rightText: String,
    hideRight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styleHideLeft() {
      return this.hideLeft === true
        ? "visibility: hidden"
        : "visibility: visible";
    },
    styleHideRight() {
      return this.hideRight === true
        ? "visibility: hidden"
        : "visibility: visible";
    },
  },
  methods: {
    clickLeft() {
      this.$emit("clickLeft");
    },
    clickRight() {
      this.$emit("clickRight");
    },
  },
});
</script>
<style lang="scss">
.page-nav {
  .page-nav__button {
    padding-left: 0;
    padding-right: 0;
  }
  .page-nav__text {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -1px;
  }
}
</style>


<template lang="pug">
.videotron
	video-background.videotron__video(:src="video" :poster="videoImage")
	.videotron__labels
		b-container
			.display-2 {{header1}}
			.display-1 {{header2}}
			font-awesome-icon.labels__arrow-down(icon="arrow-down" @click="onClickArrow")
			b-button.play-button(size="lg" variant="outline-primary" @click="onClickPlay")
				span Play Video
				font-awesome-icon.ml-4(icon="play")
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   name: 'VideotronImage',
   props: {
      header1: String,
      header2: String,
      video: String,
      videoImage: String,
      youtubeLink: String
   },
   methods: {
      onClickArrow() {
         this.$emit('onClickArrow')
      },
      onClickPlay() {
         this.$emit('onClickPlay')
      }
   }
})
</script>
<style lang="scss" scoped>
.videotron {
   display: block;
   position: relative;
   .videotron__video {
      filter: brightness(50%);
      height: 100vh;
      max-height: 100vh;
      width: 100%;
   }
   .videotron__labels {
      bottom: 0;
      left: 0;
      color: white;
      margin-bottom: 5rem;
      position: absolute;
      width: 100%;
      .labels__arrow-down {
         color: #cc0000;
         font-size: 48px;
         margin-left: 1rem;
         margin-top: 1rem;
         transition-duration: 300ms;
         &:hover {
            filter: brightness(120%);
            transition-duration: 300ms;
            transform: translateY(8px);
         }
      }
      .play-button {
         border-radius: 28px;
         color: white;
         float: right;
         height: 56px;
         padding: 0.5rem 1.5rem;
      }
   }
}
</style>

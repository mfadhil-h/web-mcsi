<template lang="pug">
.youtube-video-container
    iframe(
        width="560" 
        height="315" 
        :src="src" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen)
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'youtube-player',
    props: {
        src: String
    }
})
</script>
<style lang="scss" scoped>
.youtube-video-container {
    margin-bottom: 1.5rem;
    overflow: hidden;
    position: relative;
    width: 100%;
    &::after {
        content: "";
        display: block;
        padding-top: 56.25%;
    }
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
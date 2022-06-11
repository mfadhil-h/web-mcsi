<template lang="pug">
.videotron
    b-img.videotron__image(:src="videotronImage")
</template>
<script lang="ts">
import Vue from 'vue'
const videotronImage = require('@/assets/img/videotron-image.jpg')
export default Vue.extend({
	name: 'videotron-image',
	data: () => {
		return {
			videotronImage: videotronImage
		}
	}
})
</script>
<style lang="scss" scoped>
.videotron__image {
    filter: brightness(50%);
    height: auto; max-height: 100vh;
    width: 100%; 
    object-fit: cover;
}
</style>
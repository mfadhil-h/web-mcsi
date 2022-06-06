<template lang="pug">
.index
	videotron

//- tutorial
</template>

<script lang="ts">
import Vue from 'vue'
import Videotron from '@/components/Videotron.vue'
export default Vue.extend({
	name: 'IndexPage',
	layout: 'SinglePage',
	components: {
		Videotron
	}
})
</script>

<template lang="pug">
.page-header
    b-img.page-header__image(:src="image")
    .page-header__title
        .display-2 {{heading1}}
        .display-1 {{heading2}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'page-header',
	data: () => {
		return {

		}
	},
    props: {
        heading1: String,
        heading2: String,
        image: String
    }
})
</script>
<style lang="scss" scoped>
.page-header {
    position: relative;
}
.page-header__image {
    filter: brightness(50%);
    height: auto; max-height: 480px;
    width: 100%; 
    object-fit: cover;
}
.page-header__title {
    color: white;
    position: absolute;
    text-align: center;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
}
</style>
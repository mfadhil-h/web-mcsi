<template lang="pug">
.accent
    img.accent__image(:src="image" :width="width" :class="getAccentClass")
</template>
<script lang="ts">
import Vue from 'vue'
const image = require('@/assets/img/pattern.png')
export default Vue.extend({
	name: 'accent',
	data: () => {
		return {
				image: image
		}
	},
	props: {
		width: {
            type: String,
            default: '33%'
        },
        position: {
            type: String,
            default: 'tl',
            validator(value) {
                return ['tl', 'tr', 'bl', 'br'].includes(value)
            }
        }
	},
    computed: {
        getAccentClass() {
            return { 
                'top-left': this.position=='tl', 
                'top-right': this.position=='tr',
                'bottom-left': this.position=='bl',
                'bottom-right': this.position=='br'
            }
        }
    }
})
</script>
<style lang="scss" scoped>
.accent {
    position: relative;
    width: 100%; height: auto;
    .accent__image {
        position: absolute;
    }
}
.top-left {
    transform: scaleX(1);
}
.top-right {
    right: 0;
    transform: scaleX(-1);
}
.bottom-left {
    transform: scaleY(-1);
}
.bottom-right {
    transform: scale(-1,-1);
}
</style>
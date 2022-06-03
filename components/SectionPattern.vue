<template lang="pug">
.section-pattern
    .pattern.partern--top-left(v-if="topLeft")
        slot
    .pattern.partern--top-right(v-if="topRight")
        slot
    .pattern.partern--bottom-left(v-if="bottomLeft")
        slot
    .pattern.partern--bottom-right(v-if="bottomRight")
        slot    
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'section-pattern',
	data: () => {
		return {
			
		}
	},
	props: {
        topLeft: {
            type: Boolean,
            default: false
        },
        topRight: {
            type: Boolean,
            default: false
        },
        bottomLeft: {
            type: Boolean,
            default: false
        },
        bottomRight: {
            type: Boolean,
            default: false
        }
	}
})
</script>
<style lang="scss" scoped>
.section-pattern {
    
}
.pattern {
    background-image: url("@/assets/img/pattern.png");
    background-repeat: no-repeat;
    background-size: 33%;
}
.pattern.pattern--top-left {
    background-position: left top;
    transform: scaleX(1);
}
.pattern.pattern--top-right {
    background-position: right top;
    transform: scaleX(-1);
}
.pattern.pattern--bottom-left {
    background-position: left bottom;
}
.pattern.pattern--bottom-right {
    background-position: right bottom;
}
</style>
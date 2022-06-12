<template lang="pug">
b-card.card-business-unit(:img-src="image")
    .card-business-unit__label {{label}}
    .card-business-unit__description {{description}}
</template>
<script lang="ts">
import Vue from 'vue'
const videotronImage = require('@/assets/img/videotron-image.jpg')
export default Vue.extend({
	name: 'card-business-unit',
    props: {
        image: String,
        label: String,
        description: String
    }
})
</script>
<style lang="scss" scoped>
.card-business-unit {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1rem;
    text-align: left;
    .card-business-unit__label {
        border-left: 8px solid #CC0000;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -5%;
        line-height: 32px;
        padding-left: 1rem;
    }
    .card-business-unit__description {
        color: rgba(black, .54);
        font-size: 16px;
        letter-spacing: -5%;
        line-height: 24px;
        margin-top: 1.5rem;
    }
}
</style>
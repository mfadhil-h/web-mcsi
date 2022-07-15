<template lang="pug">
b-card.card-business-unit(:img-src="image")
    .card-business-unit__label {{label}}
    .card-business-unit__description.mb-4 {{description}}
    small.card-business-unit__link(@click="onClick")
        span Selengkapnya
        font-awesome-icon.ml-2(icon="circle-arrow-right")
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'card-business-unit',
    props: {
        image: String,
        label: String,
        description: String
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
})
</script>
<style lang="scss" scoped>
.card-business-unit {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    cursor: default;
    margin-bottom: 1rem;
    text-align: left;
    .card-business-unit__label {
        border-left: 8px solid #CC0000;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -1px;
        line-height: 32px;
        padding-left: 1rem;
    }
    .card-business-unit__description {
        color: rgba(black, .8);
        font-size: 16px;
        line-height: 24px;
        margin-top: 1.5rem;
        text-align: justify;
    }
    .card-business-unit__link {
        color: rgba(black, .6);
        transition-duration: 100ms;
        &:hover {
            color: #CC0000;
            transition-duration: 300ms;
        }
    }
}
</style>
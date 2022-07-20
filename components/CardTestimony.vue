<template lang="pug">
.testimony-detail
    b-card.card-testimony(no-body)
        b-card-body
            b-img.card-testimony__avatar(:src="avatar")
            font-awesome-icon.fa-2xl.card-testimony__quote(icon="quote-left")
            .card-testimony__person {{person}}
            .card-testimony__position {{position}}
            .card-testimony__testimony
                span {{testimony.substring(0,250)}}
                span(v-if="testimony.length > 250") ...
        b-card-footer
            .card-testimony__link(@click="onClick")
                span Selengkapnya
                font-awesome-icon.ml-2(icon="circle-arrow-right")
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'card-testimony',
    props: {
        person: String,
        avatar: String,
        position: String,
        testimony: String
    },
    methods: {
        onClick() {
            this.$emit('click')
        }
    }
})
</script>
<style lang="scss" scoped>
.card-testimony {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1rem;
    height: 540px;
    text-align: center;
    @media screen and (max-width: 480px) {
        height: auto;
    }
    .card-testimony__avatar {
        border-radius: 40px;
        box-shadow: 0 0 4px 0 rgba(black, .4);
        height: 80px; width: 80px;
        margin-bottom: 1rem;
        object-fit: cover;
    }
    .card-testimony__quote {
        color: #CC0000;
        display: block;
        margin: 1rem auto;
    }
    .card-testimony__testimony {
        margin-bottom: 2rem;
        font-size: 16px;
    }
    .card-testimony__person {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -1px;
        margin-bottom: .25rem;
    }
    .card-testimony__position {
        color: rgba(black, .7);
        font-size: 16px;
        font-style: italic;
        margin-bottom: 2rem;
    }
    .card-testimony__link {
        color: rgba(black, .6);
        font-size: 14px;
        text-align: left;
        transition-duration: 100ms;
        &:hover {
            color: #CC0000;
            transition-duration: 300ms;
        }
    }
}
</style>
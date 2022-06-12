<template lang="pug">
b-card.card-vacancy
    .card-vacancy__title {{title}}
    .card-vacancy__meta Location: {{location}}
    .card-vacancy__meta Job Type: {{jobType}}
    .card-vacancy__meta Date Posted: {{date}}
    b-button.card-vacancy__link(variant="primary") Apply
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'card-vacancy',
    props: {
        title: String,
        location: String,
        jobType: String,
        date: String,
        link: String
    }
})
</script>
<style lang="scss" scoped>
.card-vacancy {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1rem;
    .card-vacancy__title {
        color: #154D6D;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -5%;
        line-height: 24px;
        margin-bottom: 1rem;
    }
    .card-vacancy__meta {
        color: rgba(black, .54);
        font-size: 16px;
        letter-spacing: -5%;
        line-height: 24px;
        margin-bottom: .5rem;   
    }
    .card-vacancy__link {
        margin-top: 1.5rem;
    }
}
</style>
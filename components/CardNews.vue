<template lang="pug">
b-card.card-news(:img-src="image")
    .card-news__title {{title}}
    .card-news__description {{description}}
    .card-news__meta
        .card-news__timestamp {{timestamp}}
        .card-news__author By {{author}}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'card-business-unit',
    props: {
        image: String,
        title: String,
        description: String,
        author: String,
        timestamp: String,
    }
})
</script>
<style lang="scss" scoped>
.card-news {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1.5rem;
    text-align: left;
    .card-news__title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -5%;
        line-height: 24px;
    }
    .card-news__description {
        color: rgba(black, .54);
        font-size: 16px;
        letter-spacing: -5%;
        line-height: 24px;
        margin-top: 1.5rem;
    }
    .card-news__meta {
        font-size: 12px;
        margin-top: 1rem;
        .card-news__timestamp {
            color: rgba(black, .87);
            display: inline-block;
            margin-right: 1rem;
        }
        .card-news__author {
            color: rgba(black, .54);
            display: inline-block;
        }
    }
}
</style>
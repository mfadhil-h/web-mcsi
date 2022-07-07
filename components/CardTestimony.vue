<template lang="pug">
b-card.card-testimony
    b-img.card-testimony__avatar(:src="avatar")
    font-awesome-icon.fa-2xl.card-testimony__quote(icon="quote-left")
    .card-testimony__testimony {{testimony}}
    .card-testimony__person {{person}}
    .card-testimony__position {{position}}
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
    }
})
</script>
<style lang="scss" scoped>
.card-testimony {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1rem;
    padding: 1rem;
    text-align: center;
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
    
}
</style>
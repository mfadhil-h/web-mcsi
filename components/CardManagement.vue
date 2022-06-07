<template lang="pug">
b-card.card-management
    .card-management__name {{name}}
    .card-management__position {{position}}
    .card-management__link Meet {{name}}
</template>
<script lang="ts">
import Vue from 'vue'
const videotronImage = require('@/assets/img/videotron-image.jpg')
export default Vue.extend({
	name: 'card-management',
    props: {
        name: String,
        position: String
    }
})
</script>
<style lang="scss" scoped>
.card-management {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1rem;
    .card-management__name {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -5%;
        line-height: 32px;
    }
    .card-management__position {
        color: rgba(black, .54);
        font-size: 16px;
        letter-spacing: -5%;
        line-height: 24px;
        margin-top: 8px;
        text-transform: capitalize;
    }
    .card-management__link {
        font-size: 12px;
        line-height: 16px;
        margin-top: 24px;
    }
}
</style>
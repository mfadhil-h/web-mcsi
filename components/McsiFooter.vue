<template lang="pug">
b-container(fluid).footer
    b-img.footer__pattern-tr(:src="patternTr")
    b-img.footer__pattern-bl(:src="patternBl")
    b-container.py-5.test
        b-row
            b-col(cols="12" md="4")
                b-img.logo-lighthouse(:src="logoLighthouse")
            b-col(cols="12" md="4")
                span.d-block Resources
                b-link.d-block Privacy Policy
                b-link.d-block Contact Us
                b-link.d-block Privacy Policy
                b-link.d-block Contact Us
                b-link.d-block Privacy Policy
                b-link.d-block Contact Us
                b-link.d-block Privacy Policy
                b-link.d-block Contact Us
                b-link.d-block Privacy Policy
                b-link.d-block Contact Us
                b-link.d-block Privacy Policy
                b-link.d-block Contact Us
            b-col(cols="12" md="4")
                h1 Three
    
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'footer',
    data: () => {
        return {
            logoLighthouse: require('@/assets/img/lighthouse.png'),
            patternTr: require('@/assets/img/pattern-tr.png'),
            patternBl: require('@/assets/img/pattern-bl.png'),
        }
    }
})
</script>
<style lang="scss" scoped>
.footer {
    position: relative;
    background-image: linear-gradient(180deg, #CC0000 0%, #910000 100%);
    .footer__pattern-tr {
        filter: opacity(.8);
        position: absolute;
        top: 0; right: 0;
        width: 33%; height: auto;
    }
     .footer__pattern-bl {
        filter: opacity(.8);
        position: absolute;
        bottom: 0; left: 0;
        width: 33%; height: auto;
    }
}
.logo-lighthouse {
    height: 120px; width: auto;
}
</style>
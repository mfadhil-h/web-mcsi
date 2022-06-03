<template lang="pug">
.footer
    //- Accent.footer__accent(position="br")
    b-container.py-5.test
        b-row
            b-col(cols="4")
                h1 One
            b-col(cols="4")
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
            b-col(cols="3")
                h1 Three
    
</template>
<script lang="ts">
import Vue from 'vue'
import Accent from '~/components/Accent.vue'
export default Vue.extend({
    name: 'footer',
    components: {
        Accent
    },
    data: () => {
        return {
        
        }
    }
})
</script>
<style lang="scss" scoped>
.footer {
    position: relative;
    .footer__accent {
        position: absolute;
        right: 0; bottom: 0;
    }
    .test {
        background-color: rgba(red, .1);
        background-image: url("@/assets/img/pattern.png");
        background-size: 33%;
        background-repeat: no-repeat;
        background-position: bottom right;
    
    }
}

</style>
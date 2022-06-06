<template lang="pug">
.layout
    //- 01.1 Fixed Navbar
    b-navbar.navbar.navbar--transparent(toggleable="md" type="dark" variant="dark" fixed)
        b-container
            b-navbar-brand.brand(href="#")
                b-img.brand__logo(:src="logoWhite" alt="MCS International")
            b-navbar-toggle(target="nav-collapse")
            b-collapse(id="nav-collapse" is-nav)
                b-navbar-nav.ml-auto
                    div(v-for="(item, index) of menu" :key="index")
                        b-nav-item(v-if="!item.children") {{item.label}}
                        b-nav-item-dropdown(:text="item.label" v-if="item.children")
                            b-dropdown-item(v-for="(item, index) of item.children" :key="index") {{item.label}}
    //- 01.2 Sticky Navbar
    Transition
        b-navbar.navbar.navbar--sticky(toggleable="md" type="light" variant="light" sticky v-if="scrollPosition > scrollPositionBound")
            b-container
                b-navbar-brand.brand(href="#")
                    b-img.brand__logo(:src="logoColor" alt="MCS International")
                b-navbar-toggle(target="nav-collapse")
                b-collapse(id="nav-collapse" is-nav)
                    b-navbar-nav.ml-auto
                        div(v-for="(item, index) of menu" :key="index")
                            b-nav-item(v-if="!item.children") {{item.label}}
                            b-nav-item-dropdown(:text="item.label" v-if="item.children")
                                b-dropdown-item(v-for="(item, index) of item.children" :key="index") {{item.label}}
    //- 02. Body
    .mcsi-body
        Nuxt
    //- 03. Footer
    McsiFooter
</template>
<script lang="ts">
import Vue from 'vue'
import headerMenuId from './menu.js'
import McsiFooter from '@/components/McsiFooter.vue'
const logoColor = require('@/assets/img/mcsi-color.png')
const logoWhite = require('@/assets/img/mcsi-white.png')
const scrollPositionBound = 80
export default Vue.extend({
    name: 'SinglePageLayout',
    components: {
        McsiFooter
    },
    data: () => {
        return {
            logoColor,
            logoWhite,
            menu: headerMenuId,
            scrollPosition: 0,
            scrollPositionBound
        }
    },
    methods: {
        onScroll(e: any) {
            this.scrollPosition = e.target.documentElement.scrollTop
        }
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll)
    }
})
</script>
<style lang="scss" scoped>
// Brand
.brand {
    .brand__logo {
        height: 48px; width: auto;
    }
}

// Header animation
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
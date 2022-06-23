<template lang="pug">
.layout
    particles(id="tsparticles" :particlesInit="particlesInit" :options="options")
    //- 01.1 Fixed Navbar
    b-navbar.navbar.navbar--transparent(toggleable="md" type="dark" variant="dark" fixed)
        b-container
            b-navbar-brand.brand(href="#")
                b-img.brand__logo(:src="logoWhite" alt="MCS International")
            b-navbar-toggle(target="nav-collapse")
            b-collapse(id="nav-collapse" is-nav)
                b-navbar-nav.ml-auto
                    div(v-for="(item, index) of menu" :key="index")
                        b-nav-item(v-if="!item.children")
                            NuxtLink(:to="item.link") {{item.label}}
                        b-nav-item-dropdown(:text="item.label" v-if="item.children")
                            b-dropdown-item(v-for="(item, index) of item.children" :key="index")
                                NuxtLink(:to="item.link") {{item.label}}
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
                            b-nav-item(v-if="!item.children")
                                NuxtLink(:to="item.link") {{item.label}}
                            b-nav-item-dropdown(:text="item.label" v-if="item.children")
                                b-dropdown-item(v-for="(item, index) of item.children" :key="index")
                                    NuxtLink(:to="item.link") {{item.label}}
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
const scrollPositionBound = 80
import type { Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
const options = {
    background: {
        color: {
            value: '#ebf2fd'
        }
    },
    fpsLimit: 60,
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#1a6183'
        },
        links: {
            color: '#1a6183',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                value_area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            random: true,
            value: 5
        }
    },
    detectRetina: true
}
export default Vue.extend({
    name: 'SinglePageLayout',
    components: {
        McsiFooter
    },
    data: () => {
        return {
            logoColor: require('@/assets/img/mcsi-color.png'),
            logoWhite: require('@/assets/img/mcsi-white.png'),
            menu: headerMenuId,
            options,
            scrollPosition: 0,
            scrollPositionBound
        }
    },
    methods: {
        async particlesInit(engine: Engine): Promise<void> {
            await loadFull(engine);
        },
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
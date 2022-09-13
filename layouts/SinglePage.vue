<template lang="pug">
.layout
   particles#tsparticles.layout__particles(
      :particlesInit='particlesInit',
      :options='options'
   )
   //- 01.1 Fixed Navbar
   b-navbar.navbar.navbar--transparent(
      toggleable='lg',
      type='dark',
      variant='dark',
      fixed
   )
      b-container
         b-navbar-brand.brand(href='#')
            b-img.brand__logo(:src='logoWhite', alt='MCS International')
         b-navbar-toggle(target='nav-collapse')
         b-collapse#nav-collapse(is-nav)
            b-navbar-nav.ml-auto
               div(v-for='(item, index) of menu', :key='index')
                  b-nav-item(
                     v-if='!item.children',
                     :to='localePath(item.link)'
                  ) {{ item.label }}
                  b-nav-item-dropdown(:text='item.label', v-if='item.children')
                     b-dropdown-item(
                        v-for='(item, index) of item.children',
                        :key='index',
                        :to='localePath(item.link)'
                     ) {{ item.label }}
               //- b-nav-item-dropdown 
                  template(v-slot:button-content)
                     span(v-if='$i18n.locale === "id"')
                        b-img.lang__flag(:src='require("@/static/id.png")')
                        span.text-uppercase {{ $i18n.locale }}
                     span(v-if='$i18n.locale === "en"')
                        b-img.lang__flag(:src='require("@/static/en.png")')
                        span.text-uppercase {{ $i18n.locale }}
                  b-dropdown-item(
                     v-for='locale in locales',
                     :key='locale.code',
                     @click='switchLocale(locale.code)'
                  )
                     span(v-if='locale.code === "id"')
                        b-img.lang__flag(:src='require("@/static/id.png")')
                        span {{ locale.name }}
                     span(v-if='locale.code === "en"')
                        b-img.lang__flag(:src='require("@/static/en.png")')
                        span {{ locale.name }}
   //- 01.2 Sticky Navbar
   Transition
      b-navbar.navbar.navbar--sticky(
         toggleable='lg',
         type='light',
         variant='light',
         sticky,
         v-if='scrollPosition > scrollPositionBound'
      )
         b-container
            b-navbar-brand.brand(href='#')
               b-img.brand__logo(:src='logoColor', alt='MCS International')
            b-navbar-toggle(target='nav-collapse')
            b-collapse#nav-collapse(is-nav)
               b-navbar-nav.ml-auto
                  div(v-for='(item, index) of menu', :key='index')
                     b-nav-item(
                        v-if='!item.children',
                        :to='localePath(item.link)'
                     ) {{ item.label }}
                     b-nav-item-dropdown(
                        :text='item.label',
                        v-if='item.children'
                     )
                        b-dropdown-item(
                           v-for='(item, index) of item.children',
                           :key='index',
                           :to='localePath(item.link)'
                        ) {{ item.label }}
                  //- b-nav-item-dropdown 
                     template(v-slot:button-content)
                        span(v-if='$i18n.locale === "id"')
                           b-img.lang__flag(:src='require("@/static/id.png")')
                           span.text-uppercase {{ $i18n.locale }}
                        span(v-if='$i18n.locale === "en"')
                           b-img.lang__flag(:src='require("@/static/en.png")')
                           span.text-uppercase {{ $i18n.locale }}
                     b-dropdown-item(
                        v-for='locale in locales',
                        :key='locale.code',
                        @click='switchLocale(locale.code)'
                     )
                        span(v-if='locale.code === "id"')
                           b-img.lang__flag(:src='require("@/static/id.png")')
                           span {{ locale.name }}
                        span(v-if='locale.code === "en"')
                           b-img.lang__flag(:src='require("@/static/en.png")')
                           span {{ locale.name }}
   //- 02. Body
   .mcsi-body
      Nuxt
   //- 03. Footer
   McsiFooter
</template>

<script lang="ts">
import Vue from 'vue'
import type { Engine } from 'tsparticles-engine' // TS Particles
import { loadFull } from 'tsparticles' // TS Particles
import headerMenuId, { translatedMenu } from './menu.js'
import McsiFooter from '@/components/McsiFooter.vue'
import particleOptions from '~/utilities/ParticleOptions'
export default Vue.extend({
   name: 'SinglePageLayout',
   components: {
      McsiFooter
   },
   data: () => {
      return {
         locales: {},
         logoColor: require('@/static/logo-color.png'),
         logoWhite: require('@/static/logo-color.png'),
         menu: headerMenuId,
         options: particleOptions,
         scrollPosition: 0,
         scrollPositionBound: 80
      }
   },
   mounted() {
      this.locales = this.$i18n.locales
      this.menu = translatedMenu(this)
      window.addEventListener('scroll', this.onScroll)
   },
   methods: {
      async particlesInit(engine: Engine): Promise<void> {
         await loadFull(engine)
      },
      onScroll(e: any) {
         this.scrollPosition = e.target.documentElement.scrollTop
      },
      switchLocale(code: string) {
         this.$i18n.setLocale(code)
         localStorage.lang = code
         this.menu = translatedMenu(this)
      }
   }
})
</script>
<style lang="scss" scoped>
.layout {
   .layout__particles {
      z-index: -10;
   }
   .mcsi-body {
      z-index: 99;
   }
}
// Brand
.brand {
   .brand__logo {
      height: 48px;
      width: auto;
   }
}
// Language Switcher
.lang__flag {
   height: 24px;
   margin-right: 1rem;
   width: 24px;
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

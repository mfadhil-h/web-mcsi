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
               b-nav-item-dropdown 
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
                  b-nav-item-dropdown 
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
   //- 04. Floating Button
   .floating-button
      b-button.btn-contact-us.mr-2(variant='secondary', @click='goToContactUs')
         font-awesome-icon.fw.mr-2(:icon='["fas", "comment"]')
         span {{ $t("contactUs") }}
      b-button.btn-whatsapp(variant='success', @click='sendWhatsapp')
         font-awesome-icon.fw.mr-2(:icon='["fab", "whatsapp"]')
         span Whatsapp
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
         message:
            'Your presence is requested at the wedding of our happiest moment.',
         options: particleOptions,
         scrollPosition: 0,
         scrollPositionBound: 80,
         whatsapp: {
            number: '',
            initialMessage: ''
         },
         whatsappLink: 'https://wa.me/'
      }
   },
   mounted() {
      this.initLocale()
      this.locales = this.$i18n.locales
      this.menu = translatedMenu(this)
      this.getWhatsapp()
      window.addEventListener('scroll', this.onScroll)
   },
   methods: {
      goToContactUs() {
         const route =
            localStorage.lang === 'id'
               ? '/contact'
               : '/' + localStorage.lang + '/contact'
         this.$router.push(route)
      },
      formatPhone(phone: string) {
         return phone.substring(0, 1) === '0'
            ? '62' + phone.substring(1)
            : phone.substring(0, 2) === '62'
            ? phone
            : 'error'
      },
      async getWhatsapp() {
         try {
            const whatsapp = await this.$axios.$get('/api/whatsapp?populate=*')
            this.whatsapp.number = whatsapp.data.attributes.number
            this.whatsapp.initialMessage =
               whatsapp.data.attributes.initialMessage
         } catch (error) {}
      },
      async particlesInit(engine: Engine): Promise<void> {
         await loadFull(engine)
      },
      initLocale() {
         if (!localStorage.lang || localStorage.lang === '') {
            localStorage.lang = 'id'
            this.$i18n.setLocale('id')
         }
      },
      onScroll(e: any) {
         this.scrollPosition = e.target.documentElement.scrollTop
      },
      sendWhatsapp() {
         const whatsappNumber = this.formatPhone(this.whatsapp.number)
         let baseUrl = this.$axios.defaults.baseURL
         if (baseUrl === '/')
            baseUrl = location.protocol + '//' + location.hostname
         const comWhatsappLink = encodeURI(
            this.whatsappLink +
               whatsappNumber +
               '?text=' +
               this.whatsapp.initialMessage
         )
         window.open(comWhatsappLink, '_blank')
      },
      switchLocale(code: string) {
         this.$i18n.setLocale(code)
         localStorage.lang = code
         this.menu = translatedMenu(this)
         this.getWhatsapp()
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
      z-index: 9999;
   }
}
// Brand
.brand {
   .brand__logo {
      height: 48px;
      object-fit: contain;
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
// Floating Button
.floating-button {
   display: block;
   position: fixed;
   right: 1rem;
   bottom: 1rem;
   z-index: 99;
   .btn-whatsapp {
      background-color: '#25D366';
      border-radius: 19px;
      box-shadow: 0 2px 8px 0 rgba(black, 0.2);
   }
   .btn-contact-us {
      border-radius: 19px;
      box-shadow: 0 2px 8px 0 rgba(black, 0.2);
   }
}
</style>
<i18n>
{
   "id": {
      "contactUs": "Hubungi Kami"
   },
   "en": {
      "contactUs": "Contact Us"
   }
}
</i18n>

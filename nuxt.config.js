import en from './locales/en'
import id from './locales/id'

export default {
   // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
   ssr: false,

   // Global page headers: https://go.nuxtjs.dev/config-head
   head: {
      title: 'MCS Internasional',
      htmlAttrs: {
         lang: 'id'
      },
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         { hid: 'description', name: 'description', content: '' },
         { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
         {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'
         }
      ]
   },

   // Global CSS: https://go.nuxtjs.dev/config-css
   css: [
      '@fortawesome/fontawesome-svg-core/styles.css',
      '~/assets/styles/styles.scss'
   ],

   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   plugins: [
      '~/plugins/axios.js',
      '~/plugins/fontawesome.js',
      { src: '~/plugins/ui-components.js', ssr: false }
   ],

   // Auto import components: https://go.nuxtjs.dev/config-components
   components: true,

   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
   buildModules: [
      '@nuxtjs/google-analytics', // https://google-analytics.nuxtjs.org/setup
      '@nuxt/typescript-build' // https://go.nuxtjs.dev/typescript
   ],

   // Modules: https://go.nuxtjs.dev/config-modules
   modules: [
      'bootstrap-vue/nuxt', // https://go.nuxtjs.dev/bootstrap
      '@nuxtjs/google-gtag', // https://github.com/nuxt-community/google-gtag-module
      '@nuxtjs/i18n',
      '@nuxtjs/axios'
   ],

   // Modify Bootstrap variables
   bootstrapVue: {
      bootstrapCSS: false,
      bootstrapVueCSS: false
   },

   i18n: {
      vueI18nLoader: true,
      locales: [
         {
            code: 'id',
            name: 'ID'
         },
         {
            code: 'en',
            name: 'EN'
         }
      ],
      defaultLocale: 'id',
      vueI18n: {
         fallbackLocale: 'id',
         messages: { id, en }
      },
      detectBrowserLanguage: false
      // strategy: 'prefix'
   },
   googleAnalytics: {
      id: 'G-0F2X9FF5ZB' // Based on MCSI predefined GTag ID
   },
   'google-gtag': {
      id: 'G-0F2X9FF5ZB' // Based on MCSI predefined GTag ID
   },
   axios: {
      proxy: false,
      baseUrl: process.env.NODE_ENV === 'dev' ? 'http://localhost:1337' : '/'
   },
   publicRuntimeConfig: {
      axios: {
         browserBaseURL: process.env.BROWSER_BASE_URL
      }
   },
   privateRuntimeConfig: {
      axios: {
         baseURL: process.env.BASE_URL
      },
      googleAnalytics: {
         id: process.env.GOOGLE_ANALYTICS_ID
      }
   },

   // Build Configuration: https://go.nuxtjs.dev/config-build
   build: {}
}

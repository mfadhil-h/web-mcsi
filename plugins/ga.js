import Vue from 'vue'
import VueGtag from 'vue-gtag'

const gtagDev = 'G-V2CVQ5L1W4'
// const gtagProdLegacy = 'G-0F2X9FF5ZB'
const gtagProd = 'GTM-N88CJQP'

export default (context, inject) => {
   Vue.use(
      VueGtag,
      {
         config: {
            id: process.env.nodeEnv === 'development' ? gtagDev : gtagProd
         }
      },
      context.app.router
   )

   context.$gtag = Vue.$gtag
   inject('gtag', Vue.$gtag)
}

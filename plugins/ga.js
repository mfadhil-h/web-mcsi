import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default (context, inject) => {
   Vue.use(VueGtag, {
      config: { id: 'G-CPHEGTM3CY' }
   })

   context.$gtag = Vue.$gtag
   inject('gtag', Vue.$gtag)
}

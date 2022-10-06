import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default (context, inject) => {
   Vue.use(VueGtag, {
      config: { id: 'G-0F2X9FF5ZB' }
   })

   context.$gtag = Vue.$gtag
   inject('gtag', Vue.$gtag)
}

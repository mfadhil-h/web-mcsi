import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default (context, inject) => {
   Vue.use(
      VueGtag,
      {
         config: {
            id:
               process.env.nodeEnv === 'development'
                  ? 'G-V2CVQ5L1W4'
                  : 'G-0F2X9FF5ZB'
         }
      },
      context.app.router
   )

   context.$gtag = Vue.$gtag
   inject('gtag', Vue.$gtag)
}

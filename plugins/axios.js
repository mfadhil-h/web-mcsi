export default function ({ $axios }) {
   $axios.onRequest((config) => {
      // Locale Request
      if (localStorage.lang) {
         config.params = {
            locale: localStorage.lang
         }
      }
   })
}

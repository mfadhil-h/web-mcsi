import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import VueCarousel from 'vue-carousel';
import VideoBackground from 'vue-responsive-video-background-player'

Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.component('video-background', VideoBackground)
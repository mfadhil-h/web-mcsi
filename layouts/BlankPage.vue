<template lang="pug">
.layout
   particles#tsparticles.layout__particles(
      :particlesInit='particlesInit',
      :options='options'
   )
   //- 01. Header
   b-navbar.navbar(toggleable='lg', type='light', variant='light')
      b-container.section.section--reading
         font-awesome-icon.back(icon='arrow-left', size='xl', @click='goBack')
   //- 02. Body
   Nuxt
   //- 03. Footer
   McsiFooter
</template>

<script lang="ts">
import Vue from 'vue'
import type { Engine } from 'tsparticles-engine' // TS Particles
import { loadFull } from 'tsparticles' // TS Particles
import McsiFooter from '@/components/McsiFooter.vue'
import particleOptions from '~/utilities/ParticleOptions'
export default Vue.extend({
   name: 'SinglePageLayout',
   components: {
      McsiFooter
   },
   data: () => {
      return {
         options: particleOptions
      }
   },
   methods: {
      async particlesInit(engine: Engine): Promise<void> {
         await loadFull(engine)
      },
      goBack() {
         this.$router.go(-1)
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
// Back
.back {
   transition-duration: 100ms;
   &:hover {
      cursor: pointer;
      color: #cc0000;
      transition-duration: 300ms;
   }
}
</style>

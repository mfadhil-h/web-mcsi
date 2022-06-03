<template lang="pug">
div
  tutorial
  section-pattern(top-left)
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
  section-pattern(top-right)
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
  section-pattern(bottom-left)
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
  section-pattern(bottom-right)
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
    h1 Test
</template>

<script lang="ts">
import Vue from 'vue'
import SectionPattern from '@/components/SectionPattern.vue'
export default Vue.extend({
  name: 'IndexPage',
  layout: 'SinglePage',
  components: {
    SectionPattern
  }
})
</script>

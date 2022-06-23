<template lang="pug">
.test
    pattern
</template>

<script lang="ts">
import Vue from 'vue'
import Pattern from '@/components/Pattern.vue'
export default Vue.extend({
    name: 'test',
    layout: 'SinglePage',
    components: {
        Pattern
    }
})
</script>

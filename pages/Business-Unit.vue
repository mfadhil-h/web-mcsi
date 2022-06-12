<template lang="pug">
.company-group
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
            b-row
                b-col(cols="12")
                    .section__title {{data.sectionTitle}}
                    .section__body {{data.sectionBody}}
            b-card-group.mt-5(deck)
                card-business-unit(v-for="(unit,index) of data.businessUnits" :key="index" :label="unit.label" :description="unit.description" :image="unit.image")
</template>

<script lang="ts">
import Vue from 'vue'
import CardBusinessUnit from '@/components/CardBusinessUnit.vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Company',
    heading2: 'Business Units',
    sectionTitle: 'We build people and trust',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
    businessUnits: [
        { 
            label: 'Manning Agency',
            description: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals.',
            image: require('@/assets/img/videotron-image.jpg'),
        },
         { 
            label: 'Training & Development',
            description: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals.',
            image: require('@/assets/img/videotron-image.jpg'),
        }
    ]
}
export default Vue.extend({
    name: 'company-group',
    layout: 'SinglePage',
    components: {
        CardBusinessUnit,
        PageHeader,
        Thumbnail
    },
    data: () => {
        return {
            data: mock,
            dataSelected: {
                image: '',
                year: '',
                label: '',
                description: ''
            }
        }
    },
})
</script>
<style lang="scss" scoped>

</style>

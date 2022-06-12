<template lang="pug">
.company-profile
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section
            b-row
                b-col(cols="12")
                    .section__title {{data.sectionTitle}}
            b-row.mt-4
                b-col(cols="12" md="6")
                    .section__body.mt-0 {{data.sectionBody}}
                b-col(cols="12" md="6")
                    b-img.company__image(:src="data.image1")
                    b-img.company__image(:src="data.image2")
    b-container.company__vision(fluid)
        b-container.section
            b-card-group(deck)
                b-card.vision
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="eye")
                    .vision__label Vision
                    .vision__description {{data.vision}}
                b-card.vision
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="bullseye")
                    .vision__label Mission
                    .vision__description {{data.mission}}
                b-card.vision
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="trophy")
                    .vision__label Company Value
                    .vision__description {{data.mission}}
</template>

<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Overview',
    heading2: 'Company',
    sectionTitle: 'MCSI at a glance',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
    image1: require('@/assets/img/videotron-image.jpg'),
    image2: require('@/assets/img/videotron-image.jpg'),
    vision: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing',
    mission: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing',
    value: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing'
}
export default Vue.extend({
    name: 'company-profile',
    layout: 'SinglePage',
    components: {
        CardManagement,
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
    methods: {
        showModalAward(image: string, year: string, label: string, description: string) {
            this.dataSelected = {
                image: image,
                year: year,
                label: label,
                description: description
            }
            console.log(this.dataSelected)
            this.$bvModal.show('modal-award')
        }
    }
})
</script>
<style lang="scss" scoped>
.company-profile {
    .company__image {
        margin-bottom: 1rem;
        width: 100%; height: auto
    }
    .company__vision {
        background: #EAEAEA;
    }
}
.vision {
    border-radius: 16px;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    padding: 1rem;
    text-align: center;
    user-select: none;
    .vision__icon {
        background-color: #EAEAEA;
        border-radius: 32px;
        height: 64px; width: 64px;
        margin: 0 auto;
        position: relative;
        .icon__fa {
            color: #154D6D;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%,-50%);
        }
    }
    .vision__label {
        color: #CC0000;
        font-size: 24px;
        font-weight: 700;
        margin-top: 1.5rem;
    }
    .vision__description {
        margin-top: 3rem;
    }
}
</style>

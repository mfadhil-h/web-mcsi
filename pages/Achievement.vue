<template lang="pug">
.achievement
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container(fluid)
        b-container.section.section--reading.text-center
            .section__title {{data.sectionTitle}}
            .section__body {{data.sectionBody}}
    b-container.section
        no-ssr
            div(v-for="(group, index) of data.awardGroup" :key="index")
                .display-2 {{group.label}}
                carousel.carousel(:perPageCustom="[[768, 3], [1024, 4]]")
                    slide.carousel__slide(v-for="(award, index) of group.awards" :key="index")
                        Thumbnail(:image="award.image" :heading="award.label" :subheading="award.year" @click="showModalAward(award.image, award.year, award.label, award.description)")
    b-modal(id="modal-award" size="lg" hide-footer centered)
        b-container-fluid.award
            b-row
                b-col(cols="12" sm="4")
                    b-img.award__image(:src="dataSelected.image")
                b-col(cols="12" sm="8")
                    .award__year {{dataSelected.year}}
                    .award__label {{dataSelected.label}}
            b-row.award__description
                b-col(cols="12") {{dataSelected.description}}
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Company',
    heading2: 'Achievement',
    sectionTitle: 'Our Achievement',
    sectionBody: 'Our leadership team brings together the industry’s most respected, forward-thinking individuals, whose deep experience and fresh perspectives combine to lead one of the fastest-growing, most innovative companies in the world. Together, they support a culture that is progressive, authentic and fun – while living our values and honoring our purpose every day.',
    awardGroup: [
        {
            label: '2021 - Present',
            awards: [
                {
                    label: 'Award 1',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 1'
                },
                {
                    label: 'Award 2',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 2'
                },
                {
                    label: 'Award 3',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 1'
                },
                {
                    label: 'Award 4',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 2'
                },
                {
                    label: 'Award 5',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 1'
                },
                {
                    label: 'Award 6',
                    year: '2021',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 2'
                }
            ]
        },
        {
            label: '2011 - Present',
            awards: [
                {
                    label: 'Award 1',
                    year: '2011',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 3'
                },
                {
                    label: 'Award 2',
                    year: '2012',
                    image: require('@/assets/img/award.png'),
                    description: 'Lorem ipsum 4'
                }
            ]
        }
    ]
}
export default Vue.extend({
    name: 'achievement',
    layout: 'SinglePage',
    components: {
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
.award {
    .award__image {
        width: 100%; height: auto;
    }
    .award__year {
        color: rgba(black, .7);
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
    }
    .award__label {
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        margin-top: 1rem;
    }
    .award__description {
        margin-top: 2rem;
    }
}
.carousel {
    margin-left: -1rem;
    margin-right: -1rem;
    .carousel__slide {
        padding: 1rem;
    }
}
</style>

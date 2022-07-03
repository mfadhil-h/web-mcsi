<template lang="pug">
.company-profile
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container(fluid)
        b-container.section(v-if="page")
            b-row
                b-col(cols="12")
                    .section__title {{page.sectionTitle}}
            b-row.mt-4
                b-col(cols="12" md="6")
                    .section__body.mt-0.mb-4 {{page.sectionDescription}}
                b-col(cols="12" md="6")
                    b-img.company__image(:src="strapiImage($axios.defaults.baseURL, page.image1)" v-if="page.image1")
                    b-img.company__image(:src="strapiImage($axios.defaults.baseURL, page.image2)" v-if="page.image2")
    b-container.company__vision(fluid)
        .ribbon
        b-container.section(v-if="page")
            b-card-group(deck)
                b-card.vision(v-b-modal.modal-vision)
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="eye")
                    .vision__label Visi
                    .vision__description {{page.visionShort}}
                b-card.vision(v-b-modal.modal-mission)
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="bullseye")
                    .vision__label Misi
                    .vision__description {{page.missionShort}}
                b-card.vision(v-b-modal.modal-company-value)
                    .vision__icon
                        font-awesome-icon.icon__fa(icon="trophy")
                    .vision__label Nilai Perusahaan
                    .vision__description {{page.companyValueShort}}
    b-modal(id="modal-vision" size="lg" hide-footer centered title="Visi")
        .modal-vision__content(v-html="micromark(page.visionLong)" v-if="page.visionLong")
    b-modal(id="modal-mission" size="lg" hide-footer centered title="Misi")
        .modal-vision__content(v-html="micromark(page.missionLong)" v-if="page.missionLong")
    b-modal(id="modal-company-value" size="lg" hide-footer centered title="Nilai Perusahaan")
        .modal-vision__content(v-html="micromark(page.companyValueLong)" v-if="page.companyValueLong")
</template>
<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'company-profile',
    layout: 'SinglePage',
    components: {
        PageHeader
    },
    data: () => {
        return {
            companyValue: {},
            page: {}
        }
    },
    methods: {
        async getCompanyValue() {
            try {
                let companyValue = await this.$axios.$get('/api/company-value?populate=*')
                this.companyValue = companyValue.data.attributes
                console.log('cv', this.companyValue)
            } catch (error) { }
        },
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-about?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        micromark,
        strapiImage
    },
    mounted() {
        this.getPage()
        // this.getCompanyValue()
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
        background: rgba(#EAEAEA, .5);
        padding-left: 0;
        padding-right: 0;
        position: relative;
        .ribbon {
            position: absolute;
            top: 200px;
            background-color: #CC0000;
            height: 20px; width: 100%;
        }
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
        font-size: 20px;
        font-weight: 700;
        margin-top: 1.5rem;
    }
    .vision__description {
        margin-top: 3rem;
    }
}
</style>
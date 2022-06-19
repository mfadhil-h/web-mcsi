<template lang="pug">
.management-detail
    PageHeader(:image="strapiImage($axios.defaults.baseURL, management.attributes.image)" v-if="management.attributes")
    b-container(fluid)
        b-container.section.section--reading
            .profile(v-if="management.attributes")
                .profile__name {{management.attributes.name}}
                .profile__position {{management.attributes.position}}
                .profile__description(v-html="micromark(management.attributes.description)")
            b-button.mt-4(variant="outline-secondary" @click="goBack") 
                font-awesome-icon.fw(icon="arrow-left")
                span.ml-2 Back to Management
</template>

<script lang="ts">
import Vue from 'vue'
import { micromark } from 'micromark'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'

export default Vue.extend({
    name: 'management',
    layout: 'SinglePage',
    components: {
        PageHeader,
    },
    data: () => {
        return {
            management: {} as any
        }
    },
    methods: {
        async getManagement() {
            try {
                let managements = await this.$axios.$get(`/api/managements/${this.$route.params.id}?populate=*`)
                this.management = managements.data
            } catch (error) { }
        },
        goBack() {
            this.$router.go(-1)
        },
        micromark,
        strapiImage
    },
    mounted() {
        this.getManagement()
    }
})
</script>
<style lang="scss" scoped>
.profile {
    .profile__name {
        font-size: 48px;
        font-weight: 700;
        letter-spacing: -5%;
        line-height: 64px;
    }
    .profile__position {
        color: rgba(black, .54);
        font-size: 24px;
        letter-spacing: -5%;
        line-height: 32px;
        margin-top: 1rem;
        text-transform: uppercase;
    }
    .profile__description {
        margin-top: 4rem;
        p {
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 40px;
        }
    }
}
</style>
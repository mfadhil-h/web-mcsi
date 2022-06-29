<template lang="pug">
b-container(fluid).mcsi-footer
    b-img.mcsi-footer__pattern-tr(:src="patternTr")
    b-img.mcsi-footer__pattern-bl(:src="patternBl")
    b-container(v-if="footerInfo")
        b-row.py-5
            b-col.mb-4(cols="12" md="4")
                b-img.logo-lighthouse(:src="strapiImage($axios.defaults.baseURL, footerInfo.lighthouseLogo)" v-if="footerInfo.lighthouseLogo")
            b-col.mb-4(cols="12" md="4")
                .mcsi-footer__item-title Sumber Informasi
                b-link.mcsi-footer__item(v-for="(item,index) of footerLinkCol2" :key="index") {{item.label}}
                .mcsi_footer__social
                    a.mr-4(:href="footerInfo.facebook" target="blank" v-if="footerInfo.facebook")
                        font-awesome-icon.fw(:icon="['fab', 'facebook']")
                    a.mr-4(:href="footerInfo.twitter" target="blank" v-if="footerInfo.twitter")
                        font-awesome-icon.fw(:icon="['fab', 'twitter']")
                    a.mr-4(:href="footerInfo.instagram" target="blank" v-if="footerInfo.instagram")
                        font-awesome-icon.fw(:icon="['fab', 'instagram']")
                    a.mr-4(:href="footerInfo.tiktok" target="blank" v-if="footerInfo.tiktok")
                        font-awesome-icon.fw(:icon="['fab', 'tiktok']")
                    a.mr-4(:href="footerInfo.youtube" target="blank" v-if="footerInfo.youtube")
                        font-awesome-icon.fw(:icon="['fab', 'youtube']")
                    a.mr-4(:href="footerInfo.linkedin" target="blank" v-if="footerInfo.linkedin")
                        font-awesome-icon.fw(:icon="['fab', 'linkedin']")
            b-col.mb-4(cols="12" md="4" v-if="footerInfo.address")
                .mcsi-footer__item-title {{footerInfo.address.label}}
                .mcsi-footer__item.mb-0 {{footerInfo.address.addressLine1}}
                .mcsi-footer__item.mb-0 {{footerInfo.address.addressLine2}}
                .mcsi-footer__item {{footerInfo.address.addressLine3}}
                .mcsi-footer__item Phone: {{footerInfo.address.phone}}
                .mcsi-footer__item Fax: {{footerInfo.address.fax}}
                .mcsi-footer__item Email: {{footerInfo.address.email}}
        b-row.mcsi-footer__copyright.pb-4
            b-col Copyright (c) 2022 PT MCS Internasional - All Rights Reserved
</template>
<script lang="ts">
import Vue from 'vue'
import { strapiImage } from '@/utilities/StrapiImage'
const mockFooterLinkCol2 = [
    { label: 'Kebijakan Privasi', link: '#' },
    { label: 'Syarat dan Ketentuan', link: '#' },
    { label: 'Hubungi Kami', link: '#' },
]

export default Vue.extend({
    name: 'footer',
    data: () => {
        return {
            footerInfo: {},
            footerLinkCol2: mockFooterLinkCol2,
            logoLighthouse: require('@/assets/img/lighthouse.png'),
            patternTr: require('@/assets/img/pattern-tr.png'),
            patternBl: require('@/assets/img/pattern-bl.png')
        }
    },
    methods: {
        async getFooter() {
            try {
                let footerInfo = await this.$axios.$get('/api/footer?populate=*')
                this.footerInfo = footerInfo.data.attributes
				console.log('footer', this.footerInfo)
            } catch (error) { } 
        },
        openSocial(url: string) {
            window.open(url, '_blank')
        },
        strapiImage
    },
    mounted() {
        this.getFooter()
    }
})
</script>
<style lang="scss" scoped>
.mcsi-footer {
    position: relative;
    background-image: linear-gradient(180deg, #CC0000 0%, #910000 100%);
    .mcsi-footer__pattern-tr {
        filter: opacity(.8);
        position: absolute;
        top: 0; right: 0;
        width: 25%; height: auto;
    }
    .mcsi-footer__pattern-bl {
        filter: opacity(.8);
        position: absolute;
        bottom: 0; left: 0;
        width: 25%; height: auto;
    }
    .mcsi-footer__item-title {
        color: white;
        display: block;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 1.5rem;
    }
    .mcsi-footer__item {
        color: rgba(white, .8);
        display: block;
        margin-bottom: 1rem;
        text-decoration: none;
        &:hover {
            color: white;
        }
    }
    .mcsi_footer__social {
        a {
            color: rgba(white, .8);
            &:hover {
                color: white;
            }
        }
        
    }
    .mcsi-footer__copyright {
        color: rgba(white, .8);
        font-size: 12px;
        text-align: center;
    }
}
.logo-lighthouse {
    height: 120px; width: auto;
}
</style>
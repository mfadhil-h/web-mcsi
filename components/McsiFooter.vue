<template lang="pug">
b-container(fluid).footer
    b-img.footer__pattern-tr(:src="patternTr")
    b-img.footer__pattern-bl(:src="patternBl")
    b-container
        b-row.py-5
            b-col.mb-4(cols="12" md="4")
                b-img.logo-lighthouse(:src="logoLighthouse")
            b-col.mb-4(cols="12" md="4")
                .footer__item-title Sumber Informasi
                b-link.footer__item(v-for="(item,index) of footerLinkCol2" :key="index") {{item.label}}
            b-col.mb-4(cols="12" md="4")
                .footer__item-title PT MCS Internasional
                .footer__item.mb-0 {{addressLine1}}
                .footer__item.mb-0 {{addressLine2}}
                .footer__item {{addressLine3}}
                .footer__item Phone: {{phone}}
                .footer__item Fax: {{fax}}
                .footer__item Email: {{email}}
        b-row.footer__copyright.pb-4
            b-col Copyright (c) 2022 PT MCS Internasional - All Rights Reserved
</template>
<script lang="ts">
import Vue from 'vue'
const mockFooterLinkCol2 = [
    { label: 'Kebijakan Privasi', link: '#' },
    { label: 'Kebijakan Kuki', link: '#' },
    { label: 'Syarat dan Ketentuan', link: '#' },
    { label: 'Hubungi Kami', link: '#' },
]
const mockContact = {
    addressLine1: 'Granadi Building 5th floor',
    addressLine2: 'Jl. HR Rasuna Said Blok X-1',
    addressLine3: 'Kav 8-9, Jakarta 12950, Indonesia',
    phone: '+62212525196',
    fax: '+622152964555',
    email: 'crewing@mcs-international.com',
}
export default Vue.extend({
    name: 'footer',
    data: () => {
        return {
            addressLine1: mockContact.addressLine1,
            addressLine2: mockContact.addressLine2,
            addressLine3: mockContact.addressLine3,
            footerLinkCol2: mockFooterLinkCol2,
            logoLighthouse: require('@/assets/img/lighthouse.png'),
            patternTr: require('@/assets/img/pattern-tr.png'),
            patternBl: require('@/assets/img/pattern-bl.png'),
            phone: mockContact.phone,
            fax: mockContact.fax,
            email: mockContact.email,
        }
    }
})
</script>
<style lang="scss" scoped>
.footer {
    position: relative;
    background-image: linear-gradient(180deg, #CC0000 0%, #910000 100%);
    .footer__pattern-tr {
        filter: opacity(.8);
        position: absolute;
        top: 0; right: 0;
        width: 25%; height: auto;
    }
    .footer__pattern-bl {
        filter: opacity(.8);
        position: absolute;
        bottom: 0; left: 0;
        width: 25%; height: auto;
    }
    .footer__item-title {
        color: white;
        display: block;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 1.5rem;
    }
    .footer__item {
        color: rgba(white, .8);
        display: block;
        margin-bottom: 1rem;
        text-decoration: none;
        &:hover {
            color: white;
        }
    }
    .footer__copyright {
        color: rgba(white, .8);
        font-size: 12px;
        text-align: center;
    }
}
.logo-lighthouse {
    height: 120px; width: auto;
}
</style>
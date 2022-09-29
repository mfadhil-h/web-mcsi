<template lang="pug">
b-container.mcsi-footer(fluid)
   b-img.mcsi-footer__pattern-tr(:src='patternTr')
   b-img.mcsi-footer__pattern-bl(:src='patternBl')
   b-container(v-if='footerInfo')
      b-row.py-5
         b-col.mb-4.text-center(cols='12', md='4')
            a(
               :href='footerInfo.youtube',
               target='blank',
               v-if='footerInfo.youtube'
            )
               b-img.logo-lighthouse(
                  :src='strapiImage($axios.defaults.baseURL, footerInfo.lighthouseLogo)',
                  v-if='footerInfo.lighthouseLogo'
               )
         b-col.mb-4(cols='12', md='4')
            .mcsi-footer__item-title {{ $t("source") }}
            NuxtLink.mcsi-footer__item(:to='"/privacy-policy"') {{ $t("privacyPolicy") }}
            NuxtLink.mcsi-footer__item(:to='"/terms-conditions"') {{ $t("termsConditions") }}
            NuxtLink.mcsi-footer__item(:to='"/contact"') {{ $t("contactUs") }}
            NuxtLink.mcsi-footer__item(:to='"/sitemap"') {{ $t("sitemap") }}
            .mcsi_footer__social
               a.mr-4(
                  :href='footerInfo.facebook',
                  target='blank',
                  v-if='footerInfo.facebook'
               )
                  font-awesome-icon.fw(:icon='["fab", "facebook"]')
               a.mr-4(
                  :href='footerInfo.twitter',
                  target='blank',
                  v-if='footerInfo.twitter'
               )
                  font-awesome-icon.fw(:icon='["fab", "twitter"]')
               a.mr-4(
                  :href='footerInfo.instagram',
                  target='blank',
                  v-if='footerInfo.instagram'
               )
                  font-awesome-icon.fw(:icon='["fab", "instagram"]')
               a.mr-4(
                  :href='footerInfo.tiktok',
                  target='blank',
                  v-if='footerInfo.tiktok'
               )
                  font-awesome-icon.fw(:icon='["fab", "tiktok"]')
               a.mr-4(
                  :href='footerInfo.linkedin',
                  target='blank',
                  v-if='footerInfo.linkedin'
               )
                  font-awesome-icon.fw(:icon='["fab", "linkedin"]')
         b-col.mb-4(cols='12', md='4', v-if='footerInfo.address')
            .mcsi-footer__item-title {{ footerInfo.address.label }}
            .mcsi-footer__item.mb-0 {{ footerInfo.address.addressLine1 }}
            .mcsi-footer__item.mb-0 {{ footerInfo.address.addressLine2 }}
            .mcsi-footer__item {{ footerInfo.address.addressLine3 }}
            .mcsi-footer__item Phone: {{ footerInfo.address.phone }}
            .mcsi-footer__item Fax: {{ footerInfo.address.fax }}
            .mcsi-footer__item Email: {{ footerInfo.address.email }}
      b-row.mcsi-footer__copyright.pb-4
         b-col {{ $t("copyright") }}
</template>
<script lang="ts">
import Vue from 'vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
   name: 'McsiFooter',
   data: () => {
      return {
         footerInfo: {},
         footerLinkCol2: [] as any,
         patternTr: require('@/static/pattern-tr.png'),
         patternBl: require('@/static/pattern-bl.png')
      }
   },
   mounted() {
      this.getFooter()
   },
   methods: {
      async getFooter() {
         try {
            const footerInfo = await this.$axios.$get('/api/footer?populate=*')
            this.footerInfo = footerInfo.data.attributes
         } catch (error) {}
      },
      openSocial(url: string) {
         window.open(url, '_blank')
      },
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.mcsi-footer {
   position: relative;
   background-image: linear-gradient(180deg, #cc0000 0%, #910000 100%);
   .mcsi-footer__pattern-tr {
      filter: opacity(0.8);
      position: absolute;
      top: 0;
      right: 0;
      width: 25%;
      height: auto;
   }
   .mcsi-footer__pattern-bl {
      filter: opacity(0.8);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 25%;
      height: auto;
   }
   .mcsi-footer__item-title {
      color: white;
      display: block;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 1.5rem;
   }
   .mcsi-footer__item {
      color: rgba(white, 0.8);
      display: block;
      margin-bottom: 1rem;
      text-decoration: none;
      &:hover {
         color: white;
      }
   }
   .mcsi_footer__social {
      a {
         color: rgba(white, 0.8);
         &:hover {
            color: white;
         }
      }
   }
   .mcsi-footer__copyright {
      color: rgba(white, 0.8);
      font-size: 12px;
      text-align: center;
   }
}
.logo-lighthouse {
   height: 200px;
   width: auto;
}
</style>
<i18n>
{
  "id": {
    "source": "Sumber Informasi",
    "privacyPolicy":"Kebijakan Privasi",
    "termsConditions":"Syarat dan Ketentuan",
    "contactUs":"Hubungi Kami",
    "sitemap": "Peta Situs",
    "copyright": "© 2022 PT MCS Internasional - Hak Cipta Dilindungi Undang-undang"
  },
  "en": {
    "source": "Source of Information",
    "privacyPolicy":"Privacy Policy",
    "termsConditions":"Terms and Conditions",
    "contactUs":"Contact Us",
    "sitemap": "Site map",
    "copyright": "Copyright © 2022 PT MCS Internasional - All Rights Reserved"
   }
}
</i18n>

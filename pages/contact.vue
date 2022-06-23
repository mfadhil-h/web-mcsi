<template lang="pug">
.contact
    PageHeader(:image="strapiImage($axios.defaults.baseURL, page.headerBackground)" :heading1="page.header1" :heading2="page.header2" v-if="page.headerBackground!=null")
    b-container.section
        b-card.contact__office.mb-4
            b-row
                b-col(cols="12" sm="6")
                    b-img.office__map(:src="strapiImage($axios.defaults.baseURL, page.mapImage)" v-if="page.mapImage!=null")
                b-col(cols="12" sm="6" v-if="page.headOffice")
                    .office__title Head Office
                    .office__name.mb-2 {{page.headOffice.label}}
                    .office__item {{page.headOffice.addressLine1}}
                    .office__item {{page.headOffice.addressLine2}}
                    .office__item {{page.headOffice.addressLine3}}
                    .office__item Phone: {{page.headOffice.phone}}
                    .office__item Fax: {{page.headOffice.fax}}
                    .office__item Email: {{page.headOffice.email}}
        b-card.contact__email
            .email__heading Reach Us on Email
            b-form.email__form
                b-row
                    b-col(cols="12" sm="6")
                        b-form-group(label="Full Name")
                            b-form-input(type="text" v-model="message.name")
                        b-form-group(label="Phone")
                            b-form-input(type="number"  v-model="message.phone")
                        b-form-group(label="Email")
                            b-form-input(type="email" v-model="message.email")
                    b-col(cols="12" sm="6")
                        b-form-group(label="Subject")
                            b-form-input(type="text"  v-model="message.subject")
                        b-form-group(label="Message")
                            b-form-textarea(type="text" rows="3" v-model="message.message")
                b-button.float-right(
                    variant="primary"
                    @click="sendEmail(message.subject, message.message, message.name, message.phone, message.email)") Submit
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
    name: 'contact',
    layout: 'SinglePage',
    components: {
        PageHeader,
    },
    data: () => {
        return {
            message: {
                name: '',
                phone: '',
                email: '',
                subject: '',
                message: ''
            },
            page: {},
        }
    },
    methods: {
        async getPage() {
            try {
                let page = await this.$axios.$get('/api/page-contact-us?populate=*')
                this.page = page.data.attributes
            } catch (error) { } 
        },
        sendEmail(subject: string, message: string, name: string, phone: string, email: string) {
            let mailLink = 'mailto:yacob.huang@gmail.com' 
                            + '?subject=' + encodeURIComponent(subject)
                            + '&body=' +  encodeURIComponent(name) + ' - (' + encodeURIComponent(phone) + ', ' + encodeURIComponent(email) + ')%0D%0D'
                            + encodeURIComponent(message);
            window.location.href = mailLink
        },
        strapiImage
    },
    mounted() {
        this.getPage()
    }
})
</script>
<style lang="scss" scoped>
.contact__office {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1.5rem;
    .office__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        margin-bottom: 1rem;
    }
    .office__name {
        font-weight: 700;
    }
    .office__map {
        border-radius: 8px;
        width: 100%; height: auto;
    }
}
.contact__email {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(black, .1);
    margin-bottom: 1.5rem;
    .email__heading {
        font-size: 24px;
        line-height: 32px;
        font-weight: bold;
    }
    .email__form {
        margin-top: 1.5rem;
    }
}
</style>
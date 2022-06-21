<template lang="pug">
.contact
    PageHeader(:image="data.headingImage" :heading1="data.heading1" :heading2="data.heading2")
    b-container.section
        b-card.contact__office.mb-4
            b-row
                b-col(cols="12" sm="6")
                    b-img.office__map(:src="data.map")
                b-col(cols="12" sm="6")
                    .office__title Head Office
                    .office__name.mb-2 PT MCS Internasional
                    .office__item {{data.addressLine1}}
                    .office__item {{data.addressLine2}}
                    .office__item {{data.addressLine3}}
                    .office__item Phone: {{data.phone}}
                    .office__item Fax: {{data.fax}}
                    .office__item Email: {{data.email}}
        b-card.contact__email
            .email__heading Reach Us on Email
            b-form.email__form
                b-row
                    b-col(cols="12" sm="6")
                        b-form-group(label="Full Name")
                            b-form-input(type="text")
                        b-form-group(label="Phone")
                            b-form-input(type="number")
                        b-form-group(label="Email")
                            b-form-input(type="email")
                    b-col(cols="12" sm="6")
                        b-form-group(label="Subject")
                            b-form-input(type="text")
                        b-form-group(label="Message")
                            b-form-textarea(type="text" rows="3")
                b-button.float-right(variant="primary") Submit
</template>

<script lang="ts">
import Vue from 'vue'
import CardVacancy from '@/components/CardVacancy.vue'
import PageHeader from '@/components/PageHeader.vue'
import Thumbnail from '@/components/Thumbnail.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    heading1: 'Keep In Touch',
    heading2: 'Contact Us',
    sectionTitle: 'Available Vacancies',
    sectionBody: 'Submit your CV and grow your career with us',
    addressLine1: 'Granadi Building 5th floor',
    addressLine2: 'Jl. HR Rasuna Said Blok X-1',
    addressLine3: 'Kav 8-9, Jakarta 12950, Indonesia',
    phone: '+62212525196',
    fax: '+622152964555',
    email: 'crewing@mcs-international.com',
    map: require('@/assets/img/map.png')
}
export default Vue.extend({
    name: 'contact',
    layout: 'SinglePage',
    components: {
        CardVacancy,
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

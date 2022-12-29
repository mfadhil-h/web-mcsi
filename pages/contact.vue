<template lang="pug">
.contact
   PageHeader(
      :image='strapiImage($axios.defaults.baseURL, page.headerBackground)',
      :heading1='page.header1',
      :heading2='page.header2',
      v-if='page.headerBackground'
   )
   b-container.section.section--reading.text-center
      b-card.section__bg(no-body, v-if='page')
         .section__title {{ page.sectionTitle }}
         .section__body {{ page.sectionDescription }}
   b-container.section
      b-card.contact__office.mb-4
         b-row
            b-col(cols='12', sm='6')
               b-img.office__map(
                  :src='strapiImage($axios.defaults.baseURL, page.mapImage)',
                  v-if='page.mapImage != null'
               )
            b-col(cols='12', sm='6', v-if='page.headOffice')
               .office__title {{ $t("addressEditorial") }}
               .office__name.mb-2 {{ page.headOffice.label }}
               .office__item {{ page.headOffice.addressLine1 }}
               .office__item {{ page.headOffice.addressLine2 }}
               .office__item {{ page.headOffice.addressLine3 }}
               .office__item Phone: {{ page.headOffice.phone }}
               .office__item Fax: {{ page.headOffice.fax }}
               .office__item Email: {{ page.headOffice.email }}
      //- b-card.contact__email
         .email__heading {{ $t("emailEditorial") }}
         b-form.email__form
            b-row
               b-col(cols='12', sm='6')
                  b-form-group(:label='$t("emailName")')
                     b-form-input(type='text', v-model='message.name')
                  b-form-group(:label='$t("emailPhone")')
                     b-form-input(type='number', v-model='message.phone')
                  b-form-group(:label='$t("emailEmail")')
                     b-form-input(type='email', v-model='message.email')
                  b-form-group(:label='$t("emailCategory")')
                     b-form-select(
                        v-model='contactCategorySelected',
                        v-if='contactCategories'
                     )
                        b-form-select-option(value='') {{ $t("emailCategoryPlaceholder") }}
                        b-form-select-option(
                           v-for='(category, index) of contactCategories',
                           :key='index',
                           :value='category.attributes.description'
                        ) {{ category.attributes.description }}
               b-col(cols='12', sm='6')
                  b-form-group(:label='$t("emailSubject")')
                     b-form-input(type='text', v-model='message.subject')
                  b-form-group(:label='$t("emailMessage")')
                     b-form-textarea(
                        type='text',
                        rows='8',
                        v-model='message.message'
                     )
            b-button.float-right(
               variant='primary',
               size='lg',
               v-b-modal.modal-contact-confirm
            ) {{ $t("buttonSubmit") }}
   b-modal#modal-contact-confirm(
      :cancel-title='$t("confirmationCancel")',
      cancel-variant='light',
      :ok-title='$t("confirmationOk")',
      @ok='sendEmail(message.name, message.phone, message.email, contactCategorySelected, message.subject, message.message)'
   )
      p {{ $t("confirmation") }}
</template>
<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { strapiImage } from '@/utilities/StrapiImage'
export default Vue.extend({
   name: 'PageContact',
   components: {
      PageHeader
   },
   layout: 'SinglePage',
   data: () => {
      return {
         contactCategories: [],
         contactCategorySelected: '',
         contactEmail: '',
         message: {
            name: '',
            phone: '',
            email: '',
            subject: '',
            message: ''
         },
         page: {}
      }
   },
   async mounted() {
      this.getPage()
      this.getContactCategories()
      await this.$recaptcha.init()
   },
   async beforeDestroy() {
      await this.$recaptcha.destroy()
   },
   methods: {
      async getContactCategories() {
         try {
            const contactCategories = await this.$axios.$get(
               '/api/contact-categories'
            )
            this.contactCategories = contactCategories.data
         } catch (error) {}
      },
      async getPage() {
         try {
            const page = await this.$axios.$get(
               '/api/page-contact-us?populate=*'
            )
            this.page = page.data.attributes
         } catch (error) {}
      },
      async sendEmail(
         name: string,
         phone: string,
         email: string,
         category: string,
         subject: string,
         message: string
      ) {
         try {
            const token = await this.$recaptcha.execute('login')
            const contactInbox = {
               name,
               phone,
               email,
               category,
               subject,
               message,
               token
            }
            await this.$axios.$post('/api/contact-inboxes', {
               data: contactInbox
            })
            this.message = {
               name: '',
               phone: '',
               email: '',
               subject: '',
               message: ''
            }
         } catch (error) {}
      },
      // sendEmail2(
      //    // Send email using Outlook or other email app
      //    to: string,
      //    category: string,
      //    subject: string,
      //    message: string,
      //    name: string,
      //    phone: string,
      //    email: string
      // ) {
      //    const mailLink =
      //       'mailto:' +
      //       to +
      //       '?subject=' +
      //       encodeURIComponent(category) +
      //       ' - ' +
      //       encodeURIComponent(subject) +
      //       '&body=' +
      //       encodeURIComponent(name) +
      //       ' - (' +
      //       encodeURIComponent(phone) +
      //       ', ' +
      //       encodeURIComponent(email) +
      //       ')%0D%0D' +
      //       encodeURIComponent(message)
      //    window.location.href = mailLink
      // },
      strapiImage
   }
})
</script>
<style lang="scss" scoped>
.contact__office {
   border: none;
   box-shadow: 0 4px 8px 0 rgba(black, 0.1);
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
      width: 100%;
      height: auto;
   }
}
.contact__email {
   border: none;
   box-shadow: 0 4px 8px 0 rgba(black, 0.1);
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
<i18n>
{
   "id": {
      "addressEditorial": "Kantor Pusat",
      "emailEditorial": "Hubungi Kami",
      "emailName": "Nama",
      "emailPhone": "Nomor Telepon",
      "emailEmail": "Email",
      "emailCategory": "Kategori",
      "emailCategoryPlaceholder": "- Pilih salah satu -",
      "emailSubject": "Judul",
      "emailMessage": "Pesan",
      "buttonSubmit": "Kirim",
      "confirmation": "Konfirmasi mengirimkan pesan ini kepada kami?",
      "confirmationOk": "Ya",
      "confirmationCancel": "Tidak"
   },
   "en": {
      "addressEditorial": "Head Office",
      "emailEditorial": "Contact Us",
      "emailName": "Name",
      "emailPhone": "Phone No",
      "emailEmail": "Email",
      "emailCategory": "Category",
      "emailCategoryPlaceholder": "- Please select one -",
      "emailSubject": "Subject",
      "emailMessage": "Message",
      "buttonSubmit": "Submit",
      "confirmation": "Confirm to send this message to us?",
      "confirmationOk": "Yes",
      "confirmationCancel": "No"
   }
}
</i18n>

<template lang="pug">
.management-detail
    PageHeader(:image="data.headingImage")
    b-container(fluid)
        b-container.section.section--reading
            .profile
                .profile__name {{data.name}}
                .profile__position {{data.position}}
                .profile__html HTML here

</template>

<script lang="ts">
import Vue from 'vue'
import CardManagement from '@/components/CardManagement.vue'
import PageHeader from '@/components/PageHeader.vue'
const mock = {
    headingImage: require('@/assets/img/videotron-image.jpg'),
    name: 'John Doe',
    position: 'Chief Executive Officer'
}
export default Vue.extend({
    name: 'management',
    layout: 'SinglePage',
    components: {
        CardManagement,
        PageHeader
    },
    data: () => {
        return {
            data: mock
        }
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
    .profile__html {
        margin-top: 4rem;
    }
}
</style>
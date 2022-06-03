<template lang="pug">
.layout
    //- 01. Sticky Navbar
    b-navbar(toggleable="md" type="dark" variant="dark")
        b-navbar-brand(href="#") MCS International
        b-navbar-toggle(target="nav-collapse")
        b-collapse(id="nav-collapse" is-nav)
            b-navbar-nav.ml-auto
                b-nav-item Beranda
                b-nav-item-dropdown(text="Tentang Kami")
                    b-dropdown-item Profil Singkat
                    b-dropdown-item Visi dan Misi
                    b-dropdown-item Struktur Perusahaan
                    b-dropdown-item Struktur Organisasi
                    b-dropdown-item Direksi
                    b-dropdown-item Jejak Langkah
                    b-dropdown-item Penghargaan
                b-nav-item-dropdown(text="Bisnis")
                    b-dropdown-item Crew Management Services
                    b-dropdown-item Crew Training
                b-nav-item-dropdown(text="Konten")
                    b-dropdown-item Podcast
                    b-dropdown-item Blog
                    b-dropdown-item Video
                b-nav-item-dropdown(text="Kegiatan" right)
                    b-dropdown-item Upcoming Events
                    b-dropdown-item Ceremony
                    b-dropdown-item Partnership
                b-nav-item-dropdown(text="Karir" right)
                    b-dropdown-item Karyawan Darat
                    b-dropdown-item Awak Kapal
                    b-dropdown-item Magang
    //- 02. Body
    Nuxt
    //- 03. Footer
    Footer
</template>
<script lang="ts">
import Vue from 'vue'
import Footer from '@/components/Footer.vue'
export default Vue.extend({
    name: 'SinglePageLayout',
    components: {
        Footer
    }
})
</script>
const headerMenuId = [
    {
        label: 'Beranda',
        link: '/'
    },
    {
        label: 'Tentang Kami',
        link: '/profile',
        children: [
            {
                label: 'Profil Singkat',
                link: '/about'
            },
            {
                label: 'Unit Bisnis',
                link: '/business-unit'
            },
            {
                label: 'Struktur Organisasi',
                link: '/management'
            },
            {
                label: 'Direksi',
                link: '/director'
            },
            {
                label: 'Jejak Langkah',
                link: '/timeline'
            },
            {
                label: 'Penghargaan',
                link: '/achievement'
            }
        ]
    },
    {
        label: 'Konten',
        link: '#',
        children: [
            {
                label: 'Podcast',
                link: '#'
            },
            {
                label: 'News & Insights',
                link: '/news'
            }
        ]
    },
    {
        label: 'Karir',
        link: '/career'
    },
    {
        label: 'Hubungi Kami',
        link: '/contact'
    }
]

export default headerMenuId
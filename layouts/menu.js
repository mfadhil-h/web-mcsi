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
                label: 'Manajemen',
                link: '/management'
            },
            {
                label: 'Struktur Organisasi MCSI',
                link: '/organization-mcsi'
            },
            {
                label: 'Struktur Organisasi ETSI',
                link: '/organization-etsi'
            },
            {
                label: 'Jejak Langkah',
                link: '/milestone'
            },
            {
                label: 'Penghargaan',
                link: '/achievement'
            }
        ]
    },
    {
        label: 'News & Insight',
        link: '/news'
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
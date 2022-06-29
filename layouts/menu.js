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
                label: 'Struktur Organisasi MCSI',
                link: '/orgchart-mcsi'
            },
            {
                label: 'Struktur Organisasi ETSI',
                link: '/orgchart-etsi'
            },
            {
                label: 'Manajemen MCSI',
                link: '/management-mcsi'
            },
            {
                label: 'Manajemen ETSI',
                link: '/management-etsi'
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
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
                link: '/profile'
            },
            {
                label: 'Visi & Misi',
                link: '/vision-mission'
            },
            {
                label: 'Struktur Organisasi',
                link: '/organization'
            },
            {
                label: 'Manajemen',
                link: '/management'
            },
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
                label: 'Blogs',
                link: '#'
            }
        ]
    }
]

export default headerMenuId
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
                label: 'Visi & Misi',
                link: '/vision-mission'
            },
            {
                label: 'Struktur Perusahaan',
                link: '/organization'
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
                link: '/footprint'
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
                label: 'Blogs',
                link: '#'
            }
        ]
    }
]

export default headerMenuId
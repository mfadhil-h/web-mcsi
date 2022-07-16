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
                link: '/management-mcsi'
            },
            {
                label: 'Struktur Organisasi',
                link: '/organization-mcsi'
            },
            {
                label: 'Jejak Langkah',
                link: '/milestone'
            },
            {
                label: 'Sertifikat',
                link: '/achievement'
            }
        ]
    },
    {
        label: 'News & Insight',
        link: '/news'
    },
    {
        label: 'Klien',
        link: '/client'
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

export function translatedMenu(app) {
    return [
        {
            label: app.$t('home'),
            link: '/'
        },
        {
            label: app.$t('aboutUs'),
            link: '/profile',
            children: [
                {
                    label: app.$t('shortProfile'),
                    link: '/about'
                },
                {
                    label: app.$t('businessUnit'),
                    link: '/business-unit'
                },
                {
                    label: app.$t('MCSIManagement'),
                    link: '/management-mcsi'
                },
                {
                    label: app.$t('MCSIOrgChart'),
                    link: '/organization-mcsi'
                },
                {
                    label: app.$t('milestone'),
                    link: '/milestone'
                },
                {
                    label: app.$t('achievement'),
                    link: '/achievement'
                }
            ]
        },
        {
            label: app.$t('newsAndInsight'),
            link: '/news'
        },
        {
            label: app.$t('client'),
            link: '/client'
        },
        {
            label: app.$t('career'),
            link: '/career'
        },
        {
            label: app.$t('contactUs'),
            link: '/contact'
        }
    ]

}

export default headerMenuId
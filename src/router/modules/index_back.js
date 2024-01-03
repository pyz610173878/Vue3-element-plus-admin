export default [
    {
        path: '/',
        redirect: "login",
        hidden: true
    },
    {
        path: '/login',
        name: '登录',
        hidden: true,
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            title: '控制台',
            icon: "home"
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: "/console",
                name: "Console",
                meta: {
                    title: "首页"
                },
                component: () => import("@/views/console/index.vue"),
            }
        ],
    }, {
        path: '/user',
        // redirect: '/dashboard',
        name: '/User',
        meta: {
            title: '用户管理',
            icon: "user",
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: "/userindex",
                name: "Userindex",
                meta: {
                    title: "用户列表"
                },
                component: () => import("@/views/user/index.vue"),
            },
        ],
    },
    {
        path: '/news',
        // redirect: '/dashboard',
        name: 'News',
        meta: {
            title: '信息管理',
            icon: "information"
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: "/newsIndex",
                name: "Newindex",
                meta: {
                    title: "信息列表"
                },
                component: () => import("@/views/info/index.vue"),
            },
            {
                path: '/newsCategory',
                // redirect: '/dashboard',
                name: 'NewsCategory',
                meta: {
                    title: '信息分类'
                },
                component: () => import('@/views/info/Category.vue'),
            },
            {
                path: "/newsDetailed",
                name: "NewsDetailed",
                hidden: true,
                meta: {
                    title: "信息详情"
                },
                component: () => import("@/views/info/Detailed.vue"),
            }
        ],
    },
    {
        path: '/admin',
        // redirect: '/dashboard',
        name: 'admin',
        component: () => import('@/layout/index.vue'),
        //         children: [
        //             {
        //                 path: "dashboard",
        //                 omponent: () => import('@/views/dashboard/index'),
        //                 name: 'Dashboard',
        //                 meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        //             }
        //         ]
        //     }
        // ];
    }
]


export default {
    name:'entertainment',
    component: () => import(/* webpackChunkName: "entertainment" */ '@/modules/entertainment/layouts/EntertainmentLayout.vue'),
    children: [
        {
            path: '',
            name: 'trending',
            component: () => import(/* webpackChunkName: "trending" */ '@/modules/entertainment/views/TrendingView.vue')
        },
    ]
}
export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeLayout.vue'),
    meta: { title: 'Yarik - app' },
    children: [
      {
        path: '',
        name: 'UserTable',
        component: () => import('@/components/UserTableComponent.vue')
      },
      {
        path: '',
        name: 'PostTable',
        component: () => import('@/components/PostTableComponent.vue')
      }
    ]
  }
]

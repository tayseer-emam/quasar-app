
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'posts', component: () => import('pages/Index.vue') },
      { path: 'albums', name: 'albums', component: () => import('pages/Albums.vue') },
      { path: 'albums/:id', name: 'album', component: () => import('pages/Album.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

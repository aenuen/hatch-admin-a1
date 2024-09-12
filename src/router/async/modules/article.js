import Layout from '@/components/Layout'

export const article = {
  path: '/article',
  name: 'article',
  component: Layout,
  redirect: '/article/list',
  meta: {
    title: '文章管理',
    icon: 'article',
    roles: ['user'],
  },
  children: [
    {
      path: 'list',
      name: 'article-list',
      component: () => import('@/views/article/list'),
      meta: {
        title: '文章列表',
        roles: ['user'],
      },
    },
    {
      path: 'create',
      name: 'article-create',
      component: () => import('@/views/article/create'),
      meta: {
        title: '新建文章',
        roles: ['user'],
      },
    },
    {
      path: 'update/:id',
      name: 'article-update',
      component: () => import('@/views/article/update'),
      meta: {
        title: '文章编辑',
        roles: ['user'],
        activeMenu: '/article/list',
      },
      hidden: true,
    },
  ],
}

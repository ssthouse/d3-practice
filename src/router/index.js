import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import HorizontalTree from '@/components/HorizontalTree'
import Tooltip from '@/components/Tooltip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/root'
    },
    {
      path: '/root',
      name: 'Root',
      component: Root
    },
    {
      path: '/horizontalTree',
      name: 'horizontalTree',
      component: HorizontalTree
    },
    {
      path: '/tooltip',
      name: 'tooltip',
      component: Tooltip
    }
  ]
})

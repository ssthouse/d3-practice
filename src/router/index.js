import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import HorizontalTree from '@/components/HorizontalTree'
import Tooltip from '@/components/Tooltip'
import Scatterplot from '@/components/Scatterplot'
import LineChart from '@/components/LineChart'
import AreaChart from '@/components/AreaChart'

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
    },
    {
      path: '/scatterplot',
      name: 'scatterplot',
      component: Scatterplot
    },
    {
      path: '/lineChart',
      name: 'lineChart',
      component: LineChart
    },
    {
      path: '/areaChart',
      name: 'areaChart',
      component: AreaChart
    }
  ]
})

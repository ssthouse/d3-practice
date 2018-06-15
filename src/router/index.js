import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import HorizontalTree from '@/components/HorizontalTree'
import Tooltip from '@/components/Tooltip'
import Scatterplot from '@/components/Scatterplot'
import LineChart from '@/components/LineChart'
import AreaChart from '@/components/AreaChart'
import StackChart from '@/components/StackChart'
import Tree from '@/components/Tree'
import Pie from '@/components/PieLayout'
import ForceLayout from '@/components/ForceLayout'
import GeoLayout from '@/components/GeoLayout'
import FancyBtn from '@/fancy-btn/FancyBtn'
import MovingWord from '@/components/MovingWord'

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
    },
    {
      path: '/stackChart',
      name: 'StackChart',
      component: StackChart
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Tree
    },
    {
      path: '/pie',
      name: 'Pie',
      component: Pie
    },
    {
      path: '/forceLayout',
      name: 'ForceLayout',
      component: ForceLayout
    },
    {
      path: '/geoLayout',
      name: 'GeoLayout',
      component: GeoLayout
    },
    {
      path: '/fancyBtn',
      name: 'FancyBtn',
      component: FancyBtn
    },
    {
      path: '/movingWord',
      name: 'MovingWord',
      component: MovingWord
    }
  ]
})

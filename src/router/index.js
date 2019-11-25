import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index/Layout.vue'
import Main from '../pages/index/Main.vue'
import detail from 'index/Detail'

import Shop from '../pages/shop/Shop.vue'
import ShopMain from 'components/ShopMain.vue'
import ShopAll from 'components/ShopAll.vue'
import GoodsDetail from 'components/GoodsDetail.vue'
import purchase from 'components/Purchase.vue'



import Video from '../pages/video/Video.vue'
import videoDetail from 'components/videoDetail'
import VideoWrap from 'components/VideoWrap.vue'
import purTicket from 'index/purTicket'

import Inpeople from '../pages/inpeople/Inpeople.vue'
import InpeopleList from '../pages/inpeople/InpeopleMain.vue'
import addpeople from '../pages/inpeople/AddPeople.vue'

import Order from '../pages/order/Order.vue'
import orderlist from '../pages/order/OrderList.vue'

import Address from '../pages/address/Address.vue'
import List from '../pages/address/AddressMain.vue'
import addAddress from '../pages/address/AddAddress.vue'

import City from '../pages/city/City.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/index/home',
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect:'/index/home',
    children:[
      {
        path:'home',
        name:'home',
        component:Main,
      },
      {
        path:'detail/:id',
        name:'detail',
        component:detail,
      },
      {
        path:'purTicket/:id',
        name:'purTicket',
        component:purTicket
      }
    ]
  },
  {
    path:'/shop',
    name:'shop',
    component:Shop,
    redirect:'/shop/mall',
    children:[
      {
        path:'mall',
        name:'mall',
        component:ShopMain,
      },
      {
        path:'goodsdetail/:id',
        name:'goodsdetail',
        component:GoodsDetail
      },
      {
        path:'all',
        name:'all',
        component:ShopAll,
      },
      {
        path:'purchase/:id',
        name:'purchase',
        component:purchase,
      }
    ]
  },
  {
    path:'/city',
    name:'city',
    component:City
  },
  {
    path:'/video',
    name:'video',
    component:Video,
    redirect:'/video/videoList',
    children:[
      {
        path:'videoList',
        name:'videoList',
        component:VideoWrap
      },
      {
        path:'videoDetail/:id',
        name:'videoDetail',
        component:videoDetail
      }
    ]
  },
  {
    path:'/inpeople',
    name:'inpeople',
    component:Inpeople,
    redirect:'/inpeople/peoplelist',
    children:[
      {
        path:'peoplelist',
        name:'peoplelist',
        component:InpeopleList
      },
      {
        path:'addpeople',
        name:'addpeople',
        component:addpeople
      }
    ]
  },
  {
    path:'/order',
    name:'order',
    component:Order,
    redirect:'/order/orderlist',
    children:[
      {
        path:'orderlist',
        name:'orderlist',
        component:orderlist
      }
    ]
  },
  {
    path:'/address',
    name:'address',
    component:Address,
    redirect:'/address/list',
    children:[
      {
          path:'list',
          name:'list',
          component:List
      },
      {
          path:'add',
          name:'addAddress',
          component:addAddress
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

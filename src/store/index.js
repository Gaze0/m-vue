import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { INFO_ACTIVE } from './active-type'
import { INFO_MUTATION } from './mutation-type'

import { get } from 'utils/http'
import route from '../router'
import goods from './goods'
import cityInfo from './cityInfo'
import video from './video'
import address from './address'
import people from './people'
export default new Vuex.Store({
  state: {
    days: 0,
    type: 0,
    order_by:'default',
    sort:'desc',
    showList:[],
    loading:false,
   
    // cityInfo:{}
  },
  mutations: {
    [INFO_MUTATION](state,data){
      state.days = data.payload.day
      state.type = data.payload.type
      state.order_by = data.payload.order
      state.sort = data.payload.sort
      state.showList = data.payload.showList
      state.loading = data.payload.loading
      // console.log(this)
    },

    
  },
  actions: {
    async [INFO_ACTIVE](context,action){
      // console.log(route.currentRoute.params.city)
      // 路由失败
      // let city
      // if(route.currentRoute.params.city==null){
      //   city = '北京'
      // }else{
      //   console.log(22)
      //   city = route.currentRoute.params.city
      // }
      // let city = sessionStorage.getItem('city')
      // if(city==''){
      //   city = '北京'
      // }
      // let city = 
      console.log(context.rootState)
      let city = context.rootState.cityInfo.nm
      console.log(city)
      let {day,order,sort,type}=action.payload
      let result = await get({
        url: "/api/user/performance",
        params: {
          city_name: city,
          page: 1,
          size: 10,
          days:day,
          type,
          order_by:order,
          sort,
        }
      });
      action.payload.loading = true
      action.payload.showList = result
      context.commit({
        type:INFO_MUTATION,
        payload:action.payload
      })
    },
  },
  modules: {
    goods,
    cityInfo,
    video,
    address,
    people
  }
})

import store from 'store'
import moment from 'moment'
const state = {
    // id:'',
    // name:'',
    // goodInfo:[],
    // priceSend:'',
    // sum:''
}

const mutations={
    setGoods(state,payload){
        let goodsList = store.get('goodsList')||[]

        // let isHas = goodsList.indexOf((val)=>{
        //     return val.id == payload.id
        // })
        // console.log(isHas)
        let time = moment().format('YYYY.MM.DD')
        payload.time = time
        
        // if(isHas){
        //     isHas.sum += payload.sum
        // }else{
            
        // }
        state.goodList = payload
        goodsList.push(state.goodList)
        store.set('goodsList',goodsList)
    }
}

const actions = {
    getGoods({commit},payload){
        commit('setGoods',payload)
    }
}


export default {
    namespace:true,
    state,
    mutations,
    actions
}
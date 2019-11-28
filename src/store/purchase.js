import store from 'store'
const state = {
    // id:'',
    // name:'',
    // goodInfo:[],
    // priceSend:'',
    // sum:''
}

const mutations={
    setPurchase(state,payload){
        state.id = payload.id
        state.name = payload.name
        state.goodInfo = payload.goodInfo
        state.priceSend = payload.priceSend
        state.sum = payload.sum
        
    }
}

const actions = {
    getPurchase({commit},payload){
        commit('setPurchase',payload.payload)
    }
}


export default {
    namespace:true,
    state,
    mutations,
    actions
}
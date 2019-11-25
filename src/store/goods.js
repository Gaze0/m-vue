import { get } from 'utils/http'
const state = {
    goodsAll:[],
    per_page: 10,
    start_price: 0,
    end_price: -1,
    sort_kind: 0,
    order: 0,
}

const mutations={
    goodsMut(state,data){
        state.goodsAll = data.payload.goodsAll
        state.per_page = data.payload.per_page
        state.start_price = data.payload.start_price
        state.end_price = data.payload.end_price
        state.sort_kind = data.payload.sort_kind
        state.order = data.payload.order

        // console.log(data)
    }
}

const actions = {
    async goodsActive(context,action){
        let result = await get({
            url:'/api/user/goodMainList',
            params:action.payload
        })
        console.log(action.payload)
        context.commit('goodsMut',{
            payload:{
                goodsAll:result,
                per_page:action.payload.per_page,
                start_price: action.payload.start_price,
                end_price: action.payload.end_price,
                sort_kind:action.payload.sort_kind,
                order: action.payload.order,
            }
        })
        // console.log(action)
    }
}

export default{
    namespace:true,
    actions,
    mutations,
    state,
}
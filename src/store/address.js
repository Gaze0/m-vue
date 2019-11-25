import store from 'store'
let address = store.set()

const state = {
    addressId:1,
    index:0
}

const mutations={
    setAddress(state,payload){
        let { type,index } = payload
        console.log(type,index)
        if(type=='change'){
            var addressList = store.get('address')||[]
            state.addressInfo = payload
            state.addressInfo.addressId = state.addressId
            state.addressId++
            addressList.splice(index,1,state.addressInfo)
        }else{
            let index = payload.index
            var addressList = store.get('address')||[]
            if(index){
                addressList.splice(index-1,1)
                // addressList.filter((val)=>{
                //     return 
                // })
                console.log(addressList)
            }else{
                state.addressInfo = payload
                state.addressInfo.addressId = state.addressId
                state.addressId++
                addressList.push(state.addressInfo)
            }
        }
        state.index = index
        store.set('address',addressList)
    }
}

const actions={
    getAddress(context,payload){
        // console.log(context)
        context.commit('setAddress',payload.payload)
    }
}

export default{
    namespace:true,
    state,
    mutations,
    actions
}
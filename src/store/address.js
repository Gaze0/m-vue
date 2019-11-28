import store from 'store'
let address = store.set()

const state = {
    addressId:1,
    index:0
}

const mutations={
    setAddress(state,payload){
        let { type } = payload 
        let index =store.get('index')||state.index
        
        if(type=='change'){
            var addressList = store.get('address')||[]
            state.addressInfo = payload
            state.addressInfo.addressId = state.addressId
            state.addressId++
            addressList.splice(index,1,state.addressInfo)
        }else{
            console.log(index,123)
            // if(index-1 == store.get('index')){
            //     index = index-2
            //     console.log(index)
            // }
            index = payload.index
            var addressList = store.get('address')||[]
            if(index){
                console.log('assdf')
                addressList.splice(index-1,1)
                // addressList.filter((val)=>{
                //     return 
                // })
                index = index-2
                console.log(addressList)
            }else{
                state.addressInfo = payload
                state.addressInfo.addressId = state.addressId
                state.addressId++
                addressList.push(state.addressInfo)
            }
        }
        console.log(index)
        store.set('index',index)
        state.index = index+2
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
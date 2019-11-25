import store from 'store'
const state = {

}

const mutations={
    setPeople(state,payload){
        let people = store.get('people')||[]
        state.people = payload
        people.push(state.people)
        store.set('people',people)
    }
}

const actions ={
    getPeople({commit},payload){
        commit('setPeople',payload.payload)
    }
}

export default {
    state,
    mutations,
    actions
}
import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {
            email: '',
            uid: ''
        },
    },
    mutations: {
    // sync
        setUser(state, payload){
            state.user = payload
        },
        delUser(state){
            state.user = {}
        },
    },
    actions: {
    // async
    },
    modules: {},
    getters:{
        getUser(state){
            return state.user
        },
        getIsUser(state){
            if(state.user?.email) return true
            else return false
        },
  }
})

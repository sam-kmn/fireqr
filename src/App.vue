<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">

      <router-link class="navbar-brand fw-bold" v-if="currentRoute != 'Dashboard'" to="/">
        <img src="@/assets/favicon.png" alt="logo" style="width: 27px; position: relative; top: -5px">
        FireQR
      </router-link>


      <router-link class="navbar-brand fw-bold" v-if="currentRoute === 'Dashboard'" to="/dashboard">
        <img src="@/assets/favicon.png" alt="logo" style="width: 27px; position: relative; top: -5px">
        FireQR
      </router-link> 

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!-- <router-link class="nav-link" to="/">Home</router-link>  -->
          <router-link class="nav-link" v-if="!isUser" to="/login">Login</router-link> 
          <router-link class="nav-link" v-if="isUser && currentRoute === 'Home'" to="/dashboard">Dashboard</router-link> 
          <router-link class="nav-link" v-if="isUser && currentRoute === 'Dashboard'" to="/">Home</router-link> 
          <router-link class="nav-link" v-if="isUser" to="/logout">Logout</router-link> 
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default {
  setup() {

    const store = useStore()
    const route = useRoute()

    const currentRoute = computed(() => route.name)
    const isUser = computed(() => store.getters.getIsUser)


    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        store.commit('setUser', {
          email: user.email,
          uid: user.uid
        })
      } else store.commit('delUser')
    })


    return{
      isUser, currentRoute
    }
  },
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


a.router-link-exact-active {
  color: #42b983;
}
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-icons/font/bootstrap-icons.css';
</style>

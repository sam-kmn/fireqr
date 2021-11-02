<template>
    <div class="login d-flex justify-content-center align-items-center">
        <form @submit.prevent="signIn" class="container col-9 col-sm-7 col-md-6 col-lg-4 col-xl-3 p-2 bg-light rounded shadow p-3">
            <!-- <div class="m-3 text-center">
                <h1>Login panel</h1>
            </div> -->
            <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email" v-model="email">
                <div class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" placeholder="Password" v-model="password">
                <div class="form-text">Your password should contain atleast 6 characters</div>
            </div>
            <div class="">  
                <button type="submit" class="col-6 btn btn-primary ">Sing In</button>
                <router-link class="col-6 btn btn-light" to="/register">Create new accout</router-link> 
            </div>
        </form>
    </div>
</template>


<script setup>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref, onMounted} from 'vue'
        
const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')

onMounted(()=>{
    if (store.getters.getIsUser) router.push('/dashboard')
})

function signIn(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(() => router.push('/'))
        .catch(err => alert(err.message))
}
</script>


<style lang="scss" scoped>

  .login{
    width: 100vw;
    // height: 100vh;
    height: calc(100vh - 56px);

    background-color: #cececf;
    background: linear-gradient(rgba(102, 20, 255, 0.801),rgba(255, 23, 81, 0.801));
    background-size: 200% 200%;

    animation-name: swipe;
    animation-duration: 6s;
    animation-direction: alternate;
    animation-iteration-count: infinite;

  }

  @keyframes swipe {
      from {background-position: 0% 0%;}
      to {background-position: 100% 100%;}
  }
</style>
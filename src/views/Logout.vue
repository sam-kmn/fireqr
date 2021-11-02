<template>
    <div class=""></div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import {useRouter} from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        firebase.auth().signOut()
            .then(()=> router.push('/'))
            .catch(err => alert(err.message))
    },
}
</script>
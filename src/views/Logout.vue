<template>
    <div class=""></div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

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
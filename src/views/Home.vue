<template>
  <div class="home">

      <!-- Dodać kolejny section v-if="isUser"
        Coś w stylu 
            "You 'are logged in! 
            No need to waste time on home page! "
            btn> Go to Dashboard </btn
       -->
    

    <!-- generator -->
    <section class="px-2 py-5 p-md-5 m-md-5">
            <div class="row justify-content-evenly align-items-center">

                <!-- rest -->
                <div class="col-12 text-center
                col-md-8 col-lg-6 text-md-start">

                    <div class="row justify-content-center justify-content-md-start">
                        <div class="col-12">
                            <h1>Create your own QR Code!</h1>
                        </div>

                        <div class="col-11 col-xs-10 col-sm-9 col-md-12">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Your content" v-model="userInput">
                                <button class="btn btn-outline-primary" type="button" @click="generateQR" id="button-addon2">Generate QR</button>
                            </div>
                        </div>
                    </div>


                </div>

                <!-- img -->
                <div class="col-12 my-5 text-center
                col-md-3 col-lg-2 m-md-0" style="height: 150px;"
                >
                    <img :src="qrSrc" alt="QR Code" id="qr-img">
                </div>

            </div>
    </section>

    <!-- generator -->
    <!-- <section class="py-5 m-5">
        <div class="row justify-content-center align-items-center py-lg-3">
            <div class="col-12 col-md-6 mb-5 m-md-0">

                <div class="row">
                    <div class="col-12 text-center text-md-start">
                        <h1>Create your own QR Code!</h1>
                    </div>
                </div>

                <div class="row justify-content-center justify-content-md-start">
                    <div class="col-11 col-sm-8 col-md-12 col-xl-10">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Your content" v-model="userInput">
                            <button class="btn btn-outline-primary" type="button" @click="generateQR" id="button-addon2">Generate QR</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <img :src="qrSrc" alt="QR Code" id="qr-img">
            </div>
        </div>
    </section> -->

    <!-- sign up -->
    <section v-if="!isUser" class="py-5 p-sm-5 bg-dark text-light">
        <div class="container p-0">
            <div class="d-flex flex-column flex-sm-row text-center text-sm-start align-items-center justify-content-evenly">
                <div>
                    <h1 class="">Sign up for free!</h1>
                    <h5>Gain unlimited access to all features</h5>
                    <p>Store, manage and customize your QR Codes</p>
                    <router-link to="/login" class="btn btn-primary">Login</router-link>
                    <router-link to="/register" class="btn btn-light m-2">Register</router-link>
                </div>
                <img id="signup-img" src="../assets/addtask.svg" class="d-none d-sm-block">
            </div>
        </div>
    </section>

    <!-- learn -->
    <section class="py-5 px-2">
        <div class="container">
            <div class="row justify-content-evenly align-items-center">
                <div class="col-12 col-md-8">
                    <h1>Learn about QR codes</h1>
                    <p class="text-justify">
                        A QR code (abbreviated from Quick Response code) is a type of matrix barcode (or two-dimensional barcode) invented in 1994 by the Japanese automotive company Denso Wave.
                            <br><br>
                        The Quick Response system became popular outside the automotive industry due to its fast readability and greater storage capacity compared to standard UPC barcodes. Applications include product tracking, item identification, time tracking, document management, and general marketing. 
                            <br><br>
                        A QR code consists of black squares arranged in a square grid on a white background, which can be read by an imaging device such as a camera, and processed using Reed–Solomon error correction until the image can be appropriately interpreted. The required data is then extracted from patterns that are present in both horizontal and vertical components of the image.
                            <br><br>
                        QR codes have become common in consumer advertising. Typically, a smartphone is used as a QR code scanner, displaying the code and converting it to some useful form (such as a standard URL for a website, thereby obviating the need for a user to type it into a web browser). QR code has become a focus of advertising strategy, since it provides a way to access a brand's website more quickly than by manually entering a URL.
                    </p>
                    <a class="fw-light text-dark fst-italic text-decoration-none" href="https://en.wikipedia.org/wiki/QR_code">Source: Wikipedia</a>
                </div>
                <div class="col-12 col-md-2 ">
                    <div class="card" style="width: 14rem;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Japan-qr-code-billboard.jpg/900px-Japan-qr-code-billboard.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                          <p class="card-text">A QR code used on a large billboard in Japan, linking to the sagasou.mobi website</p>
                        </div>
                      </div>
                </div>
            </div>
            <!-- <div class="row justify-content-evenly">
                <div class="col-5 bg-danger">1</div>
                <div class="col-2 bg-primary">2</div>
            </div> -->
        </div>
    </section>



  </div>
</template>

<script>
// @ is an alias to /src
import {useStore} from 'vuex'
import {computed, ref} from 'vue'

export default {
  name: 'Home',
  setup(){

        var qrSrc = ref('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example')
        const userInput = ref('')
        
        const store = useStore()
        const isUser = computed(()=>store.getters.getIsUser)


        function prepareUrl(strr){
            let base = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='
            if(strr.search(' ')===-1) return base.concat(strr)
            else return base.concat(strr.split(' ').join('+'))
        }

        function generateQR(){
            if(userInput.value) {
                qrSrc.value = prepareUrl(userInput.value)
            }
        }

        return{
            isUser,
            qrSrc, userInput, generateQR, 
        }
  }
}
</script>

<style lang='scss' scoped>

  #signup-img{
    width: 25%;
  }

  #qr-img{
      width: 150px;
      animation-duration: 4s;
      animation-name: zoom;
  }

//   @keyframes zoom {
//       from {width: 1px;}
//       to {width: 200px;}
//   }

  @keyframes zoom {
      0% {opacity: 0.1; width: 50px;}
      50% {width: 150px;}
      100% {opacity: 1;}
  }

</style>
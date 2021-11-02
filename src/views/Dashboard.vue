<template>
    <div class="container-fluid" v-if="authorized">
        <div class="row justify-content-center align-items-center">

            <!-- tools -->
            <div class="col-12 order-1 py-5 py-sm-5">
                <div class="row justify-content-center align-items-center">
                    <!-- accordion col -->
                    <div v-if="!userQR" class="col-12 order-2 p-0 col-sm-6 col-md-5 col-lg-4">
                        <!-- alert above accordion -->
                        <div class="alert alert-warning" v-if="alertActive" role="alert">
                                Please try again, and make sure <strong>General</strong> tab is filled correctly.
                            </div>
                        <!-- accordion el -->
                        <div class="accordion" id="accordionExample">

                            <!-- 1 general -->
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" >
                                    <i class="bi-pencil"></i>
                                    &ensp;General
                                </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show"  data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    
                                    <!-- name -->
                                    <input type="text" class="form-control  mb-2" placeholder="Name" v-model="name">

                                    <!-- type select -->
                                    <select class="form-select" v-model="type_select">
                                        <option value="1">Text / URL</option>
                                        <option value="2">SMS</option>
                                    </select>

                                    <!-- text/url input -->
                                    <input type="text" class="form-control mt-2" placeholder="Enter your content" v-if="type_select==='1'" v-model="content">

                                    <!-- sms input -->
                                    <div v-if="type_select==='2'">
                                        <input type="text" class="form-control mt-2" placeholder="Phone number" v-model="sms_number">
                                        <input type="text" class="form-control mt-2" placeholder="Your message" v-model="sms_message">
                                    </div>



                                </div>
                                </div>
                            </div>

                            <!-- 2 Foreground -->
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" >
                                    <i class="bi-palette"></i>
                                    &ensp;Foreground
                                </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse"  data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        
                                        <!-- color picker -->
                                        <!-- <label for="exampleColorInput" class="form-label">Color picker</label> -->
                                        <!-- <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">    -->


                                        <!-- red -->
                                        <input @change="colorChange" type="range" class="form-range custom-range-red" v-model="fg_rangeR" id="fgRange1" min="0" max="255">
                                        <!-- green -->
                                        <input @change="colorChange" type="range" class="form-range custom-range-green" v-model="fg_rangeG" id="fgRange2" min="0" max="255">
                                        <!-- blue -->
                                        <input @change="colorChange" type="range" class="form-range" v-model="fg_rangeB" id="fgRange3" min="0" max="255">
                                    </div>
                                </div>
                            </div>

                            <!-- 3 Background -->
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" >
                                    <i class="bi-paint-bucket"></i>
                                    &ensp;Background
                                </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse"  data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <!-- red -->
                                        <input @change="colorChange" type="range" class="form-range custom-range-red" v-model="bg_rangeR" id="fgRange1" min="0" max="255">
                                        <!-- green -->
                                        <input @change="colorChange" type="range" class="form-range custom-range-green" v-model="bg_rangeG" id="fgRange2" min="0" max="255">
                                        <!-- blue -->
                                        <input @change="colorChange" type="range" class="form-range" v-model="bg_rangeB" id="fgRange3" min="0" max="255">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 4 Size -->
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" >
                                    <i class="bi-aspect-ratio"></i>
                                    &ensp;Format
                                </button>
                                </h2>
                                <div id="collapseFour" class="accordion-collapse collapse"  data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <!-- size -->
                                        Size: {{size}}x{{size}}
                                        <input type="range" class="form-range" v-model="size" min="10" max="1000" step="10">
                                        
                                        <!-- format -->
                                        Format:
                                        <select class="form-select" v-model="format">
                                            <option v-for="f, id in formats" :key="id" >{{f}}</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <!-- default view -->
                    <div v-if="!userQR" class="col-12 order-1 text-center col-sm-4 mb-5 mb-sm-0">
                        <!-- image -->
                        <div class="col-12">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="147" height="147" >
                                <!-- Created with https://api.qrserver.com (QR Code API, see goQR.me/api for information) -->
                                <title>QR Code</title>
                                <desc>Example</desc>
                                <rect style="fill: rgb(255 255 255);fill-opacity:1;" x="0" y="0" width="147" height="147" ref="img_bg"/>
                                <g id="elements">
                                        <path ref="img_fg" style="fill: rgb(0 0 0);" d="M 0,0 l 7,0 0,7 -7,0 z M 7,0 l 7,0 0,7 -7,0 z M 14,0 l 7,0 0,7 -7,0 z M 21,0 l 7,0 0,7 -7,0 z M 28,0 l 7,0 0,7 -7,0 z M 35,0 l 7,0 0,7 -7,0 z M 42,0 l 7,0 0,7 -7,0 z M 70,0 l 7,0 0,7 -7,0 z M 77,0 l 7,0 0,7 -7,0 z M 84,0 l 7,0 0,7 -7,0 z M 98,0 l 7,0 0,7 -7,0 z M 105,0 l 7,0 0,7 -7,0 z M 112,0 l 7,0 0,7 -7,0 z M 119,0 l 7,0 0,7 -7,0 z M 126,0 l 7,0 0,7 -7,0 z M 133,0 l 7,0 0,7 -7,0 z M 140,0 l 7,0 0,7 -7,0 z M 0,7 l 7,0 0,7 -7,0 z M 42,7 l 7,0 0,7 -7,0 z M 56,7 l 7,0 0,7 -7,0 z M 63,7 l 7,0 0,7 -7,0 z M 70,7 l 7,0 0,7 -7,0 z M 84,7 l 7,0 0,7 -7,0 z M 98,7 l 7,0 0,7 -7,0 z M 140,7 l 7,0 0,7 -7,0 z M 0,14 l 7,0 0,7 -7,0 z M 14,14 l 7,0 0,7 -7,0 z M 21,14 l 7,0 0,7 -7,0 z M 28,14 l 7,0 0,7 -7,0 z M 42,14 l 7,0 0,7 -7,0 z M 70,14 l 7,0 0,7 -7,0 z M 77,14 l 7,0 0,7 -7,0 z M 84,14 l 7,0 0,7 -7,0 z M 98,14 l 7,0 0,7 -7,0 z M 112,14 l 7,0 0,7 -7,0 z M 119,14 l 7,0 0,7 -7,0 z M 126,14 l 7,0 0,7 -7,0 z M 140,14 l 7,0 0,7 -7,0 z M 0,21 l 7,0 0,7 -7,0 z M 14,21 l 7,0 0,7 -7,0 z M 21,21 l 7,0 0,7 -7,0 z M 28,21 l 7,0 0,7 -7,0 z M 42,21 l 7,0 0,7 -7,0 z M 56,21 l 7,0 0,7 -7,0 z M 63,21 l 7,0 0,7 -7,0 z M 84,21 l 7,0 0,7 -7,0 z M 98,21 l 7,0 0,7 -7,0 z M 112,21 l 7,0 0,7 -7,0 z M 119,21 l 7,0 0,7 -7,0 z M 126,21 l 7,0 0,7 -7,0 z M 140,21 l 7,0 0,7 -7,0 z M 0,28 l 7,0 0,7 -7,0 z M 14,28 l 7,0 0,7 -7,0 z M 21,28 l 7,0 0,7 -7,0 z M 28,28 l 7,0 0,7 -7,0 z M 42,28 l 7,0 0,7 -7,0 z M 63,28 l 7,0 0,7 -7,0 z M 84,28 l 7,0 0,7 -7,0 z M 98,28 l 7,0 0,7 -7,0 z M 112,28 l 7,0 0,7 -7,0 z M 119,28 l 7,0 0,7 -7,0 z M 126,28 l 7,0 0,7 -7,0 z M 140,28 l 7,0 0,7 -7,0 z M 0,35 l 7,0 0,7 -7,0 z M 42,35 l 7,0 0,7 -7,0 z M 56,35 l 7,0 0,7 -7,0 z M 77,35 l 7,0 0,7 -7,0 z M 98,35 l 7,0 0,7 -7,0 z M 140,35 l 7,0 0,7 -7,0 z M 0,42 l 7,0 0,7 -7,0 z M 7,42 l 7,0 0,7 -7,0 z M 14,42 l 7,0 0,7 -7,0 z M 21,42 l 7,0 0,7 -7,0 z M 28,42 l 7,0 0,7 -7,0 z M 35,42 l 7,0 0,7 -7,0 z M 42,42 l 7,0 0,7 -7,0 z M 56,42 l 7,0 0,7 -7,0 z M 70,42 l 7,0 0,7 -7,0 z M 84,42 l 7,0 0,7 -7,0 z M 98,42 l 7,0 0,7 -7,0 z M 105,42 l 7,0 0,7 -7,0 z M 112,42 l 7,0 0,7 -7,0 z M 119,42 l 7,0 0,7 -7,0 z M 126,42 l 7,0 0,7 -7,0 z M 133,42 l 7,0 0,7 -7,0 z M 140,42 l 7,0 0,7 -7,0 z M 63,49 l 7,0 0,7 -7,0 z M 0,56 l 7,0 0,7 -7,0 z M 7,56 l 7,0 0,7 -7,0 z M 14,56 l 7,0 0,7 -7,0 z M 21,56 l 7,0 0,7 -7,0 z M 28,56 l 7,0 0,7 -7,0 z M 42,56 l 7,0 0,7 -7,0 z M 49,56 l 7,0 0,7 -7,0 z M 56,56 l 7,0 0,7 -7,0 z M 77,56 l 7,0 0,7 -7,0 z M 91,56 l 7,0 0,7 -7,0 z M 105,56 l 7,0 0,7 -7,0 z M 119,56 l 7,0 0,7 -7,0 z M 133,56 l 7,0 0,7 -7,0 z M 0,63 l 7,0 0,7 -7,0 z M 7,63 l 7,0 0,7 -7,0 z M 14,63 l 7,0 0,7 -7,0 z M 21,63 l 7,0 0,7 -7,0 z M 49,63 l 7,0 0,7 -7,0 z M 56,63 l 7,0 0,7 -7,0 z M 77,63 l 7,0 0,7 -7,0 z M 84,63 l 7,0 0,7 -7,0 z M 91,63 l 7,0 0,7 -7,0 z M 98,63 l 7,0 0,7 -7,0 z M 105,63 l 7,0 0,7 -7,0 z M 133,63 l 7,0 0,7 -7,0 z M 140,63 l 7,0 0,7 -7,0 z M 0,70 l 7,0 0,7 -7,0 z M 7,70 l 7,0 0,7 -7,0 z M 21,70 l 7,0 0,7 -7,0 z M 28,70 l 7,0 0,7 -7,0 z M 35,70 l 7,0 0,7 -7,0 z M 42,70 l 7,0 0,7 -7,0 z M 63,70 l 7,0 0,7 -7,0 z M 70,70 l 7,0 0,7 -7,0 z M 84,70 l 7,0 0,7 -7,0 z M 98,70 l 7,0 0,7 -7,0 z M 105,70 l 7,0 0,7 -7,0 z M 126,70 l 7,0 0,7 -7,0 z M 133,70 l 7,0 0,7 -7,0 z M 0,77 l 7,0 0,7 -7,0 z M 14,77 l 7,0 0,7 -7,0 z M 21,77 l 7,0 0,7 -7,0 z M 35,77 l 7,0 0,7 -7,0 z M 70,77 l 7,0 0,7 -7,0 z M 77,77 l 7,0 0,7 -7,0 z M 84,77 l 7,0 0,7 -7,0 z M 91,77 l 7,0 0,7 -7,0 z M 98,77 l 7,0 0,7 -7,0 z M 119,77 l 7,0 0,7 -7,0 z M 126,77 l 7,0 0,7 -7,0 z M 133,77 l 7,0 0,7 -7,0 z M 7,84 l 7,0 0,7 -7,0 z M 21,84 l 7,0 0,7 -7,0 z M 42,84 l 7,0 0,7 -7,0 z M 49,84 l 7,0 0,7 -7,0 z M 56,84 l 7,0 0,7 -7,0 z M 84,84 l 7,0 0,7 -7,0 z M 133,84 l 7,0 0,7 -7,0 z M 56,91 l 7,0 0,7 -7,0 z M 84,91 l 7,0 0,7 -7,0 z M 105,91 l 7,0 0,7 -7,0 z M 112,91 l 7,0 0,7 -7,0 z M 126,91 l 7,0 0,7 -7,0 z M 0,98 l 7,0 0,7 -7,0 z M 7,98 l 7,0 0,7 -7,0 z M 14,98 l 7,0 0,7 -7,0 z M 21,98 l 7,0 0,7 -7,0 z M 28,98 l 7,0 0,7 -7,0 z M 35,98 l 7,0 0,7 -7,0 z M 42,98 l 7,0 0,7 -7,0 z M 56,98 l 7,0 0,7 -7,0 z M 63,98 l 7,0 0,7 -7,0 z M 77,98 l 7,0 0,7 -7,0 z M 91,98 l 7,0 0,7 -7,0 z M 119,98 l 7,0 0,7 -7,0 z M 126,98 l 7,0 0,7 -7,0 z M 133,98 l 7,0 0,7 -7,0 z M 0,105 l 7,0 0,7 -7,0 z M 42,105 l 7,0 0,7 -7,0 z M 70,105 l 7,0 0,7 -7,0 z M 105,105 l 7,0 0,7 -7,0 z M 119,105 l 7,0 0,7 -7,0 z M 126,105 l 7,0 0,7 -7,0 z M 133,105 l 7,0 0,7 -7,0 z M 140,105 l 7,0 0,7 -7,0 z M 0,112 l 7,0 0,7 -7,0 z M 14,112 l 7,0 0,7 -7,0 z M 21,112 l 7,0 0,7 -7,0 z M 28,112 l 7,0 0,7 -7,0 z M 42,112 l 7,0 0,7 -7,0 z M 56,112 l 7,0 0,7 -7,0 z M 63,112 l 7,0 0,7 -7,0 z M 70,112 l 7,0 0,7 -7,0 z M 77,112 l 7,0 0,7 -7,0 z M 91,112 l 7,0 0,7 -7,0 z M 112,112 l 7,0 0,7 -7,0 z M 133,112 l 7,0 0,7 -7,0 z M 0,119 l 7,0 0,7 -7,0 z M 14,119 l 7,0 0,7 -7,0 z M 21,119 l 7,0 0,7 -7,0 z M 28,119 l 7,0 0,7 -7,0 z M 42,119 l 7,0 0,7 -7,0 z M 56,119 l 7,0 0,7 -7,0 z M 63,119 l 7,0 0,7 -7,0 z M 77,119 l 7,0 0,7 -7,0 z M 84,119 l 7,0 0,7 -7,0 z M 91,119 l 7,0 0,7 -7,0 z M 98,119 l 7,0 0,7 -7,0 z M 105,119 l 7,0 0,7 -7,0 z M 112,119 l 7,0 0,7 -7,0 z M 119,119 l 7,0 0,7 -7,0 z M 0,126 l 7,0 0,7 -7,0 z M 14,126 l 7,0 0,7 -7,0 z M 21,126 l 7,0 0,7 -7,0 z M 28,126 l 7,0 0,7 -7,0 z M 42,126 l 7,0 0,7 -7,0 z M 56,126 l 7,0 0,7 -7,0 z M 63,126 l 7,0 0,7 -7,0 z M 70,126 l 7,0 0,7 -7,0 z M 84,126 l 7,0 0,7 -7,0 z M 98,126 l 7,0 0,7 -7,0 z M 119,126 l 7,0 0,7 -7,0 z M 126,126 l 7,0 0,7 -7,0 z M 0,133 l 7,0 0,7 -7,0 z M 42,133 l 7,0 0,7 -7,0 z M 56,133 l 7,0 0,7 -7,0 z M 63,133 l 7,0 0,7 -7,0 z M 77,133 l 7,0 0,7 -7,0 z M 84,133 l 7,0 0,7 -7,0 z M 91,133 l 7,0 0,7 -7,0 z M 98,133 l 7,0 0,7 -7,0 z M 105,133 l 7,0 0,7 -7,0 z M 119,133 l 7,0 0,7 -7,0 z M 126,133 l 7,0 0,7 -7,0 z M 0,140 l 7,0 0,7 -7,0 z M 7,140 l 7,0 0,7 -7,0 z M 14,140 l 7,0 0,7 -7,0 z M 21,140 l 7,0 0,7 -7,0 z M 28,140 l 7,0 0,7 -7,0 z M 35,140 l 7,0 0,7 -7,0 z M 42,140 l 7,0 0,7 -7,0 z M 56,140 l 7,0 0,7 -7,0 z M 70,140 l 7,0 0,7 -7,0 z M 84,140 l 7,0 0,7 -7,0 z M 105,140 l 7,0 0,7 -7,0 z M 119,140 l 7,0 0,7 -7,0 z M 133,140 l 7,0 0,7 -7,0 z "/>
                                </g>
                            </svg>
                        </div>

                        <!-- create button -->
                        <div class="col-12">
                            <button class="btn btn-sm btn-outline-primary rounded-pill mt-3" @click="createQR">Create</button>
                        </div>
                    </div>

                    <!-- after QR created view  -->
                    <div v-if="userQR" class="col-12 order-1 text-center mb-sm-0">
                        <!-- image -->
                        <div class="col-12">
                            <img :src="userQR" style="width: 147px;" alt="Your QR">
                        </div>

                        <!-- buttons -->
                        <div class="col-12 mt-3">
                            <a :href="userQR" target="_blank" rel="noopener noreferrer" class="btn btn-outline-secondary btn-sm m-2">
                                <i class="bi-arrow-left-square"></i>
                                Open
                            </a>
                            
                            <button @click="saveQR" class="btn btn-primary btn-sm m-2">
                                <i class="bi-cloud-plus"></i>
                                Store in library
                            </button>

                            <button @click="reloadPage" class="btn btn-outline-danger btn-sm m-2">
                                <i class="bi-trash"></i>
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            </div>


            <!-- all items -->
            <div class="col-12 col-md-9 col-lg-8  order-2 border rounded shadow" id="allItems" >
                <!-- item -->
                <div class="col my-4"
                v-for="item, idx in items" :key="idx">
                    <div class="row align-items-center justify-content-center ms-1">
                        <!-- img -->
                        <div class="col-1 d-flex justify-content-center">
                            <img class="img" :src="item.img" style="width: 2rem;">
                        </div>


                        <!-- item body -->
                        <div class="col-8 col-sm-9" v-if="editing.item!=idx"> {{item.name}} </div>
                        <!-- item body rename -->
                        <div class="col input-group" v-if="editing.state && editing.item===idx" >
                            <input type="text" class="form-control" :placeholder="item.name" v-model="rename_form">
                            <button class="btn btn-sm btn-outline-primary" type="button" @click="renameQR(idx,rename_form)" >Apply</button>
                        </div>

                        <!-- edit btn -->
                        <div class="col-3 col-sm-2" v-if="editing.item!=idx" >
                            <div class="dropdown">
                                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" :class="{disabled: editing.state || userQR}" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                    Edit
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a :href="item.img" target="_blank" rel="noopener noreferrer" class="dropdown-item" >Open</a></li>
                                    <li><a class="dropdown-item" @click="editing.state=true; editing.item=idx">Rename</a></li>
                                    <li><a class="dropdown-item" @click="removeQR(idx)">Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script>

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import { computed, ref, watchEffect} from 'vue'

import {useStore} from 'vuex'
import { useRouter } from 'vue-router'


export default {
    setup() {

        // Get user info
        const user = computed(()=>store.getters.getUser)

        // Vuex & Vue-Router
        const store = useStore()
        const router = useRouter()

        // Items fetched from Database
        const items = ref([])
        
        // Item rename form ref
        const rename_form = ref('')

        // Local States 
        const authorized = ref(false)
        const alertActive = ref('')
        const userQR = ref('')
        const editing = ref({
            state:false,
            item: null
        })
        
        // Image values
        const img_fg = ref('')
        const img_bg = ref('')

        // Tools General values
        const name = ref('')
        const type_select = ref('1')
        const content = ref('')
        const sms_number = ref('')
        const sms_message = ref('')

        const formats = ['png', 'gif', 'jpeg', 'jpg', 'svg', 'eps']
        const format = ref('png')
        const size = ref('200')

        // Tools Color values
        const fg_rangeR = ref('0')
        const fg_rangeG = ref('0')
        const fg_rangeB = ref('0')

        const bg_rangeR = ref('255')
        const bg_rangeG = ref('255')
        const bg_rangeB = ref('255')


        // Check if user is logged in
        firebase.auth().onAuthStateChanged(user =>{
            if(user) authorized.value = true
            else router.push('/') 
        })

        // When user info is loaded, fetch data from Firebase Database then save them in 'items'
        watchEffect(()=> {
            if(user.value.uid){
                firebase.database().ref(`users/${user.value.uid}/items`).on('value', (snap)=>{
                    if (snap.val()) items.value = Object.values(snap.val())
                    else items.value = {}
                })
            }
        })


        // Functions
        function colorChange(){
            img_fg.value.style.fill = `rgba(${fg_rangeR.value}, ${fg_rangeG.value}, ${fg_rangeB.value}, 1)`
            img_bg.value.style.fill = `rgba(${bg_rangeR.value}, ${bg_rangeG.value}, ${bg_rangeB.value}, 1)`
        }

        function reloadPage(){
            window.location.reload()
        }

        function saveQR(){
            var item = {
                name: name.value,
                content: content.value,
                img: userQR.value
            }
            const itemsRef = firebase.database().ref(`users/${user.value.uid}/items`)

            var newPostKey = itemsRef.push().key

            // Push new item to database
            itemsRef.child(newPostKey).set(item)
                .then(reloadPage)
                .catch(err => alert(err))
        }

        function createQR(){

            function myAlert(){
                alertActive.value = true
                setTimeout(()=>alertActive.value = false, 7000)
            }

            function convertText(text){
                if(text.search(' ') !== -1) 
                    return text.split(' ').join('+')
                else 
                    return text
            }

            let fg = [fg_rangeR.value, fg_rangeG.value, fg_rangeB.value].join('-')
            let bg = [bg_rangeR.value, bg_rangeG.value, bg_rangeB.value].join('-')

            if (type_select.value==='1'){
                try {
                    if (name.value===''||content.value==='') {throw 'General tab erorr, name or content invalid'}
                    let data = convertText(content.value)
                    var url = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size.value}x${size.value}&color=${fg}&bgcolor=${bg}&format=${format.value}`
                    userQR.value = url
                } catch (error) { myAlert() }
            } else if (type_select.value==='2'){
                try {
                    if (name.value===''||sms_number.value==='') {throw 'General tab erorr, name or phone number invalid'}
                    let data = `SMSTO:${sms_number.value}:${convertText(sms_message.value)}`
                    let url = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size.value}x${size.value}&color=${fg}&bgcolor=${bg}&format=${format.value}`
                    userQR.value = url
                } catch (error) { myAlert() }
            }
        }

        function removeQR(itemIdx){

            let itemsRef = firebase.database().ref(`users/${store.getters.getUser.uid}/items/`)

            // Get item key
            var itemKey
            itemsRef.once('value', snap =>{
                itemKey = Object.keys(snap.val())[itemIdx]
            })

            // Remove item
            itemsRef.child(itemKey).remove()
        }

        function renameQR(itemIdx, payload){
            if(payload){
                let itemsRef = firebase.database().ref(`users/${store.getters.getUser.uid}/items/`)
    
                // Get item key
                var itemKey
                itemsRef.once('value', snap =>{
                    itemKey = Object.keys(snap.val())[itemIdx]
                })
    
                itemsRef.child(itemKey).child('name').set(payload)
            }

            editing.value.state = false
            editing.value.item = null
            rename_form.value = ''
        }

            
        return{
            
            items, rename_form,

            // STATES
            alertActive, authorized, editing, userQR, 

            // GENERAL
            name, type_select, 
            content,
            sms_number, sms_message,

            // CUSTOM
            img_fg, img_bg, 
            fg_rangeR, fg_rangeG, fg_rangeB, 
            bg_rangeR, bg_rangeG, bg_rangeB, 

            // FORMAT
            formats, format, size,

            // FUNCTIONS
            colorChange, reloadPage,
            createQR, saveQR,  
            removeQR, renameQR
            
        }
    },
}
</script>

<style lang="scss">

.alert{
    animation-name: showup;
    animation-duration: 7s;
    animation-direction: alternate;
}

@keyframes showup {
    0% {opacity: 0;}
    25% {opacity: 1;}
    75% {opacity: 1;}
    100% {opacity: 0;}
}

// RED
.custom-range-red::-webkit-slider-thumb {
  background: red;
}

.custom-range-red::-moz-range-thumb {
  background: red;
}

.custom-range-red::-ms-thumb {
  background: red;
}

// GREEN
.custom-range-green::-webkit-slider-thumb {
  background: green;
}

.custom-range-green::-moz-range-thumb {
  background: green;
}

.custom-range-green::-ms-thumb {
  background: green;
}

</style>
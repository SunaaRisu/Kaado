<script setup>
    import { ref } from 'vue';

    const elements = ref(Math.floor(Math.random() * (5 - 2 + 1) + 2));
</script>

<template>
    <div class="loading" v-for="element in elements"></div>
</template>

<style scoped>
    .loading{    
        margin: 2.5%;    
        border-radius: 10px;
        background-color: var(--rb-c-french_gray);

        animation-duration: 4s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;        
        background: linear-gradient(to right, var(--rk-c-verdigris) 8%, #c3c8ff81 18%, var(--rk-c-verdigris) 33%);
        background-size: 800px 104px;
        position: relative;


        height: 100px;
        width: 95%;
    }

    @keyframes placeHolderShimmer {
        0% {
            background-position: -800px 0
        }
        100% {
            background-position: 800px 0
        }
    }
</style>
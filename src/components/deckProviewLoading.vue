<script setup>
    import { ref } from 'vue';

    const elements = ref(Math.floor(Math.random() * (15 - 5 + 1) + 5));
</script>

<template>
    <div class="loading" v-for="element in elements"></div>
</template>

<style scoped>
    .loading{    
        margin: 20px;    
        padding: 20px;
        border-radius: 20px;
        background-color: var(--rb-c-french_gray);

        animation-duration: 4s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;        
        background: linear-gradient(to right, var(--color-background-accent) 8%, #727272 18%, var(--color-background-accent) 33%);
        background-size: 800px 104px;
        position: relative;


        height: 70px;
        width: 200px;
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
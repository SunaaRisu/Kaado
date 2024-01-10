<script setup>
    import { RouterView } from 'vue-router';
    
</script>

<template>
    <main>
        <Suspense>
            <RouterView/>
        </Suspense>   
    </main>     
</template>


<style scoped>
    main {
        height: 100vh;
    }
</style>
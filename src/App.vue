<script setup>
    import { RouterView } from 'vue-router';
    import { onClickOutside } from '@vueuse/core';
    import { ref } from 'vue';
    import patchnotes from './components/patchnotes.vue';

    const patchnotesRef = ref(null);
    const renderPatchnotes = ref(true);
    
    onClickOutside(patchnotesRef, () => {renderPatchnotes.value = false});
</script>

<template>
    <Suspense>        
        <RouterView/>
    </Suspense>    
    <Suspense>
        <patchnotes v-if="renderPatchnotes" ref="patchnotesRef" @response="renderPatchnotes = false"/>
    </Suspense>    
</template>


<style scoped>
    
</style>
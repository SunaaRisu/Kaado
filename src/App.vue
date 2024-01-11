<script setup>
    import { RouterView } from 'vue-router';
    import { onClickOutside } from '@vueuse/core';
    import { ref } from 'vue';
    import patchnotes from './components/patchnotes.vue';
    import { useUserStore } from '../store/user';
    import { version } from '../package.json';

    const user = useUserStore();

    const patchnotesRef = ref(null);
    const renderPatchnotes = ref(false);
    
    onClickOutside(patchnotesRef, () => {patchnotesRead()});

    if (user.$state.user.version !== version) {
        renderPatchnotes.value = true;
    }

    function patchnotesRead() {
        renderPatchnotes.value = false;

        const request = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ 
                updates: [
                    { field: 'flags.version', value: version }
                ]
             })
        };

        fetch('http://localhost:3000/user/update_user', request)
            .then(response => {
                switch (response.status) {
                    case 200:
                        console.log('Patch notes read.');
                        break;

                    case 500:
                        console.log('Error while updating the version.')
                
                    default:
                        break;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
</script>

<template>
    <Suspense>        
        <RouterView/>
    </Suspense>    
    <Suspense>
        <patchnotes v-if="renderPatchnotes" ref="patchnotesRef" @response="patchnotesRead()"/>
    </Suspense>    
</template>


<style scoped>
    main {
        height: 100vh;
    }
</style>
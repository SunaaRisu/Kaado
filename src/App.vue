<script setup>
    import { RouterView } from 'vue-router';
    import { onClickOutside } from '@vueuse/core';
    import { ref } from 'vue';
    import patchnotes from './components/patchnotes.vue';
    import { useUserStore } from './store/user';
    import { version } from '../package.json';
    import { useRouter } from 'vue-router';
    import jwt_decode from 'jwt-decode';

    const user = useUserStore();
    const router = useRouter();

    const patchnotesRef = ref(null);
    const renderPatchnotes = ref(false);
    
    onClickOutside(patchnotesRef, () => {patchnotesRead()});

    const request = {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    };

    fetch('http://localhost:3000/user/refresh_token', request)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                    break;
            
                default:
                    router.push({ path: '/login' })
                    break;
            }
        })
        .then(data => {
            user.setJWT(data.token);
            const jwtData = jwt_decode(data.token);
            user.setUser(jwtData._id, jwtData.username, jwtData.email, jwtData.version);

            if (user.$state.user.version !== version) {
                renderPatchnotes.value = true;
            }
        })
        .catch(err => {
            console.log(err);
        });    

    async function patchnotesRead() {
        renderPatchnotes.value = false;

        const request = {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + await user.get_jwt() },
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
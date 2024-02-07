<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../store/user';
    import { useRouter } from 'vue-router';
    import { onClickOutside } from '@vueuse/core'
    import deckPreview from '../components/deckPreview.vue';
    import stackCreationSettings from '../components/stackCreationSettings.vue';
    import userMenu from '../components/userMenu.vue';

    const router = useRouter();
    const user = useUserStore();

    const decks = ref([]);

    const infoTxt = ref('');
    const btnTxt = ref('Login');
    const renderUserMenu = ref(false);
    const renderStackSettings = ref(false);
    const stackSettingsRef = ref(null);
    const deckInfoSettings = ref();

    onClickOutside(stackSettingsRef, () => {renderStackSettings.value = false});
    
    const request = {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + await user.get_jwt() }
    }

    fetch('http://localhost:3000/deck/get_deck_list', request)
        .then(response => {
            switch (response.status) {
                case 200:
                    infoTxt.value = '';
                    return response.json(); 
                    break;
                
                case 500:
                    infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
                    break;
            
                default:
                    infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
                    break;
            };
        })
        .then(data => {
            decks.value = data;
        })
        .catch(err => {
            console.log(err)
            infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
        });

    if (user.$state.user.username !== '') {
        btnTxt.value = user.$state.user.username;
    }

    function accountBtnOnClick() {
        if (user.$state.jwt === '') {
            router.push({ path: '/login' });
        } else {
            renderUserMenu.value = !renderUserMenu.value;
        }
    }

    function renderStackSettingsFun(deck) {
        deckInfoSettings.value = deck;
        renderStackSettings.value = true;
    }

</script>

<template>
    <main>
        <div id="accountBtn" @click="accountBtnOnClick()"><span>{{ btnTxt }}</span></div>
        <userMenu v-if="renderUserMenu"/>
        <div id="deckPreviewContainer">
            <deckPreview @contextmenu.prevent="renderStackSettingsFun(deck)" v-for="deck in decks.decks" :deckInfo="deck"/>
            <div id="addDeckBtn" @click="router.push({ path: '/create' })">Add a Deck</div>
        </div>  
        <stackCreationSettings v-if="renderStackSettings" ref="stackSettingsRef" :deckInfo="deckInfoSettings" />
        <h1>{{ infoTxt }}</h1>
        <a href="https://sunaarisu.de/privacy">Privacy</a>      
    </main>    
</template>

<style scoped>
    #accountBtn {
        position: fixed;
        right: 0px;
        top: 0px;
        border-radius: 0 0 0 10px;
        background-color: var(--color-background-accent);
        height: 50px;
        width: fit-content;
        min-width: 100px;
        padding-left: 10px;
        padding-right: 10px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #accountBtn span {
        color: var(--color-text-light);
        font-size: larger;
        font-weight: 700;
    }

    #deckPreviewContainer {        
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;

        width: 70vw;
        height: 95vh;
        padding: 30px;
        margin-top: 50px;
    }

    h1 {
        position: absolute;
        top: 50vh;
        color: var(--color-text-light);
    }
    
    a {
        position: fixed;
        left: 10px;
        bottom: 10px;
        text-decoration: none;
        color: var(--color-text-light);
    }

    #addDeckBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 20px;
        background-color: var(--rk-c-robin_egg_blue);

        height: 88px;
        width: 240px;
        
        font-size: larger;
        font-weight: bolder;
    }
</style>
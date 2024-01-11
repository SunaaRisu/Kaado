<script setup>
    import { ref } from 'vue';
    import DeckPreview from '../components/deckPreview.vue';
    import { useUserStore } from '../store/user';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const user = useUserStore();

    const decks = ref([]);

    const infoTxt = ref('');
    const btnTxt = ref('Login');
    
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

</script>

<template>
    <main>
        <div id="accountBtn" @click="router.push({ path: '/login' })"><span>{{ btnTxt }}</span></div>
        <div id="deckPreviewContainer">
            <DeckPreview v-for="deck in decks.decks" :deckInfo="deck"/>
        </div>  
        <h1>{{ infoTxt }}</h1>      
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
</style>
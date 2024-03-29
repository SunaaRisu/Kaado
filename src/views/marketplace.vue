<script setup>
    import { ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useUserStore } from '../store/user';    

    import marketplaceDeckPreview from '../components/marketplaceDeckPreview.vue';
    import marketplaceDeckProviewLoading from '../components/marketplaceDeckProviewLoading.vue';
    import deckInfoView from '../components/deckInfo.vue';

    const router = useRouter();
    const route = useRoute();
    const user = useUserStore();

    const addedDecks = ref([]);
    const decks = ref();
    const fetchFinished = ref(false);
    const infoTxt = ref();

    const searchParameter = ref((route.query.s === undefined) ? undefined : route.query.s);

    const renderInfo = ref(false);
      
    const request_addedDecks = {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + await user.get_jwt() }
    }

    await fetch(import.meta.env.VITE_API + 'user/get_deck_list', request_addedDecks)
        .then(response => {
            switch (response.status) {
                case 200:
                    infoTxt.value = '';
                    return response.json(); 
                
                case 500:
                    infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
                    break;
            
                default:
                    infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
                    break;
            };
        })
        .then(data => {
            data.deck_list.forEach(element => {
                addedDecks.value.push(element.id);
            });
        })
        .catch(err => {
            console.log(err)
            infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
        });
    
    async function search(){
        router.push({path: '/marketplace', query: {s: (searchParameter.value === '') ? undefined : searchParameter.value, d: (route.query.d === undefined ? undefined : route.query.d)} });

        const request_decks = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + await user.get_jwt() },
            body: JSON.stringify({ searchQuery: searchParameter.value })
        }

        fetch(import.meta.env.VITE_API + 'deck/get_deck_list', request_decks)
            .then(response => {
                switch (response.status) {
                    case 200:
                        infoTxt.value = '';
                        return response.json();
                    
                    case 500:
                        infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
                        break;
                
                    default:
                        infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
                        break;
                };
            })
            .then(data => {
                decks.value = data.decks;
                fetchFinished.value = true;
            })
            .catch(err => {
                console.log(err)
                infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
            });
    }

    if (route.query.d !== undefined) {
        renderInfo.value = true;
    }

    function closeDeckInfo(){
        renderInfo.value = false;
        router.push({ path: '/marketplace', query: {s: (route.query.s === undefined ? undefined : route.query.s)}});
    }

    search();
</script>

<template>
    <main>
        <div id="tabContainer">
            <div class="tab" id="createTab" @click="router.push({ path: '/create' })"><span>Create new deck</span></div>
            <div class="tab" id="addTab"><span>Add deck from the marketplace</span></div>
        </div>
        <div id="pageContainer">      
            <form @submit.prevent="$event => search()">
                <input v-model="searchParameter" type="text" name="search" id="search" placeholder="Search a deck">
                <button id="searchBtn">SSS</button>
            </form>      
            <marketplaceDeckPreview v-if="fetchFinished" v-for="deck in decks" :deckInfo="deck" :addedDecks="addedDecks"></marketplaceDeckPreview>
            <marketplaceDeckProviewLoading v-if="!fetchFinished"></marketplaceDeckProviewLoading>
        </div>
        <a id="privacy" href="https://sunaarisu.de/privacy">Privacy</a>
    </main>
    <deckInfoView v-if="renderInfo" @response="closeDeckInfo()" :id="route.query.d" :addedDecks="addedDecks"/>
    
</template>

<style scoped>

    main {
        width: 95vw;
        height: 95vh;
    }

    #tabContainer {
        margin-top: 3vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .tab {
        width: 50%;
        height: 50px;        
        border-radius: 10px 10px 0 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    #createTab {
        background-color: var(--rk-c-verdigris);
    }

    #addTab {
        background-color: var(--rk-c-robin_egg_blue);
    }

    .tab span {
        font-size: larger;
        font-weight: bolder;
    }

    #search{
        border: none;
        text-align: center;
        border-radius: 10px 0 0 10px;
        height: 40px;
        margin: 2.5%;
        margin-right: 0;
        padding: 0;
        width: 85%;
        outline: none;
    }

    #searchBtn{
        background-color: white;
        border: none;
        height: 40px;
        border-radius: 0 10px 10px 0;
        width: 10%;
        border-left: 1px solid black;
    }

    #pageContainer {
        height: 90vh;
        width: 95vw;
        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 0 0 10px 10px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    #txtContainer {
        height: 90vh;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #privacy {
        position: fixed;
        left: 10px;
        bottom: 10px;
        text-decoration: none;
        color: var(--color-text-light);
    }
</style>
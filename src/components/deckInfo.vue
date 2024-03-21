<script setup>
    import { ref } from 'vue';

    const emit = defineEmits(['response']);
    
    const props = defineProps({
        deckInfo: Object
    })

    const deck = ref();
    const fetchDeckFinished = ref(false);
    const authorUsername = ref("Author");
    const authorProfilePicture = ref("https://srcsrv.sunaarisu.de/kaado/noPP.png");
    const fetchUserFinished = ref(false);

    console.log(props.deckInfo);

    const cards_request = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ _id: props.deckInfo._id })
    }

    fetch(import.meta.env.VITE_API + 'deck/get_one', cards_request)
        .then(response => {
                switch(response.status) {
                    case 200:
                        return response.json();
                        break;

                    case 404:
                        alert('deck not found');
                        break;
                    
                    case 500:
                        alert('something went wrong');
                        break;
                
                    default:
                        alert('something went wrong');
                        break;
                };
            })
        .then(data => {
                if(data) {
                    deck.value = data;
                    fetchDeckFinished.value = true;
                }                    
            })
        .catch(err => {
            console.log(err);
            alert('something went wrong');
        })

    const user_request = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ userId: props.deckInfo.deckInfo.author})
    }

    fetch(import.meta.env.VITE_API + 'user/get_user', user_request)
        .then(response => {
                switch(response.status) {
                    case 200:
                        return response.json();
                        break;

                    case 404:
                        alert('deck not found');
                        break;
                    
                    case 500:
                        alert('something went wrong');
                        break;
                
                    default:
                        alert('something went wrong');
                        break;
                };
            })
        .then(data => {
                if(data) {
                    authorUsername.value = data.username;
                    authorProfilePicture.value = data.profilePicture;
                    fetchUserFinished.value = true;
                }              
            })
        .catch(err => {
            console.log(err);
            alert('something went wrong');
        })
</script>

<template>
    <div id="deckInfoContainer">
        <button @click="emit('response', 'close')">back</button>
        <div id="fastInfoContainer">
            <div id="deckInfo">
                <span class="title">{{ deckInfo.deckInfo.title }}</span>
                <span class="card_count">Cards: {{ deckInfo.deckInfo.card_count }}</span>
            </div>
            <div class="author">
                <span class="author_name">{{ authorUsername }}</span>
                <img class="author_pp" :src="authorProfilePicture" alt="author profile picture">
            </div>
        </div>
        <div id="btnContainer">
            <button v-if="!added" @click="router.push({ path: '/deck/' + deckInfo._id})">Learn</button>
            <button v-if="added" @click="router.push({ path: '/home'})">Go to</button>
            <button v-if="!added" @click="addOrRmv(true)">Add</button>
            <button v-if="added" @click="addOrRmv(false)">Rmv</button>
        </div>
        <div id="deckContentTableContainer" v-if="fetchDeckFinished">
            <div class="row" v-for="row in deck.deck.cards">
                <div class="cell" v-for="cell in row.cardContent">
                    <span v-if="!cell.equation">{{ cell.content }}</span>
                    <math-field class="math" read-only v-if="cell.equation">{{ cell.content }}</math-field>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #deckInfoContainer{
        background-color: var(--rk-c-robin_egg_blue);
        height: 90vh;
        width: 95vw;
        border-radius: 0 0 10px 10px;

        position: fixed;
        top: calc(3vh + 50px);
        left: 2.5vw;

        display: flex;
        align-items: center;
        flex-direction: column;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    #fastInfoContainer {
        width: 95%;
        margin-top: 20px;

        display: flex;
        justify-content: space-between;
    }

    #deckInfo {
        width: 70%;

        display: flex;
        flex-direction: column;
    }

    .title {
        font-size: 30px;
        font-weight: bolder;
    }

    .card_count {
        font-size: 20px;
        font-weight: bold;
    }



    .author_pp {
        height: 50px;
        aspect-ratio: 1;
        border-radius: 50%;
    }

    #deckContentTableContainer {
        width: 95%;
        background-color: var(--rk-c-verdigris);
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .math {
        background-color: var(--rk-c-verdigris);
        border: none;
        font-size: larger;
    }
</style>
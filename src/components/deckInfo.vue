<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../store/user';

    const router = useRouter();
    const user = useUserStore();

    const emit = defineEmits(['response']);
    
    const props = defineProps({
        id: String,
        addedDecks: Array
    })

    const deck = ref();
    const fetchDeckFinished = ref(false);
    const authorUsername = ref("Author");
    const authorProfilePicture = ref("https://srcsrv.sunaarisu.de/kaado/noPP.png");
    const fetchUserFinished = ref(false);

    const added = ref(false);

    if (props.addedDecks.includes(props.id)) {
        added.value = true;
    }

    console.log(props.addedDecks)
    console.log(added.value)

    const cards_request = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ _id: props.id })
    }

    await fetch(import.meta.env.VITE_API + 'deck/get_one', cards_request)
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
        body: JSON.stringify({ userId: deck.value.deck.deck_info.author.id})
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

    async function addOrRmv(add) {
        const jwt = await user.get_jwt();

        if (jwt === 'no token') {
            router.push({path: '/login', query: {o: 'marketplace', d: props.id}})
        }

        const request = {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + jwt },
            body: JSON.stringify({
                deckid: props.id,
                add: add
            })
        }

        fetch(import.meta.env.VITE_API + 'user/update_deck_list', request)
            .then(response => {
                switch (response.status) {
                    case 200:
                        added.value = add;
                        break;

                    case 500:
                        break;

                    default:
                        break;
                };
            })
            .catch(err => {
                console.log(err)
                infoTxt.value = 'Something went wrong. :( Try refreshing the page.';
            });
    }
</script>

<template>
    <div id="deckInfoContainer">
        <button id="closeBtn" @click="emit('response', 'close')">
            < Back
        </button>
        <div id="fastInfoContainer">
            <div id="deckInfo">
                <span class="title">{{ deck.deck.deck_info.title }}</span>
                <span class="card_count">Cards: {{ deck.deck.deck_info.card_count }}</span>
            </div>
            <div class="author">
                <span class="author_name">{{ authorUsername }}</span>
                <img class="author_pp" :src="authorProfilePicture" alt="author profile picture">
            </div>
        </div>
        <div id="btnContainer">
            <button v-if="!added" @click="router.push({ path: '/deck/' + id})">Learn</button>
            <button v-if="added" @click="router.push({ path: '/home'})">Go to</button>
            <button v-if="!added" @click="addOrRmv(true)">Add</button>
            <button v-if="added" @click="addOrRmv(false)">Rmv</button>
        </div>
        <div id="deckContentTableContainer" v-if="fetchDeckFinished">
            <div class="row" v-for="row in deck.deck.cards">
                <div class="cell" v-for="cell in row.cardContent">
                    <span v-if="cell.type === 'text'">{{ cell.content }}</span>
                    <math-field class="math" read-only v-if="cell.type === 'equation'">{{ cell.content }}</math-field>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #deckInfoContainer{
        background-color: var(--rk-c-robin_egg_blue);
        height: calc(90vh - 30px);
        width: 95vw;
        border-radius: 0 0 10px 10px;

        padding-top: 30px;

        position: fixed;
        top: calc(3vh + 50px);
        left: 2.5vw;

        display: flex;
        align-items: center;
        flex-direction: column;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    #closeBtn {
        position: absolute;
        top: 15px;
        left: 2.5vw;
        background-color: var(--rk-c-verdigris);
        font-size: larger;
        font-weight: bolder;
        border: none;
        padding: 5px;
        border-radius: 5px;
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

    .author {
        display: flex;
        align-items: center;
    }

    .author_name {
        font-size: large;
        font-weight: bold;
    }

    .author_pp {
        height: 50px;
        aspect-ratio: 1;
        border-radius: 50%;
        margin-left: 10px;
    }

    #btnContainer {
        width: 95%;
        margin: 20px 0 20px 0;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    #btnContainer button {
        height: 50px;
        width: 300px;

        font-size: larger;
        font-weight: bolder;
        background-color: var(--rk-c-verdigris);
        border-radius: 10px;
        border: 2px solid black;
    }

    #deckContentTableContainer {
        width: 95%;
        background-color: var(--rk-c-verdigris);
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 5px 0 5px 0;
    }

    .math {
        background-color: var(--rk-c-verdigris);
        border: none;
        font-size: larger;
    }
</style>
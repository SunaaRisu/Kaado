<script setup>
    import { ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useUserStore } from '../store/user';
    import deckInfoView from '../components/deckInfo.vue';

    const router = useRouter();
    const route = useRoute();
    const user = useUserStore();

    const props = defineProps({
        deckInfo: Object,
        addedDecks: Array
    });

    const added = ref(false);
    const renderInfo = ref(false);

    if (props.addedDecks.includes(props.deckInfo._id)) {
        added.value = true;
    }

    async function addOrRmv(add) {
        const jwt = await user.get_jwt();

        if (jwt === 'no token') {
            router.push({path: '/login', query: {o: 'marketplace', d: props.deckInfo._id}})
        }

        const request = {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + jwt },
            body: JSON.stringify({
                deckid: props.deckInfo._id,
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

    function toggleRenderInfo(){
        renderInfo.value = !renderInfo.value;
        if (renderInfo.value) {
            router.push({ path: '/marketplace', query: {s: (route.query.s === undefined ? undefined : route.query.s), d: props.deckInfo._id}});
        } else {
            router.push({ path: '/marketplace', query: {s: (route.query.s === undefined ? undefined : route.query.s)}});
        }
    }
</script>

<template>
    <div class="previewContainer" v-if="!renderInfo">
        <div class="infoContainer">
            <span class="title">{{ deckInfo.deckInfo.title }}</span>
            <span class="cardCount">Cards: {{ deckInfo.deckInfo.card_count }}</span>
        </div>
        <div class="btnContainer">
            <button @click="toggleRenderInfo()">Info</button>
            <button v-if="!added" @click="router.push({ path: '/deck/' + deckInfo._id})">Learn</button>
            <button v-if="added" @click="router.push({ path: '/home'})">Go to</button>
            <button v-if="!added" @click="addOrRmv(true)">Add</button>
            <button v-if="added" @click="addOrRmv(false)">Rmv</button>
        </div>
    </div>
    <deckInfoView v-if="renderInfo" @response="toggleRenderInfo()" :id="props.deckInfo._id" :addedDecks="addedDecks"/>
</template>

<style scoped>
    .previewContainer{
        background-color: var(--rk-c-verdigris);
        width: 95%;
        height: fit-content;
        min-height: 100px;

        margin: 2.5%;
        border-radius: 10px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .infoContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        width: 45%;
        margin-left: 5%;
    }

    .title{
        font-size: larger;
        font-weight: bolder;
    }

    .btnContainer{
        width: 40%;
        margin: 2.5%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    button{
        height: 60px;
        width: 60px;

        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<script setup>
    import { ref } from 'vue';
    import DeckPreview from '../components/deckPreview.vue';
    import { useUserStore } from '../store/user';

    const user = useUserStore();

    const decks = ref([]);

    const infoTxt = ref('');
    
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

</script>

<template>
    <main>
        <DeckPreview v-for="deck in decks.decks" :deckInfo="deck"/>
    </main>
    <h1>{{ infoTxt }}</h1>
</template>

<style scoped>
    main {        
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;

        width: 70vw;
        height: 95vh;
        padding: 30px;
    }

    h1 {
        position: absolute;
        top: 50vh;
        color: var(--color-text-light);
    }
</style>
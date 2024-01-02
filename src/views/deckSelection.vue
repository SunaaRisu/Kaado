<script setup>
    import { ref } from 'vue';
    import DeckPreview from '../components/deckPreview.vue';

    const decks = ref([]);
    
    const request = {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
    }

    fetch('http://localhost:3000/deck/get_deck_list', request)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json(); 
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
            decks.value = data;
        })
        .catch(err => {
            console.log(err)
            alert('something went wrong')
        });

</script>

<template>
    <main>
        <DeckPreview v-for="deck in decks.decks" :deckInfo="deck"/>
    </main>
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
</style>
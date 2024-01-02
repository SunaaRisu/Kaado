<script setup>
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute();
    const router = useRouter();

    const deck = ref();

    const request = {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ _id: route.params.id })
    }

    await fetch('http://localhost:3000/deck/get_one', request)
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
            }                    
        })
        .catch(err => {
            console.log(err);
            alert('something went wrong');
        });


    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    
    const arrayWithoutElementAtIndex = function (arr, index) {
        return arr.filter(function(value, arrIndex) {
            return index !== arrIndex;
        });
    }

    const cardsData = ref();
    const cards = ref([]);

    cardsData.value = deck.value.deck.cards;

    for (let index = 0; index < deck.value.deck.chartDefinition.chart_columns; index++) {

        cardsData.value.forEach(element => {
            cards.value.push({
                q: element.cardContent[index],
                a: arrayWithoutElementAtIndex(element.cardContent, index)
            })
        });
    }
    
    cards.value = shuffle(cards.value);

    const currentCard = ref(0);
    const cardAnswered = ref(false);
    

    function nextCard() {

        if (!cardAnswered.value) {
            cardAnswered.value = !cardAnswered.value
        }else{
            cardAnswered.value = !cardAnswered.value

            if (currentCard.value < cards.value.length - 1) {
                currentCard.value++;
            }else{
                router.push({ path: '/'})
            }
        }        
    }

    function askCardAgain() {
        cards.value.splice(currentCard.value + (Math.floor(Math.random() * 10) + 1), 0, cards.value[currentCard.value]);

        nextCard();
    }

    function moveCardBack() {
        cards.value.push(cards.value[currentCard.value]);

        nextCard();
    }
    
</script>

<template>
    <main>
        <span id="title">{{ deck.deck.title }}</span>

        <div id="card">
            <span>{{ cards[currentCard].q }}</span>
            <div id="answer" v-if="cardAnswered">
                <span>{{ cards[currentCard].a[0] }}</span>
                <span>{{ cards[currentCard].a[1] }}</span>
            </div>          
        </div>

        <div id="btnContainer" v-if="cardAnswered">
            <div class="smallBtn" id="againBtn" @click="askCardAgain()"><strong>Again</strong></div>
            <div class="smallBtn" id="MoveToBackBtn" @click="moveCardBack()"><strong>Move Back</strong></div>
            <div class="smallBtn" id="nextBtn" @click="nextCard()"><strong>Next</strong></div>
        </div>
        <div class="btn" id="showAnswerBtn" v-if="!cardAnswered" @click="nextCard()"><strong>Show Answer</strong></div>

        <div id="progressBar">
            <div id="progressBarText">
                <span>{{ currentCard + 1 }} / {{ cards.length }}</span>
            </div>
            <div id="progressBarFill" :style="{'width': (currentCard / cards.length) * 100 + '%'}"></div>
        </div>
    </main>    
</template>

<style scoped>
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    #title {
        color: aliceblue;
    }

    span {
        font-weight: bolder;
    }

    #showAnswerBtn {
        background-color: aqua;
        height: 60px;
        width: 440px;

        border-radius: 5px;
        justify-content: center;
        align-items: center;

        display: flex;
    }

    #btnContainer {
        width: 440px;
        height: 60px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .smallBtn {
        width: 30%;
        height: 100%;

        background-color: aqua;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;        
    }

    #card {
        margin-top: 100px;
        background-color: aqua;
        height: 500px;
        width: 400px;
        padding: 20px;

        border-radius: 20px;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        display: flex;
    }

    #answer {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }

    #progressBar {
        background-color: #464d49;
        height: 20px;
        width: 440px;
        border-radius: 5px;

        position: absolute;
        bottom: 20px;
    }

    #progressBarFill {
        background-color: aqua;
        height: 100%;
        border-radius: 5px;
    }

    #progressBarText {
        position: absolute;
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
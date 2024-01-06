<script setup>
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import JSConfetti from 'js-confetti';
    import { shuffle, arrayWithoutElementAtIndex } from '../../lib/array';

    const route = useRoute();
    const router = useRouter();

    
    // setup confetti
    const confetti = new JSConfetti();
    function showConfetti() {
        confetti.addConfetti()
    }


    const deck = ref(); // Holds the original deck fetched by "fetchDeck()".
    const finished = ref(false); // Is true if all cards has been answerd.
    const haveFailedCards = ref(false); // Is true if cards were put back into the stack.
    const stack = ref([]); // Stack created by "createDeckAndStart()".
    const currentCard = ref(0); // Current card asked.
    const cardAnswered = ref(false); // Is true if the current card has been answerd.
    const failedCards = ref([]); // Holds the card that were put back into the stack.
    

    // Fetches the deck with the id from the route and sets "deck" equal to it.
    async function fetchDeck() {
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
    }   
    
    // Creates a stack from the deck based on the choosen settings, shuffles it and resets "currentCard", "cardAnswerd", "finished" and "failedCards".
    function createStackAndStart() {
        const TempCardsData = ref();

        stack.value = [];

        TempCardsData.value = deck.value.deck.cards;

        for (let index = 0; index < deck.value.deck.chartDefinition.chart_columns; index++) {

            TempCardsData.value.forEach(element => {
                stack.value.push({
                    q: element.cardContent[index],
                    a: arrayWithoutElementAtIndex(element.cardContent, index)
                })
            });
        }
        
        stack.value = shuffle(stack.value);
        currentCard.value = 0;
        cardAnswered.value = false;
        finished.value = false;
        failedCards.value = [];
    }

    // Shows the Answer or increases "currentCard" by 1 based on "cardAnswered". If the stack is finished it displays the menu.
    function showAnswerOrNextCard() {

        if (!cardAnswered.value) {
            cardAnswered.value = !cardAnswered.value
        }else{
            cardAnswered.value = !cardAnswered.value

            if (currentCard.value < stack.value.length - 1) {
                currentCard.value++;
            }else{
                finished.value = true;
                showConfetti();
                if (failedCards.value.length > 0) {
                    haveFailedCards.value = true;
                } else {
                    haveFailedCards.value = false;
                }
            }
        }        
    }

    // Pushes current card to "failedCards" and puts the card back into the next 10 cards of the current stack.
    function askCardAgain() {
        failedCards.value.push(stack.value[currentCard.value]);

        stack.value.splice(currentCard.value + (Math.floor(Math.random() * 10) + 1), 0, stack.value[currentCard.value]);

        showAnswerOrNextCard();
    }

    // Pushes current card to "failedCards" and puts the card at the end of the current stack.
    function moveCardBack() {
        failedCards.value.push(stack.value[currentCard.value]);

        stack.value.push(stack.value[currentCard.value]);

        showAnswerOrNextCard();
    }

    // Creates a stack from the previously failed cards, shuffles it and resets "currentCard", "cardAnswerd", "finished" and "failedCards".
    function repeatFailedCards() {
        currentCard.value = 0;
        cardAnswered.value = false;
        finished.value = false;
        stack.value = failedCards.value;
        stack.value = shuffle(stack.value);
        failedCards.value = [];
    }
    

    await fetchDeck();

    createStackAndStart();
    
</script>

<template>
    <main>
        <span id="title" v-if="!finished">{{ deck.deck.title }}</span>

        <div class="card" id="card" v-if="!finished">
            <span>{{ stack[currentCard].q }}</span>
            <div id="answer" v-if="cardAnswered">
                <span>{{ stack[currentCard].a[0] }}</span>
                <span>{{ stack[currentCard].a[1] }}</span>
            </div>          
        </div>

        <div class="card" id="menu" v-if="finished">
            <span id="menuTitle">DECK FINISHED</span>
            <span id="menuSubtitle">{{ deck.deck.title }}</span>
            <button class="menuBtn" id="repeatDeck" @click="createStackAndStart()"><strong>REPEAT DECK</strong></button>
            <button class="menuBtn" id="repeatFailedCards" @click="repeatFailedCards()" :disabled="!haveFailedCards"><strong>REPEAT THE {{ failedCards.length }} FAILED CARDS</strong></button>
            <button class="menuBtn" id="backToSelection" @click="router.push({ path: '/'})"><strong>BACH TO DECK SELECTION</strong></button>
        </div>

        <div id="btnContainer" v-if="cardAnswered && !finished">
            <div class="smallBtn" id="againBtn" @click="askCardAgain()"><strong>AGAIN</strong></div>
            <div class="smallBtn" id="MoveToBackBtn" @click="moveCardBack()"><strong>MOVE BACK</strong></div>
            <div class="smallBtn" id="nextBtn" @click="showAnswerOrNextCard()"><strong>NEXT</strong></div>
        </div>
        
        <div class="btn" id="showAnswerBtn" v-if="!cardAnswered && !finished" @click="showAnswerOrNextCard()"><strong>SHOW ANSWER</strong></div>

        <div id="progressBar" v-if="!finished"> 
            <div id="progressBarText">
                <span>{{ currentCard + 1 }} / {{ stack.length }}</span>
            </div>
            <div id="progressBarFill" :style="{'width': ((currentCard + 1) / stack.length) * 100 + '%'}"></div>
        </div>
    </main>    
</template>

<style scoped>
    main {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    #title {
        position: absolute;
        top: 10px;
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

        position: absolute;
        bottom: 70px;
    }

    #btnContainer {
        width: 440px;
        height: 60px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        position: absolute;
        bottom: 70px;
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

    .card {
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

    #menu {
        display: flex;
        justify-content: flex-start;
    }

    #menuTitle {
        margin-top: 100px;
        margin-bottom: 5px;
        font-size: 24px;
    }

    #menuSubtitle {
        margin-bottom: 80px;
    }

    .menuBtn {
        background-color: rgb(0, 211, 211);
        border: none;

        width: 80%;
        height: 50px;
        border-radius: 5px;
        margin-top: 30px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .menuBtn strong{
        font-size: 16px;
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
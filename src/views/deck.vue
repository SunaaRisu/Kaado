<script setup>
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import JSConfetti from 'js-confetti';
    import { shuffle, arrayWithoutElementAtIndex, randomizedArrayWithXElementsFromArray } from '../../lib/array';
    import { useUserStore } from '../store/user';
    import { useDecksStore } from '../store/decks';
    import { onKeyStroke } from '@vueuse/core';
    import { MathfieldElement } from 'mathlive';

    const route = useRoute();
    const router = useRouter();
    const user = useUserStore();
    const decks = useDecksStore();
    
    
    // setup confetti
    const confetti = new JSConfetti();
    function showConfetti() {
        confetti.addConfetti()
    }

    onKeyStroke([' ', 'Enter'], (e) => {
        e.preventDefault();
        showAnswerOrNextCard();
    })

    const deck = ref(); // Holds the original deck fetched by "fetchDeck()".
    const finished = ref(false); // Is true if all cards has been answerd.
    const haveFailedCards = ref(false); // Is true if cards were put back into the stack.
    const stack = ref([]); // Stack created by "createDeckAndStart()".
    const currentCard = ref(0); // Current card asked.
    const cardAnswered = ref(false); // Is true if the current card has been answerd.
    const failedCards = ref([]); // Holds the card that were put back into the stack.


    const randomize = ref(true);
    const cardCount = ref(10);
    const questionSetting = ref('ALL');
    const answerSetting = ref('REMAINING');    
    

    // Fetches the deck with the id from the route and sets "deck" equal to it.
    async function fetchDeck() {
        const request = {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ _id: route.params.id })
        }

        await fetch(import.meta.env.VITE_API + 'deck/get_one', request)
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

        if (randomize.value) {
            TempCardsData.value = randomizedArrayWithXElementsFromArray(deck.value.deck.cards, cardCount.value);
        } else {
            TempCardsData.value = deck.value.deck.cards;
            TempCardsData.value = TempCardsData.value.slice(0, cardCount.value);
        }        

        if (questionSetting.value === 'ALL' && answerSetting.value[0] === 'REMAINING') {
            for (let index = 0; index < deck.value.deck.deck_info.chartDefinition.chart_columns; index++) {

                TempCardsData.value.forEach(element => {
                    stack.value.push({
                        q: element.cardContent[index],
                        a: arrayWithoutElementAtIndex(element.cardContent, index)
                    })
                });
            };
        } else if (questionSetting.value === 'ALL' && answerSetting.value[0] !== 'REMAINING') {
            for (let index = 0; index < deck.value.deck.deck_info.chartDefinition.chart_columns; index++) {

                if (!answerSetting.value.includes(deck.value.deck.deck_info.chartDefinition.chart_columns_name[index])) {
                    
                    TempCardsData.value.forEach(card => {
                        var answerArray = [];
        
                        answerSetting.value.forEach(element => {
                            answerArray.push(card.cardContent[deck.value.deck.deck_info.chartDefinition.chart_columns_name.indexOf(element)]);
                        });

                        stack.value.push({
                            q: card.cardContent[index],
                            a: answerArray
                        })
                    })   
                } 
            }
        } else if (questionSetting.value !== 'ALL' && answerSetting.value[0] === 'REMAINING') {
            TempCardsData.value.forEach(element => {
                stack.value.push({
                    q: element.cardContent[deck.value.deck.deck_info.chartDefinition.chart_columns_name.indexOf(questionSetting.value)],
                    a: arrayWithoutElementAtIndex(element.cardContent, deck.value.deck.deck_info.chartDefinition.chart_columns_name.indexOf(questionSetting.value))
                })
            });
        } else{            
                TempCardsData.value.forEach(card => {
                    var answerArray = [];
    
                    answerSetting.value.forEach(element => {
                        answerArray.push(card.cardContent[deck.value.deck.deck_info.chartDefinition.chart_columns_name.indexOf(element)]);
                    });

                    stack.value.push({
                        q: card.cardContent[deck.value.deck.deck_info.chartDefinition.chart_columns_name.indexOf(questionSetting.value)],
                        a: answerArray
                    })
                })      
        };        


        if (randomize.value) {
            stack.value = shuffle(stack.value);
        }        
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

    async function populateSettings() {
        var dataFromStore = await decks.getStackSessionById(route.params.id);

        console.log(dataFromStore);

        if (Object.entries(route.query).length > 0) {
            randomize.value = route.query.randomize;
            cardCount.value = route.query.cardCount;
            questionSetting.value = route.query.question;
            answerSetting.value = route.query.answer;  
        } else if (dataFromStore) {
            if (dataFromStore.id === route.params.id) {
                randomize.value = dataFromStore.deckSettings.randomize,
                cardCount.value = dataFromStore.deckSettings.cardCount,
                questionSetting.value = dataFromStore.deckSettings.question,
                answerSetting.value = dataFromStore.deckSettings.answer
            }
        } else {
            randomize.value = deck.value.deck.deck_settings.randomize;
            cardCount.value = deck.value.deck.deck_settings.cards_per_stack;
            questionSetting.value = deck.value.deck.deck_settings.card_question;
            answerSetting.value = deck.value.deck.deck_settings.card_answer;          
        }

        console.log(randomize.value);
        console.log(cardCount.value);
        console.log(questionSetting.value);
        console.log(answerSetting.value);
    }    

    await fetchDeck();

    await populateSettings();
    
    createStackAndStart();    
</script>

<template>
    <main>
        <span id="title" v-if="!finished">{{ deck.deck.deck_info.title }}</span>

        <div class="card" id="card" v-if="!finished" @click="showAnswerOrNextCard()">
            <span v-if="stack[currentCard].q.type === 'text'">{{ stack[currentCard].q.content }}</span>
            <math-field class="math" read-only v-if="stack[currentCard].q.type === 'equation'">{{ stack[currentCard].q.content }}</math-field>
            <div id="answer" v-if="cardAnswered">
                <div class="answerContainer" v-if="!Array.isArray(stack[currentCard].a)">
                    <span v-if="stack[currentCard].a.type === 'text'">{{ stack[currentCard].a.content }}</span>
                    <math-field class="math" read-only v-if="stack[currentCard].a.type === 'equation'">{{ stack[currentCard].a.content }}</math-field>
                    <span>single</span>
                </div>
                <div class="answerArrayContainer" v-for="element in stack[currentCard].a.length" v-if="Array.isArray(stack[currentCard].a)">
                    <span v-if="stack[currentCard].a[element - 1].type === 'text'">{{ stack[currentCard].a[element - 1].content }}</span>
                    <math-field class="math" read-only v-if="stack[currentCard].a[element - 1].type === 'equation'">{{ stack[currentCard].a[element - 1].content }}</math-field>
                </div>                
            </div>          
        </div>

        <div class="card" id="menu" v-if="finished">
            <span id="menuTitle">DECK FINISHED</span>
            <span id="menuSubtitle">{{ deck.deck.title }}</span>
            <button class="menuBtn" id="repeatDeck" @click="createStackAndStart()"><strong>REPEAT DECK</strong></button>
            <button class="menuBtn" id="repeatFailedCards" @click="repeatFailedCards()" :disabled="!haveFailedCards"><strong>REPEAT THE {{ failedCards.length }} FAILED CARDS</strong></button>
            <button class="menuBtn" id="backToSelection" @click="router.push({ path: '/home'})"><strong>BACK TO DECK SELECTION</strong></button>
        </div>

        <div id="btnContainer" v-if="cardAnswered && !finished">
            <div class="sidepanel" id="moveToBackPanel" @click="moveCardBack()"></div>
            <div class="smallBtn" id="moveToBackBtn" @click="moveCardBack()"><strong>MOVE BACK</strong></div>
            <div class="smallBtn" id="nextBtn" @click="showAnswerOrNextCard()"><strong>NEXT</strong></div>
            <div class="smallBtn" id="againBtn" @click="askCardAgain()"><strong>AGAIN</strong></div>
            <div class="sidepanel" id="againPanel" @click="askCardAgain()"></div>
        </div>
        
        <div class="btn" id="showAnswerBtn" v-if="!cardAnswered && !finished" @click="showAnswerOrNextCard()"><strong>SHOW ANSWER</strong></div>

        <div id="progressBar" v-if="!finished"> 
            <div id="progressBarText">
                <span>{{ currentCard + 1 }} / {{ stack.length }}</span>
            </div>
            <div id="progressBarFill" :style="{'width': ((currentCard + 1) / stack.length) * 100 + '%'}"></div>
        </div>
        <a id="privacy" href="https://sunaarisu.de/privacy">Privacy</a>
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
        color: var(--color-text-light);
    }

    span {
        font-weight: bolder;
        text-align: center;
        width: 400px;
        display: block;
    }

    #showAnswerBtn {
        background-color: var(--rk-c-robin_egg_blue);
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

    .sidepanel{
        height: 100vh;
        width: calc(calc(100vw/2) - 220px);
    }

    #moveToBackPanel{
        position: fixed;
        top: 0;
        left: 0;
    }
    
    #againPanel {
        position: fixed;
        top: 0;
        right: 0;
    }

    .smallBtn {
        width: 30%;
        height: 100%;

        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;        
    }

    .card {
        background-color: var(--rk-c-robin_egg_blue);
        height: 500px;
        min-width: 400px;
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
        background-color: var(--rk-c-verdigris);
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
        background-color: var(--color-background-accent);
        height: 20px;
        width: 440px;
        border-radius: 5px;

        position: absolute;
        bottom: 20px;
    }

    #progressBarFill {
        background-color: var(--rk-c-robin_egg_blue);
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

    .math {
        background-color: var(--rk-c-robin_egg_blue);
        border: none;
        font-size: larger;
        font-weight: bolder;
    }

    #privacy {
        position: fixed;
        left: 10px;
        bottom: 10px;
        text-decoration: none;
        color: var(--color-text-light);
    }
</style>
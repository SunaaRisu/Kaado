<script setup>
    import { ref } from 'vue';
    import {useUserStore} from '../store/user';

    const user = useUserStore();

    const props = defineProps({
        deckInfo: Object
    });

    const cardCount = ref(props.deckInfo.deckSettings.cards_per_stack);
    const cardCountCheckbox = ref(cardCount.value === props.deckInfo.deckInfo.card_count);
    const randomizeCheckbox = ref(props.deckInfo.deckSettings.randomize);

</script>

<template>
    <div id="stackSettingsContainer">
        <div id="deckTitle">
            <span id="title">{{ deckInfo.deckInfo.title }}</span>
            <span>Stack creation settings</span>
        </div>
        <div class="seperator">ㅤ</div>
        <div id="cardCountSettingsContainer">
            <span>Number of cards</span>
            <div class="inputContainer">
                <input type="checkbox" name="allCards" id="allCardsCheckbox" v-model="cardCountCheckbox">
                <label for="allCardsCheckbox">All cards</label>
                <input type="number" name="cardCount" id="cardCount" v-if="!cardCountCheckbox" min="0" v-model="cardCount">
            </div>
            <div class="inputContainer">
                <input type="checkbox" name="shuffleStack" id="shuffleStackCheckbox" v-model="randomizeCheckbox">
                <label for="shuffleStackCheckbox">Shuffle stack</label>
            </div>
        </div>
        <div class="seperator">ㅤ</div>
        <div id="cardLayoutSettingContainer">
            <div id="layoutCardFront">
                <span>Front</span>
                <div class="cardLayoutInputContainer">
                    <select name="question" id="questionSelect">
                        <option value="ALL">all</option>
                        <option value="element" v-for="element in deckInfo.deckInfo.chartDefinition.chart_columns_name">{{ element }}</option>
                    </select>
                </div>
            </div>
            <div id="layoutCardBack">
                <span>Back</span>
            </div>
        </div>
        <div class="seperator">ㅤ</div>
        <div id="cardFillingContainer">
            Card Filling
        </div>
        <div class="seperator">ㅤ</div>
        <div id="checkboxContainer">
            <input type="checkbox" name="saveToDB" id="checkbox">
            <label for="checkbox">Only save this settings for this session.</label>
        </div>        
        <div id="btnContainer">
            <div class="btn" id="saveBtn"><span>Save</span></div>
            <div class="btn" id="saveForStack"><span>Use once</span></div>
        </div>
    </div>
</template>

<style scoped>
    #stackSettingsContainer{
        background-color: var(--rk-c-robin_egg_blue);
        height: 400px;
        width: 90vw;
        border-radius: 20px;
        border: 4px solid var(--color-background);

        position: fixed;
        top: calc(50vh - 202px);
        left: 5vw;

        display: flex;
        align-items: center;
        flex-direction: column;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    .seperator {
        height: 2px;
        width: 95%;
        background-color: var(--color-background-accent);
        margin: 20px 0;
    }

    #deckTitle {
        margin: 20px 0;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #title {
        font-size: larger;
        font-weight: bolder;
        margin-bottom: 10px;
    }

    #cardCountSettingsContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .inputContainer label {
        margin-right: 20px;
    }

    #cardCount {
        width: 50px;
    }

    #cardCountSettingsContainer span {
        font-weight: bold;
        margin-bottom: 15px;
    }

    #cardLayoutSettingContainer {
        display: flex;
        flex-direction: row;
    }

    #layoutCardFront {
        background-color: var(--rk-c-verdigris);
        min-height: 200px;
        height: fit-content;
        width: 150px;
        border-radius: 10px;
        margin: 0 25px;
    }

    #layoutCardBack {
        background-color: var(--rk-c-verdigris);
        min-height: 200px;
        height: fit-content;
        width: 150px;
        border-radius: 10px;
        margin: 0 25px;
    }

    #btnContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 20px 0;
    }

    .btn {
        background-color: var(--rk-c-verdigris);
        height: 50px;
        width: 200px;
        border-radius: 5px;
        margin: 5px 20px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn span {
        font-size: larger;
        font-weight: bolder;
    }

    ::-webkit-scrollbar-track {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    @media screen and (min-width: 768px) {
        #stackSettingsContainer {
            width: 600px;
            left: calc(50vw - 302px);
        }        
    }
</style>
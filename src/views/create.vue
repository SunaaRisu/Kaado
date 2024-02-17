<script setup>
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useUserStore } from '../store/user';

    const router = useRouter();
    const user = useUserStore();


    const title = ref();
    const description = ref();
    const chart_columns_name = ref(['Question', 'Answer']);
    const cards = ref([['', '']]);

    const onHoverDelBtn = ref([false, false]);


    function addRow() {
        var newRow = []

        for (let i = 0; i < chart_columns_name.value.length; i++) {
            newRow.push('');
        }

        cards.value.push(newRow);

        onHoverDelBtn.value.push(false)
    }

    function addColumn() {
        chart_columns_name.value.push('');

        cards.value.forEach(element => {
            element.push('');
        });
    }

    function deleteRow(row) {
        cards.value.splice(row, 1);
        onHoverDelBtn.value.splice(row, 1);
    }

    async function createDeck() {
        var tempcards = [];

        cards.value.forEach(element => {
            tempcards.push({
                cardNumber: cards.value.indexOf(element) + 1,
                cardContent: element
            })
        });

        const request = {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + await user.get_jwt() },
            body: JSON.stringify({ 
                title: title.value,
                description: description.value,
                card_count: cards.value.length,                
                chart_columns: chart_columns_name.value.length,
                chart_columns_name: chart_columns_name.value,                
                cards: tempcards
            })
        }

        await fetch(import.meta.env.VITE_API + 'deck/create', request)
            .then(response => {
                switch(response.status) {
                    case 201:
                        router.push({ path: '/' });
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
            .catch(err => {
                console.log(err);
                alert('something went wrong');
            });
    }
</script>

<template>
    <main>
        <div id="tabContainer">
            <div class="tab" id="createTab"><span>Create new deck</span></div>
            <div class="tab" id="addTab" @click="router.push({ path: '/marketplace' })"><span>Add deck from the marketplace</span></div>
        </div>
        <div id="pageContainer">
            <div id="deckInfoContainer">
                <span>Title</span>
                <input type="text" v-model="title">
                <span>Description</span>
                <textarea name="" id="" cols="30" rows="10" v-model="description"></textarea>
            </div>
            <div id="cardsInputContainer">
                <span>Cards</span>
                <div id="table">
                    <div class="columnNaming">
                        <input type="text" v-for="name in chart_columns_name" v-model="chart_columns_name[chart_columns_name.indexOf(name)]">
                        <div id="addColumnBtn" @click="addColumn()">+</div>
                    </div>
                    <div class="row" v-for="card in cards">
                        <div class="delCardBtn" @mouseover="onHoverDelBtn[cards.indexOf(card)] = true" @mouseleave="onHoverDelBtn[cards.indexOf(card)] = false" @click="deleteRow(cards.indexOf(card));">
                            <div class="delBtnNumber" v-if="!onHoverDelBtn[cards.indexOf(card)]">{{ (cards.indexOf(card) + 1).toString() }}</div>
                            <div class="delBtnDel" v-if="onHoverDelBtn[cards.indexOf(card)]"><img src="../assets/icons/icons8-delete.svg" alt="delete this card"></div>
                        </div>
                        <div class="cell" v-for="cell in cards[cards.indexOf(card)]">
                            <input type="text" name="" v-model="cards[cards.indexOf(card)][card.indexOf(cell)]" id="">
                        </div>
                    </div>
                    <div id="addRowBtn" @click="addRow()">+</div>
                </div>
                <span>Use LaTeX syntax for equations.</span>
                <span>Mark equations with "#LaTeX" at the beginning.</span>
            </div>           
            <div class="btnContainer">
                <div class="btn" id="cancelBtn" @click="router.push({ path: '/' })"><span>Cancel</span></div>
                <div class="btn" id="CreateBtn" @click="createDeck()"><span>Create</span></div>
            </div>
        </div>
    </main>
</template>

<style scoped>

    main {
        width: 95vw;
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
        background-color: var(--rk-c-robin_egg_blue);
    }

    #addTab {
        background-color: var(--rk-c-verdigris);
    }

    .tab span {
        font-size: larger;
        font-weight: bolder;
    }

    #pageContainer {
        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 0 0 10px 10px;
        max-height: 90vh;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    .btnContainer {
        width: 100%;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin: 20px 0;
    }

    .btn {
        background-color: var(--rk-c-verdigris);
        height: 50px;
        width: 250px;
        border-radius: 5px;
        margin: 5px 50px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn span {
        font-size: larger;
        font-weight: bolder;
    }

    #deckInfoContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #cardsInputContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #table {
        max-width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .columnNaming {
        margin-left: 25px;
        
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    #addColumnBtn {
        height: 25px;
        width: 25px;
        background-color: var(--rk-c-verdigris);

        display: flex;
        align-items: center;
        justify-content: center;
        
        font-size: larger;
        font-weight: bolder;
    }

    #addRowBtn {
        height: 25px;
        width: calc(100% - 50px);
        margin-left: 25px;
        background-color: var(--rk-c-verdigris);

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: larger;
        font-weight: bolder;
    }

    .delBtnNumber {
        height: 25px;
        width: 25px;
        background-color: var(--rk-c-verdigris);

        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
    }

    .delBtnDel {
        height: 25px;
        width: 25px;
        background-color: var(--rk-c-red);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .row {
        display: flex;
        flex-direction: row;
    }


</style>
<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
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
                <input type="text">
                <span>Description</span>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div id="cardsInputContainer">
                
            </div>            
            <div class="btnContainer">
                <div class="btn" id="cancelBtn" @click="router.push({ path: '/' })"><span>Cancel</span></div>
                <div class="btn" id="CreateBtn" @click=""><span>Create</span></div>
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


</style>
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
            <div class="btnContainer">
                <div class="btn" id="cancelBtn" @click=""><span>Cancel</span></div>
                <div class="btn" id="CreateBtn" @click=""><span>Create</span></div>
            </div>
        </div>
    </main>
</template>

<style scoped>

    main {
        width: 95vw;
        height: 95vh;
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
        height: fit-content;
        max-height: 90vh;
        width: 95vw;
        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 0 0 10px 10px;
    }

    .btnContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 20px 0;
    }

</style>
<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
</script>

<template>
    <main>
        <div id="tabContainer">
            <div class="tab" id="createTab" @click="router.push({ path: '/create' })"><span>Create new deck</span></div>
            <div class="tab" id="addTab"><span>Add deck from the marketplace</span></div>
        </div>
        <div id="pageContainer">
            <div id="txtContainer">
                <p>Foreshadowing is nice.</p>
                <p>>:3</p>
                <p>Please be patient.</p>
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
        background-color: var(--rk-c-verdigris);
    }

    #addTab {
        background-color: var(--rk-c-robin_egg_blue);
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

    #txtContainer {
        height: 90vh;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

</style>
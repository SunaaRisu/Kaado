<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const inputHint = ref(null)
    const list = ["Seach a deck", "Search something", "Find something interesting", "Minna no Nihongo Vocabulary", "ABI 2016", "ABI BW", "BP 2016", "Elektrisches Feld", "Schwingung", "Quantenphysik", "Wellenoptik" ];
    var first = true;
    const searchQuery = ref('');

    onMounted(() => {
        draw();        
    })

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function draw(){

    if(first){
        await sleep(10000);
        first = false;
    }

    var currentPhrase = input.getAttribute('placeholder');
    var nextPhraseArr = list[getRndInteger(0, list.length - 1)].split("");
    var nextPhrase = ""; 

    for(var i = currentPhrase.length; i > 0; i--){
        currentPhrase = currentPhrase.slice(0, currentPhrase.length - 1); 
        inputHint.value.placeholder = currentPhrase;
        await sleep(60);
    }

    await sleep(1000);

    for(var i = 0; i < nextPhraseArr.length; i++){
        nextPhrase = nextPhrase + nextPhraseArr[i];
        inputHint.value.placeholder = nextPhrase;
        await sleep(getRndInteger(100, 250));
    }

    await sleep(5000);
    draw();
    }
</script>

<template>
    <main>
        <button id="loginBtn" @click="router.push( {path: '/login' })">
            <strong>
                Login
            </strong>
        </button>

        <div id="homeMainContainer">
            <form @submit.prevent="router.push( {path: '/marketplace', query: {s: searchQuery}} )">
                <input ref="inputHint" id="input" class="searchbar" type="text" name="s" placeholder="Search something" required autocomplete="off" v-model="searchQuery">
            </form>
    
            <button class="btn" @click="router.push({ path: '/marketplace' })">
                <strong>
                    Browse
                </strong>
            </button>

            <button class="btn" @click="router.push({ path: '/create'})">
                <strong>
                    Create own deck
                </strong>
            </button>
        </div>
        <a id="privacy" href="https://sunaarisu.de/privacy">Privacy</a>
    </main>

</template>

<style scoped>
    main{
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #loginBtn {
        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 10px;
        width: 187px;
        height: 50px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        border: none;

        position: absolute;
        top: 0px;
        right: 10px;
    }

    #loginBtn strong {
        font-size: larger;
        font-weight: bolder;
    }

    #homeMainContainer{
        margin: auto;
        width: 350px;
        height: auto;
        padding: 25px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        flex-direction: column;
    }  

    .searchbar {
        width: 300px;
        height: 50px;
        border-radius: 10px;
        border: none;
        background-color: white;
        color: var(--color-text);
        font-size: 20px;
        text-align: center;
        margin: 10px 0;
    }

    .btn {
        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 10px;
        width: 300px;
        height: 50px;
        margin: 10px 0;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .btn strong {
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

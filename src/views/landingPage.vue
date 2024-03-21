<script setup>
    import { ref, onMounted } from 'vue'

    const inputHint = ref(null)
    const list = ["banane", "apfel", "asdfoeaskdfjaoesdfjaoes", "who's joe?", "Paul stinkt!"];
    var first = true;

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
    <div id="homeMainContainer">
            <form action="https://filesharing.sunaarisu.de/wip.php" method="get">
            <input ref="inputHint" id="input" class="searchbar" type="text" name="s" placeholder="Suche einen Eintrag" required autocomplete="off">
        </form>

        <div class="seperator"></div>

        <a id="btnA" href="https://filesharing.sunaarisu.de/wip.php">
            <div class="btn">
                <strong>Stöbern</strong>
            </div>
        </a>
        <a id="btnA" href="https://filesharing.sunaarisu.de/wip.php">
            <div class="btn">
                <strong>Eintrag erstellen</strong>
            </div>
        </a>
    </div>

</template>

<style scoped>
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
</style>

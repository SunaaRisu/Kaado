<script setup>
    import { ref } from 'vue';
    import { version } from '../../package.json';

    const emit = defineEmits(['response']);

    const renderNewFeatures = ref(true); 
    const renderFixedIssues = ref(true);
    const renderKnownIssues = ref(true);
</script>

<template>
    <div id="patchnotesContainer">
        <div id="closeBtn" @click="emit('response', 'close')">
            <img src="../assets/icons/letterx_83737.svg" alt="Close patch notes">
        </div>
        <span id="title">Patch Notes</span>
        <span id="version">Version: {{ version }}</span>
        <div class="seperator" id="newSeperator" v-if="renderNewFeatures"><span class="seperatorTitle">New Features</span></div>
        <div class="textContainer" id="newText" v-if="renderNewFeatures">
            <ul>
                <li>Right-clicking on a deck preview card opens a settings window where you can choose how the stack is created.</li>
                <li>Marketplace where you can browse decks created by other users and add them to your own list.</li>
                <li>"Landing" page and "Home" page are now separate pages.</li>
                <li>Access to parts of the app for which you do not need an account can now be used without registering.</li>
            </ul>     
        </div>
        <div class="seperator" id="fixedSeperator" v-if="renderFixedIssues"><span class="seperatorTitle" >Fixed Issues</span></div>
        <div class="textContainer" id="fixedText" v-if="renderFixedIssues">
            <ul>
                <li>Redirect after login and signup should work now.</li>
                <li>Better support for equations.</li>
            </ul>
        </div>
        <div class="seperator" id="knownSeperator" v-if="renderKnownIssues"><span class="seperatorTitle">Known Issues</span></div>
        <div class="textContainer" id="knownText" v-if="renderKnownIssues">
            <ul>
                <li>The deck content table sometimes writes to incorrect cells during deck creation.</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    #patchnotesContainer {
        width: 90vw;
        height: fit-content;
        max-height: 80vh;
        min-height: 10vh;
        background-color: var(--rk-c-robin_egg_blue);
        border-radius: 20px;
        border: 3px solid var(--color-background);

        position: absolute;
        top: 10vh;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #closeBtn {
        height: 20px;
        width: 20px;

        position: absolute;
        right: 10px;
        top: 10px;
    }

    #title {
        margin-top: 30px;
        font-weight: 700;
        font-size: xx-large;
        border-bottom: 2px solid var(--rk-c-black);
    }

    #version {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .seperator {
        height: 2px;
        width: 95%;
        margin-top: 60px;
        margin-bottom: 20px;
    }

    .seperatorTitle {
        position: relative;
        top: -12px;
        background-color: var(--rk-c-robin_egg_blue);
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 20px;        
    }

    #newSeperator {
        background-color: green;
    }

    #knownSeperator {
        background-color: yellow;
    }

    #fixedSeperator {
        background-color: red;
    }

    .textContainer {
        width: 90%;
    }

    @media screen and (min-width: 768px) {
        #patchnotesContainer {
            width: 520px;
        }        
    }
</style>
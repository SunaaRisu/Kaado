<script setup>
    import { ref } from 'vue';

    const emit = defineEmits(['response']);

    const renderNewFeatures = ref(true);
    const renderFixedIssues = ref(false);
    const renderKnownIssues = ref(true);
</script>

<template>
    <div id="patchnotesContainer">
        <div id="closeBtn" @click="emit('response', 'close')">
            <img src="../assets/icons/letterx_83737.svg" alt="Close patch notes">
        </div>
        <span id="title">Patch Notes</span>
        <span id="version">Version: 0.0.4</span>
        <div class="seperator" id="newSeperator" v-if="renderNewFeatures"><span class="seperatorTitle">New Features</span></div>
        <div class="textContainer" id="newText" v-if="renderNewFeatures">
            <ul>
                <li>A new patch notes windown was added.</li>
                <li>Confetti after completing a deck.  :3</li>
            </ul>            
        </div>
        <div class="seperator" id="fixedSeperator" v-if="renderFixedIssues"><span class="seperatorTitle" >Fixed Issues</span></div>
        <div class="textContainer" id="fixedText" v-if="renderFixedIssues">
            <ul>
                
            </ul>
        </div>
        <div class="seperator" id="knownSeperator" v-if="renderKnownIssues"><span class="seperatorTitle">Known Issues</span></div>
        <div class="textContainer" id="knownText" v-if="renderKnownIssues">
            <ul>
                <li>Patch note window appears on every refresh. This will be fixed in the update that includes accouts at least.</li>
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
        background-color: aqua;
        border-radius: 20px;
        border: 3px solid #383D3B;

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
        border-bottom: 2px solid black;
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
        background-color: aqua;
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
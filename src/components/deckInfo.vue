<script setup>
    const emit = defineEmits(['response']);
    
    const props = defineProps({
        deckInfo: Object
    })

    console.log(props.deckInfo);
</script>

<template>
    <div id="deckInfoContainer">
        <button @click="emit('response', 'close')">back</button>
        <span class="title">{{ deckInfo.deckInfo.title }}</span>
        <span class="card_count">Cards: {{ deckInfo.deckInfo.card_count }}</span>
        <div class="author">id (wip) {{ deckInfo.deckInfo.author }}</div>
        <div id="deckContentTableContainer">
            content
        </div>
    </div>
</template>

<style scoped>
    #deckInfoContainer{
        background-color: var(--rk-c-robin_egg_blue);
        height: 90vh;
        width: 95vw;
        border-radius: 0 0 10px 10px;

        position: fixed;
        top: calc(3vh + 50px);
        left: 2.5vw;

        display: flex;
        align-items: center;
        flex-direction: column;

        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
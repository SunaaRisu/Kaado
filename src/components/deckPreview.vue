<script setup>

    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        deckInfo: Object
    });

    function openDeck(){
        router.push({ path: '/deck/' + props.deckInfo._id})
    }

</script>

<template>
    <div class="deckPreviewContainer" @click="openDeck()">
        <span>{{ deckInfo.title }}</span>
        <span>Cards: {{ deckInfo.card_count }}</span>
    </div>
</template>

<style scoped>
    .deckPreviewContainer{
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 20px;
        padding: 20px;
        border-radius: 20px;
        background-color: aqua;

        height: fit-content;
        width: 200px;
    }
</style>
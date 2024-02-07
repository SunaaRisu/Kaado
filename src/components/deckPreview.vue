<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        deckInfo: Object
    });

    function openDeck(){
        router.push({ path: '/deck/' + props.deckInfo._id }); // redirect to /deck/(deck id)
    }

</script>

<template>
    <div class="deckPreviewContainer" @click="openDeck()">
        <span>{{ deckInfo.deckInfo.title }}</span>
        <span>Cards: {{ deckInfo.deckInfo.card_count }}</span>
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
        background-color: var(--rk-c-robin_egg_blue);

        height: fit-content;
        width: 200px;
    }
</style>
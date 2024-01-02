<script setup>

    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        stackInfo: Object
    });

    function openStack(){
        router.push({ path: '/stack/' + props.stackInfo._id})
    }

</script>

<template>
    <div class="stackPreviewContainer" @click="openStack()">
        <span>{{ stackInfo.title }}</span>
        <span>Cards: {{ stackInfo.card_count }}</span>
    </div>
</template>

<style scoped>
    .stackPreviewContainer{
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
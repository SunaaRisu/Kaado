<script setup>

</script>

<template>
    <div id="stackSettingsContainer">
        <div id="deckTitle">Title</div>
        <div class="seperator"></div>
        <div id="cardCountSettingContainer">
            <input type="range" name="" id="">
        </div>
        <div class="seperator"></div>
        <div id="cardLayoutSettingContainer">

        </div>
        <div class="seperator"></div>
        <div id="cardFillingContainer">

        </div>
        <div class="seperator"></div>
        <input type="checkbox" name="saveToDB" id="" checked="true">
        <div id="btnContainer">
            <div id="saveBtn">Save</div>
            <div id="saveForStack">Use once</div>
        </div>
    </div>
</template>

<style scoped>
    #stackSettingsContainer{
        background-color: var(--rk-c-robin_egg_blue);
        height: 400px;
        width: 600px;
        border-radius: 20px;
        border: 4px solid var(--color-background);

        position: fixed;
        top: calc(50vh - 202px);
        left: calc(50vw - 302px);

        display: flex;
        align-items: center;
        flex-direction: column;

        overflow-y: scroll;
    }

    .seperator {
        height: 2px;
        width: 95%;
        margin-top: 60px;
        margin-bottom: 20px;
        background-color: var(--color-background-accent);
    }
</style>
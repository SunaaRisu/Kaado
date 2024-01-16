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
        <input type="checkbox" name="saveToDB" id="checkbox" checked="false">
        <label for="checkbox">Only save this settings for this session.</label>
        <div id="btnContainer">
            <div class="btn" id="saveBtn"><span>Save</span></div>
            <div class="btn" id="saveForStack"><span>Use once</span></div>
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

    #btnContainer {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }

    .btn {
        background-color: var(--rk-c-verdigris);
        height: 50px;
        width: 200px;
        border-radius: 5px;
        margin: 0 20px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn span {
        font-size: larger;
        font-weight: bolder;
    }

    ::-webkit-scrollbar-track {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>
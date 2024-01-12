<script setup>

</script>

<template>
    <div id="userMenuContainer">
        <div class="btn" id="accountBtn"><span>Account</span></div>
        <div class="btn" id="settingsBtn"><span>Settings</span></div>
        <div class="btn" id="logoutBtn"><span>Log out</span></div>
    </div>
</template>

<style scoped>
    #userMenuContainer {
        height: 200px;
        width: 100px;
        background-color: var(--color-background-accent);
        border-radius: 5px;

        position: fixed;
        top: 60px;
        right: 10px;
    }
</style>
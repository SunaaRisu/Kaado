<script setup>
    import { useUserStore } from '../store/user';

    const user = useUserStore();

    function signOutOnClick() {
        const request = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'}
        }

        fetch('http://localhost:3000/user/signout', request)
            .then(response => {
                switch (response.status) {
                    case 200:
                        user.removeUser();
                        break;
                
                    default:
                        console.log(response);
                        break;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
</script>

<template>
    <div id="userMenuContainer">
        <!-- <div class="btn" id="accountBtn"><span>Account</span></div>
        <div class="btn" id="settingsBtn"><span>Settings</span></div> -->
        <div class="btn" id="logoutBtn" @click="signOutOnClick()"><span>Sign out</span></div>
    </div>
</template>

<style scoped>
    #userMenuContainer {
        height: fit-content;
        width: fit-content;
        min-width: 100px;
        background-color: var(--color-background-accent);
        border-radius: 10px;
        padding: 10px 0 10px 0;

        position: fixed;
        top: 60px;
        right: 10px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .btn {
        margin: 5px 20px 5px 20px;
        background-color: var(--color-background);
        padding: 10px;
        border-radius: 10px;
    }

    .btn span {
        font-size: larger;
        font-weight: bolder;
    }

    #accountBtn, 
    #settingsBtn {
        color: var(--color-text-light);
    }

    #logoutBtn {
        color: var(--rk-c-red);
    }
</style>
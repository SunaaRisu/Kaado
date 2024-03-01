<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../store/user';
    import { useRouter } from 'vue-router';
    import jwt_decode from "jwt-decode";

    const router = useRouter();
    const user = useUserStore();


    const identifier = ref('');
    const password = ref('');
    
    const identifierErr = ref('');
    const passwordErr = ref('');
    const loginBtnDisabled = ref('');

    function loginSubmit(){
        loginBtnDisabled.value = true;

        if (identifier.value === ''){
            identifierErr.value = 'Please fill out this field.';
            loginBtnDisabled.value = false;
            return;
        }

        if (password.value === ''){
            passwordErr.value = 'Please fill out this field.';
            loginBtnDisabled.value = false;
            return;
        }

        const request = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ identifier: identifier.value, password: password.value })
        }

        fetch(import.meta.env.VITE_API + 'user/login', request)
            .then(response => {
                switch (response.status) {
                    case 200:
                        return response.json();
                        break;
                    case 404:
                        identifierErr.value = 'This account could not be found.';
                        break;
                    case 406:
                        passwordErr.value = 'The combination of username and password does not exist.';
                        break;
                    case 500:
                        passwordErr.value = 'Something went wrong. Please try again later.';
                        break;                
                    default:
                        break;
                }
            })
            .then(data => {
                    if (data) {
                        user.setJWT(data.token);
                        const jwtData = jwt_decode(data.token);
                        user.setUser(jwtData._id, jwtData.username, jwtData.email, jwtData.version, jwtData.profilePicture);

                        router.push({path: '/'});
                    }
                })
            .catch(err => {
                console.error(err);
                loginBtnDisabled.value = false;
            });
    }
</script>

<template>
    <main>
        <div class="sign_up_container">
            <form @submit.prevent="$event => loginSubmit()">
                <div class="sign_up_form_control">
                    <input type="text" name="identifier" placeholder="Username or Email" autocomplete="username || email" v-model="identifier">                    
                    <p class="p_error">{{ identifierErr }}</p>
                </div>
                <div class="sign_up_form_control">
                    <input type="password" name="password" placeholder="Password" autocomplete="current-password" v-model="password">
                    <p class="p_error">{{ passwordErr }}</p>
                    <a href="https://sunaarisu.de/wip.php">Forgot Password</a>
                </div>
                <button class="sign_up_btn" type="submit" name="submit"><strong>Login</strong></button>
            </form>
            <div class="form_footer">
                <RouterLink to="/signup"><p>Dont't have an account yet?</p></RouterLink>
                <a href="https://sunaarisu.de/privacy">Privacy</a>
            </div>
        </div>        
    </main>
</template>



<style scoped>
    main{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sign_up_container {
        background-color: var(--color-background-accent);
        padding: 20px 40px;
        border-radius: 10px;
    }

    .sign_up_container img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        margin-bottom: 50px;
    }

    .sign_up_btn {
        cursor: pointer;
        display: inline;
        width: 100%;
        background: var(--rk-c-robin_egg_blue);
        padding: 15px;
        font-family: inherit;
        font-size: 16px;
        border: 0;
        border-radius: 5px;
        margin-top: 20px;
    }

    .sign_up_btn:hover{
        background: var(--rk-c-verdigris);
    }
    .sign_up_form_control {
        position: relative;
        margin-top: 5px;
        width: 300px;
    }

    .sign_up_form_control a{
        font-size: 12px;
        color: var(--color-text-light);
    }

    .sign_up_form_control a:hover{
        color: var(--rk-c-white);
    }

    .sign_up_form_control p{
        font-size: 12px;
        height: 0px;
        margin-top: 6px;
        margin-bottom: 24px;
        color: var(--rk-c-red);
    }

    .sign_up_form_control .p_info{
        font-size: 12px;
        height: 20px;
        margin-top: 6px;
        margin-bottom: 0px;
        color: var(--rk-c-white);
    }

    .sign_up_form_control .p_error{
        font-size: 12px;
        height: 20px;
        margin-top: 6px;
        margin-bottom: 18px;
        color: var(--rk-c-red);
    }

    .sign_up_form_control input {
        background-color: transparent;
        border: 0;
        border-bottom: 2px var(--rk-c-robin_egg_blue) solid;
        display: block;
        width: 100%;
        padding: 15px 0;
        font-size: 18px;
        color: var(--color-text-light);
        
    }

    .sign_up_form_control input:focus,
    .sign_up_form_control input:valid {
        outline: 0;
        border-bottom-color: var(--rk-c-verdigris);
    }

    .sign_up_form_control label {
        position: absolute;
        top: 15px;
        left: 0;
        pointer-events: none;
    }

    .sign_up_form_control img{
        width: 25px;
        position: absolute;
        top: 15px;
        right: 0;
        pointer-events: none;
    }

    span{
        font-size: 18px;
        display: inline-block;
        transform: translateY(0px);
        transition: transform 100ms ease-in-out;
    }

    span.fade{
        transform: translateY(-30px);
    }

    .form_footer{
        text-align: center;
        width: 100%;
        padding-top: 20px;
    }

    a{
        color: var(--rk-c-white);
        text-decoration: none;
        margin-top: 15px;
    }    
</style>
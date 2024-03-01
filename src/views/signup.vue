<script setup>
    import bcrypt from 'bcryptjs/dist/bcrypt';
    import { onUpdated, ref } from 'vue';
    import { version } from '../../package.json';
    import { useUserStore } from '../store/user';
    import { useRouter } from 'vue-router';
    import jwt_decode from "jwt-decode";

    const router = useRouter();
    const user = useUserStore();

    const username = ref('');  
    const usernameErr = ref('');  
    const email = ref('');
    const emailErr = ref('');
    const password = ref('');

    const passwordErrLenght = ref(false);
    const passwordErrUpperCase = ref(false);
    const passwordErrLowerCase = ref(false);
    const passwordErrSpecial = ref(false);
    const passwordErrNumbers = ref(false);

    const conPassword = ref('');
    const conPasswordErr = ref('');

    const signupBtnDisabled = ref(false);


    onUpdated(() => {
        if (username.value.includes('@')) {
            usernameErr.value = 'Username is not allowed to contain "@"';
        }else{
            if (usernameErr.value === 'Username is not allowed to contain "@"') {
                usernameErr.value = '';
            }
        }

        if (email.value != '' && !email.value.includes('@')){
            emailErr.value = 'Pleas enter a valid email address'
        }else{
            emailErr.value = '';
        }

        if (password.value.length <= 15) {

            passwordErrLenght.value = true;           
        }else {
            passwordErrLenght.value = false;           
        }

        if (!/\d/.test(password.value)){

            passwordErrNumbers.value = true;              
        }else {
            passwordErrNumbers.value = false;              
        }

        if (!/[a-z]/.test(password.value)) {

            passwordErrLowerCase.value = true;
        }else {
            passwordErrLowerCase.value = false;
        }

        if (!/[A-Z]/.test(password.value)) {

            passwordErrUpperCase.value = true;
        }else {
            passwordErrUpperCase.value = false;
        }

        if (!/[!-\/:-@[-`{-~]/.test(password.value)) {

            passwordErrSpecial.value = true;
        }else {
            passwordErrSpecial.value = false;
        }

        if (password.value != '' && conPassword.value != '' && password.value != conPassword.value){
            conPasswordErr.value = 'Passwords do not match';
        }else{
            conPasswordErr.value = '';
        }
    })

    function signupSubmit(){
        signupBtnDisabled.value = true;

        if (username.value !== '' && !username.value.includes('@') && email.value !== '' && password.value !== '' && conPassword.value !== '' && emailErr.value === '' && passwordErrLenght.value === false && passwordErrUpperCase.value === false && passwordErrLowerCase.value === false && passwordErrSpecial.value === false && passwordErrNumbers.value === false && conPasswordErr.value === '') {
            bcrypt.hash(password.value, 15, (err, hash) => {
                if (err) {
                    console.log(err);
                    signupBtnDisabled.value = false;
                    return;
                }

                const request = {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
                    body: JSON.stringify({ 
                        username: username.value,
                        email: email.value,
                        password: hash,
                        version: version
                        })
                };

                fetch(import.meta.env.VITE_API + 'user/signup', request)
                    .then(response => {
                        switch (response.status) {
                            case 201:
                                return response.json();
                                break;

                            case 400:
                                usernameErr.value = 'Username already exists';
                                break;

                            case 500:
                                signupErr.value = 'Something went wrong. Please try again later.';
                                break;
                        
                            default:
                                break;
                        }
                        signupBtnDisabled.value = false;
                    })
                    .then(data => {
                        if (data) {
                            user.setJWT(data.token);
                            const jwtData = jwt_decode(data.token);
                            user.setUser(jwtData._id, jwtData.username, jwtData.email, jwtData.version);

                            router.push({path: '/'});
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        signupBtnDisabled.value = false;
                    });
            });
        }

        
    }
</script>

<template>
    <main>
        <div class="sign_up_container">
            <form @submit.prevent="$event => signupSubmit()">
                <div class="sign_up_form_control">
                    <input type="text" name="username" required placeholder="Username" autocomplete="username" v-model="username">
                    
                    <p>{{ usernameErr }}</p>
                </div>
                <div class="sign_up_form_control">
                    <input type="email" name="email" required placeholder="Email" autocomplete="email" v-model="email">
                    
                    <p>{{emailErr}}</p>
                </div>
                <div class="sign_up_form_control">
                    <input type="password" name="password" required placeholder="Password" autocomplete="new-password" v-model="password">
                    
                    <div class="spanContainer">
                        <span v-show="passwordErrLenght">15 characters, </span>  
                        <span v-show="passwordErrUpperCase">upper case, </span>  
                        <span v-show="passwordErrLowerCase">lower case, </span>  
                        <span v-show="passwordErrSpecial">special characters, </span>  
                        <span v-show="passwordErrNumbers">numbers</span>  
                    </div>
                    
                </div>
                <div class="sign_up_form_control">
                    <input type="password" name="conPassword" required placeholder="Confirm Password" autocomplete="current-password" v-model="conPassword">
                    
                    <p>{{ conPasswordErr }}</p>
                </div>
                <button class="sign_up_btn" type="submit" name="submit"><strong>Sign Up</strong></button>
            </form>
            <div class="form_footer">
                <RouterLink to="/login"><p>Have an account yet?</p></RouterLink>
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
        height: 12px;
        margin-top: 6px;
        margin-bottom: 12px;
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

    .spanContainer{
        height: 12px;
        margin-top: 6px;
        margin-bottom: 24px;
    }

    .spanContainer span{
        font-size: 12px;
        margin-right: 3px;
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

    ::placeholder {
        color: var(--color-text-light);
        opacity: 0.8;
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
        color: var(--color-text-light);
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
        color: var(--color-text-light);
        text-decoration: none;
        margin-top: 15px;
    }    
</style>
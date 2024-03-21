import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {
                _id: '',
                username: '',
                email: '',
                version: '',
                profilePicture: ''
            },
            jwt: ''
        }
    },
    actions: {
        setJWT(x) {
            this.jwt = x
        },
        setUser(id, username, email, version, profilePicture) {
            this.user._id = id;
            this.user.username = username;
            this.user.email = email;
            this.user.version = version;
            this.user.profilePicture = profilePicture;
        },
        removeUser() {
            this.jwt = '';
            this.user._id = '';
            this.user.username = '';
            this.user.email = '';
            this.user.version = '';
            this.user.profilePicture = '';
        },
        async get_jwt() {
            if (this.jwt !== '' && (jwt_decode(this.jwt).exp - 60) * 1000 > Date.now()) {
                return this.jwt;
            } else {
                const request = {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                };

                const response = await fetch(import.meta.env.VITE_API + 'user/refresh_token', request);

                if (response.status !== 200) {

                    return 'no token';
                }

                const data = await response.json();
                this.jwt = data.token;
                const jwtData = jwt_decode(data.token);
                this.user._id = jwtData._id;
                this.user.username = jwtData.username;
                this.user.email = jwtData.email;
                this.user.version = jwtData.version;
                this.user.profilePicture = jwtData.profilePicture;
                return data.token                
            }
        }
    }
});
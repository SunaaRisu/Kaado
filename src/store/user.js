import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {
                _id: '',
                username: '',
            },
            jwt: ''
        }
    },
    actions: {
        setJWT(x) {
            this.jwt = x
        },
        setUser(id, username) {
            this.user.id = id;
            this.user.username = username;
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

                const response = await fetch('http://localhost:3000/user/refresh_token', request);

                if (response.status !== 200) {
                    this.$router.push({ path: '/login' });
                    return 0;
                }

                const data = await response.json();
                this.jwt = data.token;
                const jwtData = jwt_decode(data.token);
                this.user.id = jwtData._id;
                this.user.username = jwtData.username;
                return data.token                
            }
        }
    }
});
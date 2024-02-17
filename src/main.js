import './assets/base.css';

import { createApp, markRaw } from "vue";
import { createPinia } from 'pinia';
import * as MathfieldElement from 'mathlive';

import App from "./App.vue";
import router from './router';

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router);
})

app.use(MathfieldElement)
app.use(pinia)
app.use(router)

app.mount('#app');
import { createRouter, createWebHistory } from 'vue-router';

import DeckSelectionView from '../views/deckSelection.vue';
import DeckView from '../views/deck.vue';
import SignupView from '../views/signup.vue';
import LoginView from '../views/login.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'deckSelection', component: DeckSelectionView},
        {path: '/deck/:id', name: 'deck', component: DeckView},
        {path: '/signup', name: 'signup', component: SignupView},
        {path: '/login', name: 'login', component: LoginView}
    ]
});

export default router;
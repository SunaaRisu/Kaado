import { createRouter, createWebHistory } from 'vue-router';

import DeckSelectionView from '../views/deckSelection.vue';
import DeckView from '../views/deck.vue';
import SignupView from '../views/signup.vue';
import LoginView from '../views/login.vue';
import CreateView from '../views/create.vue';
import MarketplaceView from '../views/marketplace.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'deckSelection', component: DeckSelectionView},
        {path: '/deck/:id', name: 'deck', component: DeckView},
        {path: '/signup', name: 'signup', component: SignupView},
        {path: '/login', name: 'login', component: LoginView},
        {path: '/create', name: 'create', component: CreateView},
        {path: '/marketplace', name: 'marketplace', component: MarketplaceView}
    ]
});

export default router;
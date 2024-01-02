import { createRouter, createWebHistory } from 'vue-router';

import DeckSelectionView from '../views/deckSelection.vue';
import DeckView from '../views/deck.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'deckSelection', component: DeckSelectionView},
        {path: '/deck/:id', name: 'deck', component: DeckView}
    ]
});

export default router;
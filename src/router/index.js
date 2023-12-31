import { createRouter, createWebHistory } from 'vue-router';

import StackSelectionView from '../views/stackSelection.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'stackSelection', component: StackSelectionView}
    ]
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';

import StackSelectionView from '../views/stackSelection.vue';
import StackView from '../views/stack.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'stackSelection', component: StackSelectionView},
        {path: '/stack/:id', name: 'stack', component: StackView}
    ]
});

export default router;
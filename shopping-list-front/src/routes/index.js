import { createRouter, createWebHistory } from 'vue-router'; 

import Items from "../views/Items.vue"; 

const routes = [
  { path: '/', component: Items },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

export default router;
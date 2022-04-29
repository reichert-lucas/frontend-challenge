import { createRouter, createWebHistory } from 'vue-router'
import Trending from '../views/Trending'

const routes = [
  {
    path: '/trending',
    name: 'trending',
    component: Trending
  },
  {
    path: '/',
    name: 'home',
    redirect: 'trending'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

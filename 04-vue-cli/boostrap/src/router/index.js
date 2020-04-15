import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import(/* webpackChunkName: "Grid" */ '../views/Grid.vue')
  },
  {
    path: '/cards',
    name: 'Cards',
    component: () => import(/* webpackChunkName: "Cards" */ '../views/Cards.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "Form" */ '../views/Form.vue')
  },
  {
    path: '/vuelidate',
    name: 'Vuelidate',
    component: () => import(/* webpackChunkName: "Vuelidate" */ '../views/Vuelidate.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

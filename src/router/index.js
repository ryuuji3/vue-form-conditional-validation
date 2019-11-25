import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'form',
    component: Form
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

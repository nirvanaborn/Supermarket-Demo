import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Detail from './views/Detail.vue'
import ShoppingCart from './views/ShoppingCart.vue'
import CartJumpPage from './views/CartJumpPage.vue'
import PersonSpace from './views/PersonSpace.vue'
import Orders from './views/Orders.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: ShoppingCart
    },
    {
      path: '/cartJumppage',
      name: 'cartJumppage',
      component: CartJumpPage
    },
    {
      path: '/personspace',
      name: 'PersonSpace',
      component: PersonSpace
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    }
  ]
})

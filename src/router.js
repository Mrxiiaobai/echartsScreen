import Vue from "vue";
import Router from "vue-router";
import login from './components/pages/login.vue'
// import index from "./index/index.vue";

let functions = [];


const menu = () => ({
  component: import( /* webpackChunkName: "menu" */ '@/components/pages/index'),
  loading: null,
  error: null,
})


let constructor = [{
  path: "/",
  name: "login",
  component: login,
  mate: {
    keepalive: true
  }
}, {
  path: '/menu',
  name: 'menu',
  component: menu,
  meta: {
    keepAlive: true
  }
}];

let routers = functions.map((item) => {
  return {
    path: `/${item}`,
    name: item,
    component: () => ({
      component: import(`@/components/functions/${item}`),
      loading: null,
      error: null,
      delay: 200,
    }),
  }
});

let config = constructor.concat(routers);

Vue.use(Router);


export default new Router({
  routes: config
});

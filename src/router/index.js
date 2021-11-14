import Vue from "vue";
import Router from "vue-router";
import List from "@/components/List.vue";
import Cart from "@/components/Cart.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // default 'hash'
  routes: [
    {
      path: "/",
      name: "products",
      component: List,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
  ],
});

import Vue from "vue";
import Router from "vue-router";
import PageListLayout from "@/layouts/PageListLayout.vue";
import Cart from "@/components/Cart.vue";
import Favourites from "@/components/Favourites.vue";
import Products from "@/components/Products.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // default 'hash'
  routes: [
    {
      path: "",
      component: PageListLayout,
      children: [
        {
          path: "/",
          name: "products",
          component: Products,
        },
        {
          path: "/favourites",
          name: "favourites",
          component: Favourites,
        },
        {
          path: "/cart",
          name: "cart",
          component: Cart,
        },
      ],
    },
  ],
});

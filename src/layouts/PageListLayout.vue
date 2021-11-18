<template>
  <div>
    <header class="header">
      <div v-if="!isCartPage" class="page-link cart-link">
        <router-link class="btn to-cart-btn" :to="{ name: 'cart' }">
          My cart
        </router-link>
        <div class="size-tooltip cart-size">
          {{ getCartSize }}
        </div>
      </div>
      <div v-if="!isProductsPage" class="page-link products-link">
        <router-link class="btn" :to="{ name: 'products' }">
          Products List
        </router-link>
      </div>
      <div v-if="!isFavouritesPage" class="page-link favourites-link">
        <router-link class="btn to-favourites-btn" :to="{ name: 'favourites' }">
          My favourites
        </router-link>
        <div class="size-tooltip favourites-size">
          {{ getFavouritesList.length }}
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "PageListLayout",
  computed: {
    ...mapGetters(["getCartSize", "getFavouritesList"]),
    isFavouritesPage() {
      return this.$route.name === "favourites";
    },
    isProductsPage() {
      return this.$route.name === "products";
    },
    isCartPage() {
      return this.$route.name === "cart";
    },
  },
};
</script>

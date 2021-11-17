<template>
  <div>
    <!-- <h1>Favourites List</h1> -->
    <div class="products">
      <div class="cart-link">
        <router-link class="btn to-cart-btn" :to="{ name: 'cart' }">
          My cart
        </router-link>
        <div class="cart-size">
          {{ getCartSize }}
        </div>
      </div>
      <div class="products-link">
        <router-link class="btn to-cart-btn" :to="{ name: 'products' }">
          Products List
        </router-link>
      </div>
      <span v-if="!getFavouritesList.length" class="empty-message"
        >No items added to favourites yet ...</span
      >
      <Card v-for="item in getFavouritesList" :key="item.uid" :item="item" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "Favourites",
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      reuired: false,
      default: "",
    },
    // todo: make non-required, write a fallback msg in template
    cardsList: {
      type: Array,
      // required: true,
    },
    actionName: {
      type: String,
      // required: true,
    },
  },
  computed: {
    ...mapGetters(["getCartSize", "getFavouritesList"]),
  },
};
</script>

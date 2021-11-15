<template>
  <div class="products">
    <div class="cart-link">
      <router-link class="btn to-cart-btn" :to="{ name: 'cart' }">
        My cart
      </router-link>
      <div class="cart-size">
        {{ getCartSize }}
      </div>
    </div>

    <Card v-for="item in productsList" :key="item.uid" :item="item" />
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "Products",
  components: {
    Card,
  },
  created() {
    if (!this.productsList.length) {
      this.$store.dispatch("getProductsList");
    }
  },
  computed: {
    ...mapState(["productsList", "cartList"]),
    ...mapGetters(["getCartSize"]),
  },
};
</script>

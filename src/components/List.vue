<template>
  <div class="products">
    <router-link class="btn to-cart-btn" :to="{ name: 'cart' }">
      My cart
    </router-link>
    <Card v-for="item in productsList" :key="item.uid" :item="item" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "List",
  components: {
    Card,
  },
  created() {
    this.$store.dispatch("getProductsList");
  },
  computed: {
    ...mapState(["productsList"]),
  },
};
</script>

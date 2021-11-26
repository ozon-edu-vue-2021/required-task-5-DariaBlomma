<template>
  <div class="products">
    <h1 class="primary-title centered">Products list</h1>
    <span v-if="!productsList.length" class="empty-message centered">
      No products yet ...
    </span>
    <div v-else class="cards-list-wrapper">
      <Card v-for="item in productsList" :key="item.uid" :item="item" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  },
};
</script>

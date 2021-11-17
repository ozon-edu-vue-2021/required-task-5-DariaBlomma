<template>
  <div>
    <!-- <h1>Products List</h1> -->
    <div class="products">
      <div class="cart-link">
        <router-link class="btn to-cart-btn" :to="{ name: 'cart' }">
          My cart
        </router-link>
        <div class="cart-size">
          {{ getCartSize }}
        </div>
      </div>
      <div class="favourites-link">
        <router-link class="btn to-favourites-btn" :to="{ name: 'favourites' }">
          My favourites
        </router-link>
        <div class="favourites-size">
          {{ getFavouritesList.length }}
        </div>
      </div>
      <Card v-for="item in productsList" :key="item.uid" :item="item" />
    </div>
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
  // props: {
  //   title: {
  //     type: String,
  //     reuired: false,
  //     default: "",
  //   },
  //   // todo: make non-required, write a fallback msg in template
  //   cardsList: {
  //     type: Array,
  //     // required: true,
  //   },
  //   actionName: {
  //     type: String,
  //     // required: true,
  //   },
  // },
  created() {
    if (!this.productsList.length) {
      this.$store.dispatch("getProductsList");
    }
    // console.log(this.$route.name);
  },
  computed: {
    ...mapState(["productsList", "cartList"]),
    ...mapGetters(["getCartSize", "getFavouritesList"]),
  },
};
</script>

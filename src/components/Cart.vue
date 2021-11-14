<template>
  <div class="cart">
    <header class="header cart__header">
      <router-link :to="{ name: 'products' }"
        >Back to products list
      </router-link>
      <h1 class="primary-title cart__title">
        Cart
        <span class="cart__items-amount">
          {{ Object.values(cartList).length }}
        </span>
      </h1>
    </header>
    <div class="cart__list">
      <Card
        v-for="item in Object.values(cartList)"
        :key="item.uid"
        :item="item"
        card-type="card-horizontal"
      />
      <span v-if="!Object.values(cartList).length" class="empty-cart">
        No products added yet ...
      </span>
      <br />
      List: {{ cartList }}
    </div>
    <div class="cart__info">
      <button
        class="btn make-order"
        :disabled="!Object.values(cartList).length"
        @click="makeOrder"
      >
        Make order
      </button>
      <div class="cart__info-line">
        <span class="cart__subtitle">Товары</span>
        <span>{{ Object.values(cartList).length }}</span>
      </div>
      <div class="cart__info-line">
        <span class="cart__subtitle">Общая стоимость</span>
        <span class="cart__total-prce">{{ getTotalCartPrice }} P</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "Cart",
  components: {
    Card,
  },
  computed: {
    ...mapState(["cartList"]),
    ...mapGetters(["getTotalCartPrice", "getOrderList"]),
  },
  methods: {
    makeOrder() {
      alert(this.getOrderList);
    },
  },
};
</script>

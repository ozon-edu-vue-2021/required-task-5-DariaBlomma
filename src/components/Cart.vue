<template>
  <div class="cart">
    <header class="header cart__header">
      <router-link :to="{ name: 'products' }"
        >Back to products list
      </router-link>
      <h1 class="primary-title cart__title">
        Cart
        <span class="cart__items-amount">
          {{ getCartSize || 0 }}
        </span>
      </h1>
    </header>
    <div class="cart__list">
      <div v-if="cartList.length">
        <Card
          v-for="item in cartList"
          :key="item.uid"
          :item="item"
          card-type="card-horizontal"
        />
      </div>
      <span v-if="getCartSize === 0" class="empty-cart">
        No products added yet ...
      </span>
    </div>
    <div class="cart__info">
      <!-- <button
        class="btn make-order"
        :disabled="!Object.values(cartList).length"
        @click="makeOrder"
      > -->
      <button
        class="btn make-order"
        :disabled="getCartSize === 0"
        @click="makeOrder"
      >
        Make order
      </button>
      <div class="cart__info-line">
        <span class="cart__subtitle">Товары</span>
        <span>{{ getCartSize || 0 }}</span>
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
    ...mapGetters(["getTotalCartPrice", "getOrderList", "getCartSize", "test"]),
  },
  methods: {
    makeOrder() {
      alert(this.getOrderList);
    },
  },
};
</script>

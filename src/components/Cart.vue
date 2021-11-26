<template>
  <div class="cart">
    <div v-if="getCartSize === 0" class="empty-message centered">
      No products in cart yet ...
    </div>
    <div v-else class="cart__inner">
      <h1 class="primary-title cart__title">
        Cart
        <span class="size-tooltip">
          {{ getCartSize || 0 }}
        </span>
      </h1>
      <div class="cart__info">
        <div class="cart__info-line">
          <span class="cart__subtitle">Товары</span>
          <span>{{ getCartSize || 0 }}</span>
        </div>
        <div class="cart__info-line">
          <span class="cart__subtitle">Общая стоимость</span>
          <span class="cart__price">{{ getTotalCartPrice }} P</span>
        </div>
        <button
          class="btn make-order"
          :disabled="getCartSize === 0"
          @click="makeOrder"
        >
          Make order
        </button>
      </div>
      <div class="cart__list">
        <Card
          v-for="item in cartList"
          :key="item.uid"
          :item="item"
          card-type="card-horizontal"
        />
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

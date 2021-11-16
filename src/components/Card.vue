<template>
  <div :class="['card', cardType]">
    <img
      :src="require(`@/assets/images/${item.imgName}.webp`)"
      :class="['card__img', `${cardType}__img`]"
    />
    <!-- <div class="card__chosen-sign">?</div>
        <div class="card__more-sign">...</div> -->
    <span :class="['card__name', `${cardType}__name`]">{{ item.dish }}</span>
    <span :class="['card__price', `${cardType}__price`]">
      {{ item.price }} P
    </span>
    <span :class="['card__description', `${cardType}__description`]">
      {{ item.description }}
    </span>
    <input type="number" class="input card__amount" v-model="amount" />
    <div class="card__btns">
      <button
        class="btn card__btn add-to-cart"
        @click="changeCartProductAmount('plus')"
      >
        Add
      </button>
      <button
        class="btn card__btn remove-from-cart"
        :disabled="!canBeRemoved"
        @click="changeCartProductAmount('minus')"
      >
        -1
      </button>
      <button
        class="btn card__btn remove-all-from-cart"
        :disabled="!canBeRemoved"
        @click="changeCartProductAmount('delete')"
      >
        Remove whole item
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      required: true,
    },
    cardType: {
      type: String,
      required: false,
      default: "card-vertical",
    },
  },
  data() {
    return {
      amount: 1,
    };
  },
  created() {
    this.amount = this.cartItem?.amount || 1;
  },
  computed: {
    ...mapState(["cartList"]),
    cartItem() {
      return this.cartList.find((item) => item.uid == this.item.uid) || {};
    },
    canBeRemoved() {
      return this.cartItem?.amount > 0 ? true : false;
    },
  },
  methods: {
    changeCartProductAmount(type) {
      const payload = {
        ...this.item,
        action: type,
        amount: parseInt(this.amount),
      };
      this.$store.dispatch("changeCartProductAmount", payload);
      this.amount = this.cartItem?.amount || 1;
    },
  },
};
</script>

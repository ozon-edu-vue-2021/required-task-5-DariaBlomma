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
      <button class="btn card__btn add-to-cart" @click="addToCart">Add</button>
      <button
        class="btn card__btn remove-from-cart"
        :disabled="!canBeRemoved"
        @click="removeOneFromCart"
      >
        -1
      </button>
      <button
        class="btn card__btn remove-all-from-cart"
        :disabled="!canBeRemoved"
        @click="removeAllFromCart"
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
      // itemIsAdded: false,
      amount: 1,
    };
  },
  created() {
    // иначе теряется после перехода по ссылке.
    // Как computed обновляется только после перехода по ссылке, не после клика
    // this.itemIsAdded = this.cartList[this.item.uid] ? true : false;

    // this.canBeRemoved = this.cartList[this.item.uid]?.amount > 0 ? true : false;
    // this.amount = this.cartList[this.item.uid]?.amount || 1;

    // const cartItem = this.cartList.find((item) => item.uid == this.item.uid);
    // this.canBeRemoved = cartItem?.amount > 0 ? true : false;
    // this.amount = cartItem?.amount || 1;
    this.amount = this.cartItem?.amount || 1;
  },
  computed: {
    ...mapState(["cartList"]),
    cartItem() {
      // console.log('this.cartList.find((item) => item.uid == this.item.uid): ', this.cartList.find((item) => item.uid == this.item.uid));
      return this.cartList.find((item) => item.uid == this.item.uid) || {};
    },
    canBeRemoved() {
      return this.cartItem?.amount > 0 ? true : false;
    },
  },
  methods: {
    addToCart() {
      const newItem = this.item;
      newItem.amount = parseInt(this.amount);
      console.log("newItem: ", newItem);
      this.$store.dispatch("addToCart", newItem);
      this.amount = this.cartItem?.amount;
    },
    removeOneFromCart() {
      const payload = {
        id: this.item.uid,
        amount: 1,
      };
      this.$store.dispatch("removeOneFromCart", payload);
      this.amount = this.cartItem?.amount;
    },
    removeAllFromCart() {
      this.$store.dispatch("removeAllFromCart", this.item.uid);
      // console.log('this.cartItem', this.cartItem);
      this.amount = 0;
    },
  },
};
</script>

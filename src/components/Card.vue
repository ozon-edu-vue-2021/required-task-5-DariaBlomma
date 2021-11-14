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
    <button
      :class="[
        'btn',
        { 'add-to-cart': !itemIsAdded },
        { 'remove-from-cart': itemIsAdded },
      ]"
      @click="updateCartList(item)"
    >
      {{ btnText }}
    </button>
  </div>
</template>
<script>
import getRandomNumber from "@/helpers/getRandomNumber.js";

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
      itemIsAdded: false,
    };
  },
  computed: {
    btnText() {
      return this.itemIsAdded ? "Remove from cart" : "Add to cart";
    },
  },
  methods: {
    getRandomNumber,
    updateCartList(item) {
      console.log("item: ", item);
      if (!this.itemIsAdded) {
        this.$store.dispatch("addToCart", item);
      } else {
        this.$store.dispatch("removeFromCart", item);
      }
      this.itemIsAdded = !this.itemIsAdded;
    },
  },
};
</script>

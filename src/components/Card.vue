<template>
  <div :class="['card', cardType]">
    <img
      :src="require(`@/assets/images/${item.imgName}.webp`)"
      :class="['card__img', `${cardType}__img`]"
    />
    <Favourite
      :class="['card__favourite-sign', { marked: isAddedToFavourites }]"
      @click="addToFavourites"
    />
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
import Favourite from "@/assets/icons/favourite.svg";

export default {
  name: "Card",
  components: {
    Favourite,
  },
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
      isAddedToFavourites: false,
    };
  },
  created() {
    this.amount = this.cartItem?.amount || 1;
    this.isAddedToFavourites = this.item.isFavourite || false;
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
    addToFavourites() {
      this.isAddedToFavourites = !this.isAddedToFavourites;
      const payload = {
        ...this.item,
        isFavourite: this.isAddedToFavourites,
      };
      this.$store.commit("updateFavouritesList", payload);
    },
  },
};
</script>

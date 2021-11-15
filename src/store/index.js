import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const API_LINK = "https://random-data-api.com/api/food/random_food?size=30";

import getRandomNumber from "@/helpers/getRandomNumber";

export default new Vuex.Store({
  state: () => ({
    productsList: [],
    cartList: [],
  }),
  getters: {
    test: (state) => {
      if (state.productsList.length) {
        return state.productsList.reduce((acc, item) => {
          acc += item.id;
          return acc;
        }, 0);
      }
    },
    getCartSize: (state) => {
      return (
        state.cartList.reduce((acc, item) => {
          console.log("item in cart size: ", item);
          acc += item.amount;
          return acc;
        }, 0) || 0
      );
    },
    getTotalCartPrice: (state) => {
      return (
        state.cartList.reduce((acc, item) => {
          acc += item.price * item.amount;
          return acc;
        }, 0) || 0
      );
    },
    getOrderList: (state) => {
      return (
        state.cartList.reduce((acc, item, index) => {
          acc += `${index + 1}. ${item.dish} `;
          return acc;
        }, "") || ""
      );
    },
  },
  mutations: {
    // adds price, img random number and amount
    addProperties(state) {
      if (state.productsList.length) {
        state.productsList.forEach((item) => {
          item.price = getRandomNumber(100);
          item.imgName = getRandomNumber(12);
          // item.amount = 1;
          Vue.set(item, "amount", 1);
        });
      }
    },
    setProductsList(state, value) {
      state.productsList = value;
    },
    addToCartList(state, product) {
      const existingProduct = state.cartList.find(
        (item) => item.uid === product.uid
      );
      if (!existingProduct) {
        state.cartList.push(product);
      } else {
        existingProduct.amount += product.amount;
      }
    },
    removeOneFromCartList(state, payload) {
      state.cartList.forEach((item) => {
        if (item.amount !== 0) {
          item.amount -= payload.amount;
        }
      });
    },
    removeAllFromCartList(state, id) {
      state.cartList = state.cartList.filter((item) => item.uid !== id);
    },
  },
  actions: {
    async getProductsList(context) {
      const response = await fetch(API_LINK);
      const products = await response.json();
      context.commit("setProductsList", products);
      context.commit("addProperties");
    },
    addToCart(context, payload) {
      context.commit("addToCartList", payload);
    },
    removeOneFromCart(context, payload) {
      context.commit("removeOneFromCartList", payload);
    },
    removeAllFromCart(context, payload) {
      context.commit("removeAllFromCartList", payload);
    },
  },
});

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
    addNewToCartList(state, product) {
      state.cartList.push(product);
    },
    addOldToCartList(state, product) {
      product.amount = product.newAmount;
    },
    removeOneFromCartList(state, product) {
      product.amount -= 1;
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
    changeCartProductAmount(context, payload) {
      const existingProduct = context.state.cartList.find(
        (item) => item.uid === payload.uid
      );
      switch (payload.action) {
        case "plus":
          if (existingProduct) {
            existingProduct.newAmount = payload.amount;
            context.commit("addOldToCartList", existingProduct);
          } else {
            context.commit("addNewToCartList", payload);
          }
          break;
        case "minus":
          if (existingProduct.amount !== 0) {
            context.commit("removeOneFromCartList", existingProduct);
          } else {
            context.commit("removeAllFromCartList", payload.uid);
          }
          break;
        case "delete":
          context.commit("removeAllFromCartList", payload.uid);
      }
    },
  },
});

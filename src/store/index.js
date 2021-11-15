import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const API_LINK = "https://random-data-api.com/api/food/random_food?size=30";

import getRandomNumber from "@/helpers/getRandomNumber";

export default new Vuex.Store({
  state: () => ({
    productsList: [],
    cartList: {},
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
    getTotalCartPrice: (state) => {
      const list = Object.values(state.cartList);
      console.log('list: ', list);
      if (list.length) {
        return list.reduce((acc, item) => {
          acc += item.price;
          return acc;
        }, 0);
      } else {
        // для теста, лучшей видимости
        // return 90;
        return 0;
      }
    },
    getOrderList: (state) => {
      return Object.values(state.cartList).reduce((acc, item, index) => {
        acc += `${index + 1}. ${item.dish} `;
        return acc;
      }, "");
    },
  },
  mutations: {
    addPriceProperty(state) {
      if (state.productsList.length) {
        state.productsList.forEach((item) => {
          item.price = getRandomNumber(100);
        });
      }
    },
    addImgName(state) {
      if (state.productsList.length) {
        state.productsList.forEach((item) => {
          item.imgName = getRandomNumber(12);
        });
      }
    },
    setProductsList(state, value) {
      state.productsList = value;
    },
    addToCartList(state, value) {
      state.cartList[value.uid] = value;
    },
    removeFromCartList(state, value) {
      delete state.cartList[value.uid];
    },
  },
  actions: {
    async getProductsList(context) {
      const response = await fetch(API_LINK);
      const products = await response.json();
      // console.log(" products: ", products);
      context.commit("setProductsList", products);
      context.commit("addPriceProperty");
      context.commit("addImgName");
    },
    addToCart(context, payload) {
      context.commit("addToCartList", payload);
    },
    removeFromCart(context, payload) {
      context.commit("removeFromCartList", payload);
    },
  },
});

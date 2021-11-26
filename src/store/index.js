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
    getCartSize: (state) => {
      return (
        state.cartList.reduce((acc, item) => {
          return acc + item.amount;
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
    getFavouritesList: (state) => {
      // не работает, возвращает пустой массив.
      console.log('in getter');
      console.log(state.productsList.filter((item) => item.isFavourite));
      return state.productsList.filter((item) => item.isFavourite);
    },
  },
  mutations: {
    // adds price, img random number, amount
    addProperties(state) {
      if (state.productsList.length) {
        state.productsList = state.productsList.map((item) => {
          item.price = getRandomNumber(100);
          item.imgName = getRandomNumber(12);
          item.amount = 1;
          // item.isFavourite = false;
          return item;
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
    updateFavouritesList(state, product) {
      // 1 вариант рабочий

      state.productsList = state.productsList.map((item) => {
        if (item.uid === product.uid) {
          item.isFavourite = product.isFavourite;
        }
        return item;
      });

      // 2 вариант рабочий

      // const existingIndex = state.productsList.findIndex(
      //   (item) => item.uid === product.uid
      // );

      // Vue.set(
      //   state.productsList[existingIndex],
      //   "isFavourite",
      //   product.isFavourite
      // );

      // 1 вариант НЕрабочий

      // state.productsList[existingIndex] = {
      //   ...state.productsList[existingIndex],
      //   isFavourite: product.isFavourite,
      // };

      // 2 вариант НЕрабочий

      // state.productsList[existingIndex].isFavourite = product.isFavourite;
    },
  },
  actions: {
    async getProductsList(context) {
      try {
        const response = await fetch(API_LINK);
        const products = await response.json();
        context.commit("setProductsList", products);
        context.commit("addProperties");
      } catch (e) {
        console.warn("Error in getProductsList: ", e);
      }
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

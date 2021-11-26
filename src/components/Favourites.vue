<template>
  <div class="favourites">
    <h1 class="primary-title centered">My favourites</h1>
    <span v-if="!getFavouritesList.length" class="empty-message centered">
      No items added to favourites yet ...
    </span>
    <div v-else class="cards-list-wrapper">
      <Card v-for="item in getFavouritesList" :key="item.uid" :item="item" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "Favourites",
  components: {
    Card,
  },
  computed: {
    ...mapGetters(["getCartSize", "getFavouritesList"]),
  },
};
</script>

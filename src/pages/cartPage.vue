<template>
  <div class="cart-page">
    <comp-header />
    <div class="main-cart">
      <div class="content">
        <table class="cart-table">
          <tr>
            <th></th>
            <th>Img</th>
            <th>Name</th>
            <th>DateTime</th>
            <th>Action</th>
          </tr>
          <tr
            class="cart-item"
            v-for="(item, index) in getCartItems"
            :key="index"
          >
            <td>{{ item.id }}</td>
            <td>
              <img
                class="img-pokemon"
                :src="item.sprites.back_default"
                alt=""
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.dateTime }}</td>
            <td class="btn-release">
              <custom-button
                class="btn-release"
                :color="'info'"
                :value="'Release'"
                :type="'button'"
                @click="removeItem(index)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import compHeader from "../components/layouts/compHeader.vue";
import customButton from "../components/comons/customButton.vue";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartPage",
  components: {
    compHeader,
    customButton,
  },
  created() {
    console.log(this.getCartItems);
  },

  computed: {
    ...mapGetters(["getCartItems"]),
  },
  methods: {
    ...mapMutations(["removeFromCart"]),
    removeItem(index) {
      this.removeFromCart(index);
    },
  },
};
</script>

<style>
.cart-page {
  width: 100%;
  position: relative;
}

.cart-page .main-cart {
  position: absolute;
  left: 10%;
  max-width: 1536px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 20px;
  width: 100%;
}

.cart-table {
  width: 100%;
  border-collapse: collapse; /* Merge table borders */
  border: 1px ridge #000;
}

.cart-table th,
.cart-table td {
  border: 1px solid #e9e5e5; /* Set solid border for table cells */
  padding: 8px;
  text-align: left;
}

.cart-table th {
  background-color: #aeadad; /* Add background color for table headers */
}
.img-pokemon {
  width: 150px;
  height: 150px;
}
.cart-item td {
  text-align: center;
}

.btn-release {
  width: 100px;
}
</style>

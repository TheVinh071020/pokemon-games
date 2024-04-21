<template>
  <div class="main-cart">
    <div class="cart-page">
      <comp-header />
      <div class="main">
        <div class="content">
          <table class="cart-table">
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Type</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
            <tr
              v-for="product in products"
              :key="product.id"
              v-on:click="clickDetail(product.id)"
              class="cart-item"
            >
              <td>{{product.id}}</td>
              <td>
                <img class="img-pokemon" :src="product.imageUrl" alt="" />
              </td>
              <td>{{product.type}}</td>
              <td>{{product.name}}</td>
              <td class="btn-release">
                <custom-button
                  class="btn-release"
                  :color="'info'"
                  :value="'Attack'"
                  :type="'button'"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customButtonVue from "../comons/customButton.vue";

export default {
  name: "GridDetailScreen",
  components: {
    customButtonVue,
  },
  props: {
    products: Array,
  },
  methods: {
    clickDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id: id } });
    },
  },
};
</script>

<style>
.main-cart .cart-page {
  width: 100%;
  margin-bottom: 20px;
}

.main-cart .cart-page .main {
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
  text-align: center;
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

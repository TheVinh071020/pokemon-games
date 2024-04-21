<template>
  <div class="product-list">
    <div
      v-for="product in products"
      :key="product.id"
      v-on:click="clickDetail(product.id)"
      class="product"
    >
      <div class="img">
        <img :src="product.imageUrl" />
      </div>
      <div class="name">
        <h3>{{ product.name }}</h3>
        <h3>#{{ product.id }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridDetailScreen",
  props: {
    products: Array,
  },
  methods: {
    clickDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id: id } });
    },
  }
};
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;
  max-width: 1536px;
}
.product {
  transition: transform 0.3s ease;
}

.product:hover {
  transform: translateY(-5px);
}
.product {
  width: calc(23% - 20px);
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ceedf32c;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  color: #504949;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  cursor: pointer;
}

.product img {
  object-fit: cover;
  width: auto;
  height: auto;
}

.product h2 {
  margin-top: 10px;
}
.product .name {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>

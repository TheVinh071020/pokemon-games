<template>
  <v-app>
    <custom-alert
      :alert-message="alertMessage"
      :type="'success'"
      :class="'alert'"
      v-if="alertMessage"
    />
    <div class="home">
      <comp-header />
      <div class="main">
        <div class="content">
          <!-- <grid-detail-screen-vue :products="products" /> -->
          <table-detail-screen :products="products" />
          <custom-pagination-vue
            :pageIndex="pageIndex"
            :page-length="pageLength"
            :total-visible="7"
            @page-changed="handlePageChanged"
          />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import CompHeader from "../components/layouts/compHeader.vue";
import customPaginationVue from "../components/comons/customPagination.vue";
import GridDetailScreenVue from "../components/screens/gridDetailScreen.vue";
import axios from "axios";
import TableDetailScreen from "../components/screens/tableDetailScreen.vue";
import CustomAlert from "../components/comons/customAlert.vue";

export default {
  components: {
    CompHeader,
    customPaginationVue,
    GridDetailScreenVue,
    TableDetailScreen,
    CustomAlert,
  },
  data() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return {
      products: [],
      pageIndex: 1,
      pageLength: 12,
      totalProducts: 0,
      totalPages: 0,
    };
  },
  created() {
    this.renderProducts();
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },
  methods: {
    async renderProducts() {
      const offset = (this.pageIndex - 1) * this.pageLength;
      await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.pageLength}&offset=${offset}`
        )
        .then(async (response) => {
          for (let pokemon of response.data.results) {
            try {
              const pokemonDetails = await axios.get(pokemon.url);
              this.products.push({
                id: pokemonDetails.data.id,
                name: pokemonDetails.data.name,
                abilities: pokemonDetails.data.abilities,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.data.id}.png`,
              });
            } catch (error) {
              console.error("Error fetching Pokemon details:", error);
            }
          }

          this.totalProducts = response.data.count;
          this.totalPages = Math.ceil(this.totalProducts / this.pageLength);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon list:", error);
        });
    },
    clickDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id: id } });
    },
    handlePageChanged(newPageIndex) {
      this.pageIndex = newPageIndex;
      console.log(newPageIndex);
      this.renderProducts();
    },
  },
};
</script>
<style scoped>
.home {
  width: 100%;
}
.main {
  position: relative;
  width: 100%;
}
.main .content {
  position: absolute;
  left: 10%;
  max-width: 1536px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 20px;
  width: 100%;
}
.paginate {
  display: flex;
  justify-content: center;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px;
  max-width: 1536px;
}
.name {
  display: flex;
  align-content: center;
  justify-content: space-between;
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
</style>

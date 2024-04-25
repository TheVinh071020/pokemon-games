<template>
  <v-app>
    <div class="home">
      <comp-header />
      <div class="main">
        <custom-alert
          :alert-message="alertMessage"
          :type="'success'"
          :class="'alert'"
          v-if="alertMessage === 'Logged in successfully !'"
        />
        <div class="tab-container">
          <v-tabs>
            <v-tab @click="handleChangeTabList"
              ><i class="fa-solid fa-list"></i
            ></v-tab>
            <v-tab @click="handleChangeTab"
              ><i class="fa-solid fa-table-list"></i
            ></v-tab>
          </v-tabs>
        </div>
        <div class="content">
          <template v-if="changeTab === 0">
            <grid-detail-screen :listPokemon="listPokemon" />
          </template>
          <template v-else>
            <table-detail-screen :listPokemon="listPokemon" />
          </template>
          <div class="icon-loading" v-if="isloading">
            <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
          </div>
          <custom-pagination
            :pageIndex="pageIndex"
            :page-length="pageLength"
            :total-visible="7"
            style="margin: 45px"
            @page-changed="handlePageChanged"
          />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import CompHeader from "../components/layouts/compHeader.vue";
import CustomPagination from "../components/comons/customPagination.vue";
import GridDetailScreen from "../components/screens/gridDetailScreen.vue";
import TableDetailScreen from "../components/screens/tableDetailScreen.vue";
import CustomAlert from "../components/comons/customAlert.vue";
import CustomButton from "../components/comons/customButton.vue";
import { getListPokemonAxios } from "../axios/getListPokemonAxios";

export default {
  name: "HomePage",
  components: {
    CompHeader,
    CustomPagination,
    GridDetailScreen,
    TableDetailScreen,
    CustomAlert,
    CustomButton,
  },
  data() {
    return {
      listPokemon: [],
      pageIndex: 1,
      pageLength: 12,
      totalProducts: 0,
      totalPages: 0,
      changeTab: 0,
      isloading: true,
    };
  },
  created() {
    this.GetListPokemon();
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },
  methods: {
    async GetListPokemon() {
      try {
        const offset = (this.pageIndex - 1) * this.pageLength;
        const response = await getListPokemonAxios(offset, this.pageLength);
        this.listPokemon = response.listPokemon;
        this.totalProducts = response.totalProducts;
        this.totalPages = response.totalPages;
        this.isloading = false;
      } catch (error) {
        console.error("Fetching Pokemon list failed", error);
      }
    },
    clickDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id: id } });
    },
    handlePageChanged(newPageIndex) {
      setTimeout(async () => {
        this.pageIndex = newPageIndex;
        this.GetListPokemon();
      }, 300);
      this.isloading = true; // Set loading state to true
    },
    handleChangeTabList() {
      this.changeTab = 0;
    },
    handleChangeTab() {
      this.changeTab = 1;
    },
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  height: auto;
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
  margin-top: 50px;
  width: 100%;
}

.icon-loading {
  position: absolute;
  left: 49%;
  bottom: 16%;
}
.tab-container {
  position: absolute;
  right: 10%;
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

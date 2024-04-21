<template>
  <div class="detail">
    <comp-header />
    <div class="detail-pages">
      <div class="container">
        <div class="label">
          <h2>{{ pokemon.name }}</h2>
          <p>#{{ pokemon.id }}</p>
        </div>
        <div class="name">
          <div class="img">
            <img :src="pokemon.imageUrl" alt="" />
            <div @click="catchPokemon(pokemon.id)" class="btn-catch">
              <custom-button
                value="Bắt"
                type="button"
                color="info"
                size="medium"
              />
            </div>
            <!-- <custom-dialog-vue
              :dialogVisible="dialogVisible"
              @closeDialog="dialogVisible = false"
            /> -->
            <!-- <v-btn color="primary" dark @click="openDialog = true">
              Open Dialog
            </v-btn> -->
            <button @click="openDialog">Open Dialog</button>
          </div>

          <infor-detail-screen-vue :pokemon="pokemon" />

          <div class="stats">
            <h2>Stats</h2>
            <div class="chart">
              <custom-chart :chartData="chartData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-alert type="success"></v-alert>

    <div class="dialog-container" v-if="dialogVisible">
      <div class="dialog-overlay"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>Dialog Title</h2>
          <button @click="closeDialog">Close</button>
        </div>
        <div class="dialog-body">
          <!-- Dialog content goes here -->
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et enim
          nec metus dapibus tempor. Nullam vitae ipsum justo.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompHeader from "../components/layouts/compHeader.vue";
import CustomChart from "../components/comons/customChart.vue";
import InforDetailScreenVue from "../components/screens/inforDetailScreen.vue";
import { ConfigApiPokemon } from "../components/API/configApiPokemon";
import CustomButton from "../components/comons/customButton.vue";
import CustomDialogVue from "../components/comons/CustomDialog.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "DetailPage",
  components: {
    CompHeader,
    CustomChart,
    InforDetailScreenVue,
    CustomButton,
    CustomDialogVue,
  },
  data() {
    return {
      pokemon: {},
      chartData: [],
      cart: [],
      dialogVisible: false,
    };
  },
  created() {
    this.fetchPokemonDetails();
  },
  computed: {
    // Ánh xạ getter getCartItems từ Vuex store
    ...mapGetters(["getCartItems"]),
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    fetchPokemonDetails() {
      const pokemonId = this.$route.params.id;
      ConfigApiPokemon.get(`/${pokemonId}`)
        .then((response) => {
          this.pokemon = {
            id: response.data.id,
            name: response.data.name,
            imageUrl: response.data.sprites.front_default,
            height: response.data.height,
            weight: response.data.weight,
            abilities: response.data.abilities.map((ability) => ({
              ability: {
                name: ability.ability.name,
              },
              is_hidden: ability.is_hidden,
            })),
            types: response.data.types.map((type) => ({
              type: {
                name: type.type.name,
                url: type.type.url,
              },
            })),
          };
          this.chartData = response.data.stats.map((stat) => ({
            base_stat: stat.base_stat,
            name: stat.stat.name,
            url: stat.stat.url,
          }));
        })
        .catch((error) => {
          console.error("Error fetching Pokemon details:", error);
        });
    },
    ...mapActions(["catch"]),

    async catchPokemon(id) {
      try {
        const isCatchSuccessful = Math.random() < 0.5;
        if (isCatchSuccessful) {
          this.catch(id);
          alert("Bắt pokemon thành công");
        } else {
          alert("Bắt pokemon không thành công");
        }
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    },
  },
};
</script>

<style scoped>
.detail {
  width: 100%;
}

.btn-catch {
  display: flex;
  justify-content: center;
}

.img {
  display: flex;
  flex-direction: column;
}

.label {
  display: flex;
  justify-content: center;
  text-align: center;
}

.label p {
  font-size: 20px;
  margin-top: 3rem;
  margin-left: 10px;
}

.label h2 {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
  font-size: 40px;
}

@media (max-width: 768px) {
  .container {
    margin-left: 0;
  }

  .label p {
    margin-left: 0;
    text-align: center;
  }

  .label h2 {
    margin-left: 0;
    text-align: center;
  }

  .box1 {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>

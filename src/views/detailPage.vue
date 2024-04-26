<template>
  <v-app>
    <v-main>
      <custom-alert
        :alert-message="alertMessage"
        :type="'success'"
        :class="'catchPokemon'"
        v-if="alertMessage === 'Successfully caught Pokemon !'"
      />
      <custom-alert
        :alert-message="alertMessage"
        :type="'error'"
        :class="'catchPokemon'"
        v-if="alertMessage === 'Sorry, the Pokemon escaped!'"
      />
      <custom-alert
        :alert-message="alertMessage"
        :type="'error'"
        :class="'catchPokemon'"
        v-if="alertMessage === 'Please enter a name for the Pokemon to catch !'"
      />
      <div class="detail">
        <comp-header />
        <div class="detail-pages">
          <v-container>
            <div class="container">
              <div class="icon-loading" v-if="isloading">
                <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
              </div>
              <div class="label">
                <h2>{{ pokemon.name }}</h2>
                <p>#{{ pokemon.id }}</p>
              </div>
              <div class="name">
                <div class="img">
                  <img :src="pokemon.imageUrl" alt="" />
                  <div @click="catchPokemon(pokemon.id)" class="btn-catch">
                    <custom-button
                      value="Catch"
                      type="button"
                      color="info"
                      size="medium"
                    />
                  </div>
                </div>

                <infor-detail-screen-vue :pokemon="pokemon" />

                <div class="stats">
                  <h2>Stats</h2>
                  <div class="chart">
                    <custom-chart :chartData="chartData" />
                  </div>
                </div>
              </div></div
          ></v-container>
        </div>
      </div>
      <!-- dialog -->
      <v-dialog v-model="popupVisible" max-width="500px" persistent>
        <v-card>
          <v-card-title class="head-dialog">
            <span class="headline">Change the name to put in your bag</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <custom-input
                      v-model="username"
                      :id="'text'"
                      :type="'text'"
                      :class="'custom-input'"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="closePopup">Cancel</v-btn>
            <v-btn
              color="primary"
              text
              @click="comfirmCatchPokemon(pokemon.id)"
            >
              Confirm
            </v-btn>
            <div class="icon-loading" v-if="isloading">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import CompHeader from "../layouts/compHeader.vue";
import CustomChart from "../components/common/customChart.vue";
import InforDetailScreenVue from "../components/screens/inforDetailScreen.vue";
import CustomButton from "../components/common/customButton.vue";
import CustomDialogVue from "../components/common/customDialog.vue";

import CustomAlert from "../components/common/customAlert.vue";
import CustomInput from "../components/common/customInput.vue";

import { getPokemonWithUserIdAxios } from "../axios/getPokemonWithUserIdAxios";
import { getDetailPokemonAxios } from "../axios/getDetailPokemonAxios";

export default {
  name: "DetailPage",
  components: {
    CompHeader,
    CustomChart,
    InforDetailScreenVue,
    CustomButton,
    CustomDialogVue,
    CustomAlert,
    CustomInput,
  },
  data() {
    return {
      username: "",
      pokemon: {},
      chartData: [],
      cart: [],
      dialogVisible: false,
      showAlert: false,
      popupVisible: false,
      isloading: false,
    };
  },
  created() {
    this.fetchPokemonDetails();
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
    cartItems() {
      return this.$store.getters.getCartItems;
    },
  },
  mounted() {
    console.log(this.cartItems); // In ra nội dung của state.cart
  },
  methods: {
    closePopup() {
      this.popupVisible = false;
      this.$store.dispatch("showAlert", "Sorry, the Pokemon escaped!");
    },
    async fetchPokemonDetails() {
      try {
        const pokemonId = this.$route.params.id;
        const response = await getDetailPokemonAxios(pokemonId);
        this.pokemon = response.pokemon;
        this.chartData = response.chartData;
      } catch (error) {
        console.error("Fetching Pokemon details failed", error);
      }
    },

    // Sự kiện open dialog để bắt pokemon
    async catchPokemon(id) {
      this.isloading = true;
      if (!id) {
        this.$store.dispatch("showAlert", "Please log in to play the game!");
        return;
      }
      setTimeout(async () => {
        try {
          const isCatchSuccessful = Math.random() < 0.5;
          if (isCatchSuccessful) {
            this.popupVisible = true;
            this.$store.dispatch("showAlert", "Successfully caught Pokemon !");
            this.isloading = false;
          } else {
            this.$store.dispatch("showAlert", "Sorry, the Pokemon escaped!");
            this.isloading = false;
          }
        } catch (error) {
          console.error("Error fetching Pokemon details:", error);
        }
      }, 1000);
    },

    // Sự kiện xác nhận bắt pokemon
    async comfirmCatchPokemon() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (this.username) {
        this.isloading = true;
        setTimeout(async () => {
          try {
            const result = await getPokemonWithUserIdAxios(
              this.pokemon.id,
              currentUser,
              this.username
            );
            this.$store.dispatch("showAlert", "Successfully caught Pokemon !");
            this.popupVisible = false;
            this.isloading = false;
          } catch (error) {
            console.log(error);
          }
        }, 500);
      } else {
        this.$store.dispatch(
          "showAlert",
          "Please enter a name for the Pokemon to catch !"
        );
      }
    },
  },
};
</script>

<style scoped>
.icon-loading {
  position: absolute;
  left: 50%;
  bottom: 55%;
  position: fixed;
}
.head-dialog {
  justify-content: center;
}
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
  width: 270px;
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

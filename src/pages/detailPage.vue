<template>
  <v-app>
    <v-main>
      <custom-alert
        :alert-message="alertMessage"
        :type="'success'"
        :class="'catchPokemon'"
        v-if="alertMessage === 'Bạn đã bắt thành công !'"
      />
      <custom-alert
        :alert-message="alertMessage"
        :type="'error'"
        :class="'catchPokemon'"
        v-if="alertMessage === 'Rất tiếc Pokemon đã thoát được !'"
      />
      <custom-alert
        :alert-message="alertMessage"
        :type="'error'"
        :class="'catchPokemon'"
        v-if="alertMessage === 'Vui lòng nhập tên cho Pokemon để bắt !'"
      />
      <div class="detail">
        <comp-header />
        <div class="detail-pages">
          <v-container>
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
          <v-card-title>
            <span class="headline">Hãy đổi tên Pokemon để bỏ vào túi</span>
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
            <v-btn color="primary" text @click="closePopup">Hủy</v-btn>
            <v-btn color="primary" text @click="comfirmCatchPokemon(pokemon.id)"
              >Xác nhận</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import CompHeader from "../components/layouts/compHeader.vue";
import CustomChart from "../components/comons/customChart.vue";
import InforDetailScreenVue from "../components/screens/inforDetailScreen.vue";
import CustomButton from "../components/comons/customButton.vue";
import CustomDialogVue from "../components/comons/customDialog.vue";

import CustomAlert from "../components/comons/customAlert.vue";
import CustomInput from "../components/comons/customInput.vue";

import { getPokemonWithUserIdAxios } from "../components/axios/getPokemonWithUserIdAxios";
import { getDetailPokemonAxios } from "../components/axios/getDetailPokemonAxios";

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
    };
  },
  created() {
    this.fetchPokemonDetails();
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },
  methods: {
    closePopup() {
      this.popupVisible = false;
      this.$store.dispatch("showAlert", "Rất tiếc Pokemon đã thoát được !");
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
      try {
        const isCatchSuccessful = Math.random() < 0.5;
        if (isCatchSuccessful) {
          this.popupVisible = true;
          this.$store.dispatch("showAlert", "Bạn đã bắt thành công !");
        } else {
          this.$store.dispatch("showAlert", "Rất tiếc Pokemon đã thoát được !");
        }
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    },

    // Sự kiện xác nhận bắt pokemon
    async comfirmCatchPokemon() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (this.username) {
        try {
          const result = await getPokemonWithUserIdAxios(
            this.pokemon.id,
            currentUser,
            this.username
          );
          this.$store.dispatch("showAlert", "Bạn đã bắt thành công !");
          this.popupVisible = false;
        } catch (error) {
          this.$store.dispatch("showAlert", "Đã xảy ra lỗi khi bắt Pokemon !");
        }
      } else {
        this.$store.dispatch(
          "showAlert",
          "Vui lòng nhập tên cho Pokemon để bắt !"
        );
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

<template>
  <v-app
    ><v-main>
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
      <v-dialog v-model="popupVisible" max-width="500px">
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
            <v-btn color="primary" text @click="attackPokemon">Xác nhận</v-btn>
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
import CustomDialogVue from "../components/comons/CustomDialog.vue";

import CustomAlert from "../components/comons/customAlert.vue";
import CustomInput from "../components/comons/customInput.vue";

import { ConfigApiPokemon } from "../components/API/configApiPokemon";
import { ConfigApiMock } from "../components/API/ConfigApiMock";

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

    // Sự kiện bắt pokemon
    async catchPokemon(id) {
      try {
        const isCatchSuccessful = Math.random() < 0.5;
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (isCatchSuccessful) {
          this.popupVisible = true;
          const response = await ConfigApiPokemon.get(`/${id}`);
          this.cart = {
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
          const dataCart = {
            user_id: currentUser.id,
            myBag: [this.cart],
            createAt: new Date().toLocaleString(),
            status: 0,
          };
          const result = await ConfigApiMock.post("/cart", dataCart);
          this.$store.dispatch("showAlert", "Bạn đã bắt thành công !");
        } else {
          this.$store.dispatch("showAlert", "Rất tiếc Pokemon đã thoát được !");
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

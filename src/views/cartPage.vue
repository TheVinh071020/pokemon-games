<template>
  <v-app>
    <div class="cart-page">
      <comp-header />
      <div class="main-cart">
        <custom-alert
          :alert-message="alertMessage"
          :type="'error'"
          :class="'releasePokemon'"
          v-if="alertMessage"
        />
        <v-container>
          <div class="content">
            <v-card
              ><v-card-title>
                <span class="headline">My Bag</span>
                <div class="icon-loading" v-if="isloading">
                  <i class="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                </div>
              </v-card-title>

              <v-card-text>
                <template>
                  <v-simple-table
                    fixed-header
                    height="700px"
                    class="table-dialog"
                  >
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-center">ID</th>
                          <th class="text-center">Name</th>
                          <th class="text-center">Image</th>
                          <th class="text-center">Type</th>
                          <th class="text-center date">DateTime</th>
                          <th class="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="cart-item"
                          v-for="(item, index) in cart"
                          :key="index"
                        >
                          <td>{{ item.cartId }}</td>
                          <td>{{ item.newNamePokemon }}</td>
                          <td>
                            <img :src="item.imageUrl" alt="" />
                          </td>
                          <td class="type-dialog">
                            <div class="type-tab-dialog">
                              <div>
                                <p>{{ item.types[0].type.name }}</p>
                              </div>
                            </div>
                          </td>
                          <td>{{ item.createAt }}</td>
                          <td>
                            <custom-button
                              :color="'error'"
                              :value="'Release'"
                              :type="'button'"
                              @custom-click="removeItem(item.cartId)"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-card-text>
            </v-card>
          </div>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import CompHeader from "../layouts/compHeader.vue";
import CustomButton from "../components/common/customButton.vue";
import CustomAlert from "../components/common/customAlert.vue";
import CustomPagination from "../components/common/customPagination.vue";

import { getMyBagPokemonAxios } from "../axios/getMyBagPokemonAxios";
import { ConfigApiMock } from "../api/configApiMock";
import { mapMutations } from "vuex";

export default {
  name: "CartPage",
  components: {
    CompHeader,
    CustomButton,
    CustomAlert,
    CustomPagination,
  },
  data() {
    return {
      cart: [],
      showAlert: false,
      isloading: true,
    };
  },
  created() {
    setTimeout(async () => {
      this.getMyBag();
      this.isloading = false;
    }, 500);
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },
  methods: {
    async getMyBag() {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const myBag = await getMyBagPokemonAxios(currentUser);
        this.cart = myBag;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },

    ...mapMutations(["removeFromCart"]),
    async removeItem(cartId) {
      this.isloading = true;
      setTimeout(async () => {
        try {
          await ConfigApiMock.delete(`/cart/${cartId}`);
          this.$store.dispatch("showAlert", "You have released a Pokemon !");
          this.cart = this.cart.filter((item) => item.cartId !== cartId);
          this.isloading = false;
        } catch (error) {
          console.error("Error removing item:", error);
        }
      }, 500);
    },
  },
};
</script>

<style>
.icon-loading {
  position: absolute;
  left: 50%;
  bottom: 55%;
  position: fixed;
}
.content .cart-item {
  align-items: center;
}
.date {
  width: 170px;
}
.cart-page {
  width: 100%;
  position: relative;
}
.text-left {
  text-align: center;
}

.cart-page .main-cart {
  position: absolute;
  left: 10%;
  max-width: 1536px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 0;
  width: 100%;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
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

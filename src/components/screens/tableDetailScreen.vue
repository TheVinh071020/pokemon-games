<template>
  <v-app>
    <v-container
      ><custom-alert
        :alert-message="alertMessage"
        :type="'success'"
        :class="'catchPokemon'"
        v-if="alertMessage"
      />
      <div class="main-cart">
        <div class="cart-page">
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
                  v-for="pokemon in listPokemon"
                  :key="pokemon.id"
                  class="cart-item"
                >
                  <td>{{ pokemon.id }}</td>
                  <td>
                    <img
                      v-on:click="clickDetail(pokemon.id)"
                      class="img-pokemon"
                      :src="pokemon.imageUrl"
                      alt=""
                    />
                  </td>
                  <td class="type">
                    <div class="type-tab">
                      <div v-for="(type, index) in pokemon.types" :key="index">
                        {{ type.type.name }} <br />
                      </div>
                    </div>
                  </td>
                  <td>{{ pokemon.name }}</td>
                  <td class="btn-release">
                    <custom-button
                      class="btn-release"
                      :color="'success'"
                      :value="'Tấn công'"
                      :type="'button'"
                      @custom-click="clickAttack(pokemon.id)"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- dialog -->
      <v-dialog v-model="popupVisible" max-width="800px" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Chọn Pokemon của bạn để chiến đấu</span>
          </v-card-title>
          <v-card-text>
            <template>
              <v-simple-table fixed-header height="500px" class="table-dialog">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Image</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in myBag" :key="item.id">
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
                      <td>
                        <custom-button
                          :color="'success'"
                          :value="'Chọn'"
                          :type="'button'"
                          @custom-click="ChoosingPokemon(item.cartId)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="closePopup">Hủy</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import CustomButton from "../comons/customButton.vue";
import CustomAlert from "../comons/customAlert.vue";
import { ConfigApiMock } from "../api/configApiMock";

export default {
  name: "GridDetailScreen",
  components: {
    CustomButton,
    CustomAlert,
  },
  props: {
    listPokemon: Array,
  },
  data() {
    return {
      myBag: [],
      selectedPokemonId: null,
      showAlert: false,
      popupVisible: false,
    };
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },
  methods: {
    // Thao tác vào trang chi tiết
    clickDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id: id } });
    },
    closePopup() {
      this.popupVisible = false;
    },

    // Thao tác click tấn công
    async clickAttack(pokemonId) {
      this.selectedPokemonId = pokemonId;
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        this.$store.dispatch("showAlert", "Hãy đăng nhập để chơi game nhé !");
      }
      await ConfigApiMock.get(`/cart?userId=${currentUser.id}`)
        .then((res) => {
          this.myBag = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.popupVisible = true;
    },

    // Thao tác chọn pokemon để chiến
    // Thao tác chọn pokemon để chiến
    // ChoosingPokemon(id) {
    //   ////////////////////////
    //   // Người tấn công
    //   const attacker = this.myBag.find((pokemon) => pokemon.cartId === id);

    //   // Tộc hệ
    //   const typesAttacker = attacker.types.map((type) => type.type.name);
    //   const attackerTypes = typesAttacker[0];

    //   // Chỉ số tấn công
    //   let attackerAttackStat = attacker.stats.find(
    //     (stat) => stat.name === "attack"
    //   ).base_stat;

    //   // Lưu trữ giá trị ban đầu của attackerAttackStat
    //   const initialAttackerAttackStat = attackerAttackStat;

    //   // Chỉ số HP
    //   const attackerHpStat = attacker.stats.find(
    //     (stat) => stat.name === "hp"
    //   ).base_stat;

    //   // Chỉ số phòng thủ
    //   const attackerDefenseStat = attacker.stats.find(
    //     (stat) => stat.name === "defense"
    //   ).base_stat;

    //   // Tổng chỉ số phòng thủ của người tấn công
    //   const attackerTotalDefense = attackerHpStat + attackerDefenseStat;

    //   /////////////////////////
    //   // Người phòng thủ
    //   const defender = this.listPokemon.find(
    //     (pokemon) => pokemon.id === this.selectedPokemonId
    //   );

    //   // Tộc hệ
    //   const typesDefender = defender.types.map((types) => types.type);
    //   const defenderTypes = typesDefender[0].name;

    //   // Chỉ số tấn công
    //   const defenderAttackStat = defender.stats.find(
    //     (stat) => stat.stat.name === "attack"
    //   ).base_stat;

    //   const initialDefenderDefenseStat = defenderAttackStat;

    //   // Chỉ số HP
    //   const defenderHpStat = defender.stats.find(
    //     (stat) => stat.stat.name === "hp"
    //   ).base_stat;

    //   // Chỉ số phòng thủ
    //   const defenderDefenseStat = defender.stats.find(
    //     (stat) => stat.stat.name === "defense"
    //   ).base_stat;

    //   // Tổng chỉ số phòng thủ của người phòng thủ
    //   const defenderTotalDefense = defenderHpStat + defenderDefenseStat;

    //   ///////////////////////////
    //   if (attackerTypes === "normal") {
    //     if (
    //       defenderTypes === "normal" ||
    //       defenderTypes === "fire" ||
    //       defenderTypes === "water" ||
    //       defenderTypes === "grass" ||
    //       defenderTypes === "electric" ||
    //       defenderTypes === "ice" ||
    //       defenderTypes === "fighting" ||
    //       defenderTypes === "poison" ||
    //       defenderTypes === "ground" ||
    //       defenderTypes === "flying" ||
    //       defenderTypes === "psychique" ||
    //       defenderTypes === "bug" ||
    //       defenderTypes === "dragon" ||
    //       defenderTypes === "dark" ||
    //       defenderTypes === "fairy"
    //     ) {
    //       // Gán lại giá trị ban đầu cho attackerAttackStat
    //       attackerAttackStat = initialAttackerAttackStat;
    //       // defenderAttackStat = initialDefenderDefenseStat;
    //     } else if (defenderTypes === "rock" || defenderTypes === "steel") {
    //       attackerAttackStat = attackerAttackStat * 0.5;
    //     }
    //   }
    // },
    // Thao tác chọn pokemon để chiến
    ChoosingPokemon(id) {
      // Lấy thông tin của attacker và defender
      const attacker = this.myBag.find((pokemon) => pokemon.cartId === id);
      const defender = this.listPokemon.find(
        (pokemon) => pokemon.id === this.selectedPokemonId
      );

      // Tính toán sức mạnh tấn công và phòng thủ của cả hai Pokémon
      const attackerAttackStat = attacker.stats.find(
        (stat) => stat.name === "attack"
      ).base_stat;
      const attackerHpStat = attacker.stats.find(
        (stat) => stat.name === "hp"
      ).base_stat;
      const attackerDefenseStat = attacker.stats.find(
        (stat) => stat.name === "defense"
      ).base_stat;
      const attackerTotalDefense = attackerHpStat + attackerDefenseStat;

      const defenderAttackStat = defender.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      const defenderHpStat = defender.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      const defenderDefenseStat = defender.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      const defenderTotalDefense = defenderHpStat + defenderDefenseStat;

      console.log("defenderTotalDefense");
      // Giảm chỉ số HP của Pokémon phòng thủ
      if (defenderTotalDefense > 0) {
        console.log("hp");
        let damage = attackerAttackStat - defenderDefenseStat;
        if (damage < 0) {
          damage = 0;
        } 
        this.updateDefenderHp(damage); 
      }

      // Kiểm tra điều kiện chiến thắng
      if (defenderHpStat === 0) {
        alert("Pokemon đối phương đã hết máu. Bạn thắng!");
      } else if (attackerHpStat === 0) {
        alert("Pokemon của bạn đã hết máu. Bạn thua!");
      } else {
        alert("Hai Pokémon đều còn máu.");
      }
    },
    updateDefenderHp(damage) {
      this.defenderHpStat -= damage;
    },
  },
};
</script>

<style>
.main-cart .cart-page {
  width: 100%;
  margin-bottom: 20px;
}
.type {
  width: 165px;
}

.type .type-tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.type .type-tab div {
  border: 1px ridge #e6e4e4;
  width: 140px;
  height: 30px;
  margin-top: 10px;
  border-radius: 15px;
  background-color: rgb(118, 207, 118);
}

.type-dialog .type-tab-dialog {
  display: flex;
  justify-content: center;
  text-align: center;
}

.type-dialog .type-tab-dialog div {
  border: 1px ridge #e6e4e4;
  text-align: center;
  justify-content: center;
  display: flex;
  width: 120px;
  height: 40px;
  margin-top: 5px;
  border-radius: 15px;
  background-color: rgb(118, 207, 118);
}
.type-dialog .type-tab-dialog div p {
  margin-top: 1px;
  font-size: medium;
  font-weight: 300;
}
.main-cart .cart-page .main {
  max-width: 1536px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 20px;
  width: 100%;
}

.table-dialog th {
  background-color: #aeadad;
  font-weight: bold;
}

.table-dialog td {
  padding: 10px;
}

.type-dialog {
  width: 150px;
}

.type-tab-dialog div {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
}

.text-center {
  text-align: center;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px ridge #000;
}

.cart-table th,
.cart-table td {
  border: 1px solid #e9e5e5;
  padding: 8px;
  text-align: center;
}

.cart-table th {
  background-color: #aeadad;
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

<template>
  <v-app>
    <custom-alert
      :alert-message="alertMessage"
      :type="'success'"
      :class="'alert'"
      v-if="alertMessage === 'Đăng nhập thành công !'"
    />
    <custom-alert
      :alert-message="alertMessage"
      :type="'error'"
      :class="'alert'"
      v-if="alertMessage === 'Tên người dùng hoặc mật khẩu không đúng !'"
    />
    <div class="register-page">
      <div class="page-left">
        <v-container>
          <h1 class="text">SIGN IN</h1>
          <form class="mt-5" v-on:submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="username">Username:</label>
              <custom-input
                v-model="username"
                :id="'text'"
                :type="'text'"
                :class="'form-control'"
                @input="clearError('username')"
              />
              <span
                class="error-message"
                v-if="errors.usernameError && !username"
                >{{ errors.usernameError }}</span
              >
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <custom-input
                v-model="password"
                :id="'password'"
                :type="'password'"
                :class="'form-control'"
                @input="clearError('password')"
              />
              <span
                class="error-message"
                v-if="errors.passwordError && !password"
                >{{ errors.passwordError }}</span
              >
            </div>
            <custom-button
              :value="'SIGN IN'"
              :type="'submit'"
              :color="'success'"
            />
          </form>
          <div class="or">or</div>
          <router-link to="/register">
            <div style="width: 150px">
              <custom-button
                :value="'SIGN UP'"
                :type="'submit'"
                :color="'primary'"
                :style="'width: 150px; margin-left: 277%'"
              />
            </div>
          </router-link>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import { ConfigApiMock } from "../API/ConfigApiMock";
import customInput from "../comons/customInput.vue";
import customButton from "../comons/customButton.vue";
import customAlert from "../comons/customAlert.vue";

import { mapActions } from "vuex";

export default {
  components: {
    customInput,
    customButton,
    customAlert,
  },
  data() {
    return {
      username: "",
      password: "",
      errors: {
        usernameError: "",
        passwordError: "",
      },
      showAlert: false,
    };
  },
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },

  methods: {

    // Sự kiện submit form
    handleSubmit() {
      this.errors = {};
      if (!this.username) {
        this.errors.usernameError = "Vui lòng nhập tên người dùng";
      }
      if (!this.password) {
        this.errors.passwordError = "Vui lòng nhập mật khẩu";
      }
      if (Object.keys(this.errors).length === 0) {
        ConfigApiMock.get("/user")
          .then((res) => {
            const users = res.data;
            const userData = users.find((user) => {
              return (
                user.username === this.username &&
                user.password === this.password
              );
            });
            if (userData) {
              this.$store.dispatch("showAlert", "Đăng nhập thành công !");
              localStorage.setItem("currentUser", JSON.stringify(userData));
              this.$router.push({ name: "HomePage" });
            } else {
              this.$store.dispatch(
                "showAlert",
                "Tên người dùng hoặc mật khẩu không đúng !"
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.btn {
  width: 450px;
  margin-left: 100px;
}
.error-message {
  color: red;
  font-size: 14px;
}
.register-page {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.or {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}

.page-left,
.page-right {
  width: 55%;
  padding: 20px;
}

.page-left {
  border-right: 1px solid #ccc;
  background-color: #fff;
}

.page-left .text {
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

.page-left form {
  display: flex;
  flex-direction: column;
}

.page-left .form-group {
  margin-bottom: 20px;
}

/* Thiết lập cho các ô input */
.form-control {
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
}

/* Thiết lập cho nút Đăng ký */
.btn-register {
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-register:hover {
  background-color: #333;
}

/* Thiết lập cho nút Đăng nhập */
.btn-login {
  width: 100%;
  height: 40px;
  background-color: rgb(78, 194, 0);
  color: rgb(5, 5, 5);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-login:hover {
  background-color: #bef789;
}

@media (max-width: 768px) {
  .register-page {
    flex-direction: column;
  }

  .page-left,
  .page-right {
    width: 100%;
    border: none;
    padding: 0;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <v-app>
    <custom-alert
      :alert-message="alertMessage"
      :type="'error'"
      :class="'alert'"
      v-if="alertMessage"
    />
    <div class="register-page">
      <div class="page-left">
        <v-container>
          <h1 class="text">SIGN UP</h1>
          <form class="mt-5" v-on:submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="text">Username:</label>
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
            <div class="form-group">
              <label for="confirmpassword">Confirm Password:</label>
              <custom-input
                v-model="confirmPassword"
                :id="'confirmPassword'"
                :type="'password'"
                :class="'form-control'"
                @input="clearError('confirmPassword')"
              />
              <span
                class="error-message"
                v-if="errors.confirmPasswordError && !confirmPassword"
                >{{ errors.confirmPasswordError }}</span
              >
            </div>
            <custom-button
              :value="'SIGN UP'"
              :type="'submit'"
              :color="'success'"
            />
          </form>

          <div class="or">or</div>
          <router-link to="/login">
            <div style="width: 150px">
              <custom-button
                :value="'SIGN IN'"
                :type="'submit'"
                :color="'primary'"
                :style="'width: 150px; margin-left: 285%'"
              />
            </div>
          </router-link>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import CustomInput from "../common/customInput.vue";
import CustomButton from "../common/customButton.vue";
import CustomAlert from "../common/customAlert.vue";

import { ConfigApiMock } from "../../api/configApiMock";

export default {
  components: {
    CustomInput,
    CustomButton,
    CustomAlert,
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errors: {
        usernameError: "",
        passwordError: "",
        confirmPasswordError: "",
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
    handleSubmit() {
      this.errors = {};
      if (!this.username) {
        this.errors.usernameError = "Please enter your username";
      }
      if (!this.password) {
        this.errors.passwordError = "Please enter your password";
      }
      if (!this.confirmPassword) {
        this.errors.confirmPasswordError = "Please enter your confirm password";
      }
      if (this.password !== this.confirmPassword) {
        this.errors.confirmPasswordError =
          "Password and confirm password do not match";
      }
      if (Object.keys(this.errors).length === 0) {
        ConfigApiMock.get("/user")
          .then((res) => {
            const users = res.data;
            const existingUser = users.find(
              (user) => user.username === this.username
            );
            if (existingUser) {
              this.$store.dispatch(
                "showAlert",
                "Username already exists. Please choose another username."
              );
            } else {
              ConfigApiMock.post("/user", {
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword,
                avatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrDAY_lyALmc62tPopzRzF9hNBFzbyqxzYB6nXC2IZ5w&s",
              })
                .then((res) => {
                  this.$store.dispatch("showAlert", "Sign up successfully !");
                  this.$router.push({ name: "Login" });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    clearError(field) {
      this.errors[field] = "";
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.alert {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  position: fixed;
  top: 20px;
  right: 50px;
  z-index: 1000; /* Ensure the alert appears above other content */
}

.error-message {
  color: red;
  font-size: 14px;
}

.or {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}

.register-page {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
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
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-login:hover {
  background-color: #a2f89a;
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

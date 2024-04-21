<template>
  <div class="register-page">
    <div class="page-left">
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
        <custom-button :value="'SIGN IN'" :type="'submit'" :color="'success'" />
      </form>
      <div class="or">or</div>
      <router-link to="/register">
        <div style="width: 150px">
          <custom-button
            :value="'SIGN UP'"
            :type="'submit'"
            :color="'primary'"
            :style="'width: 150px; margin-left: 180%'"
          />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ConfigApiUser } from "../API/configApiUser";
import customInput from "../comons/customInput.vue";
import customButton from "../comons/customButton.vue";

export default {
  components: {
    customInput,
    customButton,
  },
  data() {
    return {
      username: "",
      password: "",
      errors: {
        usernameError: "",
        passwordError: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.errors = {};
      if (!this.username) {
        this.errors.usernameError = "Vui lòng nhập tên người dùng";
      }
      if (!this.password) {
        this.errors.passwordError = "Vui lòng nhập mật khẩu";
      }

      if (Object.keys(this.errors).length === 0) {
        ConfigApiUser.get("/user")
          .then((res) => {
            const users = res.data;
            const userData = users.find((user) => {
              return (
                user.username === this.username &&
                user.password === this.password
              );
            });
            if (userData) {
              alert("Đăng nhận thanh công");
              localStorage.setItem("currentUser", JSON.stringify(userData));
              this.$router.push({ name: "HomePage" });
            } else {
              alert("Tên người dùng hoặc mật khẩu không đúng");
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
/* Trong phần style scoped */

/* Thiết lập mặc định cho tất cả các phần tử */
* {
  margin: 0;
  /* padding: 0; */
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
/* Phần layout chính */
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

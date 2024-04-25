<template>
  <div class="header fixed-top">
    <div class="header1">
      <div class="kfc col-7">
        <router-link to="/">
          <img
            src="https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg"
            alt=""
          />
        </router-link>
      </div>
      <div class="login col-3">
       <router-link to="/cart">
         <div class="icon-cart">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
       </router-link>
        <div class="username">
          <i class="fa-solid fa-user"></i>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bsBH-w_rE9dIDMcIadk_7W_QMrUTO0TyZqDxKi9t24e_nosOw8MCpy_9YuXUmu7ff4I&usqp=CAU"
          alt=""
          @click="handleLogout"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      cart: [],
      loggedIn: false,
      token: { name: "vinh" },
    };
  },
  computed: {},
  methods: {
    handleLogout() {
        localStorage.removeItem("currentUser")
        this.$router.push({ name: "Login" });
    },
  },
};
</script>
  
  <style scoped>
.header {
  max-width: 100%;
  display: flex;
  justify-content: space-evenly;
  background: #fff;
  position: sticky;
  z-index: 1;
  top: 0;
  position: fixed-top;
  border: 1px ridge;
}

.icon-cart {
  margin-right: 10px;
}

.icon-cart i {
  font-size: 25px;
  margin-top: 10px;
}

.black {
  color: black;
  text-decoration: none;
}

.header1 {
  width: 80%;
  height: 110px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.kfc {
  width: 80%;
  display: flex;
}

.kfc img {
  width: 78px;
  height: 78px;
}

.kfc h2 {
  margin-left: 4%;
  font-size: 20px;
  font-weight: bold;
  margin-top: 4%;
}

.login {
  display: flex;
  justify-content: space-around;
  text-align: center;
  max-width: 250px;
  margin-right: 10px;
}

.login img {
  display: flex;
  height: 35px;
  width: 35px;
  margin-top: 3%;
}

.login .a-href {
  width: 30px;
  height: 43px;
  background: url(https://kfcvn-static.cognizantorderserv.com/images/web/cart.png?v=5.0)
    no-repeat -53px 1px;
  background-size: 350%;
  text-align: center;
  line-height: 50px;
  font-family: Roboto, sans-serif;
  display: block;
  letter-spacing: -1px;
  margin-top: -10%;
}

.username {
  font-size: 19px;
  color: black;
  padding: 0 10px;
  margin-top: 5%;
  display: flex;
  margin-right: 10px;
}

.username1 {
  font-size: 19px;
  color: black;
  margin-top: 2%;
  width: 50px;
}

.username2 {
  font-size: 19px;
  color: black;
  padding: 0 20px;
  margin-top: 2%;
  width: 50px;
}

.username i {
  font-size: 25px;
  padding: 0 10px;
}

/* Responsive */
/* Mobile */
@media (min-width: 375px) and (max-width: 812px) {
  .header {
    width: 100%;
    height: 73px;
  }

  .header1 {
    width: 85%;
    height: 68px;
  }

  .kfc img {
    width: 50px;
    height: 120px;
  }

  .kfc h2 {
    display: none;
  }

  .login img {
    margin-left: 10%;
  }

  .username {
    padding: 0 11px;
  }
}
</style>
  
<template>
  <div id="container">
    <!-- Top NavBar/Banner -->
    <nav class="navbar fixed-top shadow-lg" style="background-color: #ffd54f">
      <div class="container-fluid">
        <a class="navbar-brand" style="color: black" href="#"
          >Hawker Tender Portal</a
        >
      </div>
    </nav>
    <!-- Login Form Section -->
    <div id="logincontainer" class="rounded">
      <h2>Login</h2>
      <br />
      <form @submit.prevent="login">
        <div class="form-floating mb-3">
          <input
            v-model="singpassId"
            type="text"
            class="form-control"
            id="floatingSingpassId"
            placeholder="Singpass ID"
            required
          />
          <label for="floatingSingpassId"
            ><i class="bi bi-person-circle"></i> Singpass ID</label
          >
        </div>
        <div class="form-floating mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <label for="floatingPassword"
            ><i class="bi bi-lock-fill"></i> Password</label
          >
        </div>
        <button v-on:click="checkLoginCred()" class="btn btn-warning w-100">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import router from "../router/index.js";
const db = getFirestore(firebaseApp);

export default {
  name: "LoginPage",
  methods: {
    async checkLoginCred() {
      const { singpassId, password } = this;
      console.log(singpassId);
      console.log(password);
      let docRef = await getDoc(doc(db, "Authentication", singpassId));
      var userExists = docRef.exists();
      if (userExists) {
        var userData = docRef.data();
        if (password === userData.password) {
          if (userData.role === "adminUser") {
            router.push({
              name: "NEADashboardView",
              params: { id: singpassId },
            });
          } else {
            router.push({
              name: "HawkerExploreView",
              params: { id: singpassId },
            });
          }
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("Incorrect Username");
      }
    },
  },
  data() {
    return {
      singpassId: "",
      password: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-image: url("../assets/loginbackground.jpg");
  background-size: cover;
}
#logincontainer {
  background-color: white;
  width: 35%;
  height: auto;
  margin-left: auto;
  margin-top: 15%;
  margin-right: 5%;
  margin-bottom: auto;
  text-align: left;
  padding: 2%;
}
</style>

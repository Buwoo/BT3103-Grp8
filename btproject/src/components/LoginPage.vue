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
        <button v-on:click="login()" class="btn btn-warning w-100">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import router from "../router/index.js";

const db = getFirestore(firebaseApp);

export default {
  name: "LoginPage",
  data() {
    return {
      singpassId: "",
      password: "",
      userType: "",
    };
  },
  methods: {
    async checkUserType() {
      const { singpassId } = this;
      let docRef = await getDoc(doc(db, "Authentication", singpassId));
      var userExists = docRef.exists();
      if (userExists) {
        var userData = docRef.data();
        this.userType = userData.role;
      }
      return this.userType;
    },

    login: function () {
      //Help the user login
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.singpassId + "@fakemail.com",
          this.password
        )
        .then(() => {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then((tokenResult) => {
              console.log(tokenResult.claims);
              if (tokenResult.claims.NEAAgent) {
                router.push({
                  name: "NEADashboardView",
                });
              } else {
                router.push({
                  name: "HawkerExploreView",
                });
              }
            });
        })
        .catch((err) => {
          console.log(err);
          if (err.code == "auth/user-not-found") {
            alert("Invalid Username");
          } else if (err.code == "auth/wrong-password") {
            alert("Invalid Password");
          } else {
            alert("Unknown Error");
          }
        });
    },
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

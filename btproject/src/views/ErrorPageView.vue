<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 text-muted">The page you are looking for was not found.</div>
        <button type="button" class="btn btn-primary" @click="backFunction">Home</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";
import firebase from "@/uifire.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "ErrorPageView",
  data() {
    return {
      neaAgent: this.neaAgent,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            console.log(tokenResult.claims);
            if (tokenResult.claims.NEAAgent) {
              this.neaAgent = true;
            } else {
              this.neaAgent = false;
            }
          });
      }
    });
  },

  methods: {
    backFunction() {
      if (this.neaAgent == null) {
        router.push("/");
      } else if (this.neaAgent) {
        router.push("/NEA/dashboard");
      } else {
        router.push("/hawker/explore");
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>

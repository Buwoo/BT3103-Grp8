<template>
  <div v-if="user">
    <NEANavBar />
    <h3>This is the NEA Dashboard</h3>
    <h2>Your username is {{ user.email.split("@")[0] }}</h2>
    <h3>
      CPP Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Enim et autem optio. Fugit architecto quis magnam dicta nobis libero
      nesciunt rerum minus! Veritatis dolorum vero maiores aliquid. Sint,
      delectus consequatur.
    </h3>
    <div v-if="neaagent">I am NEA Agent</div>
  </div>
</template>

<script>
import firebase from "@/uifire.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "../router/index.js";
import NEANavBar from "@/components/NEANavBar.vue";

export default {
  name: "NEADashboardView",
  data() {
    return {
      user: false,
      neaagent: false,
    };
  },

  components: {
    NEANavBar,
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //Testing here to check custom claims
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            console.log(tokenResult.claims);
            if (tokenResult.claims.NEAAgent) {
              this.neaagent = true;
            } else {
              //To build an error 404 page
              router.push("/404");
            }
          });
        this.user = user;
      }
    });
  },
};
</script>

<style></style>

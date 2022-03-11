<template>
  <div v-if="user">
    <h3>This is the NEA Dashboard</h3>
    <h2>Your username is {{ user.email.split("@")[0] }}</h2>
    <h3>
      CPP Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Enim et autem optio. Fugit architecto quis magnam dicta nobis libero
      nesciunt rerum minus! Veritatis dolorum vero maiores aliquid. Sint,
      delectus consequatur.
    </h3>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "NEADashboardView",
  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style></style>

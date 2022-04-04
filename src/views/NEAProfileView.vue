<template>
  <NEANavBar :name="name" />
  <div class="wrapper">
    <h1><b>Profile</b></h1>
    <ProfileCard :name="name" :email="email" :mobile="mobile" :ic="ic" />
  </div>
</template>

<script>
import NEANavBar from "../components/NEANavBar.vue";
import ProfileCard from "../components/ProfileCard.vue";
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/uifire.js";
import router from "../router/index.js";

const db = getFirestore(firebaseApp);

export default {
  components: {
    NEANavBar,
    ProfileCard,
  },

  methods: {
    fetchData(ic) {
      let response = getDoc(doc(db, "Authentication", ic));
      response
        .then((rsp) => {
          let profile = rsp.data();
          this.name = profile.fullName;
          this.email = profile.email;
          this.mobile = profile.mobileNr;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
              this.neaagent = true;
            } else {
              router.push("/404");
            }
          });
        this.user = user;
        console.log(this.user);
        this.ic = this.user.email.slice(0, 4).toUpperCase();
        console.log(this.ic);
        this.fetchData(this.ic);
      }
    });
  },

  data() {
    return {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      ic: this.ic,
    };
  },
};
</script>

<style scoped>
.wrapper {
  text-align: left;
}

h1 {
  position: static;
  padding: 30px 40px 10px 40px;
}
</style>

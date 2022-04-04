<template>
  <div id="appContainer" class="vh-100 d-flex flex-column">
    <div id="navBarWrapper">
      <HawkerNavBar :name="name" />
    </div>
    <TenderForm :tenderID = "tenderID"/>
  </div>
</template>

<script>
import TenderForm from '@/components/TenderForm.vue'
import HawkerNavBar from '@/components/HawkerNavBar.vue'
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/uifire.js";
import router from "../router/index.js";

const db = getFirestore(firebaseApp);

export default {
  name: 'TenderFormView',

  components: {
    HawkerNavBar,
    TenderForm
  },
  methods : {
      fetchData(ic) {
      let response = getDoc(doc(db, "Authentication", ic));
      response
        .then((rsp) => {
          let profile = rsp.data();
          this.name = profile.fullName;
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
  data(){
    return {
      tenderID: this.$route.params.tenderID,
      name:this.name
    }
  },

    



}
</script>

<style>

#test {
  position:absolute;
  top: 95vh
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#navBarWrapper {
  z-index: 2000;
}

html{
  overflow:hidden
}


</style>

<template>
  <div id="appContainer" class="vh-100 d-flex flex-column position-relative">
    <NEANavBar :name="name"/>
    <NEADashBoard />
  </div>
</template>

<script>
	import NEADashBoard from "@/components/NEADashBoard.vue";
	import NEANavBar from "@/components/NEANavBar.vue";
	import firebaseApp from "../firebase.js";
	import { getFirestore, getDoc, doc } from "firebase/firestore";
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import firebase from "@/uifire.js";
	import router from "../router/index.js";

	const db = getFirestore(firebaseApp);

	export default {
		name: "NEADashBoardView",

		components: {
			NEANavBar,
			NEADashBoard,
		},

		methods: {
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
                    if (!tokenResult.claims.NEAAgent) {
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
    };
  },
	};
</script>

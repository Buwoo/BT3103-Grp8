<template>
  <div class="wrapper">
    <!-- Nav Bar  -->
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid" style="padding: 0px">
        <div class="subcontainer justify-content-start">
          <button type="button" class="btn btn-primary" @click="this.toggle = !this.toggle">
            <i class="bi bi-list"></i>
          </button>

          <h3>Welcome {{ name }}</h3>
        </div>

        <div class="justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <button
                class="btn btn-primary"
                href="#"
                id="navbarDarkDropdownMenuLink"
                type="button"
                data-bs-toggle="dropdown"
                :disabled="!toggle"
              >
                <i class="bi bi-person-circle" style="color: #fff"></i>
              </button>
              <ul id="profileDropdown" class="dropdown-menu dropdown-menu-end">
                <li>
                  <a id = "profileRoute" :class="this.profileClass" href="/hawker/profile" @click="remindSaveProfile()">
                    <i class="bi bi-person-fill"></i>
                    Profile
                  </a>
                </li>
                <li>
                  <span role="button">
                    <a :class="this.profileClass" @click="signOutFunction">
                      <i class="bi bi-power"></i>
                      Logout
                    </a>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar  -->
    <nav id="sidebar" v-bind:class="toggle ? 'hide' : 'show'">
      <ul class="list-unstyled components">
        <li>
          <a href="/hawker/dashboard" id = "dashboardRoute" @click = "remindSave()">
            <i class="bi bi-file-earmark-text-fill"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/hawker/explore" id = "exploreRoute" @click = "remindSaveExplore()">
            <i class="bi bi-globe"></i>
            Explore
          </a>
        </li>
      </ul>
    </nav>

    <div class="overlay" v-bind:class="toggle ? '' : 'active'" @click="toggle = !toggle"></div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import firebase from "@/uifire.js";
import "firebase/auth";
import router from "../router/index.js";
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      toggle: true,
      checker: "TenderFormView",
      profileClass: "dropdown-item",
    };
  },
  props: {
    name: String,
  },
  methods: {
    async signOutFunction() {
      if (this.$store.getters.getFormStatus || this.$route.name != this.checker) {
        if (this.$route.name == this.checker && this.$store.getters.getFilled == 0){
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
        firebase
          .auth()
          .signOut()
          .then(() => {
            router.push("/");
            console.log("Logged out");
          });       
      } else {
        let text = "Changes may be lost if you leave this page.\nProceed?"
        if (confirm(text)) {
          if (this.$route.name == this.checker && this.$store.getters.getFilled == 0){
            await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
          }
          firebase
            .auth()
            .signOut()
            .then(() => {
              router.push("/");
              console.log("Logged out");
            });
        }
      }
    },
    async remindSave() {
      if (this.$store.getters.getFormStatus || this.$route.name != this.checker) {
        if (this.$route.name == this.checker && this.$store.getters.getFilled == 0){
          console.log("problem")
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
      } else {
        let text = "Changes may be lost if you leave this page.\nProceed?";
        if (!confirm(text)) {
          document.getElementById("dashboardRoute").href = "#";
        } else if (this.$store.getters.getFilled == 0) {
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
      }
    },

    async remindSaveExplore() {
      if (this.$store.getters.getFormStatus || this.$route.name != this.checker) {
        if (this.$route.name == this.checker && this.$store.getters.getFilled == 0){
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
      } else {
        let text = "Changes may be lost if you leave this page.\nProceed?";
        if (!confirm(text)) {
          document.getElementById("exploreRoute").href = "#";
        } else if (this.$store.getters.getFilled == 0) {
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
      }     
    },
    async remindSaveProfile() {
      if (this.$store.getters.getFormStatus || this.$route.name != this.checker) {
        if (this.$route.name == this.checker && this.$store.getters.getFilled == 0){
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
      } else {
        let text = "Changes may be lost if you leave this page.\nProceed?";
        if (!confirm(text)) {
          document.getElementById("profileRoute").href = "#";
        } else if (this.$store.getters.getFilled == 0) {
          await deleteDoc(doc(db, "TenderInfo", this.$route.params.tenderID));
        }
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  width: 100%;
  top: 0;
  border: none;
  border-radius: 0;
  padding: 5px 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

#nav-header {
  text-align: left;
}

a {
  font-family: "Roboto", sans-serif;
}

.subcontainer {
  display: inline-flex;
}

h3 {
  color: #fff;
  font-family: "Roboto", sans-serif;
  padding: 10px 10px;
  margin: 0px;
}

i {
  font-size: 1.5em;
}

#sidebar {
  width: 250px;
  position: fixed;
  text-align: left;
  left: -250px;
  height: 100vh;
  z-index: 999;
  background: #fff;
  transition: all 0.3s;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
}

#sidebar ul li a {
  padding: 20px;
  font-size: 1.1em;
  display: block;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

#sidebar ul li a:hover {
  color: #000;
  background: rgba(0, 0, 0, 0.05);
}

.overlay {
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.overlay.active {
  display: block;
  opacity: 1;
}

.hide {
  margin-left: 0 !important;
}

.show {
  margin-left: 250px !important;
}

.dropdown {
  border: 0px;
}
</style>

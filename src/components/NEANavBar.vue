<template>
  <div class="wrapper position-relative">
    <!-- Nav Bar  -->
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
      <div class="container-fluid" style="padding: 0px">
        <div class="subcontainer justify-content-start">
          <button type="button" class="btn btn-success" @click="toggle = !toggle">
            <i class="bi bi-list"></i>
          </button>

          <h3>Welcome {{ name }}</h3>
        </div>

        <div class="justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <button class="btn btn-success" href="#" id="navbarDarkDropdownMenuLink" type="button" data-bs-toggle="dropdown" :disabled="!toggle">
                <i class="bi bi-person-circle" style="color: #fff"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="/NEA/profile">
                    <i class="bi bi-person-fill"></i>
                    Profile
                  </a>
                </li>
                <li>
                  <span role="button">
                    <a class="dropdown-item" @click="signOutFunction">
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
          <a href="/NEA/dashboard">
            <i class="bi bi-file-earmark-text-fill"></i>
            Dashboard
          </a>
        </li>
      </ul>
    </nav>

    <div class="overlay" v-bind:class="toggle ? '' : 'active'" @click="toggle = !toggle"></div>
  </div>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/auth";
import router from "../router/index.js";

export default {
  data() {
    return {
      toggle: true,
    };
  },
  props: {
    name: String,
  },
  methods: {
    signOutFunction() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push("/");
          console.log("Logged out");
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  z-index: 1001;
}

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

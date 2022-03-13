<template>
  <div class="wrapper">

    <!-- Sidebar  -->
    <nav id="sidebar" v-bind:class = "(toggle)?'hide':'show'">
        <ul class="list-unstyled components">
          <li>
                <a href="#"> 
                  <i class="bi bi-file-earmark-text-fill"></i> 
                  Dashboard
                </a>
          </li>
          <li>
                <a href="#"> 
                    <i class="bi bi-globe"></i> 
                    Explore
                </a>
          </li>
      </ul>
    </nav>

    <!-- Nav Bar  -->
        <nav class="navbar navbar-expand-lg navbar-light bg-primary mb-3">
            <div class="container-fluid" style="padding: 0px">
                <div class="test justify-content-start">
                    <button type="button" class="btn btn-primary" @click='toggle = !toggle'>
                        <i class="bi bi-list"></i>
                    </button>

                    <h3> Welcome Hawker {{name}}</h3>              
                </div> 

                <div class="justify-content-end"> 
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                        <button class="btn btn-primary" href="#" id="navbarDarkDropdownMenuLink" type="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle" style="color: #fff;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">
                                <i class="bi bi-person-fill"></i>
                                Profile
                            </a></li>
                            <li><a class="dropdown-item" href="#">
                                <i class="bi bi-power"></i>
                                Logout
                            </a></li>
                        </ul>
                        </li>
                     </ul>
                </div>

            </div>
        </nav>
    </div>

<div class="overlay" v-bind:class = "(toggle)?'':'active'"></div>
</template>

<script>
export default {
  data(){
    return {
        toggle: true
    }
  },
  props:{
      name: String
  }
}
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

#nav-header{
    text-align: left;
}

a{
    font-family: 'Roboto', sans-serif;
}

.test{
    display: inline-flex;
}

h3{
    color: #fff;
    padding-top: 10px;
    padding-left: 10px;
    font-family: 'Roboto', sans-serif;
}

i{
    font-size: 1.5em;
}

.dropdown-menu{
    postion: fixed;
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

.hide{
    margin-left: 0!important;
}

.show{
    margin-left: 250px!important;
}
</style>
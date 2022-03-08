<template>
  <HawkerNavBar :name = "name"/>
  <div class="wrapper"> 
  <h1><b>Profile</b></h1>
  <ProfileCard 
  :name="name" 
  :address="address"
  :email="email"
  :mobile="mobile"
  :ic="ic"/>
  </div> 
</template>

<script>
import HawkerNavBar from "../components/HawkerNavBar.vue"
import ProfileCard from "../components/ProfileCard.vue"
import firebaseApp from '../firebase.js'
import { getFirestore, getDoc, doc } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    components: {
        HawkerNavBar,
        ProfileCard,
    },

    methods: {
      fetchData(){
        let response = getDoc(doc(db, "Authentication", this.$route.params.id));
        response.then((rsp) => {
          let profile = rsp.data();
          this.name = profile.fullName;
          this.email = profile.email;
          this.address = profile.address;
          this.mobile = profile.mobileNr;
          this.ic = this.$route.params.id;
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },

    mounted(){
      this.fetchData()
    },

    data(){
      return {
        name: this.name,
        email: this.email,
        address: this.address,
        mobile: this.mobile,
        ic: this.ic,
      }
    }
}
</script>

<style>
.wrapper{
  text-align: left;
}

h1{
  padding: 65px 65px 20px 65px;
}
</style>
<template>
<HawkerNavBar/>
<HawkerDashBoard 
  :name="name" 
  :address="address"
  :email="email"
  :mobile="mobile"
  :id="id"/>

</template>


<script>

import HawkerNavBar from '@/components/HawkerNavBar.vue'
import HawkerDashBoard from '@/components/HawkerDashBoard.vue'
import firebaseApp from '../firebase.js'
import { getFirestore, getDoc, doc } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
    name: 'HawkerDashBoardView',
    
    components: {
        HawkerNavBar,
        HawkerDashBoard
    },

    data(){
      return {
        name: this.name,
        address: this.address,
        email: this.email,
        mobile: this.mobile,
        id: this.id,
      }
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
          this.id = this.$route.params.id;
        })
        .catch((error) => {
          console.log(error);
        })
      }
    },

    mounted() {
      this.fetchData()

    }


}

</script>

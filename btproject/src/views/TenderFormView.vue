<template>
<HawkerNavBar :name = "name"/>
<TenderForm
:name = "name"
:ic = "ic"/>
</template>

<script>
import TenderForm from '@/components/TenderForm.vue'
import HawkerNavBar from '@/components/HawkerNavBar.vue'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { getDoc, doc} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: 'TenderFormView',

  components: {
    HawkerNavBar,
    TenderForm
  },
  methods: {
      fetchData(){
        let response = getDoc(doc(db, "Authentication", this.$route.params.id));
        response.then((rsp) => {
          let profile = rsp.data();
          this.name = profile.fullName;
          this.ic = this.$route.params.id
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
        ic: this.$route.params.id
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

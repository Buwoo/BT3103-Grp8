<template>
<HawkerNavBar :name = "name"/>
<TenderForm
:tenderID = "tenderID"/>
</template>

<script>
import TenderForm from '@/components/TenderForm.vue'
import HawkerNavBar from '@/components/HawkerNavBar.vue'



export default {
  name: 'TenderFormView',

  components: {
    HawkerNavBar,
    TenderForm
  },
  data(){
    return {
      name: "",
      tenderID: this.$route.params.tenderID,
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
</style>

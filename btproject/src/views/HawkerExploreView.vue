<template>

<div id="appContainer" class="vh-100 d-flex flex-column">
  <HawkerNavBar/>
  <HawkerExplore/>
</div>


</template>

<script>
import HawkerNavBar from "../components/HawkerNavBar.vue"
import HawkerExplore from '@/components/HawkerExplore.vue'


export default {
  name: "HawkerExplorePage",
  components: {
    HawkerExplore,
    HawkerNavBar
  },
};
</script>

<style scoped>
/* #appContainer {
  padding-top: 2rem;
} */


</style>

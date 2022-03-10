<template>

<div id="appContainer" class="vh-100">
  <HawkerExplore/>
</div>


</template>

<script>
import HawkerExplore from '@/components/HawkerExplore.vue'


export default {
  name: "HawkerExplorePage",
  components: {
    HawkerExplore,
  },
};
</script>

<style scoped>
#appContainer {
  padding-top: 2rem;
}


</style>

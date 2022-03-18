<template>
  <div id="appContainer" class="vh-100 d-flex flex-column">
    <div id = "navBarWrapper">
      <HawkerNavBar />
    </div>
    <HawkerExplore />
  </div>
</template>

<script>
import HawkerNavBar from "@/components/HawkerNavBar.vue";
import HawkerExplore from "@/components/HawkerExplore.vue";

export default {
  name: "HawkerExploreView",
  components: {
    HawkerExplore,
    HawkerNavBar,
  },
};
</script>

<style scoped>
#navBarWrapper {
  z-index: 2000;
}
</style>

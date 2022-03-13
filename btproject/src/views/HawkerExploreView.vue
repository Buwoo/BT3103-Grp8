<template>
<div id="appContainer" class="vh-100 d-flex flex-column">
  <HawkerNavBar/>
  <HawkerExplore/>
</div>

</template>

<script>
import HawkerNavBar from "../components/HawkerNavBar.vue"
import HawkerExplore from '@/components/HawkerExplore.vue'

=======
  <div id="appContainer" class="vh-100">
    <HawkerExplore />
  </div>
</template>

<script>
import HawkerExplore from "@/components/HawkerExplore.vue";

export default {
  name: "HawkerExploreView",
  components: {
    HawkerExplore,
    HawkerNavBar
  },
};
</script>

<style scoped>
</style>

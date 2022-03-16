<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 text-muted">
          The page you are looking for was not found.
        </div>
        <button type="button" class="btn btn-primary" @click="backFunction">
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "ErrorPageView",
  methods: {
    backFunction() {
      router.back();
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>

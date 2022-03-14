<template>
  <h1>Page Not Found</h1>
  <br />
  <button @click="backFunction">Go Back</button>
  <br />
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

<style scoped></style>

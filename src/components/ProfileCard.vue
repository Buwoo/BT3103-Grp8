<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-0">
        <div class="col-xs-6 col-md-2 justify-content-center">
          <img :src="imageurl" class="img-fluid rounded-start" alt="profile picture" />
        </div>

        <div class="box col-xs-6 col-md-10 justify-content-start">
          <h3 class="card-title">
            <b>{{ name }}</b>
          </h3>
          <div class="container">
            <div class="details col-xs-6 col-md">
              <p class="card-text"><small class="text-muted">NRIC</small></p>
              <p class="card-text">XXXXX{{ ic }}</p>
            </div>

            <div class="details col-xs-6 col-md">
              <p class="card-text"><small class="text-muted">Mobile</small></p>
              <p class="card-text">{{ mobile }}</p>
            </div>

            <div class="details col-xs-6 col-md">
              <p class="card-text"><small class="text-muted">Email</small></p>
              <p class="card-text">{{ email }}</p>
            </div>

            <div v-show="showAddress" class="details col-xs-6 col-md">
              <p class="card-text"><small class="text-muted">Address</small></p>
              <p class="card-text">{{ address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    email: String,
    address: String,
    mobile: Number,
    ic: String,
  },
  data() {
    return {
      imageurl: null,
      showAddress: true,
    };
  },

  methods: {
    solveImage() {
      return require(`@/assets/User_Photos/${this.ic}.jpg`);
    },
    solveAddressDisplay() {
      return this.address != undefined;
    },
  },

  updated() {
    this.imageurl = this.solveImage();
    this.showAddress = this.solveAddressDisplay();
  },
};
</script>

<style scoped>
h3 {
  font-family: "Roboto", sans-serif;
}

p {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
}

.card {
  position: static;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  margin: 40px;
  margin-top: 10px;
  max-width: 100%;
}

.container {
  display: inline-flex;
}

h3 {
  padding: 20px;
}

.box {
  padding: 20px;
}

.card-title {
  text-align: left;
}

.details {
  text-align: left;
  margin: 20px;
}
</style>

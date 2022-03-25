<template>
  <div class="webpage">
    <div class="container-fluid">
      <div class="row mx-auto" id="headings">
        <div class="d-flex">
          <div class="col-md-9">
            <h3 class="mt-4" id="dashboardHeading"><b> Application for Tenancy of Hawker Stall </b></h3>
          </div>
        </div>
      </div>





  <div>
    <div class="Tender_Details"></div>
    <h3 class="mt-4" id="tender_header">Tender Details</h3>
    <form id="HawkerAddr">
      <input id="hawkerInput" v-model="hawkerCentre" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
      <label><strong>Hawker Centre</strong></label>
      <div id="options">
        <ul>
          <div id="selectHawkerDropdown">
            <span role="button">
              <li @click="selectHawker(hawker)" v-for="(hawker, index) in filteredUser" :key="`hawker-${index}`">
                {{ hawker.NAME }}
              </li>
            </span>

      <div>
        <!-- Tender Details Section -->
        <div class="Tender_Details"></div>
        <h3 id="tender_header">Tender Details</h3>

        <form id="HawkerAddr">
          <input id="hawkerInput" v-model="hawkerCentre" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label><strong>Hawker Centre</strong></label>
          <div id="options">
            <ul>
              <div id="selectHawkerDropdown">
                <span role="button">
                  <li @click="selectHawker(hawker)" v-for="(hawker, index) in filteredUser" :key="`hawker-${index}`">
                    {{ hawker.NAME }}
                  </li>
                </span>
              </div>
            </ul>

          </div>
        </form>
        <form id="Food">
          <input id="foodInput" v-model="b" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label><strong>Food Item</strong></label>
          <div id="foodOptions">
            <ul>
              <div id="selectFoodDropdown">
                <span role="button">
                  <li @click="selectFood(food)" v-for="(food, index) in filteredFood" :key="`food-${index}`">
                    {{ food.NAME }}
                  </li>
                </span>
              </div>
            </ul>

          </div>
        </form>
        <form id="Food">
          <input id="foodInput" v-model="b" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label><strong>Food Item</strong></label>
          <div id="foodOptions">
            <ul>
              <div id="selectFoodDropdown">
                <span role="button">
                  <li @click="selectFood(food)" v-for="(food, index) in filteredFood" :key="`food-${index}`">
                    {{ food.NAME }}
                  </li>
                </span>
              </div>
            </ul>
          </div>
        </form>
        <form id="Open">
          <input id="openInput" v-model="c" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label><strong>Opening Time</strong></label>
        </form>
        <form id="Close">
          <input id="closeInput" v-model="d" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label><strong>Closing Time</strong></label>
        </form>
        <div id="error"></div>
      </div>

      <!-- Personal Details Section -->
      <div>
        <div class="Personal_Details"></div>
        <h3 id="personal_header">Personal Details</h3>
        <div id="name" v-text="userName"></div>
        <div id="nric" v-text="nric"></div>
        <div id="contact" v-text="contactNum"></div>
        <div id="email" v-text="email"></div>
        <div id="persAddress" v-text="address"></div>
        <div id="nameLabel"><strong>Name</strong></div>
        <div id="nricLabel"><strong>NRIC</strong></div>
        <div id="contactLabel"><strong>Contact Number</strong></div>
        <div id="emailLabel"><strong>Email</strong></div>
        <div id="persAddressLabel"><strong>Address</strong></div>
      </div>
    </div>
  </div>

  <button id="save" class="btn btn-primary" v-on:click="saveTender()">Save</button>
  <button id="submit" class="btn btn-success" v-on:click="submitTender()">Submit</button>
  <button id="delete" class="btn btn-danger" v-on:click="deleteTender()">Delete</button>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, setDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "../router/index.js";
import json from "@/assets/hawker_name.json";
import foodJson from "@/assets/food.json";

const db = getFirestore(firebaseApp);
export default {
  props: {
    tenderID: String,
  },

  data() {
    return {
      hawkerCentre: "",
      b: "",
      c: "",
      d: "",
      userName: "",
      nric: "",
      contactNum: "",
      email: "",
      address: "",
      hawkers: json,
      foodGrp: foodJson,
    };
  },

  computed: {
    filteredUser() {
      const query = this.hawkerCentre.toLowerCase();
      if (this.hawkerCentre === "") {
        return [];
      }
      return this.hawkers.filter((hawker) => {
        return Object.values(hawker).some((word) => String(word).toLowerCase().includes(query)) && Object.values(hawker)[1] != this.hawkerCentre;
      });
    },
    filteredFood() {
      const query = this.b.toLowerCase();
      if (this.b === "") {
        return [];
      }
      return this.foodGrp.filter((food) => {
        return Object.values(food).some((word) => String(word).toLowerCase().includes(query)) && Object.values(food)[1] != this.b;
      });
    },
  },

  methods: {
    async deleteTender() {
      let text = "Confirm Delete?";
      if (confirm(text) == true) {
        await deleteDoc(doc(db, "TenderInfo", this.tenderID));
        router.push({ name: "HawkerDashBoard" });
      }
    },
    async saveTender() {
      this.returnNormalBorder();
      await setDoc(doc(db, "TenderInfo", this.tenderID), {
        name: this.hawkerCentre,
        date: Timestamp.fromDate(new Date()),
        foodItem: this.b,
        openingHours: {
          end: this.d,
          start: this.c,
        },
        status: "unsubmitted",
        userID: this.nric.slice(5),
      });

      this.$store.commit("setFormSaved");
    },
    returnNormalBorder() {
      document.getElementById("hawkerInput").style.borderColor = "black";
      document.getElementById("foodInput").style.borderColor = "black";
      document.getElementById("openInput").style.borderColor = "black";
      document.getElementById("closeInput").style.borderColor = "black";
    },
    async submitTender() {
      this.returnNormalBorder();
      if (this.hawkerCentre == "" || this.b == "" || this.c == "" || this.d == "") {
        document.getElementById("error").innerHTML = "Fill up all fields";
        alert("Error: Fill up all fields");
        if (this.hawkerCentre == "") {
          document.getElementById("hawkerInput").style.borderColor = "red";
        }
        if (this.b == "") {
          document.getElementById("foodInput").style.borderColor = "red";
        }
        if (this.c == "") {
          document.getElementById("openInput").style.borderColor = "red";
        }
        if (this.d == "") {
          document.getElementById("closeInput").style.borderColor = "red";
        }
      } else {
        let docRef = await getDoc(doc(db, "HawkerMetadata", this.hawkerCentre));
        let foodItem = [];
        this.foodGrp.forEach((element) => foodItem.push(Object.values(element)[1]));
        if (!docRef.exists()) {
          document.getElementById("error").innerHTML = "Invalid Hawker Centre";
          document.getElementById("hawkerInput").style.borderColor = "red";
          alert("Invalid Hawker Centre");
        } else if (!foodItem.includes(this.b)) {
          document.getElementById("foodInput").style.borderColor = "red";
          document.getElementById("error").innerHTML = "Invalid Food Item";
          alert("Error: Invalid Food Item");
        } else if (!/^\d+$/.test(this.c) || this.c.length != 4) {
          document.getElementById("openInput").style.borderColor = "red";
          document.getElementById("error").innerHTML = "Invalid Opening Time";
          alert("Error: Invalid Opening Time");
        } else if (!/^\d+$/.test(this.d) || this.d.length != 4) {
          document.getElementById("closeInput").style.borderColor = "red";
          document.getElementById("error").innerHTML = "Invalid Closing Hours";
          alert("Error: Invalid Closing Time");
        } else {
          let hawkerOpen = parseInt(docRef.data().openingHrs.slice(0, 4));
          let hawkerClose = parseInt(docRef.data().openingHrs.slice(5));
          if (parseInt(this.c) >= parseInt(this.d)) {
            document.getElementById("error").innerHTML = "Invalid Opening Hours";
            document.getElementById("openInput").style.borderColor = "red";
            document.getElementById("closeInput").style.borderColor = "red";
            alert("Error: Invalid Opening Hours \nOpening Time has to be before closing time");
          } else if (hawkerOpen > parseInt(this.c) || hawkerClose < parseInt(this.d)) {
            alert("Error: Invalid Opening Hours \nOpening Hours: " + hawkerOpen + "-" + hawkerClose);
            document.getElementById("error").innerHTML = "Invalid Opening Hours";
            if (hawkerOpen > parseInt(this.c)) {
              document.getElementById("openInput").style.borderColor = "red";
            }

            if (hawkerClose < parseInt(this.d)) {
              document.getElementById("closeInput").style.borderColor = "red";
            }
          } else if (docRef.data().availableNrStalls <= 0) {
            document.getElementById("error").innerHTML = "No Available Stalls for Tender";
            document.getElementById("hawkerInput").style.borderColor = "red";
            alert("Error: No Available Stalls for Tender");
          } else {
            let text = "Confirm Submission?";
            if (confirm(text) == true) {
              document.getElementById("error").innerHTML = "";
              await setDoc(doc(db, "TenderInfo", this.tenderID), {
                name: this.hawkerCentre,
                date: Timestamp.fromDate(new Date()),
                foodItem: this.b,
                openingHours: {
                  end: this.d,
                  start: this.c,
                },
                status: "pending",
                userID: this.nric.slice(5),
              });
              let updateSlots = docRef.data().availableNrStalls - 1;
              if (updateSlots <= 0) {
                await updateDoc(doc(db, "HawkerMetadata", this.hawkerCentre), {
                  availableNrStalls: updateSlots,
                  availableStallsBool: false,
                });
              } else {
                await updateDoc(doc(db, "HawkerMetadata", this.hawkerCentre), {
                  availableNrStalls: updateSlots,
                });
              }

              router.push({ name: "HawkerDashBoard" });
            }
          }
        }
      }
    },

    selectHawker(hawker) {
      this.hawkerCentre = hawker.NAME;
    },

    selectFood(food) {
      this.b = food.NAME;
    },
  },

  created() {
    let response = getDoc(doc(db, "TenderInfo", this.tenderID));
    response
      .then((rsp) => {
        if (rsp.exists()) {
          let profile = rsp.data();
          const auth = getAuth();
          var id = auth.currentUser.email.slice(0, 4).toUpperCase();
          if (profile.userID == id) {
            if (profile.status != "unsubmitted") {
              alert("This form is already submitted");
              router.push({
                name: "HawkerDashBoard",
              });
            } else {
              this.hawkerCentre = profile.name;
              this.b = profile.foodItem;
              this.c = profile.openingHours.start;
              this.d = profile.openingHours.end;
            }
          } else {
            alert("Invalid Tender ID");
            router.push({ name: "HawkerDashBoard" });
          }
        } else {
          alert("Invalid Tender ID");
          router.push({ name: "HawkerDashBoard" });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const auth = getAuth();
    // var ref = this;
    // console.log(ref.user);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var ic = user.email.slice(0, 4).toUpperCase();
        let response = getDoc(doc(db, "Authentication", ic));
        response
          .then((rsp) => {
            let profile = rsp.data();
            this.userName = profile.fullName;
            this.nric = "SXXXX" + ic;
            this.contactNum = profile.mobileNr;
            this.email = profile.email;
            this.address = profile.address;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  },
/*
  mounted() {
    window.onpopstate = function () {
      window
    };
  }
*/
};
</script>
<style scoped>
h3 {
  position: absolute;
  text-align: left;
  left: 9vw;
  top: 7.5vh;
}
.Tender_Details {
  position: absolute;
  width: 78vw;
  height: 24vh;
  top: 19vh;
  left: 11vw;
  border: 1px solid black;
}

#tender_header,
#personal_header {
  text-align: left;
  padding-top: 2vh;
  padding-left: 2vw;
  height: 7vh;
  width: 77.9vw;
}

#tender_header {
  position: absolute;
  background-color: #1976d2;
  top: 19vh;
  left: 11.05vw;
  color: white;
}

#HawkerAddr > input,
#Food > input,
#Open > input,
#Close > input {
  position: absolute;
  display: inline-block;
  top: 30vh;
  height: 7vh;
  font-size: 2.5vh;
  padding-left: 1vw;
}

#HawkerAddr > input {
  left: 13vw;
  width: 27vw;
}

#options {
  position: absolute;
  text-align: left;
  top: 38vh;
  left: 11.5vw;
  /* background-color: white; */
  z-index: 300;
}

li:hover {
  background: #1976d2;
  color: white;
}

#options > ul {
  width: 28.5vw;
  list-style: none;
  max-height: 5vw;
  overflow: scroll;
  overflow-x: hidden;
}

li {
  border-bottom: 1px solid lightgrey;
}

#Food > input {
  left: 42vw;
  width: 17vw;
}

#foodOptions {
  position: absolute;
  text-align: left;
  top: 38vh;
  left: 40.5vw;
  /* background-color: white; */
  z-index: 300;
}

#foodOptions > ul {
  width: 18.5vw;
  list-style: none;
  max-height: 5vw;
  overflow: scroll;
  overflow-x: hidden;
}

#Open > input {
  left: 61vw;
  width: 12vw;
}

#Close > input {
  left: 75vw;
  width: 12vw;
}

#HawkerAddr > label,
#Food > label,
#Open > label,
#Close > label {
  position: absolute;
  top: 27.6vh;
}
#HawkerAddr > label {
  left: 14vw;
}
#Food > label {
  left: 43vw;
}
#Open > label {
  left: 62vw;
}
#Close > label {
  left: 76vw;
}

#error {
  position: absolute;
  top: 19.2vh;
  font-size: 4vh;
  color: red;
  text-align: center;
  left: 33vw;
  width: 36vw;
}

.Personal_Details {
  position: absolute;
  width: 78vw;
  height: 33vh;
  top: 48vh;
  left: 11vw;
  border: 1px solid black;
}

#personal_header {
  position: absolute;
  background-color: #1976d2;
  top: 48vh;
  left: 11.05vw;
  color: white;
}
#name,
#nric,
#contact {
  position: absolute;
  top: 60vh;
  height: 7vh;
  font-size: 2.5vh;
  text-align: left;
  border: 1px solid black;
  padding-top: 1.5vh;
  padding-left: 1vw;
  color: #6C757D
}
#name {
  left: 13vw;
  width: 34vw;
}

#nric {
  left: 49vw;
  width: 19vw;
}
#contact {
  left: 70vw;
  width: 17vw;
}

#nameLabel,
#nricLabel,
#contactLabel {
  position: absolute;
  top: 57.7vh;
}

#nameLabel {
  left: 14vw;
}

#nricLabel {
  left: 50vw;
}

#contactLabel {
  left: 71vw;
}

#email,
#persAddress {
  position: absolute;
  top: 71vh;
  height: 7vh;
  font-size: 2.5vh;
  text-align: left;
  border: 1px solid black;
  padding-top: 1.5vh;
  padding-left: 1vw;
  color: #6C757D
}

#email {
  left: 13vw;
  width: 30vw;
}
#persAddress {
  left: 45vw;
  width: 42vw;
}

#emailLabel,
#persAddressLabel {
  position: absolute;
  top: 68.6vh;
}
#emailLabel {
  left: 14vw;
}
#persAddressLabel {
  left: 46vw;
}

#save,
#submit,
#delete {
  position: absolute;
  top: 84vh;
  /* height: 6vh; */
  width: 6vw;
}

#delete {
  left: 67vw;
}

#save {
  left: 75vw;
}

#submit {
  left: 83vw;
}

#selectHawkerDropdown,
#selectFoodDropdown {
  background-color: white;
}
</style>

<template>
  <h1>Application for Tenancy of Hawker Stall</h1>
  <div>
    <div class="Tender_Details"></div>
    <h2 id="tender_header">Tender Details</h2>
    <form id="HawkerAddr">
      <input id="hawkerInput" v-model="hawkerCentre" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
      <label>Hawker Centre</label>
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
      <label>Food Item</label>
      <div id="foodOptions">
        <ul>
          <div id="selectFoodDropdown" style="background-color: white">
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
      <label>Opening Time</label>
    </form>
    <form id="Close">
      <input id="closeInput" v-model="d" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
      <label>Closing Time</label>
    </form>
    <div id="error"></div>
  </div>
  <div>
    <div class="Personal_Details"></div>
    <h2 id="personal_header">Personal Details</h2>
    <div id="name" v-text="userName"></div>
    <div id="nric" v-text="nric"></div>
    <div id="contact" v-text="contactNum"></div>
    <div id="email" v-text="email"></div>
    <div id="persAddress" v-text="address"></div>
    <div id="nameLabel">Name</div>
    <div id="nricLabel">NRIC</div>
    <div id="contactLabel">Contact Number</div>
    <div id="emailLabel">Email</div>
    <div id="persAddressLabel">Address</div>
  </div>

  <button id="save" class="btn btn-primary" v-on:click="saveTender()" :disabled="disableSave > 0">Save</button>
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
      disableSave: 0,
    };
  },

  computed: {
    filteredUser() {
      const query = this.hawkerCentre.toLowerCase();
      if (this.hawkerCentre === "") {
        return [];
      }
      return this.hawkers.filter((hawker) => {
        return Object.values(hawker).some((word) => String(word).toLowerCase().includes(query));
      });
    },
    filteredFood() {
      const query = this.b.toLowerCase();
      if (this.b === "") {
        return [];
      }
      return this.foodGrp.filter((food) => {
        return Object.values(food).some((word) => String(word).toLowerCase().includes(query));
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
        // date: new Date(),
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
      this.disableSave += 1;
      // if (
      //   this.hawkerCentre == "" ||
      //   this.b == "" ||
      //   this.c == "" ||
      //   this.d == ""
      // ) {
      //   document.getElementById("error").innerHTML = "Fill up all fields";
      //   alert("Error: Fill up all fields");
      //   if (this.hawkerCentre == "") {
      //     document.getElementById("hawkerInput").style.borderColor = "red";
      //   }
      //   if (this.b == "") {
      //     document.getElementById("foodInput").style.borderColor = "red";
      //   }
      //   if (this.c == "") {
      //     document.getElementById("openInput").style.borderColor = "red";
      //   }
      //   if (this.d == "") {
      //     document.getElementById("closeInput").style.borderColor = "red";
      //   }
      // } else {
      //   let docRef = await getDoc(doc(db, "HawkerMetadata", this.hawkerCentre));
      //   if (!docRef.exists()) {
      //     document.getElementById("error").innerHTML = "Invalid Hawker Centre";
      //     document.getElementById("hawkerInput").style.borderColor = "red";
      //     alert("Invalid Hawker Centre");
      //   } else if (String(parseInt(this.c)) != this.c || this.c.length != 4) {
      //     document.getElementById("openInput").style.borderColor = "red";
      //     document.getElementById("error").innerHTML = "Invalid Opening Time";
      //     alert("Error: Invalid Opening Time");
      //   } else if (String(parseInt(this.d)) != this.d || this.d.length != 4) {
      //     document.getElementById("closeInput").style.borderColor = "red";
      //     document.getElementById("error").innerHTML = "Invalid Closing Hours";
      //     alert("Error: Invalid Closing Time");
      //   } else {
      //     let hawkerOpen = parseInt(docRef.data().openingHrs.slice(0, 4));
      //     let hawkerClose = parseInt(docRef.data().openingHrs.slice(5));
      //     if (parseInt(this.c) >= parseInt(this.d)) {
      //       document.getElementById("error").innerHTML =
      //         "Invalid Opening Hours";
      //       document.getElementById("openInput").style.borderColor = "red";
      //       document.getElementById("closeInput").style.borderColor = "red";
      //       alert("Error: Invalid Opening Hours");
      //     } else if (
      //       hawkerOpen > parseInt(this.c) ||
      //       hawkerClose < parseInt(this.d)
      //     ) {
      //       alert("Error: Invalid Opening Hours");
      //       if (hawkerOpen > parseInt(this.c)) {
      //         document.getElementById("openInput").style.borderColor = "red";
      //       }

      //       if (hawkerClose < parseInt(this.d)) {
      //         document.getElementById("closeInput").style.borderColor = "red";
      //       }
      //     } else if (docRef.data().availableNrStalls <= 0) {
      //       document.getElementById("error").innerHTML =
      //         "No Available Stalls for Tender";
      //       document.getElementById("hawkerInput").style.borderColor = "red";
      //       alert("Error: No Available Stalls for Tender");
      //     } else {
      //       document.getElementById("error").innerHTML = "";
      //       await setDoc(doc(db, "TenderInfo", this.tenderID), {
      //         address: this.hawkerCentre,
      //         date: new Date(),
      //         foodItem: this.b,
      //         openingHours: {
      //           end: this.d,
      //           start: this.c,
      //         },
      //         status: "unsubmitted",
      //         userID: this.nric.slice(5),
      //       });

      //       this.$store.commit("setFormSaved");
      //     }
      //   }
      // }
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
        if (!docRef.exists()) {
          document.getElementById("error").innerHTML = "Invalid Hawker Centre";
          document.getElementById("hawkerInput").style.borderColor = "red";
          alert("Invalid Hawker Centre");
        } else if (String(parseInt(this.c)) != this.c || this.c.length != 4) {
          document.getElementById("openInput").style.borderColor = "red";
          document.getElementById("error").innerHTML = "Invalid Opening Time";
          alert("Error: Invalid Opening Time");
        } else if (String(parseInt(this.d)) != this.d || this.d.length != 4) {
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
            alert("Error: Invalid Opening Hours");
          } else if (hawkerOpen > parseInt(this.c) || hawkerClose < parseInt(this.d)) {
            alert("Error: Invalid Opening Hours");
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
                address: this.hawkerCentre,
                date: new Date(),
                foodItem: this.b,
                openingHours: {
                  end: this.d,
                  start: this.c,
                },
                status: "pending",
                userID: this.nric.slice(5),
              });
              let updateSlots = docRef.data().availableNrStalls - 1;
              console.log(updateSlots);
              await updateDoc(doc(db, "HawkerMetadata", this.hawkerCentre), {
                availableNrStalls: updateSlots,
              });

              router.push({ name: "HawkerDashBoard" });
            }
          }
        }
      }
    },

    selectHawker(hawker) {
      this.hawkerCentre = hawker.NAME;
      document.getElementById("selectHawkerDropdown").style.display = "none";
    },

    selectFood(food) {
      this.b = food.NAME;
      document.getElementById("selectFoodDropdown").style.display = "none";
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
              this.hawkerCentre = profile.address;
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
};
</script>
<style scoped>
h1 {
  position: absolute;
  text-align: left;
  left: 3.5vw;
  top: 10vh;
  font-size: 5vh;
}
.Tender_Details {
  position: absolute;
  width: 90vw;
  height: 24vh;
  top: 19vh;
  left: 5vw;
  border: 1px solid black;
}

#tender_header,
#personal_header {
  text-align: left;
  padding-top: 2vh;
  padding-left: 2vw;
  height: 7vh;
  width: 89.9vw;
  font-size: 4vh;
}

#tender_header {
  position: absolute;
  background-color: #1976d2;
  top: 19.2vh;
  left: 5.05vw;
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
  font-size: 3vh;
}

#HawkerAddr > input {
  left: 7vw;
  width: 25vw;
}

#options {
  position: absolute;
  text-align: left;
  top: 38vh;
  left: 5.5vw;
  /* background-color: white; */
  z-index: 300;
}

li:hover {
  background: #1976d2;
  color: white;
}

#options > ul {
  width: 26.5vw;
  list-style: none;
  max-height: 100px;
  overflow: scroll;
  overflow-x: hidden;
}

li {
  border-bottom: 1px solid lightgrey;
}

#Food > input {
  left: 34vw;
  width: 25vw;
}

#foodOptions {
  position: absolute;
  text-align: left;
  top: 38vh;
  left: 32.5vw;
  /* background-color: white; */
  z-index: 300;
}

#foodOptions > ul {
  width: 26.5vw;
  list-style: none;
  max-height: 100px;
  overflow: scroll;
  overflow-x: hidden;
}

#Open > input {
  left: 61vw;
  width: 15vw;
}

#Close > input {
  left: 78vw;
  width: 15vw;
}

#HawkerAddr > label,
#Food > label,
#Open > label,
#Close > label {
  position: absolute;
  top: 27.8vh;
  background-color: white;
  font-size: 1.5vw;
}
#HawkerAddr > label {
  left: 8vw;
}
#Food > label {
  left: 35vw;
}
#Open > label {
  left: 62vw;
}
#Close > label {
  left: 79vw;
}

#error {
  position: absolute;
  top: 19.2vh;
  font-size: 4vh;
  color: red;
  text-align: center;
  left: 34vw;
  width: 36vw;
}

.Personal_Details {
  position: absolute;
  width: 90vw;
  height: 33vh;
  top: 48vh;
  left: 5vw;
  border: 1px solid black;
}

#personal_header {
  position: absolute;
  background-color: #1976d2;
  top: 48.2vh;
  left: 5.05vw;
  color: white;
}
#name,
#nric,
#contact {
  position: absolute;
  top: 60vh;
  height: 7vh;
  font-size: 3vh;
  text-align: left;
  border: 1px solid black;
  padding-top: 1vw;
}
#name {
  left: 7vw;
  width: 44vw;
}

#nric {
  left: 53vw;
  width: 20vw;
}
#contact {
  left: 75vw;
  width: 18.5vw;
}

#nameLabel,
#nricLabel,
#contactLabel {
  position: absolute;
  top: 57.9vh;
  background-color: white;
  font-size: 1.5vw;
}

#nameLabel {
  left: 8vw;
}

#nricLabel {
  left: 54vw;
}

#contactLabel {
  left: 76vw;
}

#email,
#persAddress {
  position: absolute;
  top: 71vh;
  height: 7vh;
  font-size: 3vh;
  text-align: left;
  border: 1px solid black;
  padding-top: 1.5vh;
}

#email {
  left: 7vw;
  width: 42vw;
}
#persAddress {
  left: 51vw;
  width: 42.5vw;
}

#emailLabel,
#persAddressLabel {
  position: absolute;
  top: 68.8vh;
  background-color: white;
  font-size: 1.5vw;
}
#emailLabel {
  left: 8vw;
}
#persAddressLabel {
  left: 52vw;
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
  left: 73vw;
}

#save {
  left: 81vw;
}

#submit {
  left: 89vw;
}

#selectHawkerDropdown,
#selectFoodDropdown {
  background-color: white;
}
</style>

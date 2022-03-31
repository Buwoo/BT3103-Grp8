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
        <!-- Tender Details Section -->
        <div class="Tender_Details"></div>
        <h3 id="tender_header" class="bg-primary">Tender Details</h3>
        <form id="HawkerAddr">
        <div class="form-floating mb-3" id="hawkerForm">
          <input id="hawkerInput" class = "form-control" v-model="hawkerCentre" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label id="hawkerLabel" for="hawkerInput" ><strong>Hawker Centre</strong></label>
          </div>
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
        <div class="form-floating mb-3" id="foodForm">
          <input id="foodInput" class = "form-control" v-model="b" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label id = "foodLabel" for="foodInput"><strong>Food Item</strong></label>
          </div>
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
        <div class="form-floating mb-3" id="openForm">
          <input id="openInput" class = "form-control" v-model="c" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label id="openLabel" for="openInput"><strong>Opening Time</strong></label>
          </div>
        </form>
        <form id="Close">
        <div class="form-floating mb-3" id="closeForm">
          <input id="closeInput" class = "form-control" v-model="d" type="text" @change="this.$store.commit('setFormUnsaved')" autocomplete="off" />
          <label id="closeLabel" for="closeInput"><strong>Closing Time</strong></label>
        </div>
        </form>
        <div id="error"></div>
      </div>

      <!-- Personal Details Section -->
      <div>
        <div class="Personal_Details"></div>
        <h3 id="personal_header" class="bg-primary">Personal Details</h3>
        <form>
        <div class="form-floating mb-3" id="nameForm">
          <input class = "form-control" id="name" v-model="userName" disabled/>
          <label for="name"><strong>Name</strong></label>
        </div>
        </form>

        <form>
        <div class="form-floating mb-3" id="nricForm">
          <input class = "form-control" id="nric" v-model="nric" disabled/>
          <label for="nric"><strong>NRIC</strong></label>
        </div>
        </form>

        <form>
        <div class="form-floating mb-3" id="contactForm">       
          <input class="form-control" id="contact" v-model="contactNum" disabled/>
          <label for="contact"><strong>Contact Number</strong></label>
        </div>
        </form>

        <form>
        <div class="form-floating mb-3" id="emailForm">    
          <input class="form-control" id="email" v-model="email" disabled/>
          <label for="email"><strong>Email</strong></label>
        </div>
        </form>

        <form>
        <div class="form-floating mb-3" id="addressForm"> 
          <input class="form-control" id="persAddress" v-model="address" disabled/>
          <label for="persAddress"><strong>Address</strong></label>
        </div>
        </form>
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

      this.$store.commit('setFormSavedHawker', this.hawkerCentre);
      this.$store.commit('setFormSavedFood', this.b);
      this.$store.commit('setFormSavedOpen', this.c);
      this.$store.commit('setFormSavedClose',this.d);

    },
    returnNormalBorder() {
      document.getElementById("hawkerInput").style.borderColor = "#ced4da";
      document.getElementById("foodInput").style.borderColor = "#ced4da";
      document.getElementById("openInput").style.borderColor = "#ced4da";
      document.getElementById("closeInput").style.borderColor = "#ced4da";
      document.getElementById("hawkerLabel").style.color = "#2c3e50";
      document.getElementById("foodLabel").style.color = "#2c3e50";
      document.getElementById("openLabel").style.color = "#2c3e50";
      document.getElementById("closeLabel").style.color = "#2c3e50";
    },
    async submitTender() {
      this.returnNormalBorder();
      if (this.hawkerCentre == "" || this.b == "" || this.c == "" || this.d == "") {
        document.getElementById("error").innerHTML = "Fill up all fields";
        alert("Error: Fill up all fields");
        if (this.hawkerCentre == "") {
          document.getElementById("hawkerInput").style.borderColor = "red";
          document.getElementById("hawkerLabel").style.color = "red";
        }
        if (this.b == "") {
          document.getElementById("foodInput").style.borderColor = "red";
          document.getElementById("foodLabel").style.color = "red";
        }
        if (this.c == "") {
          document.getElementById("openInput").style.borderColor = "red";
          document.getElementById("openLabel").style.color = "red";
        }
        if (this.d == "") {
          document.getElementById("closeInput").style.borderColor = "red";
          document.getElementById("closeLabel").style.color = "red";
        }
      } else {
        let docRef = await getDoc(doc(db, "HawkerMetadata", this.hawkerCentre));
        let foodItem = [];
        this.foodGrp.forEach((element) => foodItem.push(Object.values(element)[1]));
        if (!docRef.exists()) {
          document.getElementById("error").innerHTML = "Invalid Hawker Centre";
          document.getElementById("hawkerInput").style.borderColor = "red";
          document.getElementById("hawkerLabel").style.color = "red";
          alert("Invalid Hawker Centre");
        } else if (!foodItem.includes(this.b)) {
          document.getElementById("foodInput").style.borderColor = "red";
          document.getElementById("foodLabel").style.color = "red";
          document.getElementById("error").innerHTML = "Invalid Food Item";
          alert("Error: Invalid Food Item");
        } else if (!/^\d+$/.test(this.c) || this.c.length != 4) {
          document.getElementById("openInput").style.borderColor = "red";
          document.getElementById("openLabel").style.color = "red";
          document.getElementById("error").innerHTML = "Invalid Opening Time";
          alert("Error: Invalid Opening Time");
        } else if (!/^\d+$/.test(this.d) || this.d.length != 4) {
          document.getElementById("closeInput").style.borderColor = "red";
          document.getElementById("closeLabel").style.color = "red";
          document.getElementById("error").innerHTML = "Invalid Closing Hours";
          alert("Error: Invalid Closing Time");
        } else {
          let hawkerOpen = parseInt(docRef.data().openingHrs.slice(0, 4));
          let hawkerClose = parseInt(docRef.data().openingHrs.slice(5));
          if (parseInt(this.c) >= parseInt(this.d)) {
            document.getElementById("error").innerHTML = "Invalid Opening Hours";
            document.getElementById("openLabel").style.color = "red";
            document.getElementById("closeLabel").style.color = "red";
            document.getElementById("openInput").style.borderColor = "red";
            document.getElementById("closeInput").style.borderColor = "red";
            alert("Error: Invalid Opening Hours \nOpening Time has to be before closing time");
          } else if (hawkerOpen > parseInt(this.c) || hawkerClose < parseInt(this.d)) {
            alert("Error: Invalid Opening Hours \nOpening Hours: " + hawkerOpen + "-" + hawkerClose);
            document.getElementById("error").innerHTML = "Invalid Opening Hours";
            if (hawkerOpen > parseInt(this.c)) {
              document.getElementById("openInput").style.borderColor = "red";
              document.getElementById("openLabel").style.color = "red";
            }

            if (hawkerClose < parseInt(this.d)) {
              document.getElementById("closeInput").style.borderColor = "red";
              document.getElementById("closeLabel").style.color = "red";
            }
          } else if (docRef.data().availableNrStalls <= 0) {
            document.getElementById("error").innerHTML = "No Available Stalls for Tender";
            document.getElementById("hawkerInput").style.borderColor = "red";
            document.getElementById("hawkerLabel").style.color = "red";
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
              this.$store.commit('initHawker',profile.name)
              this.$store.commit('initFood',profile.foodItem)
              this.$store.commit('initOpen',profile.openingHours.start)
              this.$store.commit('initClose',profile.openingHours.end)

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
    window.onbeforeunload = function() {
    return 'Dialog text here.';
    };
  }

  */
};
</script>
<style scoped>
h3 {
  position: absolute;
  text-align: left;
  left: 10vw;
  top: 8vh;
}
.Tender_Details {
  position: absolute;
  width: 78vw;
  height: 24vh;
  top: 20vh;
  left: 12vw;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 4px;
}

#tender_header,
#personal_header {
  text-align: left;
  padding-top: 2vh;
  padding-left: 2vw;
  height: 7.5vh;
  width: 77.95vw;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

#tender_header {
  position: absolute;
  top: 20vh;
  left: 12.05vw;
  color: white;
}

#hawkerForm ,
#foodForm,
#openForm,
#closeForm {
  position: absolute;
  display: inline-block;
  top: 30vh;
}


#hawkerInput,
#foodInput,
#openInput,
#closeInput {
  height: 8vh;
  font-size: 2.5vh;
}

#hawkerForm {
  left: 14vw;
  width: 27vw;
}

#options {
  position: absolute;
  text-align: left;
  top: 39vh;
  left: 12.5vw;
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


#foodForm {
  left: 43vw;
  width: 17vw;
}

#foodOptions {
  position: absolute;
  text-align: left;
  top: 39vh;
  left: 41.5vw;
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

#openForm{
  left: 62vw;
  width: 12vw;
}

#closeForm {
  left: 76vw;
  width: 12vw;
}


#error {
  position: absolute;
  top: 20.2vh;
  font-size: 4vh;
  color: red;
  text-align: center;
  left: 34vw;
  width: 36vw;
}

.Personal_Details {
  position: absolute;
  width: 78vw;
  height: 33vh;
  top: 49vh;
  left: 12vw;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
	border: none;
  border-radius: 4px;
}

#personal_header {
  position: absolute;
  background-color: #1976d2;
  top: 49vh;
  left: 12.05vw;
  color: white;
}

#nameForm,
#nricForm,
#contactForm {
  position: absolute;
  top: 60vh;
  text-align: left;
  color: #6C757D;
}

#nameForm {
  left: 14vw;
  width: 34vw;
}

#name,
#nric,
#contact {
  height:8vh;
  font-size: 2.5vh;
}

#nricForm {
  left: 50vw;
  width: 19vw;
}

#contactForm {
  left: 71vw;
  width: 17vw;
}



#emailForm,
#addressForm {
  position: absolute;
  top: 71vh;
  text-align: left;
  color: #6C757D;
}

#email,
#persAddress {
  height:8vh;
  font-size: 2.5vh;  
}

#emailForm {
  left: 14vw;
  width: 30vw;
}

#addressForm {
  left: 46vw;
  width: 42vw;
}

#emailLabel,
#persAddressLabel {
  position: absolute;
  top: 69.6vh;
}
#emailLabel {
  left: 15vw;
}
#persAddressLabel {
  left: 47vw;
}

#save,
#submit,
#delete {
  position: absolute;
  top: 85vh;
  /* height: 6vh; */
  width: 6vw;
}

#delete {
  left: 68vw;
}

#save {
  left: 76vw;
}

#submit {
  left: 84vw;
}

#selectHawkerDropdown,
#selectFoodDropdown {
  background-color: white;
}
</style>
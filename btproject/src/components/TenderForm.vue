<template>
    <h1>Application for Tenancy of Hawker Stall</h1>
    
    <div>
        <div class = "Tender_Details"></div>
        <h2 id = "tender_header">Tender Details</h2>
        <form id = "HawkerAddr">
            <input id = "hawkerInput" v-model = "hawkerCentre" type = "text">
            <label>Hawker Address</label>
            <div id = "options">
                <ul>
                    <li @click = "selectHawker(hawker)" v-for = "(hawker, index) in filteredUser" :key = "`hawker-${index}`"> 
                    {{ hawker.name }} 
                    </li>
                </ul>
            </div>
        </form>
        <form id = "Food">
            <input id = "foodInput" v-model = "b" type = "text">
            <label>Food Item</label>
        </form>
        <form id = "Open">
            <input id = "openInput" v-model = "c" type = "text">
            <label>Opening Time</label>
        </form>
        <form id = "Close">
            <input id = "closeInput" v-model = "d" type = "text">
            <label>Closing Time</label>
        </form>
        <div id = "error"></div>
        
    </div>
    <div>
        <div class = "Personal_Details"></div>
        <h2 id = "personal_header">Personal Details</h2>
        <div id = "name" v-text = "userName"></div>
        <div id = "nric" v-text = "nric"></div>
        <div id = "contact" v-text = "contactNum"></div>
        <div id = "email" v-text = "email"></div>
        <div id = "persAddress" v-text = "address"></div>
        <div id = "nameLabel">Name</div>
        <div id = "nricLabel">NRIC</div>
        <div id = "contactLabel">Contact Number</div>
        <div id = "emailLabel">Email</div>
        <div id = "persAddressLabel">Address</div>


    </div>

    <button id = "save">SAVE</button>
    <button id = "submit" v-on:click = "submitTender()">Submit</button>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { getDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
export default {
    props: {
        tenderID: String,
    },

    data() {
        return{
            hawkerCentre:"",
            b:"",
            c:"",
            d:"",
            userName:"",
            nric: "",
            contactNum:"",
            email:"",
            address:"",
            hawkers:[{"id": 1,"name": "Adam Road Food Centre"}, 
                     {"id": 2,"name": "Aljunied Ave 2 Blk 117 (Blk 117 Aljunied Market and Food Centre)"} ,
                     {"id": 3,"name": "Amoy Street Food Centre (Telok Ayer Food Centre)"}],
        }
    },

    computed: {
        filteredUser() {
          const query = this.hawkerCentre.toLowerCase()
          if(this.hawkerCentre === "") {
              return this.hawkers;
          }
          return this.hawkers.filter((hawker) => {
              return Object.values(hawker).some((word) => String(word).toLowerCase().includes(query)
              );
          })
        }
    },


    methods: {
        async saveTender() {
            document.getElementById("error").innerHTML = ""
            document.getElementById("HawkerAddr").style.borderColor = "black"
            document.getElementById("openInput").style.borderColor = "black"
            document.getElementById("closeInput").style.borderColor = "black"
            await setDoc(doc(db, "TenderInfo", "1111111"),{
                address: this.hawkerCentre,
                date: new Date(),
                foodItem: this.b,
                openingHours: {
                    end: this.d,
                    start: this.c
                },
                userID: this.ic
                
            })

        },
        returnNormalBorder() {
            document.getElementById("hawkerInput").style.borderColor = "black"
            document.getElementById("foodInput").style.borderColor = "black"
            document.getElementById("openInput").style.borderColor = "black"
            document.getElementById("closeInput").style.borderColor = "black"            
        },
        async submitTender() {
            this.returnNormalBorder()
            if (this.hawkerCentre=="" || this.b=="" || this.c=="" || this.d=="") {
                document.getElementById("error").innerHTML = "Fill up all fields"
                alert("Error: Fill up all fields")
                if (this.hawkerCentre == "") {
                    document.getElementById("hawkerInput").style.borderColor = "red"
                }
                if (this.b == "") {
                    document.getElementById("foodInput").style.borderColor = "red"
                }
                if (this.c == "") {
                    document.getElementById("openInput").style.borderColor = "red"
                }
                if (this.d == "") {
                    document.getElementById("closeInput").style.borderColor = "red"
                }
            } else {
                let docRef = await getDoc(doc(db, "HawkerMetadata", this.hawkerCentre))
                if (!docRef.exists()){
                    document.getElementById("error").innerHTML = "Invalid Hawker Centre"
                    document.getElementById("hawkerInput").style.borderColor = "red"
                    alert("Invalid Hawker Centre")
                
                }else if (parseInt(this.c) >= parseInt(this.d)){
                    document.getElementById("error").innerHTML = "Invalid Opening Hours"
                    document.getElementById("openInput").style.borderColor = "red"
                    document.getElementById("closeInput").style.borderColor = "red" 
                    alert("Error: Invalid Opening Hours")             
                } else {
                    let text = "Confirm Submission?"
                    if (confirm(text) == true) {
                        document.getElementById("error").innerHTML = ""
                        await setDoc(doc(db, "TenderInfo", this.tenderID),{
                            address: this.hawkerCentre,
                            date: new Date(),
                            foodItem: this.b,
                            openingHours: {
                                end: this.d,
                                start: this.c
                            },
                            status: "submitted",
                            userID: this.ic
                
                        })
                    }
                }
            }
             
        
    },

        selectHawker(hawker) {
            this.hawkerCentre = hawker.name
        }


    },

    
    created() {
        let response = getDoc(doc(db, "TenderInfo", this.tenderID));
        response.then((rsp) => {
          let profile = rsp.data();
          this.hawkerCentre = profile.address;
          this.b = profile.foodItem;
          this.c = profile.openingHours.start;
          this.d = profile.openingHours.end;
        })
        .catch((error) => {
          console.log(error);
        })

        const auth = getAuth();
        var ref = this;
        console.log(ref.user)
        onAuthStateChanged(auth, (user) => {
        if (user) {
            var ic = user.email.slice(0,4).toUpperCase()
            let response = getDoc(doc(db, "Authentication", ic));
            response.then((rsp) => {
                let profile = rsp.data();
                this.userName = profile.fullName;
                this.nric = "SXXXX" + ic
                this.contactNum = profile.mobileNr
                this.email = profile.email
                this.address = profile.address

            })
            .catch((error) => {
                console.log(error);
            })
        }
        })
    },
    


         






}


</script>

<style>
     h1{
         position:absolute;
         text-align:left;
         left:3.5vw;
         top: 10vh;
         font-size: 5vh;
     }
    .Tender_Details{
        position: absolute;
        width: 90vw;
        height: 24vh;
        top: 25vh;
        left: 5vw;
        border: 1px solid black;

    }

    #tender_header, #personal_header{
        text-align: left;
        padding-top: 2vh;
        padding-left: 2vw;
        height:7vh;
        width:89.9vw;
        font-size:4vh;

    }

    #tender_header{
        position: absolute;
        background-color: #1976D2;
        top: 25.2vh;
        left: 5.05vw;
        color:white;
    }

    #HawkerAddr>input, #Food>input, #Open>input, #Close>input{
        position:absolute;
        display: inline-block;
        top: 36vh;
        height: 7vh;
        font-size: 3vh;
    }

    #HawkerAddr>input{
        left: 7vw;
        width: 25vw;      
    }


    #options {
        position:absolute;
        text-align:left;
        top: 44vh;
        left: 7vw
    }

    #options>ul {
        width: 25vw;
        list-style:none;
        max-height:100px;
        overflow:scroll;
    }

    li {
        border-bottom:1px solid lightgrey
    }
    

    #Food>input{
        left: 34vw;
        width: 25vw;
    }

    #Open>input{
        left: 61vw;
        width: 15vw;

    }

    #Close>input{
        left: 78vw;
        width: 15vw;
    }

    #HawkerAddr>label, #Food>label, #Open>label, #Close>label{
        position:absolute;
        top: 33.8vh;
        background-color: white;
        font-size: 1.5vw;

    }
    #HawkerAddr>label {
        left: 8vw;
    }
    #Food>label {
        left: 35vw;
    }
    #Open>label{
        left: 62vw;
    }
    #Close>label{
        left: 79vw;
    }

    #error{
        position:absolute;
        top: 43.5vh;
        font-size:4vh;
        color:red;
        text-align:center;
        left:34vw;
        width:36vw;
    }

    .Personal_Details{
        position: absolute;
        width: 90vw;
        height: 33vh;
        top: 54vh;
        left: 5vw;
        border: 1px solid black;

    }

    #personal_header{
        position: absolute;
        background-color: #1976D2;
        top: 54.2vh;
        left: 5.05vw;
        color:white
    }
    #name, #nric, #contact{
        position:absolute;
        top: 66vh;
        height: 7vh;
        font-size: 3vh;
        text-align: left;
        border: 1px solid black;
        padding-top: 1vw;
    }
    #name {
        left: 7vw ;
        width: 44vw;
    }

    #nric {
        left: 53vw ;
        width: 20vw
    }
    #contact {
        left: 75vw ;
        width: 18.5vw
    }

    #nameLabel, #nricLabel, #contactLabel{
    position:absolute;
    top: 63.9vh;
    background-color: white;
    font-size: 1.5vw;
    }

    #nameLabel {
        left: 8vw ;
    }

    #nricLabel {
        left: 54vw ;
    }

    #contactLabel {
        left: 76vw ;
    }
    
    #email, #persAddress{
        position:absolute;
        top: 77vh;
        height: 7vh;
        font-size: 3vh;
        text-align: left;
        border: 1px solid black;
        padding-top: 1.5vh;
    }

    #email {
        left: 7vw ;
        width: 42vw;
    }
    #persAddress {
        left: 51vw ;
        width: 42.5vw;
    }

    #emailLabel, #persAddressLabel{
        position:absolute;
        top: 74.8vh;
        background-color: white;
        font-size: 1.5vw;
    }
    #emailLabel {
        left: 8vw ;
    }
    #persAddressLabel {
        left: 52vw ;
    }

    #save, #submit {
        position:absolute;
        top:90vh;
        height:6vh;
        width: 6vw;
    }

    #save{
        left:81vw;
    }

    #submit{
        left:89vw;
        background-color:green;
    }

</style>
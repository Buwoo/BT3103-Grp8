<template>
    <h1>Application for Tenancy of Hawker Stall</h1>
    
    <div>
        <div class = "Tender_Details"></div>
        <h2 id = "tender_header">Tender Details</h2>
        <form id = "HawkerAddr">
            <input v-model = "a" type = "text">
            <label>Hawker Address</label>
        </form>
        <form id = "Food">
            <input v-model = "b" type = "text">
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
        <div id = "name"></div>
        <div id = "nric"></div>
        <div id = "contact"></div>
        <div id = "email"></div>
        <div id = "persAddress"></div>
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

const db = getFirestore(firebaseApp);
export default {
    props: {
        ic: String
    },

    data() {
        return{
            a:"",
            b:"",
            c:"",
            d:"",
        }
    },


    methods: {
        async saveTender() {
            document.getElementById("error").innerHTML = ""
            document.getElementById("HawkerAddr").style.borderColor = "black"
            document.getElementById("openInput").style.borderColor = "black"
            document.getElementById("closeInput").style.borderColor = "black"
            await setDoc(doc(db, "TenderInfo", "1111111"),{
                address: this.a,
                date: new Date(),
                foodItem: this.b,
                openingHours: {
                    end: this.d,
                    start: this.c
                },
                userID: this.ic
                
            })

        },
        async submitTender() {
            if (this.a=="" || this.b=="" || this.c=="" || this.d=="") {
                document.getElementById("error").innerHTML = "Fill up all fields"
                alert("Error: Fill up all fields")
            } else if (parseInt(this.c) >= parseInt(this.d)){
                document.getElementById("error").innerHTML = "Invalid Opening Hours"
                document.getElementById("openInput").style.borderColor = "red"
                document.getElementById("closeInput").style.borderColor = "red" 
                alert("Error: Invalid Opening Hours")             
            } else {
                let text = "Confirm Submission?"
                if (confirm(text) == true) {
                    document.getElementById("error").innerHTML = ""
                    document.getElementById("HawkerAddr").style.borderColor = "black"
                    document.getElementById("openInput").style.borderColor = "black"
                    document.getElementById("closeInput").style.borderColor = "black"
                    await setDoc(doc(db, "TenderInfo", "1111111"),{
                        address: this.a,
                        date: new Date(),
                        foodItem: this.b,
                        openingHours: {
                            end: this.d,
                            start: this.c
                        },
                        userID: this.ic
                
                    })
                }
            }        
        },

    },
    mounted() {
        async function displayPersonal(ic) {
            var docRef = await getDoc(doc(db, "Authentication", ic));

            var data = docRef.data()

            document.getElementById("nric").innerHTML = "SXXXX" + ic
            document.getElementById("name").innerHTML = data.fullName
            
            document.getElementById("contact").innerHTML = data.mobileNr
            document.getElementById("email").innerHTML = data.email
            document.getElementById("persAddress").innerHTML = data.address  
        }

        displayPersonal(this.ic)

    },
    





}


</script>

<style>
     h1{
         position:absolute;
         text-align:left;
         left:5vw;
         top: 10vh;
     }
    .Tender_Details{
        position: absolute;
        width: 90vw;
        height: 25vh;
        top: 15vh;
        left: 5vw;
        border: 1px solid black;

    }

    #tender_header, #personal_header{
        text-align: left;
        padding-top: 2vh;
        padding-left: 2vw;
        height:7vh;
        width:89.9vw;

    }

    #tender_header{
        position: absolute;
        background-color: #1976D2;
        top: 15.2vh;
        left: 5.05vw;
        color:white;
    }

    #HawkerAddr>input, #Food>input, #Open>input, #Close>input{
        position:absolute;
        display: inline-block;
        top: 27vh;
        height: 8vh;
        font-size: 3vh;
    }

    #HawkerAddr>input{
        left: 7vw;
        width: 25vw;      
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
        top: 24.8vh;
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
        top: 35vh;
        font-size:4vh;
        color:red;
        text-align:center;
        width:100vw;
    }

    .Personal_Details{
        position: absolute;
        width: 90vw;
        height: 35vh;
        top: 43vh;
        left: 5vw;
        border: 1px solid black;

    }

    #personal_header{
        position: absolute;
        background-color: #1976D2;
        top: 43.2vh;
        left: 5.05vw;
        color:white
    }
    #name, #nric, #contact{
        position:absolute;
        top: 55vh;
        height: 8vh;
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
    top: 52.9vh;
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
        top: 67vh;
        height: 8vh;
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
        top: 64.8vh;
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
        top:84vh;
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
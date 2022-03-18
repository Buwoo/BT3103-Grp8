<template>

    <!-- Heading with the Create Button -->

    <div class = "webpage">
        <div class = "container-fluid">
            <div class = "row mx-auto" id = "headings">
                <div class = "col-md-8">
                    <h3 class = "mt-0" id = "dashboardHeading">Tender Dashboard</h3>
                </div>
                <div class = "col-md-4" id = "createButton">
                    <button type="button" class="btn btn-primary btn-lg mt-0 " @click = "createForm">+ Create</button>
                </div>
            </div>

            <div class = "row mx-auto" id ="wholeTable">

                <!-- Tender Table-->

                <div class = "table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Tender ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Tender Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody >
                            <tr v-for = "(a,index) in applications" :key = "a.id">
                                <td id = "tenderID">
                                    <button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target="'#modal_'+a.id">
                                            {{a.id}}
                                    </button>

                                    <div class = "modal-lg" modal-xl id = "tenderIdModal" >
                                        <!-- Modal -->
                                        <div class="modal fade" :id="'modal_'+a.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" > 
                                            <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <div class = "container-fluid">
                                                        <div class = "row">                        
                                                            <button type="button" class="btn-close" id= "close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class = "row fw-bold">
                                                            <div class = "col-md-8">
                                                                <h5 class="modal-title fs-3" id="exampleModalLabel">Tender {{a.id}}</h5>
                                                            </div>

                                                            <div class = "col-md-4 d-flex">
                                                                <h5 class = "align-bottom float-end" id = "statusLabel">Status: 
                                                                    <span :class = "getColour(a.data().status)" class = "fw-bold"> {{a.data().status}} </span> 
                                                                </h5>
                                                            </div>
                                                    

                                                        </div>


                                                    </div>
                                                </div>
                                                <div class="modal-body text-start">

                                                        <!-- First Card: Tender Details -->

                                                    <div class="card" >
                                                        <div class="card-header text-md-start">
                                                            Tender Details
                                                        </div>
                                                        <div class = "container-fluid">
                                                            <div class="card-body">
                                                                    <div class="row">
                                                                        <div class = "details col-xs-6 col-md-6 ">
                                                                            <p class="card-text"><small class="text-muted">Hawker Address</small></p>
                                                                                <p class="card-text">{{a.data().address}}</p>   
                                                                        </div>

                                                                        <div class = "details col-xs-6 col-md">
                                                                                <p class="card-text"><small class="text-muted">Food Item</small></p>
                                                                                <p class="card-text">{{a.data().foodItem}}</p> 
                                                                        </div>
                                                                        
                                                                        <div class = "details col-xs-6 col-md">
                                                                                <p class="card-text"><small class="text-muted">Date</small></p>
                                                                                <p class="card-text">{{a.data().date.toDate().toDateString()}}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class = "details col-xs-6 col-md-6">
                                                                            <p class="card-text"><small class="text-muted">Opening Time</small></p>
                                                                            <p class="card-text">{{a.data().openingHours.start}}</p>  
                                                                        </div>

                                                                        <div class = "details col-xs-6 col-md">
                                                                            <p class="card-text"><small class="text-muted">Closing Time</small></p>
                                                                            <p class="card-text">{{a.data().openingHours.end}}</p> 
                                                                            
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                    <!-- Second Card: Personal Details of the Hawker -->

                                                    <div class="card" >
                                                        <div class=" card-header text-md-start"> Personal Details </div>
                                                        <div class = "container-fluid">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="details col-md-4"> 
                                                                        <p class="card-text"><small class="text-muted">Name</small></p>
                                                                        <p class="card-text">{{name}}</p> 
                                                                    </div> 

                                                                    <div class="details col-md-4"> 
                                                                        <p class="card-text"><small class="text-muted">NRIC</small></p>
                                                                        <p class="card-text">XXXXX{{id}}</p> 
                                                                    </div> 

                                                                    <div class="details col-md-4"> 
                                                                        <p class="card-text"><small class="text-muted">Email</small></p>
                                                                        <p class="card-text">{{email}}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                        <div class="details col-md-4"> 
                                                                            <p class="card-text"><small class="text-muted">Home Address</small></p>
                                                                            <p class="card-text">{{address}}</p>
                                                                        </div> 

                                                                        <div class="details col-xs-4 col-md-6"> 
                                                                            <p class="card-text"><small class="text-muted">Contact Number</small></p>
                                                                            <p class="card-text">{{mobile}}</p> 
                                                                        </div> 
                                                                </div>  
                                                        
                                                            </div>
                                                        </div>
                                                    </div> 

                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td id = "date">
                                    {{a.data().date.toDate().toDateString()}}
                                </td>

                                <td id = "address">
                                    {{a.data().address}}   
                                </td>

                                <td id = "status" :class = "getColour(a.data().status)">
                                    {{a.data().status}}
                                </td>

                                <td id = "actions">
                                    <span id = "buttons">        
                                        <button id = "editButton" @click = "checkStatus(a) ? editForm(a.id) : null" :class = "[checkStatus(a) ? 'btn-success' : 'btn-secondary']" > 
                                        <i class="bi bi-pencil-fill"></i></button>
                                    
                                        <button id = "deleteButton"  @click = "checkStatus(a) ? deleteForm(index,a) : null"
                                        :class = "[checkStatus(a) ? 'btn-danger' : 'btn-secondary']"><i class="bi bi-trash3"></i></button>
             
                                    </span>

                                </td>    

                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>


    
</template>

<script>
    import firebaseApp from '../firebase.js';
    import {getFirestore} from "firebase/firestore"
    import {collection, query, where, getDocs, deleteDoc, doc , getDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import router from "../router/index.js";
    
    const db = getFirestore(firebaseApp);

    export default {

        data() {
            return {
                applications:[],
                name: "",
                address: "",
                email: "",
                mobile: "",
                id: "",
                 
            }

        },

        methods : {


            deleteForm: async function(index,a) {
                var c = confirm("Do you want to delete this Tender Form?")
                if (c == true) {
                    await deleteDoc(doc(db, "TenderInfo", a.id));
                    this.applications.splice(index, 1); 
                }
            },

            checkStatus: function(a) {
                return a.data().status.trim() == "Unsubmitted".trim()

            },

            editForm: function(tenderId) {
                console.log(tenderId)
                router.push({
                    name: "TenderFormView",
                    params: {tenderID:tenderId}
                }
                )

            },
            createForm: function() {
                console.log("error")
                router.push({name: '"TenderFormView"'})
            },

            getColour: function(status) {
                switch(status) {
                    case "Approved":
                        return "text-success";
                    case "Pending":
                        return "text-warning";
                    case "Rejected":
                        return "text-danger";
                    case "Unsubmitted":
                        return "text-secondary";

                }
            },
            loadHawkerData: function(id) {
                this.id = id;
                let response = getDoc(doc(db, "Authentication", id));
                response.then((rsp) => {
                    let profile = rsp.data();
                    this.name = profile.fullName;
                    this.email = profile.email;
                    this.address = profile.address;
                    this.mobile = profile.mobileNr;
                }).catch((error) => {
                    console.log(error);
                });
            },
            loadDetails: async function(hawkerID) {
                    //alert("loading tender")
                    const q = query(collection(db, "TenderInfo"), where("userID", "==", hawkerID)); 
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach( (doc) => {
                        this.applications.push(doc);  
                    })
                }
        },
        mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if(user){
                    //this.user = user;
                    let id = auth.currentUser.email.slice(0, 4).toUpperCase();
                    console.log(id);
                    this.loadHawkerData(id);
                    this.loadDetails(id);
                } else {
                    console.log("woops, auth issue")
                }
            })
        }
    }

            

</script>



<style scoped>

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");



    #dashboardHeading{
        margin-right: 200px;
        display: inline-block;
        padding-top: 40px;
    }

    #createButton {
        margin-top:30px;
        padding-right: 7%;
    }



     #wholeTable {
        width:70%;

    }

    .modal-dialog {
          max-width: 900px; 
    }

    .card{
        max-width: 850px;
    }

    #exampleModalLabel {
        margin-left: 5%;
        float:left;
        font-weight: bold;
    }
    
    #statusLabel {
        padding-left: 30px;
        align-self: center;
        margin-bottom: 0;
        font-weight: bold;
    }

    .card-header {
        background-color:#1976D2; 
        color:white;
    }

    /*.container{
        display: inline-flex;
    }*/

    .card{
        margin: 0px 30px 30px 30px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    }

    #editButton, #deleteButton{
        display:inline-block;
    }
    

</style>

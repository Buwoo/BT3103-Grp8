<template>

    <!-- Heading with the Create Button -->

    <div class = "heading">
        <h3 id = "dashboardHeading">Tender Dashboard</h3>
        <button type="button" class="btn btn-primary btn-lg">+ Create</button>
    </div>

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

                        <div class = "modal-lg">
                            <!-- Modal -->
                            <div class="modal fade" :id="'modal_'+a.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Tender {{a.id}}</h5>
                                        <h5 class = "status" id = "statusLabel">Status</h5>
                                        <button type="button" class="btn-close" id= "close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                         <!-- First Card: Tender Details -->

                                        <div class="card" >
                                            <div class="card-header">
                                                    Tender Details
                                            </div>
                                            <div class="card-body">
                                                <div class="row g-0">
                                                   <!--  <div class="box col-xs-6 col-md-10 justify-content-start"> -->
                                                    <!--   <h3 class="card-title"><b>{{name}}</b></h3>-->
                                                    <div class="container">
                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Hawker Address</small></p>
                                                            <p class="card-text">{{a.data().address}}</p> 
                                                        </div> 

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Food Item</small></p>
                                                             <p class="card-text">{{a.data().foodItem}}</p> 
                                                        </div> 

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Date</small></p>
                                                            <p class="card-text">{{a.data().date.toDate().toDateString()}}</p>
                                                        </div>

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Opening Time</small></p>
                                                            <p class="card-text">{{a.data().openingHours.start}}</p>
                                                        </div> 

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Closing Time</small></p>
                                                            <p class="card-text">{{a.data().openingHours.end}}</p> 
                                                        </div> 
                                                    </div> 
                                                   <!-- </div>-->
                                                </div>
                                            </div>
                                        </div> 

                                        <!-- Second Card: Personal Details of the Hawker -->

                                        <div class="card" >
                                            <div class="card-header">
                                                    Personal Details
                                            </div>
                                            <div class="card-body">
                                                <div class="row g-0">
                
                                                    <div class="container">
                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Name</small></p>
                                                            <p class="card-text">{{hawkerInfo.name}}</p> 
                                                        </div> 

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">NRIC</small></p>
                                                             <p class="card-text">XXXXX{{hawkerInfo.nric}}</p> 
                                                        </div> 

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Email</small></p>
                                                            <p class="card-text">{{hawkerInfo.email}}</p>
                                                        </div>

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Home Address</small></p>
                                                            <p class="card-text">{{hawkerInfo.homeAddress}}</p>
                                                        </div> 

                                                        <div class="details col-xs-6 col-md"> 
                                                            <p class="card-text"><small class="text-muted">Contact Number</small></p>
                                                            <p class="card-text">{{hawkerInfo.contactNumber}}</p> 
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

                    <td id = "status">
                        {{a.data().status}}
                    </td>

                    <td id = "actions">   
                        <button id = "editButton" @click = "editForm" > <i class="bi bi-pencil-fill"></i></button>
                        <button id = "deleteButton"  @click = "checkStatus(a) ? deleteForm(index,a) : null"><i class="bi bi-trash3"></i></button>

                    </td>    

                </tr>

            </tbody>

        </table>
    </div>
    
</template>

<script>
    import app from '../firebase.js';
    import {getFirestore} from "firebase/firestore"
    import {collection, query, where, getDocs, deleteDoc, doc  } from "firebase/firestore";
    const db = getFirestore(app);

    export default {

        data() {
            return {
                applications:[],
                personalData:[],
                hawkerInfo : {
                    name:"Yeo Ah Moy",
                    nric:"345Y",
                    email:"ah_moyy@gmail.com",
                    homeAddress:"91 Sembawang",
                    contactNumber:"912345"
                },
                hawkerID: null,

                 
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
                return a.data().status.trim() == "unsubmitted".trim()

            },

            editForm: function() {
                alert("You are editing this form")

            }



        },
       
        mounted() {
            let self = this;
            async function loadDetails(hawkerID) {
                const q = query(collection(db, "TenderInfo"), where("userIC", "==", hawkerID)); 
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach( (doc) => {
                    self.applications.push(doc)
                    self.hawkerID = doc.data().hawkerID
                    
    
                })

            }

            loadDetails("354Y");
            
        }

    }

            




           
    

        

        


</script>



<style scoped>

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");



    #dashboardHeading {
        padding-top: 30px;
        padding-left: 5vw;
        padding-right: 20cm;
        padding-bottom: 10px;
        display:inline-flex;
    }

    table {
        margin-left: 1cm;
        text-align: left;
        width:30cm;

        
    }


    #exampleModalLabel {
        float: left;


    }

    #statusLabel {
        float: right;
        padding-left: 4cm;
        padding-top: 0.1cm;

    }


    .card-header {
        background-color:#1976D2; 
        color:white;
    }

    .container{
        display: inline-flex;
    }

    .card{
        margin: 0px 30px 30px 30px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    }

    #deleteButton {
        margin: 0px 10px 10px 10px;

    }


    


    
    




</style>
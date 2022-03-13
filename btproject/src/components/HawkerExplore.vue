<template>
    <div class = "container-fluid h-100 w-100 px-3 d-flex flex-column flex-grow-1">
        <!-- Location Search Bar -->
        <div class="row align-items-center text-center">
            <!-- Region Selector -->
            <div class="col-md"> 
                <label for="search_select_region" class="select-label">Region</label>
                <select id="search_select_region" name="RegionSelect" v-model="selectRegion"
                    :class="[selectRegion=='' ? 'select-placeholder' : '','form-select']" >
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="North">North</option>
                    <option value="North-East">East</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="Central">Central</option>
                </select>
            </div>

            <!-- Price Point Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Price</label>
                <select id="search_select_price" name="PriceSelect" v-model="selectPrice"
                    :class="[selectPrice=='' ? 'select-placeholder' : '','form-select']" >
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="0-2">0-2$</option>
                    <option value="2-4">2-4$</option>
                    <option value="4-6">4-6$</option>
                    <option value="6-8">6-8$</option>
                    <option value="8-10">8-10$</option>
                    <option value="10-12">10-12$</option>
                    <option value="12-100">$12 and above</option>
                </select>
            </div>
        
            <!-- Budget Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Budget</label>
                <select id="search_select_budget" name="BudgetSelect" 
                    :class="[selectBudget=='' ? 'select-placeholder' : '','form-select']" v-model="selectBudget">
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="1000">Less than $1000</option>
                    <option value="1000-2000">1000-2000$</option>
                    <option value="2000-3000">2000-3000$</option>
                    <option value="3000-4000">3000-4000$</option>
                    <option value="4000">$4000 and above</option>
                </select>
            </div>

            <!-- Opening Hours Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Opening Hours</label>
                <select id="search_select_hours" name="HoursSelect" 
                    :class="[selectOpeningHours=='' ? 'select-placeholder' : '','form-select']" v-model="selectOpeningHours">
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                </select>
            </div>

            <!-- Food Type Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Food Type</label>
                <select id="search_select_food" name="FoodSelect" 
                    :class="[selectFoodType=='' ? 'select-placeholder' : '','form-select']" v-model="selectFoodType">
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="snacks">Snacks and Pastries</option>
                    <option value="drinks">Drinks and Desserts</option>
                    <option value="chinese">Chinese Cooked Food</option>
                    <option value="malay">Malay Cooked Food</option>
                    <option value="indian">Indian Cooked Food</option>
                    <option value="others">Others</option>
                </select>
            </div>  

            <!-- Only display Available stalls toggle -->
            <div class="col-md">
                <div class="form-check form-switch" id="search_availstall">
                    <span class="d-table-cell align-middle">
                        <input class="form-check-input" type="checkbox" id="search_select_availstall" v-model="selectAvailStall">
                    </span>
                    <label class="form-check-label d-table-cell" for="flexSwitchCheckDefault">Only display available stores</label>

                </div>
            </div>

            <!-- Search Button -->
            <!-- TODO: Further stlying -->
            <div class="col-md">
                <button type="button" class="btn btn-primary w-75" @click="searchLocations()"> 
                   <i class="bi bi-search pe-3"></i> Search 
                </button>
            </div>
            
            
        </div>

        <div class="row flex-grow-1 pb-3">
            <div class="col-md-4 d-flex flex-column">
                <!-- List Container -->
                <div class = "position-relative flex-grow-1 resizeWidth"> 
                    <div id="locationList" class="position-absolute">
                        <HawkerLocationCard v-for="x in visibleLocations" :key="x.name" v-bind="x"></HawkerLocationCard>
                    </div>
                </div>
                <!-- Page Navigation --> 
                <ul class="pagination justify-content-center">
                    <li class="page-item me-2">
                        <button class="page-link" aria-label="Previous" @click="prevPage">
                            <span aria-hidden="true">&laquo;  Prev</span>
                        </button>
                    </li>
                    <li class="page-item ">
                        <button class="page-link" aria-label="Next" @click="nextPage">
                            <span aria-hidden="true">Next  &raquo;</span>
                        </button>
                    </li>
                </ul>
            
            </div>

            <div class="col-md-8 mh-100 px-0"> 
                <div id="display-geo" class="h-100 w-100 px-2 py-2">
                    <!-- Map -->
                    <div id="mapContainer" class="border h-100 w-100"> </div>
                </div>
            </div>

        </div>
        
    </div>
</template>


<script>
// Import components 
import HawkerLocationCard from '@/components/HawkerLocationCard.vue'

// Import Leaftlet for use 
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, limit, startAfter, endBefore, limitToLast, where} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const pagesize = 10;

export default {
    name: 'HawkerExplore',
    components : {
        HawkerLocationCard
    },
    methods: { 
        setupLeafletMap: function () {
            // The first parameter are the coordinates of the center of the map
            // The second parameter is the zoom level
            const mapDiv = L.map("mapContainer").setView([1.3521, 103.8198], 11);
            // Config Tile layer
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapDiv);
            // to instance
            this.mapView = mapDiv;
        }, 
        /* Firebase Query */
        fetchData: async function(action) {
            console.log("Fetching from firebase |"+action);
            // Create a reference to collection
            const locationsRef = collection(db, "HawkerMetadata");
            // Create a query against the collection.
            let q = null;
            if (action == "init") {
                q = query(locationsRef, limit(pagesize), ...this.filterClauses); //query first page
            } else if (action == "nextPage") {
                q = query(locationsRef, startAfter(this.lastVisible), limit(pagesize), ...this.filterClauses); //query          
            } else if (action == "prevPage") {
                q = query(locationsRef, endBefore(this.firstVisible), limitToLast(pagesize), ...this.filterClauses);
            } else {
                console.log("Ooops, something went wrong");
                return 
            }
            // Execute query
            const querySnapshot = await getDocs(q);
            console.log("query executed");
            return querySnapshot
        },
        /* Main controller(s) for page actions*/
        initPage: function() {
            this.snapshotStore = []; //flush snapshot store
            this.fetchData("init").then((snapshot) => {
                this.updateDisplay(snapshot);
                this.snapshotStore.push(snapshot);
                this.currentSnapshot = 0;
            });
        }, 
        nextPage: function() {
            if (this.currentSnapshot == this.snapshotStore.length-1) {
                this.fetchData('nextPage').then((snapshot) => {
                    this.snapshotStore.push(snapshot);
                    this.currentSnapshot++;
                    this.updateDisplay(snapshot);
                })
            } else { // Retrieve from cache
                this.currentSnapshot++;
                this.updateDisplay(this.snapshotStore[this.currentSnapshot]);
            }
        },
        prevPage: function() {
            if (this.currentSnapshot > 0){
                this.currentSnapshot--;
                this.updateDisplay(this.snapshotStore[this.currentSnapshot]);
            } else {
                // Do nothing 
            }
        },
        /* Updates display */
        updateDisplay: function(snapshot) {
            // Save first and last visible document
            this.firstVisible = snapshot.docs[0];
            this.lastVisible = snapshot.docs[snapshot.docs.length-1];
            //console.log("first", this.firstVisible);
            //console.log("last", this.lastVisible);
            
            // Clear current visible locations array
            this.visibleLocations = []

            // (Populate visible locations with query results
            snapshot.forEach((doc) => {
                this.visibleLocations.push(doc.data());    
            })

            // Reset scroll to top
            document.getElementById("locationList").scrollTop = 0; //NOTE: may break as it uses actual DOM
        },
        noDataRemaning: function() {
            //do something 
        },
        populateMap: function() {
            console.log("Hello im populating the map");
            const markers = [];
            console.log(this.locations.length);
            for (const loc in this.locations) {
                console.log("loc");
                console.log(loc);
                markers.push(L.marker([loc.latitude, loc.longtitude]));
            }
            console.log(markers)
            const fGroup = L.featureGroup(markers);
            fGroup.addTo(this.mapView); 
        },
        searchLocations: function() {
            console.log(this.selectRegion, this.selectPrice, this.selectBudget,
            this.selectOpeningHours, this.selectFoodType, this.selectAvailStall);

            this.filterClauses = []; //flush filter clauses

            let region = this.selectRegion; 
            this.filterClauses.push(where("region", "==", region));

            this.initPage();
        }
    }, 
    data() {
        return {
            // Select v-model variables
            selectRegion: "",
            selectPrice: "",
            selectBudget: "",
            selectOpeningHours: "",
            selectFoodType: "",
            selectAvailStall: false,    
            // Other Instance variables
            filterClauses: [], 
            visibleLocations: [],
            snapshotStore: [], // cached data
            currentSnapshot: 0, // for use with caching
            firstVisible: null, // for pagination
            lastVisible: null, // for pagination
            markers: [], 
            mapView: null,
                
        }
    },
    created() {
    },
    mounted() {
        this.initPage();
        //this.setupLeafletMap();
        //this.populateMap();
    },

}
</script>

<style scoped>
.select-label {
    color: rgb(44, 62, 80);
    opacity: 0.65;
    font-size: 0.875rem;
    float: left;
    margin-bottom: 0.3rem;
}


.select-placeholder {
    color: var(--bs-gray) !important;
}

.option-placeholder {
    color: var(--bs-gray);
}

option[value=""][disabled] {
        display: none;
}

select:invalid {
    color: #666 !important;
}
/* 
select:focus {
    box-shadow: none;
    border: 1px solid #ced4da !important;
} */

.h-10 {
    height: 10%;
}

.h-90 {
    height: 90%;
}

#locationList {
    overflow-y: auto;
    scrollbar-gutter: stable;

    /* Relative Positioning */
    top: 0;
    bottom: 0.5rem;
    left: 0;
    right: 0;

    /* Scrollbar Styling */
    scrollbar-width: thin; /* --firefox only */

}

/* Scrollbar Styling - Chrome*/
#locationList ::-webkit-scrollbar {
  width: 9px;
}
#locationList ::-webkit-scrollbar-track {
  background: transparent;
}
#locationList  ::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}


</style>
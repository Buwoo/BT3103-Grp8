<template>
    <div class = "container-fluid h-100 w-100 px-3 d-flex flex-column flex-grow-1">
        <!-- Location Search Bar -->
        <div class="row align-items-center text-center">
            <!-- Region Selector -->
            <div class="col-md"> 
                <label for="search_select_region" class="select-label">Region</label>
                <select id="search_select_region" name="RegionSelect" v-model.lazy="selectRegion"
                    :class="[selectRegion=='' ? 'select-placeholder' : '','form-select']" >
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="North">North</option>
                    <option value="North-East">North-East</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="Central">Central</option>
                </select>
            </div>

            <!-- Price Point Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Price</label>
                <select id="search_select_price" name="PriceSelect" v-model.lazy="selectPrice"
                    :class="[selectPrice=='' ? 'select-placeholder' : '','form-select']" >
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="0-2">Under 2$</option>
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
                    :class="[selectBudget=='' ? 'select-placeholder' : '','form-select']" v-model.lazy="selectBudget">
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="0-1000">Under $1000</option>
                    <option value="1000-2000">1000-2000$</option>
                    <option value="2000-3000">2000-3000$</option>
                    <option value="3000-4000">3000-4000$</option>
                    <option value="4000-">$4000 and above</option>
                </select>
            </div>

            <!-- Opening Hours Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Opening Hours</label>
                <select id="search_select_hours" name="HoursSelect" 
                    :class="[selectOpeningHours=='' ? 'select-placeholder' : '','form-select']" v-model.lazy="selectOpeningHours">
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
                    :class="[selectFoodType=='' ? 'select-placeholder' : '','form-select']" v-model.lazy="selectFoodType">
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="Snacks and Pastries">Snacks and Pastries</option>
                    <option value="Drinks and Desserts">Drinks and Desserts</option>
                    <option value="Chinese Cooked Food">Chinese Cooked Food</option>
                    <option value="Malay Cooked Food">Malay Cooked Food</option>
                    <option value="Indian Cooked Food">Indian Cooked Food</option>
                    <option value="Others">Others</option>
                </select>
            </div>  

            <!-- Only display Available stalls toggle -->
            <div class="col-md">
                <div class="form-check form-switch" id="search_availstall">
                    <span class="d-table-cell align-middle">
                        <input class="form-check-input" type="checkbox" id="search_select_availstall" v-model.lazy="selectAvailStall">
                    </span>
                    <label class="form-check-label d-table-cell" for="flexSwitchCheckDefault">Only display available stores</label>

                </div>
            </div>

            <!-- Search Button -->
            <!-- TODO: Further stlying -->
            <div class="col-md">
                <button id = "search_button" type="button" class="btn btn-primary w-75" @click="searchLocations()"> 
                   <i class="bi bi-search pe-3"></i> Search 
                </button>
            </div>
            
            
        </div>

        <div class="row flex-grow-1 pb-3">
            <div class="col-md-4 d-flex flex-column">
                <!-- List Container -->
                <div class = "position-relative flex-grow-1 resizeWidth"> 
                    <div id="locationList" class="position-absolute">
                        <HawkerLocationCard v-for="x in visibleLocations" :key="x.name" v-bind="x" 
                            :foodType="selectFoodType" 
                            :ref="'location_card_' + x.id"
                            @click="listOnCardClick(x.latitude, x.longtitude)"></HawkerLocationCard>
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
                    <div id="mapContainer" class="border h-100 w-100"> 
                        <button id="tutorialButton" class="btn btn-warning pe-3 bi bi-question-circle" @click="startShepherd">
                            FIRST TIME OR NEED HELP?
                        </button>
                    </div>
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

// Import Shepherd for walkthrough
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";


import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, limit, startAfter, endBefore, limitToLast, where} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const pagesize = 10;

// Custom SVG Icon for Map 
const locationIcon = L.divIcon({
    html: 
        `<svg 
            width="24px" height="24px"
            viewBox="0 0 380.721 380.721"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="190.3605" cy="190.3605" r="190.3605" fill="black"/>
            <path fill="#ffc107" d="M190.372,29.813c-88.673,0-160.546,71.873-160.546,160.547c0,63.891,37.418,118.894,91.445,144.734l5.025-97.098
                c0,0-9.452-3.102-11.521-4.112c-20.048-8.831-34.612-34.833-34.612-68.58c0-36.825,28.559-68.544,56.17-68.806
                c0.035,0,0.035,0,0.058,0c0.012,0,0.035,0,0.046,0c27.617,0.261,56.177,31.98,56.177,68.806c0,33.747-14.582,59.738-34.589,68.58
                c-0.157,0.069-11.613,4.229-11.613,4.229l5.612,107.961c12.315,3.031,25.119,4.81,38.37,4.81c17.87,0,34.984-3.044,51.041-8.424
                l4.973-96.214c-13.105-2.882-24.283-11.225-31.289-21.692c-8.679-13.001,6.681-128.067,6.681-128.067h9.992v107.978h9.923V96.499
                h10.852v107.99h9.876V96.499h11.259v107.99h9.91V96.499h7.668c0,0,15.36,115.066,6.67,128.067
                c-6.937,10.364-18.01,18.683-30.952,21.634c-0.232,0.082-0.442,0.162-0.442,0.162l4.322,82.761
                c47.823-27.804,80.053-79.46,80.053-138.762C350.907,101.687,279.034,29.813,190.372,29.813z"/>
            <path fill="#ffc107" d="M103.662,148.98c0.575-2.341,1.348-4.566,1.383-4.606c0.25-0.877-0.215-1.772-1.168-2.341
                c-0.906-0.488-2.01-0.238-2.521,0.546c0,0-1.098,1.749-2.69,4.334c-1.295,2.225-3.212,5.78-4.52,10.207
                c-1.133,3.88-2.486,9.039-3.096,14.813c-0.261,3.033-0.32,5.769-0.227,8.586c0.227,3.212,0.714,5.96,1.644,9.103
                c3.154,8.964,5.583,17.644,14.349,26.206c2.771,2.847,5.618,4.787,7.674,6.216l0.726,0.511c0.442,0.291,0.866,0.559,1.284,0.803
                c1.726,0.906,2.881,1.231,3.091,1.277c0.859,0.232,1.743-0.186,2.108-0.883c0.343-0.732,0.093-1.65-0.621-2.23
                c0,0-1-0.871-2.283-2.498c-0.877-0.988-1.83-2.417-2.939-4.031c-0.784-1.139-1.708-2.429-2.568-3.684
                c-4.27-6.518-6.732-15.615-10.137-24.934c-0.668-2.022-1.214-4.642-1.418-6.867c-0.272-2.568-0.4-5.042-0.4-7.337
                c-0.099-5.333,0.139-9.911,0.604-13.623C102.471,154.36,102.889,151.217,103.662,148.98z"/>
            <path fill="#000000" d="M190.372,0C85.415,0,0,85.397,0,190.36C0,295.3,85.415,380.721,190.372,380.721c104.952,0,190.35-85.421,190.35-190.361
                C380.721,85.397,295.324,0,190.372,0z M190.372,366.523c-97.144,0-176.18-79.03-176.18-176.163
                c0-97.144,79.036-176.18,176.18-176.18c97.133,0,176.175,79.036,176.175,176.18C366.546,287.493,287.504,366.523,190.372,366.523z
                "/>
        </svg>`, 
    className: "",
    iconSize: [25, 25],
    iconAnchor: [12.5, 25],
});


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
                if(snapshot.length == 0) { // no data found
                    console.log("no more data liao bro");
                } else {
                    this.updateDisplay(snapshot);
                    this.snapshotStore.push(snapshot);
                    this.currentSnapshot = 0;
                }
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
        /* Updates display 
        This will update both the list and map
        */
        updateDisplay: function(snapshot) {
            // Save first and last visible document
            this.firstVisible = snapshot.docs[0];
            this.lastVisible = snapshot.docs[snapshot.docs.length-1];
            //console.log("first", this.firstVisible);
            //console.log("last", this.lastVisible);
            
            this.visibleLocations = [] // Clear current visible locations array
            if(this.currentLayer != null) {
                this.mapView.removeLayer(this.currentLayer); // Clear current layer from map
            }

            // Reset scroll to top
            document.getElementById("locationList").scrollTop = 0; //NOTE: may break as it uses actual DOM

            let markers = []; // List of marker objects 
            
            snapshot.forEach((doc) => {
                let data = doc.data()
                this.visibleLocations.push(data);  
                markers.push(L.marker([data.latitude, data.longtitude], {icon: locationIcon, locationId: data.id}));
            }) 

            // Add markers to map (via layergroup)
            const fGroup = L.featureGroup(markers).on("click", this.mapOnMarkerClick);
            this.currentLayer = fGroup;
            fGroup.addTo(this.mapView);
        },
        noDataRemaning: function() {
            //do something 
        },
        listOnCardClick: function(lat, lng){
            console.log(lat, lng);
            //this.mapView.flyTo([lat, lng], 17);
            this.mapView.panTo([lat, lng]);
            this.mapView.setZoom(17);
        },
        mapOnMarkerClick: function(e) {
            let targetMarker = e.sourceTarget;
            let locationId =  targetMarker.options.locationId;
            let target = "location_card_" + locationId;
            const componentRef = Array.isArray(this.$refs[target]) ? this.$refs[target][0] : this.$refs[target]
            if (componentRef) {
                componentRef.$el.scrollIntoView("{behavior: 'smooth'}");
            }
        },
        searchLocations: function() {
            console.log(this.selectRegion, this.selectPrice, this.selectBudget,
            this.selectOpeningHours, this.selectFoodType, this.selectAvailStall);

            this.filterClauses = []; //flush existing filter clauses

            //this.filterClauses.push(where("region", "in", ["North", "North-East"]));

            // Region
            let region = this.selectRegion; 
            if (region != "*" & region != "") {
                this.filterClauses.push(where("region", "==", region));
            }

            //Price Point
            //Given range of prices [lower bound, upper bound] 
            //lowerBound <= avgFoodPrice <= upperBound
            //TODO: Can make this a little more optimized 
            let price = this.selectPrice;
            if (price != "*" & price != ""){
                let p = price.split("-");
                let priceLowerBound = Number(p[0]);
                let priceUpperBound = Number(p[1]);
                if (priceLowerBound > 0) {
                    this.filterClauses.push(where("avgFoodPrice", ">", priceLowerBound-1));
                }
                if (!isNaN(priceUpperBound)) {
                    this.filterClauses.push(where("avgFoodPrice", "<", priceUpperBound+1));
                }
            }
            
            // Budget 
            // lowerBound <= avgMthlyCost <= upperBound
            // TODO: Can make this a little more optimized
            let budget = this.selectBudget;
            console.log(this.selectBudget);
            if (budget != "*" & budget != ""){
                let b = budget.split("-");
                let budgetLowerBound = Number(b[0]);
                let budgetUpperBound = Number(b[1]);
                console.log(budgetLowerBound);
                if (budgetLowerBound > 0) {
                    this.filterClauses.push(where("avgMthlyCost", ">", budgetLowerBound-1));
                }
                if (!isNaN(budgetUpperBound)) {
                    this.filterClauses.push(where("avgMthlyCost", "<", budgetUpperBound+1));
                }
            }

            // Opening Hours
            // There are only a few timings (["0600-1800", "1200-2100", "1700-2300", "24HR"])
            // Day --> Can be all except "1700-2300"
            // Night --> Can be all except "0600-1800"
            let opHours = this.selectOpeningHours;
            if (opHours != "*" & opHours != ""){
                if(opHours == "day") {
                    this.filterClauses.push(where("openingHrs", "!=", "1700-2300"));
                } else if (opHours == "night") {
                    this.filterClauses.push(where("openingHrs", "!=", "0600-1800"));
                } 
            } 

            // Available store
            let availStallsOnly = this.selectAvailStall;
            if (availStallsOnly) {
                this.filterClauses.push(where("availableNrStalls", ">", 0));
            }

            console.log(this.filterClauses);

            this.initPage();

            /*  HawkerMetadata collection
                address "2, Adam Road, Singapore 289876"
                availableNrStalls 10
                avgFoodPrice 5
                avgMthlyCost 2412
                latitude 1.3241342225
                longtitude 103.8141650104
                name "Adam Road Food Centre"
                openingHrs "0600-1800"
                postalCode "289876"
                region "Central"
                streetName "Adam Road"
                totalNrStalls 241
                typeOfFoodStallsNr
                Chinese Cooked Food 167
                Drinks and Desserts 5
                Indian Cooked Food 17
                Malay Cooked Food 8
                Others 34
                Snacks and Pastries 10 
            */
        },

        // Shepherd Section Walkthrough
        startShepherd: function () {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
            classes: "bg-warning shepherd-text",
            scrollTo: true,
            },
        });
        tour.addStep({
            id: "region-step",
            arrow: false,
            text: "Which region will you like to open your hawker stall at?",
            attachTo: {
            element: "#search_select_region",
            on: "bottom",
            },
            buttons: [
            {
                text: "Next",
                action: tour.next,
            },
            ],
        });
        tour.addStep({
            id: "price-step",
            arrow: false,
            text: "What price will you like to sell your food at?",
            attachTo: {
            element: "#search_select_price",
            on: "bottom",
            },
            buttons: [
            {
                text: "Next",
                action: tour.next,
            },
            ],
        });
        tour.addStep({
            id: "budget-step",
            arrow: false,
            text: "What is your monthly budget for rental and cleaning fees?",
            attachTo: {
            element: "#search_select_budget",
            on: "bottom",
            },
            buttons: [
            {
                text: "Next",
                action: tour.next,
            },
            ],
        });
        tour.addStep({
            id: "hours-step",
            arrow: false,
            text: "What are your potential opening hours?",
            attachTo: {
            element: "#search_select_hours",
            on: "bottom",
            },
            buttons: [
            {
                text: "Next",
                action: tour.next,
            },
            ],
        });
        tour.addStep({
            id: "foodtype-step",
            arrow: false,
            text: "What kind of food do you intend to sell?",
            attachTo: {
            element: "#search_select_food",
            on: "bottom",
            },
            buttons: [
            {
                text: "Next",
                action: tour.next,
            },
            ],
        });
        tour.addStep({
            id: "availability-step",
            arrow: false,
            text: "Toggle to see hawker centres with available stalls for tender.",
            attachTo: {
            element: "#search_select_availstall",
            on: "bottom",
            },
            buttons: [
            {
                text: "Next",
                action: tour.next,
            },
            ],
        });
        tour.addStep({
            id: "search-step",
            arrow: false,
            text: "Click the search button once all fields are selected!",
            attachTo: {
            element: "#search_button",
            on: "bottom",
            },
            buttons: [
            {
                text: "Finish",
                action: tour.complete,
            },
            ],
        });
        tour.start();
        },

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
            snapshotStore: [], // Simple cache
            currentSnapshot: 0, // for use with snapshotStore
            firstVisible: null, // for pagination
            lastVisible: null, // for pagination
            markers: [], 
            mapView: null,
            currentLayer: null, 
                
        }
    },
    created() {
    },
    mounted() {
        this.setupLeafletMap();
        this.initPage();
        
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

/* Shepherd CSS */
#tutorialButton {
  position: absolute;
  top: 10%;
  right: 2%;
  padding: 1%;
  z-index: 1500;
  border-radius: 16px;
}
</style>
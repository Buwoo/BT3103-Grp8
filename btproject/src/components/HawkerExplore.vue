<template>
    <div class = "container-fluid h-100 w-100 px-3 d-flex flex-column flex-grow-1">
        <!-- Location Search Bar -->
        <div class="row align-items-center text-center mt-2">
            <!-- Region Selector -->
            <div class="col-md"> 
                <label for="search_select_region" class="select-label">Region</label>
                <select id="search_select_region" name="RegionSelect" v-model.lazy="selectRegion"
                    :class="[selectRegion=='' ? 'select-placeholder' : '','form-select']" role= "button">
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
                    :class="[selectPrice=='' ? 'select-placeholder' : '','form-select']" role= "button">
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
                    :class="[selectBudget=='' ? 'select-placeholder' : '','form-select']" v-model.lazy="selectBudget" role= "button">

                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="1k_less">Under $1000</option>
                    <option value="1k-2k">1000-2000$</option>
                    <option value="2k_3k">2000-3000$</option>
                    <option value="3k_4k">3000-4000$</option>
                    <option value="4k_above">$4000 and above</option>
                </select>
            </div>

            <!-- Opening Hours Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Opening Hours</label>

                <select id="search_select_hours" name="HoursSelect" 
                    :class="[selectOpeningHours=='' ? 'select-placeholder' : '','form-select']" v-model.lazy="selectOpeningHours" role= "button">  
                    <option value="" class="option-placeholder" disabled></option>
                    <option value="*">Any</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                </select>
            </div>

            <!-- Food Type Selector -->
            <div class="col-md">
                <label for="search_select_region" class="select-label">Food Type</label>
                <select id="search_select_food" name="FoodSelect" 
                    :class="[selectFoodType=='' ? 'select-placeholder' : '','form-select']" v-model.lazy="selectFoodType" role= "button">
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
                        <input class="form-check-input" type="checkbox" id="search_select_availstall" v-model.lazy="selectAvailStall" role= "button">
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

        <div class="row flex-grow-1 pb-3 mt-2">
            <div class="col-md-4 d-flex flex-column">
                <!-- List Container -->
                <div class = "position-relative flex-grow-1 resizeWidth">
                    <div id="locationList" class="position-absolute">
                        <HawkerLocationCard v-for="x in visibleLocations" :key="x.name" v-bind="x" 
                            :foodType="displaySimilarType" 
                            :ref="'location_card_' + x.id"
                            @click="listOnCardClick(x.latitude, x.longtitude, x.id)" role = "button"></HawkerLocationCard>
                    </div>
                    <div id="noDataList" class="h-100 w-100" v-show="noDataFound"> 
                        <p class ="h-100 d-flex align-items-center justify-content-center"> {{noDataMsg}} </p>

                    </div>
                </div>

                <!-- Page Navigation --> 
                <ul id= "locationPageNav" class="pagination justify-content-center">
                    <li class="page-item me-2" :class="prevBtnDisabled ? 'disabled' : '' ">
                        <p class="page-link mb-0" aria-label="Previous" @click="prevPage" role="button">
                            &laquo;  Prev
                        </p>
                    </li>
                    <li class="page-item" :class="nextBtnDisabled ? 'disabled' : '' ">
                        <p class="page-link mb-0" aria-label="Next" @click="nextPage" role="button">
                            Next  &raquo;
                        </p>
                    </li>   
                </ul>
            
            </div>

            <div class="col-md-8 mh-100 px-0"> 
                <div id="display-geo" class="h-100 w-100 px-2 py-2 position-relative">
                    <!-- Map -->
                    <button id="tutorialButton" class="btn btn-warning pe-3 bi bi-question-circle" @click="startShepherd">
                        FIRST TIME OR NEED HELP?
                    </button>
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
            // We also define some bounds to limit movement of map
            let bounds = L.latLngBounds([1.220446, 103.599534], [1.485294, 104.013203]);
            const mapDiv = L.map("mapContainer").setView([1.3521, 103.8198], 11).setMaxBounds(bounds);
            // Config Tile layer
            L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
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
                this.currentSnapshot = 0;
                this.prevBtnDisabled = true; // to speed up display
                if(snapshot.docs.length == 0) { // no data found
                    console.log("Init: No data");
                    this.updateDisplay(null, "No Locations found. Please try again.", true, true);
                } else {
                    this.snapshotStore.push(snapshot);
                    this.updateDisplay(snapshot, "", true, false);
                }
            });
        }, 
        nextPage: function() {
            console.log("clicked next");
            if (this.currentSnapshot == this.snapshotStore.length-1) {
                this.fetchData('nextPage').then((snapshot) => {
                    this.currentSnapshot++;
                    if(snapshot.docs.length == 0) { // no data found
                        console.log("Next: No more data");
                        this.snapshotStore.push(null);
                        this.updateDisplay(null, "No more locations found", false, true);
                    } else {
                        this.snapshotStore.push(snapshot);
                        this.updateDisplay(snapshot);
                    }
                })
            } else { // Retrieve from cache
                this.currentSnapshot++;
                this.updateDisplay(this.snapshotStore[this.currentSnapshot], "No more locations found");
            }
        },
        prevPage: function() {
            console.log("clicked");
            this.currentSnapshot--;
            if (this.currentSnapshot == 0) {
                this.updateDisplay(this.snapshotStore[this.currentSnapshot], "", true, false);
            }else {
                 this.updateDisplay(this.snapshotStore[this.currentSnapshot]);
            }
        },
        /* Updates display 
        This will update both the list and map
        */
        updateDisplay: function(snapshot, msg = "", prevDisable=false, nextDisable=false) {
            // Clear existing display
            this.visibleLocations = [] // Clear current visible locations array
            if(this.currentLayer != null) {
                this.mapView.removeLayer(this.currentLayer); // Clear current layer from map
            }

            // Reset scroll to top
            document.getElementById("locationList").scrollTop = 0; //NOTE: may break as it uses actual DOM

            // Set state of previous/next buttons
            this.prevBtnDisabled = prevDisable;
            this.nextBtnDisabled = nextDisable;

            // If no data, show the no data prompt 
            if (snapshot == null) {
                this.noDataFound = true;
                this.noDataMsg = msg;
                this.nextBtnDisabled = true;
                return
            } 

            if(snapshot.docs.length < pagesize) {
               this.nextBtnDisabled = true;
            } 

            this.noDataFound = false;

            // Save first and last visible document
            this.firstVisible = snapshot.docs[0];
            this.lastVisible = snapshot.docs[snapshot.docs.length-1];
            //console.log("first", this.firstVisible);
            //console.log("last", this.lastVisible);
            
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
        clearCurrentSelection: function() {
            if (this.currentSelectedLocation != null) {
                this.currentSelectedLocation.$el.classList.remove("bg-select-light");
                this.currentSelectedLocation = null;
            }
        },
        listOnCardClick: function(lat, lng, locationId){
            this.clearCurrentSelection();

            let target = "location_card_" + locationId;
            const componentRef = Array.isArray(this.$refs[target]) ? this.$refs[target][0] : this.$refs[target];
            console.log(componentRef);
            if (componentRef) {
                componentRef.$el.classList.add('bg-select-light');
                this.currentSelectedLocation = componentRef;
                console.log(this.currentSelectedLocation);
            }
            console.log(lat, lng);
            this.mapView.setView([lat, lng], 17);
        },
        mapOnMarkerClick: function(e) {
            this.clearCurrentSelection(); 

            let targetMarker = e.sourceTarget;
            let locationId =  targetMarker.options.locationId;
            let target = "location_card_" + locationId;
            const componentRef = Array.isArray(this.$refs[target]) ? this.$refs[target][0] : this.$refs[target]
            if (componentRef) {
                componentRef.$el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
                componentRef.$el.classList.add('bg-select-light');
                this.currentSelectedLocation = componentRef;

                this.mapView.setView(targetMarker.getLatLng(), 17, {animate: true});
            } else {
                console.log("woops, something went wrong");
            }
        },
        searchLocations: function() {
            console.log(this.selectRegion, this.selectPrice, this.selectBudget,
            this.selectOpeningHours, this.selectFoodType, this.selectAvailStall);

            this.filterClauses = []; //flush existing filter clauses

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
            if (price != "*" & price != "") {
                console.log("foodPriceRange."+ price);
                this.filterClauses.push(where("foodPriceRange."+ price, "==", true));
            }
            
            // Budget 
            // lowerBound <= avgMthlyCost <= upperBound
            // TODO: Can make this a little more optimized
            let budget = this.selectBudget;
            if (budget != "*" & budget != ""){
                this.filterClauses.push(where("mthlyCostRange."+ budget, "==", true));
            }

            // Opening Hours
            // There are only a few timings (["0600-1800", "1200-2100", "1700-2300", "24HR"])
            // Day --> Can be all except "1700-2300"
            // Night --> Can be all except "0600-1800"
            let opHours = this.selectOpeningHours;
            if (opHours != "*" & opHours != "") {
                this.filterClauses.push(where("openingHrsRange." + opHours, "==", true));
            } 

            // Available store
            let availStallsOnly = this.selectAvailStall;
            if (availStallsOnly) {
                this.filterClauses.push(where("availableStallsBool", "==", true));
            }

            console.log(this.filterClauses);

            this.displaySimilarType = this.selectFoodType;


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
                classes: "bg-warning shepherd-text box-pos",
                scrollTo: true,
                modalOverlayOpeningPadding: 5,
                modalOverlayOpeningRadius: 5,
                popperOptions: {modifiers: [{ name: "offset", options: { offset: [0, 8] } }]},
                arrow: true,
            },
        });
        tour.addStep({
            id: "region-step",
            text: "Which region will you like to open your hawker stall at?",
            attachTo: {
                element: "#search_select_region",
                on: "bottom",
            },
            buttons: [{text: "Next", action: tour.next,},],
        });
        tour.addStep({
            id: "price-step",
            text: "What price will you like to sell your food at?",
            attachTo: {
                element: "#search_select_price",
                on: "bottom",
            },
            buttons: [{text: "Next", action: tour.next,},],
            classes: "box-pos-2"
        });
        tour.addStep({
            id: "budget-step",
            text: "What is your monthly budget for rental and cleaning fees?",
            attachTo: {
                element: "#search_select_budget",
                on: "bottom",
            },
            buttons: [{text: "Next", action: tour.next,},],
            classes: "box-pos-2"
        });
        tour.addStep({
            id: "hours-step",
            text: "What are your potential opening hours?",
            attachTo: {
                element: "#search_select_hours",
                on: "bottom",
            },
            buttons: [{text: "Next", action: tour.next,},],
            classes: "box-pos-2"
        });
        tour.addStep({
            id: "foodtype-step",
            text: "What kind of food do you intend to sell?",
            attachTo: {
            element: "#search_select_food",
            on: "bottom",
            },
            buttons: [{text: "Next", action: tour.next,},],
            classes: "box-pos-2"
        });
        tour.addStep({
            id: "availability-step",
            text: "Toggle to see hawker centres with available stalls for tender.",
            attachTo: {
            element: "#search_select_availstall",
            on: "bottom",
            },
            buttons: [{text: "Next", action: tour.next,},],
            classes: "box-pos-2"
        });
        tour.addStep({
            id: "search-step",
            text: "Click the search button once all fields are selected!",
            attachTo: {
            element: "#search_button",
            on: "bottom",
            },
            buttons: [{text: "Finish", action: tour.next,},],
            classes: "box-pos-2"
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
            displaySimilarType: "",
            snapshotStore: [], // Simple cache
            currentSnapshot: 0, // for use with snapshotStore
            firstVisible: null, // for pagination
            lastVisible: null, // for pagination
            markers: [], 
            mapView: null,
            currentLayer: null, 
            currentSelectedLocation: null,
            noDataFound: false,
            noDataMsg: "",
            prevBtnDisabled: false,
            nextBtnDisabled: false
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

.select {
    cursor: pointer;
}

select.select option:hover {
    cursor: pointer;
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
    top: 0.5rem;
    bottom: 0.5rem;
    left: 0;
    right: 0;

    /* Scrollbar Styling */
    scrollbar-width: thin; /* --firefox only */
}

/* Scrollbar Styling - Chrome*/
#locationList::-webkit-scrollbar {
  width: 9px;
}
#locationList::-webkit-scrollbar-track {
  background: transparent;
}
#locationList::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}

#locationPageNav li {
    border-bottom: none !important;
}

#locationPageNav li:hover {
    background-color: white;
    border-bottom: none;
}

/* Shepherd CSS */
#tutorialButton {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1%;
  z-index: 1500;
  border-radius: 16px;
}

.box-pos {
    inset: 2rem auto auto 0px !important;
}

.box-pos-2 {
    margin-top: 2rem !important;
}

</style>

<style>
.shepherd-arrow {
    top: -4px !important;
}

.shepherd-arrow::before {
    content: "" !important;
    transform: rotate(45deg) !important;
    background: #ffc107 !important;
}
</style>
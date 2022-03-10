<template>
    <div class = "container-fluid h-100 w-100 px-3 d-flex flex-column">
        <!-- Location Search Bar -->
        <div class="row align-items-center text-center">
            <!-- Region Selector -->
            <div class="col-md"> 
                <select id="search_select_region" name="RegionSelect" class="form-select">
                    <option value="*" selected>Region</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="central">Central</option>
                </select>
            </div>

            <!-- Price Point Selector -->
            <div class="col-md">
                <select id="search_select_price" name="PriceSelect" class="form-select">
                    <option value="*" selected>Price</option>
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
                <select id="search_select_budget" name="BudgetSelect" class="form-select">
                    <option value="*" selected>Budget</option>
                    <option value="">Less than $1000</option>
                    <option value="">1000-2000$</option>
                    <option value="">2000-3000$</option>
                    <option value="">3000-4000$</option>
                    <option value="">$4000 and above</option>
                </select>
            </div>

            <!-- Opening Hours Selector -->
            <div class="col-md">
                <select id="search_select_budget" name="BudgetSelect" class="form-select">
                    <option value="*" selected>Opening Hours</option>
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                </select>
            </div>

            <!-- Food Type Selector -->
            <div class="col-md">
                <select id="search_select_budget" name="BudgetSelect" class="form-select">
                    <option value="*" selected>Budget</option>
                    <option value="">Snacks and Pastries</option>
                    <option value="">Drinks and Desserts</option>
                    <option value="">Chinese Cooked Food</option>
                    <option value="">Malay Cooked Food</option>
                    <option value="">Indian Cooked Food</option>
                    <option value="">Others</option>
                </select>
            </div>  

            <!-- Only display Available stalls toggle -->
            <div class="col-md">
                <div class="form-check form-switch" id="search_availstall">
                    <span class="d-table-cell align-middle">
                        <input class="form-check-input" type="checkbox" id="search_select_availstall">
                    </span>
                    <label class="form-check-label d-table-cell" for="flexSwitchCheckDefault">Only display available stores</label>

                </div>
            </div>

            <!-- Search Button -->
            <!-- TODO: Further stlying -->
            <div class="col-md">
                <button type="button" class="btn btn-primary w-75"> 
                   <i class="bi bi-search pe-3"></i> Search 
                </button>
            </div>
            
            
        </div>

        <div class="row flex-grow-1 pb-3">
            <div class="col-md-4 d-flex flex-column">
                <!-- List Container -->
                <div class = "position-relative flex-grow-1"> 
                    <div id="locationList" class="position-absolute">
                        <HawkerLocationCard v-for="x in Array(10)" :key="x"></HawkerLocationCard>
                    </div>
                </div>
                <!-- Page Navigation --> 
                <ul class="pagination justify-content-center">
                    <li class="page-item me-2">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item me-2"><a class="page-link" href="#">1</a></li>
                    <li class="page-item me-2"><a class="page-link" href="#">2</a></li>
                    <li class="page-item me-2"><a class="page-link" href="#">4</a></li>
                    <li class="page-item me-2"><a class="page-link" href="#">5</a></li>
                    <li class="page-item me-2"><a class="page-link" href="#">6</a></li>
                    <li class="page-item me-2"><a class="page-link" href="#">7</a></li>
                    <li class="page-item ">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
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
// Import Leaftlet for use 
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import HawkerLocationCard from '@/components/HawkerLocationCard.vue'

export default {
    name: 'HawkerExplore',
    components : {
        HawkerLocationCard
    },
    methods: {
        setupLeafletMap: function () {
            // // The first parameter are the coordinates of the center of the map
            // // The second parameter is the zoom level
            const mapDiv = L.map("mapContainer").setView([1.3521, 103.8198], 11);
            // Config Tile layer
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapDiv);

        }
    },
    mounted() {
        this.setupLeafletMap();
    },

}
</script>

<style scoped>
select option[value="*"] {
    color: var(--bs-gray);
}

select:focus {
    box-shadow: none;
    border: 1px solid #ced4da !important;
}

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
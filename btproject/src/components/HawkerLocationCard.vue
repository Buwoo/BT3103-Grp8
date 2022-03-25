<template>

<div class="row g-0 py-3 border-bottom border-2">
    <!-- Image -->
    <div class = "col-md-4 bg-secondary">
        <!-- Image here -->
        <img :src="imageurl" class = "img-fluid" alt="HawkerCentreImage">
    </div>
    <!-- Text Content -->
    <div class = "col-md-8 text-secondary text-start ps-2">
        <div>
            <h5 id="location_card_name" class="text-dark"> {{name}} </h5>
            <p id="location_card_region">Region: {{region}}</p>
            <p id="location_card_address"> Address: {{address}}</p>
            <p id="location_card_hours"> Operating Hours: {{operatingHours}}</p>
            <p id="location_card_rental"> Monthly Rental: ${{avgMthlyCost}}</p>
            <p id="location_card_price"> Average Price: ${{avgFoodPrice}}</p>
            <p id="location_card_avail"> Available Stalls: {{availableNrStalls}}</p>
            <p id="location_card_same"> Stores Sellling Food Items: {{foodType == "" || foodType == "*" ? "-" : typeOfFoodStallsNr[foodType]}}</p>
        </div>
    </div>
</div>
     

</template>

<script>
export default {
    props: {
        address: String, //"2, Adam Road, Singapore 289876"
        availableNrStalls: Number, //10
        avgFoodPrice: Number, //5
        avgMthlyCost: Number, // 2412
        latitude: Number, //1.3241342225
        longtitude: Number, //103.8141650104
        name: String, //"Adam Road Food Centre"
        openingHrs: String, //"0600-1800"
        postalCode: String, //"289876"
        region: String, //"Central"
        streetName: String, //"Adam Road"
        totalNrStalls: Number, //241
        typeOfFoodStallsNr: Object, 
        foodType: String
        
    },
    data() { 
        return {
            //imageurl: require("@/assets/hawkerimg.jpg"),
            imageurl: null,
            similarStalls: 0
        } 
    },
    computed: {
        operatingHours() {
            let x = this.openingHrs.split("-");
            if (this.openingHrs == "24HR") {
                return "24HR"
            } else {
                return x[0] + " - " + x[1];
            }
        }
    }

}

/* 
// Mock data
locationName: "Yishun Ave 11 Blk 417",
region: "North",
address: "417 Yishun Ave 11, S(760417)", 
operatingHours: "6am - 10pm", 
monthlyRental: "$2200",
priceRange: "$2 - $7", 
availableStalls: 1,
similarStalls: 2,
imageurl: require("@/assets/hawkerimg.jpg")
*/

</script>

<style scoped>

p {
    /* Bootstrap overrides */   
    margin-bottom: 0 !important;
    font-size: 0.875rem !important; 
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 15% 100%;
}

.bg-select-light {
    background-color: #ADD8E6;
}

</style>
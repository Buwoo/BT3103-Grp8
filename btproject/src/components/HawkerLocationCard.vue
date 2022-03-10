<template>

<div class="row g-0 bg-white py-3 border-bottom border-2">
    <!-- Image -->
    <div class = "col-md-4 bg-secondary">
        <!-- Image here -->
        <img :src="imageurl" class = "img-fluid" alt="HawkerCentreImage">
    </div>
    <!-- Text Content -->
    <div class = "col-md-8 text-secondary text-start ps-2">
        <div>
            <h5 id="location_card_name" class="text-dark"> {{locationName}} </h5>
            <p id="location_card_region">Region: {{region}}</p>
            <p id="location_card_address"> Address: {{address}}</p>
            <p id="location_card_hours"> Operating Hours: {{operatingHours}}</p>
            <p id="location_card_rental"> Monthly Rental: {{monthlyRental}}</p>
            <p id="location_card_price"> Price Range: {{priceRange}}</p>
            <p id="location_card_avail"> Available Stalls: {{availableStalls}}</p>
            <p id="location_card_same"> Stores Sellling Food Items: {{similarStalls}}</p>
        </div>
    </div>
</div>
     

</template>

<script>
export default {
    data() { 
        return {
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
        } 
    }

}
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

</style>
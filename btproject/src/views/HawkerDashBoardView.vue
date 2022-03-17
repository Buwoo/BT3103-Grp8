<template>
<HawkerNavBar/>
<HawkerDashBoard/>

</template>


<script>

import HawkerNavBar from '@/components/HawkerNavBar.vue'
import HawkerDashBoard from '@/components/HawkerDashBoard.vue'


export default {
    name: 'HawkerDashBoardView',
    
    components: {
        HawkerNavBar,
        HawkerDashBoard
    },

}

</script>

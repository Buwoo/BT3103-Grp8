<template>
	<NEANavBar />
	<NEADashBoard />
</template>

<script>
	//import HawkerNavBar from '@/components/HawkerNavBar.vue'
	import NEADashBoard from "@/components/NEADashBoard.vue";
	import NEANavBar from "@/components/NEANavBar.vue";

	export default {
		name: "NEADashBoardView",

		components: {
			NEANavBar,
			NEADashBoard,
		},
	};
</script>

<template>
	<div class="container-fluid h-100 d-flex flex-column flex-grow-1" v-if="user && neaagent">
		<div class="row" id="headings">
			<div class="d-flex justify-content-start">
				<div class="col-md-8">
					<h3 class="mt-4" id="dashboardHeading"><b> Tender Dashboard </b></h3>
				</div>
			</div>
		</div>
		<div class="row mt-3 flex-grow-1 px-3 pb-3">
			<div id="tablewrapper" class="h-100 position-relative resizeWidth">
				<div id="wholeTable" class = "position-absolute">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Tender ID</th>
								<th scope="col">Date</th>
								<th scope="col">Hawker Centre Name</th>
								<th scope="col">Name</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<!--rmb to put id -->

						<tbody>
							<tr v-for="(a, index) in applications" :key="a.id">
								<td id="tenderID">
									<button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target="'#modal_' + a.id">
										{{ a.id }}
									</button>

									<div class="modal-lg" modal-xl id="tenderIdModal">
										<div class="modal fade" :id="'modal_' + a.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div class="modal-dialog">
												<div class="modal-content">
													<!-- Modal headers-->
													<div class="modal-header">
														<div class="container-fluid">
															<div class="row">
																<button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
															</div>
															<div class="row">
																<div class="d-flex justify-content-start">
																	<h5 class="modal-title fs-3 fw-bold" id="exampleModalLabel">
																		Tender:
																		<span class="text-secondary">{{ a.id }}</span>
																	</h5>
																</div>
															</div>
														</div>
													</div>
													<!-- Modal body-->
													<div class="modal-body text-start">
														<!-- First Card: Tender Details -->
														<div class="card">
															<div class="card-header bg-success">
																<div class="fs-4 ms-4">Tender Details</div>
															</div>
															<div class="container-fluid">
																<div class="card-body">
																	<div class="row">
																		<div class="details col-xs-6 col-md-6">
																			<p class="card-text"><small class="text-muted">Hawker Centre Name</small></p>
																			<p class="card-text">{{ a.data().name }}</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text"><small class="text-muted">Food Item</small></p>
																			<p class="card-text">
																				{{ a.data().foodItem }}
																			</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text">
																				<small class="text-muted">Date</small>
																			</p>
																			<p class="card-text">
																				{{ a.data().date.toDate().toDateString() }}
																			</p>
																		</div>
																	</div>
																	<div class="row">
																		<div class="details col-xs-6 col-md-6">
																			<p class="card-text">
																				<small class="text-muted">Opening Time</small>
																			</p>
																			<p class="card-text">
																				{{ a.data().openingHours.start }}
																			</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text"><small class="text-muted">Closing Time</small></p>
																			<p class="card-text">
																				{{ a.data().openingHours.end }}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<!-- Second Card: Personal Details of the Hawker -->
														<div class="card">
															<div class="card-header bg-success">
																<div class="fs-4 ms-4">Personal Details</div>
															</div>
															<div class="container-fluid">
																<div class="card-body">
																	<div class="row">
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">Name</small></p>
																			<p class="card-text">{{ this.applicants[a.data().userID].data().fullName }}</p>
																		</div>
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">NRIC</small></p>
																			<p class="card-text">XXXXX{{ a.data().userID }}</p>
																		</div>
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">Email</small></p>
																			<p class="card-text">{{ this.applicants[a.data().userID].data().email }}</p>
																		</div>
																	</div>
																	<div class="row">
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">Home Address</small></p>
																			<p class="card-text">{{ this.applicants[a.data().userID].data().address }}</p>
																		</div>
																		<div class="details col-xs-4 col-md-6">
																			<p class="card-text"><small class="text-muted">Contact Number</small></p>
																			<p class="card-text">{{ this.applicants[a.data().userID].data().mobileNr }}</p>
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

								<td id="date">{{ a.data().date.toDate().toDateString() }}</td>

								<td id="hawkerCentreName">
									{{ a.data().name }}
								</td>

								<td id="name">
									{{ this.applicants[a.data().userID].data().fullName }}
								</td>

								<td id="actions">
									<div class="d-flex justify-content-center">
										<button id="acceptButton" type="button" class="btn btn-success" @click="acceptForm(index, a)">
											<i class="bi bi-check-lg"></i>
										</button>
										<button id="rejectButton" type="button" class="btn btn-danger" @click="rejectForm(index, a)">
											<i class="bi bi-x-lg"></i>
										</button>
									</div>
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
	import firebase from "@/uifire.js";
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import router from "../router/index.js";
	import firebaseApp from "../firebase.js";
	import { getFirestore } from "firebase/firestore";
	import { collection, getDocs, getDoc, doc, updateDoc, query, orderBy, where } from "firebase/firestore";
	const db = getFirestore(firebaseApp);

	export default {
		name: "NEADashboard",
		data() {
			return {
				user: false,
				neaagent: false,
				applications: [],
				applicants: {},
			};
		},

		methods: {
			loadTenderApplications: async function () {
				const ref = collection(db, "TenderInfo");
				const q = query(ref, where("status", "==", "pending"), orderBy("date")); //query first page
				const querySnapshot = await getDocs(q);

				console.log("time to order!!!!!!!!!!!!!!!!!!!");

				for (let i = 0; i < querySnapshot.docs.length; i++) {
					let tenderSnapshot = querySnapshot.docs[i];
					let id = tenderSnapshot.data().userID; //Get userId
					if (!(id in this.applicants)) {
						await this.getApplicantDetails(id);
					}
					// Push snapshot to applications
					this.applications.push(tenderSnapshot);
				}
			},
			getApplicantDetails: async function (userId) {
				// Query Database for User Info
				const userDocRef = doc(db, "Authentication", userId);
				const userDocSnap = await getDoc(userDocRef);
				// Store applicant details in snapshot
				this.applicants[userId] = userDocSnap;
			},
			rejectForm: async function (index, a) {
				var c = confirm("Do you want to reject this Tender Form?");
				if (c == true) {
					//deleting the row
					this.applications.splice(index, 1);
					//updating the status
					const tenderRef = doc(db, "TenderInfo", a.id);
					await updateDoc(tenderRef, {
						status: "rejected",
					});

					const hawkerRef = doc(db, "HawkerMetadata", a.data().name);
					const hawker = await getDoc(hawkerRef);
					let availableSlots = hawker.data().availableNrStalls;
					if (availableSlots == 0) {
						await updateDoc(hawkerRef, {
							availableNrStalls: 1,
							availableStallsBool: true,
						});
					} else {
						await updateDoc(hawkerRef, {
							availableNrStalls: availableSlots + 1,
						});
					}
				}
			},

			acceptForm: async function (index, a) {
				var c = confirm("Do you want to accept this Tender Form?");
				if (c == true) {
					//deleting the row
					this.applications.splice(index, 1);
					//updating the status
					const tenderRef = doc(db, "TenderInfo", a.id);
					await updateDoc(tenderRef, {
						status: "approved",
					});
					const hawkerRef = doc(db, "HawkerMetadata", a.data().name);
					const hawker = await getDoc(hawkerRef);
					let foodItem = a.data().foodItem;
					let foodItemNr = hawker.data().typeOfFoodStallsNr[foodItem];
					let newTotalNrStalls = hawker.data().totalNrStalls + 1;
					let editUserField = "typeOfFoodStallsNr." + foodItem;
					await updateDoc(hawkerRef, {
						[editUserField]: foodItemNr + 1,
						totalNrStalls: newTotalNrStalls,
					});
				}
			},
		},
		mounted() {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					//Testing here to check custom claims
					firebase
						.auth()
						.currentUser.getIdTokenResult()
						.then((tokenResult) => {
							console.log(tokenResult.claims);
							if (tokenResult.claims.NEAAgent) {
								this.neaagent = true;
							} else {
								router.push("/404");
							}
						});
					this.user = user;
					this.loadTenderApplications();
				}
			});
		},
	};
</script>

<style scoped>
	#dashboardHeading {
		padding-left: 40px;
		padding-top: 10px;
		display: inline-block;
		width: 100%;
		text-align: left;
	}

	#wholeTable {
		overflow-y: auto;
		scrollbar-gutter: stable;

		/* Relative Positioning */
		top: 0rem;
		bottom: 0rem;
		left: 0;
		right: 0;

		/* Scrollbar Styling */
		scrollbar-width: thin; /* --firefox only */
	}

	/* Scrollbar Styling - Chrome*/
	#wholeTable::-webkit-scrollbar {
		width: 9px;
	}
	#wholeTable::-webkit-scrollbar-track {
		background: transparent;
	}
	#wholeTable::-webkit-scrollbar-thumb {
		background-color: rgba(155, 155, 155, 0.5);
		border-radius: 20px;
		border: transparent;
	}

	table {
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
	}

	.modal-dialog {
		max-width: 900px;
	}

	.card-header {
		background-color: #4caf50;
		color: white;
	}

	.card {
		margin: 0px 30px 30px 30px;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
		max-width: 850px;
		border: none;
	}

	.details {
		padding-top: 10px;
	}

	.card-text {
		margin-bottom: 0px;
	}

	#rejectButton {
		margin-left: 10px;
	}
</style>

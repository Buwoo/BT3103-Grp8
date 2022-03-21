<template>
	<div v-if="user && neaagent">
		<div class="NEApage">
			<div class="container-fluid">
				<div class="row mx-auto" id="headings">
					<div class="d-flex justify-content-start">
						<div class="col-md-8">
							<h3 class="mt-4" id="dashboardHeading"> <b> Tender Dashboard </b> </h3>
						</div>
					</div>
				</div>
				<div class="row mx-auto mt-3" id="wholeTable">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Tender ID</th>
								<th scope="col">Date</th>
								<th scope="col">Tender Address</th>
								<th scope="col">Name</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<!--rmb to put id -->

						<tbody>
							<tr v-for="(a, index) in applications" :key="a[0].id">
								<td id="tenderID">
									<button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target="'#modal_' + a[0].id">
										{{ a[0].id }}
									</button>

									<div class="modal-lg" modal-xl id="tenderIdModal">
										<div class="modal fade" :id="'modal_' + a[0].id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
																	<h5 class="modal-title fs-3 fw-bold" id="exampleModalLabel">Tender {{ a[0].id }}</h5>
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
																			<p class="card-text"><small class="text-muted">Hawker Address</small></p>
																			<p class="card-text">{{ a[0].data().address }}</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text"><small class="text-muted">Food Item</small></p>
																			<p class="card-text">
																				{{ a[0].data().foodItem }}
																			</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text">
																				<small class="text-muted">Date</small>
																			</p>
																			<p class="card-text">
																				{{ a[0].data().date.toDate().toDateString() }}
																			</p>
																		</div>
																	</div>
																	<div class="row">
																		<div class="details col-xs-6 col-md-6">
																			<p class="card-text">
																				<small class="text-muted">Opening Time</small>
																			</p>
																			<p class="card-text">
																				{{ a[0].data().openingHours.start }}
																			</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text"><small class="text-muted">Closing Time</small></p>
																			<p class="card-text">
																				{{ a[0].data().openingHours.end }}
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
																			<p class="card-text">{{ a[1].data().fullName }}</p>
																		</div>
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">NRIC</small></p>
																			<p class="card-text">XXXXX{{ a[0].data().userID }}</p>
																		</div>
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">Email</small></p>
																			<p class="card-text">{{ a[1].data().email }}</p>
																		</div>
																	</div>
																	<div class="row">
																		<div class="details col-md-4">
																			<p class="card-text"><small class="text-muted">Home Address</small></p>
																			<p class="card-text">{{ a[1].data().address }}</p>
																		</div>
																		<div class="details col-xs-4 col-md-6">
																			<p class="card-text"><small class="text-muted">Contact Number</small></p>
																			<p class="card-text">{{ a[1].data().mobileNr }}</p>
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

								<td id="date">{{ a[0].data().date.toDate().toDateString() }}</td>

								<td id="address">
									{{ a[0].data().address }}
								</td>

								<td id="name">
									{{ a[1].data().fullName }}
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
	import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
	const db = getFirestore(firebaseApp);

	export default {
		name: "NEADashboard",
		data() {
			return {
				user: false,
				neaagent: false,
				applications: [],
			};
		},

		methods: {
			loadTenderApplications: async function () {
				const q = collection(db, "TenderInfo");
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((tenderSnapshot) => {
					if (tenderSnapshot.data().status == "pending") {
						let id = tenderSnapshot.data().userID; //Get userId
						// Query Database for User Info
						const userDocRef = doc(db, "Authentication", id);
						const userDocSnap = getDoc(userDocRef);
						userDocSnap.then((rsp) => {
							// Store both tender snapshot and user detail snapshot
							this.applications.push([tenderSnapshot, rsp]);
						});
					}
				});
			},

			rejectForm: async function (index, a) {
				var c = confirm("Do you want to reject this Tender Form?");
				if (c == true) {
					//deleting the row
					this.applications.splice(index, 1);
					//updating the status
					const tenderRef = doc(db, "TenderInfo", a[0].id);
					await updateDoc(tenderRef, {
						status: "rejected",
					});
				}
			},

			acceptForm: async function (index, a) {
				var c = confirm("Do you want to accept this Tender Form?");
				if (c == true) {
					//deleting the row
					this.applications.splice(index, 1);
					//updating the status
					const tenderRef = doc(db, "TenderInfo", a[0].id);
					await updateDoc(tenderRef, {
						status: "accepted",
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

<style>
	@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

	#dashboardHeading {
		padding-left: 40px;
		padding-top: 10px;
		display: inline-block;
		width: 100%;
		text-align: left;
	}

	#wholeTable {
		margin-top: 20px;
		margin-bottom: 50px;
		padding-left: 40px;
		padding-right: 40px;
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

	.card-text{
		margin-bottom: 0px;
	}

	#rejectButton {
		margin-left: 10px;
	}
</style>

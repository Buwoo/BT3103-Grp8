<template>
	<div class="container-fluid h-100 d-flex flex-column flex-grow-1">
		<!-- Heading with the Create Button -->
		<div class="row" id="headings">
			<div class="col-md-9">
				<h3 class="mt-4" id="dashboardHeading">
					<b> Tender Dashboard </b>
				</h3>
			</div>
			<div class="col-md-3 justify-content-end" id="createButton">
				<button type="button" class="btn btn-primary btn-md mt-4" @click="createForm">+ Create</button>
			</div>
		</div>

		<!-- Tender Table-->
		<div class= "row flex-grow-1 px-3 pb-3">
			<div id="tablewrapper" class="h-100 position-relative resizeWidth">
				<div id="wholeTable" class = "position-absolute">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Tender ID</th>
								<th scope="col">Date</th>
								<th scope="col">Hawker Centre Name</th>
								<th scope="col">Status</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr v-for="(a, index) in applications" :key="a.id">
								<td id="tenderID">
									<button type="button" class="btn btn-link" data-bs-toggle="modal" :data-bs-target="'#modal_' + a.id">
										{{ a.id }}
									</button>
									<div class="modal-lg" modal-xl id="tenderIdModal">
										<!-- Modal -->
										<div class="modal fade" :id="'modal_' + a.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div class="modal-dialog">
												<div class="modal-content">
													<!-- Modal headers-->
													<div class="modal-header">
														<div class="container-fluid">
															<div class="row">
																<button type="button" class="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
															</div>
															<div class="row fw-bold">
																<div class="col-md-8">
																	<h5 class="modal-title fs-3" id="exampleModalLabel">
																		Tender:
																		<span class="text-secondary">{{ a.id }}</span>
																	</h5>
																</div>
																<div class="col-md-4 d-flex">
																	<h5 class="align-bottom float-end" id="statusLabel">
																		Status:
																		<span :class="getColour(a.data().status)" class="fw-bold">
																			{{ a.data().status.charAt(0).toUpperCase() + a.data().status.slice(1) }}
																		</span>
																	</h5>
																</div>
															</div>
														</div>
													</div>
													<!-- Modal body-->
													<div class="modal-body text-start">
														<!-- First Card: Tender Details -->
														<div class="card">
															<div class="card-header bg-primary">
																<div class="fs-4 ms-4">Tender Details</div>
															</div>
															<div class="container-fluid">
																<div class="card-body">
																	<div class="row">
																		<div class="details col-xs-6 col-md-6">
																			<p class="card-text">
																				<small class="text-muted">Hawker Centre Name</small>
																			</p>
																			<p class="card-text">{{ a.data().name }}</p>
																		</div>
																		<div class="details col-xs-6 col-md">
																			<p class="card-text">
																				<small class="text-muted">Food Item</small>
																			</p>
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
																			<p class="card-text">
																				<small class="text-muted">Closing Time</small>
																			</p>
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
															<div class="card-header bg-primary">
																<div class="fs-4 ms-4">Personal Details</div>
															</div>
															<div class="container-fluid">
																<div class="card-body">
																	<div class="row">
																		<div class="details col-md-4">
																			<p class="card-text">
																				<small class="text-muted">Name</small>
																			</p>
																			<p class="card-text">{{ name }}</p>
																		</div>
																		<div class="details col-md-4">
																			<p class="card-text">
																				<small class="text-muted">NRIC</small>
																			</p>
																			<p class="card-text">XXXXX{{ id }}</p>
																		</div>
																		<div class="details col-md-4">
																			<p class="card-text">
																				<small class="text-muted">Email</small>
																			</p>
																			<p class="card-text">{{ email }}</p>
																		</div>
																	</div>
																	<div class="row">
																		<div class="details col-md-4">
																			<p class="card-text">
																				<small class="text-muted">Home Address</small>
																			</p>
																			<p class="card-text">{{ address }}</p>
																		</div>
																		<div class="details col-xs-4 col-md-6">
																			<p class="card-text">
																				<small class="text-muted">Contact Number</small>
																			</p>
																			<p class="card-text">{{ mobile }}</p>
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
								<td id="date">
									{{ a.data().date.toDate().toDateString() }}
								</td>
								<td id="hawkerCentreName">
									{{ a.data().name }}
								</td>
								<td id="status" :class="getColour(a.data().status)">
									{{ a.data().status }}
								</td>
								<td id="actions">
									<div class="d-flex justify-content-center">
										<button type="button" id="editButton" @click="checkStatus(a) ? editForm(a.id) : null" :class="[checkStatus(a) ? 'btn btn-success' : 'btn btn-secondary']">
											<i class="bi bi-pencil-fill"></i>
										</button>
										<button id="deleteButton" type="button" @click="checkStatus(a) ? deleteForm(index, a) : null" :class="[checkStatus(a) ? 'btn btn-danger' : 'btn btn-secondary']">
											<i class="bi bi-trash3"></i>
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
	import firebaseApp from "../firebase.js";
	import firebase from "@/uifire.js";
	import { getFirestore } from "firebase/firestore";
	import { collection, query, where, getDocs, deleteDoc, doc, getDoc, addDoc, Timestamp, orderBy } from "firebase/firestore";
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import router from "../router/index.js";

	const db = getFirestore(firebaseApp);

	export default {
		data() {
			return {
				applications: [],
				name: "",
				address: "",
				email: "",
				mobile: "",
				id: "",
			};
		},

		methods: {
			deleteForm: async function (index, a) {
				var c = confirm("Do you want to delete this Tender Form?");
				if (c == true) {
					await deleteDoc(doc(db, "TenderInfo", a.id));
					this.applications.splice(index, 1);
				}
			},

			checkStatus: function (a) {
				return a.data().status.trim() == "unsubmitted".trim();
			},

			editForm: function (tenderId) {
				console.log(tenderId);
				router.push({
					name: "TenderFormView",
					params: { tenderID: tenderId },
				});
			},
			createForm: async function () {
				const docRef = await addDoc(collection(db, "TenderInfo"), {
					name: "",
					date: Timestamp.fromDate(new Date()),
					foodItem: "",
					openingHours: {
						end: "",
						start: "",
					},
					status: "unsubmitted",
					userID: this.id,
				});
				let tenderId = docRef.id;
				router.push({
					name: "TenderFormView",
					params: { tenderID: tenderId },
				});
			},

			getColour: function (status) {
				switch (status) {
					case "approved":
						return "text-success";
					case "pending":
						return "text-warning";
					case "rejected":
						return "text-danger";
					case "unsubmitted":
						return "text-secondary";
				}
			},

			deleteDoc: async function (doc) {
				await deleteDoc(doc);
			},

			loadHawkerData: function (id) {
				this.id = id;
				let response = getDoc(doc(db, "Authentication", id));
				response
					.then((rsp) => {
						let profile = rsp.data();
						this.name = profile.fullName;
						this.email = profile.email;
						this.address = profile.address;
						this.mobile = profile.mobileNr;
					})
					.catch((error) => {
						console.log(error);
					});
			},

			loadDetails: async function (hawkerID) {
				const q = query(collection(db, "TenderInfo"), where("userID", "==", hawkerID), orderBy("date"));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					let docData = doc.data();
					//Check doc to see if the
					// 1. Food Item field is empty
					// 2. Name is empty
					// 3. Opening hours start and end are empty
					// If all empty, then delete doc and dont push the doc
					// if (ddat.foodItem)
					if (docData.foodItem == "" && docData.name == "" && docData.openingHours.end == "" && docData.openingHours.start == "") {
						this.deleteDoc(doc);
					} else {
						this.applications.push(doc);
					}
				});
			},
		},
		mounted() {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					firebase
						.auth()
						.currentUser.getIdTokenResult()
						.then((tokenResult) => {
							console.log(tokenResult.claims);
							if (tokenResult.claims.NEAAgent) {
								router.push("/404");
							}
						});
					this.user = user;
					let id = auth.currentUser.email.slice(0, 4).toUpperCase();
					console.log(id);
					this.loadHawkerData(id);
					this.loadDetails(id);
				} else {
					console.log("woops, auth issue");
				}
			});
		},
	};
</script>

<style>
#wholeTable {
	z-index: 1
}

</style>

<style scoped>
	@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

	#dashboardHeading {
		/*margin-right: 150px;*/
		padding-left: 30px;
		display: inline-block;
		width: 100%;
		text-align: left;
	}

	#createButton {
		/*margin-top:30px;*/
		padding-right: 30px;
		text-align: right;
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

	.card {
		max-width: 850px;
	}

	#exampleModalLabel {
		margin-left: 5%;
		float: left;
		font-weight: bold;
	}

	#statusLabel {
		padding-left: 30px;
		align-self: center;
		margin-bottom: 0;
		font-weight: bold;
	}

	.card-header {
		background-color: #1976d2;
		color: white;
	}

	.card {
		margin: 0px 30px 30px 30px;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
		border: none;
	}

	#editButton,
	#deleteButton {
		display: inline-block;
	}

	#deleteButton {
		margin-left: 10px;
	}

	.details {
		padding-top: 10px;
	}

	.card-text {
		margin-bottom: 0px;
	}
</style>

<template>
	<v-container class="detail-sceen-container">
		<!-- Loading -->
		<v-row v-if="loading" justify="center">
			<v-col
				v-for="n in 8"
				:key="n"
				cols="12"
				sm="6"
				md="4"
				lg="3"
				class="d-flex justify-center"
			>
				<v-skeleton-loader type="card" width="250px" height="350px" />
			</v-col>
		</v-row>

		<!-- Error State -->
		<v-row v-if="error" justify="center">
			<v-col cols="12">
				<v-alert type="error" dense>{{ error }}</v-alert>
			</v-col>
		</v-row>

		<!-- Show Details -->
		<v-row v-if="showDetails" class="show-detail-container" justify="center">
			<v-col cols="12" lg="10">
				<h1 class="text-h4 font-weight-bold text-left mb-2 ml-5">
					{{ showDetails.name }}
				</h1>
				<p class="text-left ml-5 mb-2">
					Premiered:
					<strong>{{ showDetails.premiered || "N/A" }}</strong>
				</p>

				<v-row justify="center" class="show-detail-header">
					<!-- Show Image -->
					<v-col cols="12" sm="6" md="4">
						<v-img
							:src="showDetails.image?.original"
							alt="Show Image"
							class="show-image"
							contain
						/>
					</v-col>

					<!-- Show Information -->
					<v-col cols="12" sm="6" md="8" class="show-detail-info">
						<v-chip color="yellow darken-3" class="text-body-1 mb-2">
							<v-icon>mdi-star</v-icon>
							{{ showDetails.rating?.average || "N/A" }}
						</v-chip>

						<v-chip color="blue darken-2" class="text-body-1 mb-2">
							{{ showDetails.genres?.join(", ") || "N/A" }}
						</v-chip>

						<p class="text-body-1">Runtime: {{ showDetails.runtime }} min</p>

						<v-divider class="my-3"></v-divider>

						<p class="text-body-2 summary" v-html="showDetails.summary"></p>
					</v-col>
				</v-row>

				<!-- Cast Section -->
				<CastList v-if="cast.length" :cast="cast" class="mt-5" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import CastList from "../components/CastList.vue";
import { fetchTvShowDetails, fetchCastDetails } from "../services/tvMazeApi";
import { ShowDetails, CastMember } from "../types/types";

const route = useRoute();
const showDetails = ref<ShowDetails | null>(null);
const cast = ref<CastMember[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

onMounted(async () => {
	try {
		// Ensure ID is a valid number
		const showId = Number(route.params.id);
		if (isNaN(showId)) throw new Error("Invalid show ID");

		// Fetch Show Details
		const data = await fetchTvShowDetails(showId);
		if (!data) throw new Error("No data received");
		showDetails.value = data;

		// Fetch Cast Details
		const castData = await fetchCastDetails(showId);
		if (!castData) throw new Error("No Cast data received");
		cast.value = castData;

		console.log("Fetched show details:", showDetails.value);
		console.log("Fetched cast details:", cast.value);
	} catch (err) {
		error.value = "Failed to load TV show details";
		console.error(err);
	} finally {
		loading.value = false;
	}
});
</script>

<style scoped>
.show-detail-container {
	max-width: 1200px;
	margin: 0 auto;
}

.show-image {
	width: 100%;
	max-height: 400px;
	object-fit: contain;
	border-radius: 10px;
}

.summary {
	line-height: 1.6;
}
</style>

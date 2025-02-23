<template>
	<v-container class="main-container">
		<!-- Header -->
		<Header @search="handleSearch"></Header>

		<!-- Loading  -->
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

		<!-- No Results Message -->
		<v-row
			v-if="
				!filteredGroupedShows || Object.keys(filteredGroupedShows).length === 0
			"
			class="text-center"
		>
			<v-col cols="12">
				<h6>{{ noData }}</h6>
			</v-col>
		</v-row>

		<!-- Error state -->
		<v-row v-if="error" class="err-msg">
			<v-col cols="12">
				<h6>{{ error }}</h6>
			</v-col>
		</v-row>

		<!-- Genre Sections -->

		<div class="GenreSection">
			<GenreSection
				v-for="(shows, genre) in filteredGroupedShows"
				:key="genre"
				:genre="genre"
				:shows="shows"
			/>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { fetchTvShows } from "../services/tvMazeApi";
import GenreSection from "../components/GenreSection.vue";
import Header from "../components/Header.vue";
import { Show } from "../types/types";

const shows = ref<Show[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const noData = ref<string | null>(null);
// const groupedShows = ref<Record<string, Show[]>>({});
const searchQuery = ref("");

// Fetch the data when the component is mounted
onMounted(async () => {
	try {
		const data = await fetchTvShows(); // Fetch data from the API
		if (!data?.length) throw new Error("No data received");
		shows.value = data;
	} catch (err) {
		error.value = "Failed to load TV shows";
		console.error(err);
	} finally {
		loading.value = false;
	}
});

const groupedShows = computed(() => {
	if (!shows.value.length) return {}; // If no shows, return empty object

	const grouped: Record<string, Show[]> = {};

	shows.value.forEach((show) => {
		const genres = show.genres?.length ? show.genres : ["Uncategorized"];
		genres.forEach((genre) => {
			if (!grouped[genre]) grouped[genre] = [];
			grouped[genre].push(show);
		});
	});

	// Sort each genre's shows by rating (descending)
	Object.values(grouped).forEach((showsList) =>
		showsList.sort(
			(a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
		)
	);

	return grouped;
});

// filter shows based on the search
const filteredGroupedShows = computed(() => {
	if (!searchQuery.value) return groupedShows.value;

	const filtered: Record<string, Show[]> = {};
	const addedShows = new Set<number>();
	const lowerCaseQuery = searchQuery.value.toLowerCase();

	Object.entries(groupedShows.value).forEach(([genre, shows]) => {
		const filteredShows = shows.filter((show) => {
			const showName = show.name.toLowerCase();
			const isInSearchQuery = showName.includes(lowerCaseQuery);

			if (isInSearchQuery && !addedShows.has(show.id)) {
				addedShows.add(show.id);
				return true;
			}
			return false;
		});

		if (filteredShows.length) {
			filtered[genre] = filteredShows;
		}
	});

	// Update noData after filtering
	error.value = Object.keys(filtered).length
		? null
		: "Sorry, no results found. Try a different keyword!";

	return filtered;
});

console.log("filteredGroupedShows>>", filteredGroupedShows.value);

// Update search query from Header
const handleSearch = (query: string) => {
	console.log("search>>", query);
	searchQuery.value = query;
};
</script>

<style scoped>
.main-container {
	padding: 0;
	max-width: 100%;
	max-height: 100%;
}

.err-msg {
	margin-top: 80px !important;
	align-self: center;
	margin-left: 20px;
}

.GenreSection {
	margin-top: 50px;
	padding: 0;
}
</style>

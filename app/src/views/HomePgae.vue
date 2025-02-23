<template>
	<v-container class="main-container">
		<!-- Header -->
		<Header @search="handleSearch"></Header>

		<!-- Loading State (Skeleton Loader) -->
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
		<v-row v-if="!error && noData" class="text-center">
			<v-col cols="12">
				<h6>{{ noData }}</h6>
			</v-col>
		</v-row>

		<!-- Error state -->
		<v-row v-if="error" class="text-center">
			<v-col cols="12">
				<v-alert type="error">{{ error }}</v-alert>
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
import { fetchTvShows } from "../services/tvMazeApi"; // Import the API function
import GenreSection from "../components/GenreSection.vue";
import Header from "../components/Header.vue";
import { Show } from "../types/types";

// Reactive references for TV shows, loading state, and errors
const shows = ref<Show[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const noData = ref<string | null>(null);
const groupedShows = ref<Record<string, Show[]>>({});
const searchQuery = ref(""); // 🔍 Search query

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

watchEffect(() => {
	if (!shows.value.length) {
		console.warn("⚠️ No shows available to group!");
		groupedShows.value = {};
		return;
	}

	// const grouped: Record<string, Show[]> = {};

	// shows.value.forEach((show: Show) => {
	// 	const genres = show.genres?.length ? show.genres : ["Uncategorized"];

	// 	genres.forEach((genre: string) => {
	// 		if (!grouped[genre]) grouped[genre] = [];
	// 		grouped[genre].push(show);
	// 	});
	// });

	groupedShows.value = shows.value.reduce((acc, show) => {
		const genres = show.genres?.length ? show.genres : ["Uncategorized"];
		genres.forEach((genre) => {
			if (!acc[genre]) acc[genre] = [];
			acc[genre].push(show);
		});
		return acc;
	}, {} as Record<string, Show[]>);
	// Sort each genre’s shows by rating
	Object.values(groupedShows.value).forEach((showsList) =>
		showsList.sort(
			(a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
		)
	);

	// Object.keys(grouped).forEach((genre: string) => {
	// 	grouped[genre].sort(
	// 		(a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)
	// 	);
	// });

	// groupedShows.value = grouped;
	// console.log("✅ watchEffect Grouped Shows >>>", groupedShows.value);
});

//  Computed property to filter shows based on the search query
const filteredGroupedShows = computed(() => {
	if (!searchQuery.value) return groupedShows.value;

	const filtered: Record<string, Show[]> = {};
	const addedShows = new Set<number>();

	Object.keys(groupedShows.value).forEach((genre: string) => {
		const filteredShows = groupedShows.value[genre].filter((shows) => {
			const showName = shows.name.toLowerCase();
			const isInSearchQuery = showName.includes(
				searchQuery.value.toLowerCase()
			);

			if (
				showName.includes(searchQuery.value.toLowerCase()) &&
				!addedShows.has(shows.id)
			) {
				addedShows.add(shows.id);
				return true;
			}
			return false;
		});
		console.log("filter show>>>", filteredShows);
		if (filteredShows.length === 0)
			noData.value = "Sorry, no results found. Try a different keyword!";
		console.log("NO data>>", noData.value, error.value);
		if (filteredShows.length) filtered[genre] = filteredShows;
	});
	return filtered;
});

// Update search query from Header
const handleSearch = (query: string) => {
	searchQuery.value = query;
};
</script>

<style scoped>
.main-container {
	padding: 0;
	max-width: 100%;
	background-color: black;
	color: white;
}

.GenreSection {
	margin-top: 80px;
	padding: 0;
}
</style>

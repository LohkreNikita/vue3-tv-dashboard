<template>
	<v-app-bar app color="black" elevate-on-scroll>
		<v-container class="d-flex align-center justify-space-between">
			<v-toolbar-title class="logo">TVVerse</v-toolbar-title>

			<!-- (Hidden on Mobile) -->
			<v-spacer />
			<v-btn text class="nav-link d-none d-md-flex">Home</v-btn>
			<v-btn text class="nav-link d-none d-md-flex">Trending</v-btn>
			<v-btn text class="nav-link d-none d-md-flex">My List</v-btn>

			<!-- searchBar  -->
			<v-text-field
				v-model="searchQuery"
				append-inner-icon="mdi-magnify"
				label="Search Show"
				clearable
				hide-details
				@update:model-value="emitSearch"
			>
			</v-text-field>

			<!-- Theme Toggle Button -->
			<v-btn icon @click="toggleTheme">
				<v-icon>{{
					isDark ? "mdi-weather-sunny" : "mdi-moon-waxing-crescent"
				}}</v-icon>
			</v-btn>
		</v-container>
	</v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const searchQuery = ref("");
const emit = defineEmits(["search"]);

const emitSearch = () => {
	emit("search", searchQuery.value);
};

// Toggle theme mode
const toggleTheme = () => {
	theme.global.name.value = isDark.value ? "light" : "dark";
};
</script>

<style scoped>
.logo {
	font-size: 24px;
	font-weight: bold;
	color: red;
	cursor: pointer;
}

.nav-link {
	color: white !important;
	text-transform: none;
	font-size: 16px;
	margin: 0 10px;
}

.search-bar {
	max-width: 300px;
	width: "100%";
	margin-left: 20px;
}
</style>

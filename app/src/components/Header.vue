<template>
	<v-app-bar app color="black" elevate-on-scroll>
		<v-container class="d-flex align-center justify-space-between">
			<!-- Logo -->
			<v-toolbar-title class="logo">TVVerse</v-toolbar-title>

			<!-- Desktop Navigation (Hidden on Mobile) -->
			<v-spacer />
			<v-btn text class="nav-link d-none d-md-flex">Home</v-btn>
			<v-btn text class="nav-link d-none d-md-flex">Trending</v-btn>
			<v-btn text class="nav-link d-none d-md-flex">My List</v-btn>

			<!-- SearchBar -->
			<v-text-field
				v-model="searchQuery"
				append-inner-icon="mdi-magnify"
				label="Search Show"
				clearable
				hide-details
				@update:model-value="emitSearch"
			>
			</v-text-field>
		</v-container>
	</v-app-bar>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const searchQuery = ref("");
const emit = defineEmits<{ (event: "search", query: string): void }>();
const emitSearch = () => {
	emit("search", searchQuery.value);
};
</script>

<style scoped>
/* Logo Styling */
.logo {
	font-size: 24px;
	font-weight: bold;
	color: red;
	cursor: pointer;
}

/* Desktop Navigation */
.nav-link {
	color: white !important;
	text-transform: none;
	font-size: 16px;
	margin: 0 10px;
}

/* Desktop Search Bar */
.search-bar {
	max-width: 300px;
	width: "100%";
	margin-left: 20px;
}

/* Mobile Search (Expands Below Header) */
.mobile-search {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	margin: 0 16px;
	z-index: 1000;
}

/* Responsive Styles */
@media (max-width: 600px) {
	.logo {
		font-size: 18px;
	}

	.search-bar {
		max-width: 100%;
	}
}
</style>

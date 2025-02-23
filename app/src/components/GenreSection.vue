<template>
	<v-container class="gener-Container">
		<h2 class="genre-title">{{ genre }}</h2>
		<div class="scroll-container">
			<v-row class="flex-nowrap">
				<v-col v-for="show in shows" :key="show.id" cols="auto">
					<ShowCard :show="show" />
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import ShowCard from "../components/ShowCard.vue";
import { defineProps } from "vue";
import { Show } from "../types/types";

defineProps<{ genre: string; shows: Show[] }>();
</script>

<style scoped>
.gener-Container {
	max-width: 100%;
}
.scroll-container {
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
	padding: 10px 0;
	max-width: 100%;
}

.genre-title {
	font-size: 22px;
	font-weight: bold;
	text-align: left;
	margin-top: 15px;
}
</style>

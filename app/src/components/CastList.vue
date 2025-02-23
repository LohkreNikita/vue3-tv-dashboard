<template>
	<div class="cast-section">
		<h2 class="text-h4 font-weight-bold text-left mb-5 ml-5">Cast</h2>
		<div class="cast-container">
			<div v-for="actor in cast" :key="actor.person.id" class="actor-card">
				<img
					:src="actor.person.image?.medium"
					alt="Actor Image"
					class="actor-image"
				/>
				<p class="actor-name">{{ actor.person?.name }}</p>
				<p class="character-name">
					as {{ actor.character?.name || "Unknown" }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CastMember } from "../types/types";

const props = defineProps<{ cast: CastMember[] }>();
</script>

<style scoped>
.cast-section {
	margin-top: 40px;
}

.cast-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

.cast-text {
	text-align: left;
}

.actor-card {
	width: 150px;
	text-align: center;
	margin-top: 10px;
}

.actor-image {
	width: 100%;
	border-radius: 10px;
}

.actor-name {
	font-weight: bold;
	font-size: 16px;
	margin-top: 10px;
}

.character-name {
	font-size: 14px;
	color: gray;
}
</style>

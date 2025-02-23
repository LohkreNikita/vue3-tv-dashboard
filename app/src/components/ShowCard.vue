<template>
	<v-card class="show-card" @click="goToDetails">
		<!-- Image Container -->
		<img :src="show.image?.medium" class="show-image" />
		<!-- Overlay Details on Hover -->
		<div class="overlay">
			<p class="rating">⭐ {{ show.rating?.average || "N/A" }}</p>
			<p class="genres">🎭 {{ show.genres?.join(", ") || "N/A" }}</p>
		</div>
		<!-- Show Title -->
		<v-card-title class="show-title">{{ show.name }}</v-card-title>
	</v-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Show } from "../types/types";

const props = defineProps<{
	show: Show;
}>();
const router = useRouter();

const goToDetails = () => {
	router.push(`/show/${props.show.id}`);
};
</script>

<style scoped>
/* Hover Effect - Expands Slightly */
.show-card:hover {
	transform: scale(1.07);
}

/* Show Image */
.show-image {
	height: 100%;
	/* border-radius: 8px; */
}

/* Overlay - Initially Hidden */
.overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.7); /* Slightly darker overlay */
	color: white;
	text-align: center;
	padding: 8px;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}

/* Show Overlay on Hover */
.show-card:hover .overlay {
	opacity: 1;
}

/* Show Title (Card Title) */
.show-title {
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	padding: 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	background-color: #fff;
	/* display: none; */
}

/* Rating & Genres in the overlay */
.rating,
.genres {
	margin: 3px 0;
	font-size: 12px;
}
</style>

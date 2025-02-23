<template>
	<v-card class="show-card" @click="goToDetails">
		<img :src="show.image?.medium" class="show-image" />
		<div class="overlay">
			<p class="rating">⭐ {{ show.rating?.average || "N/A" }}</p>
			<p class="genres">🎭 {{ show.genres?.join(", ") || "N/A" }}</p>
		</div>
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
.show-card:hover {
	transform: scale(1.07);
	width: 250px;
}

.show-image {
	width: 240px;
	height: 300px;
}

/* Overlay - Initially Hidden */
.overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.7);
	color: white;
	text-align: center;
	padding: 5px;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}

.show-card:hover .overlay {
	opacity: 1;
}

.show-title {
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	padding: 8px;
	overflow: hidden;
	width: 100%;
	background-color: #fff;
	color: black;
}

.rating,
.genres {
	margin: 3px 0;
	font-size: 12px;
}
</style>

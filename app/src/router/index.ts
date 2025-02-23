import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePgae.vue";
import DetailScreen from "../views/DetailScreen.vue";
const routes = [
	{ path: "/", component: HomePage },
	{ path: "/show/:id", component: DetailScreen, props: true },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

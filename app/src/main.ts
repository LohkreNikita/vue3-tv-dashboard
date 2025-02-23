import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "light",
		themes: {
			light: {
				dark: false,
				colors: {
					primary: "#6200ea",
					background: "#ffffff",
					surface: "#f5f5f5",
					error: "#b00020",
				},
			},
			dark: {
				dark: true,
				colors: {
					primary: "#bb86fc",
					background: "#121212",
					surface: "#1e1e1e",
					error: "#cf6679",
				},
			},
		},
	},
});

createApp(App)
	.use(router)
	.use(vuetify) // Add Vuetify to the Vue app
	.mount("#app");

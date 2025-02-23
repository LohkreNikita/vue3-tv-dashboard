// store/shows.ts
import { defineStore } from "pinia";

interface Show {
	id: number;
	name: string;
	genre: string;
	rating: number;
}

interface ShowsState {
	shows: Show[];
	searchQuery: string;
}

export const useShowsStore = defineStore("shows", {
	state: (): ShowsState => ({
		shows: [],
		searchQuery: "",
	}),
	actions: {
		setSearchQuery(query: string): void {
			this.searchQuery = query;
		},
		addShow(show: Show): void {
			this.shows.push(show);
		},
	},
	getters: {
		filteredShows: (state: ShowsState): Show[] => {
			return state.shows.filter((show) =>
				show.name.includes(state.searchQuery)
			);
		},
	},
});

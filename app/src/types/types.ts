export interface Show {
	id: number;
	name: string;
	image?: {
		medium?: string;
		original?: string;
	};
	rating?: {
		average: number;
	};
	genres?: string[];
}

export interface ShowDetails {
	id: number;
	name: string;
	premiered?: string;
	runtime?: number;
	genres?: string[];
	summary?: string;
	rating?: { average?: number };
	image?: { original?: string };
}

export interface CastMember {
	person: {
		id: number;
		name: string;
		image?: { medium?: string };
	};
}

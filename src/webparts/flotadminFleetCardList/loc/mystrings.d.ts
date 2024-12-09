declare interface IFleetCardWebPartStrings {
	WebPartTitle: {
		Title: string;
	};
	SearchBar: {
		Placeholder: string;
	};
	CreateNewButton: {
		Text: string;
	};
	FleetCardCard: {
		CardButton: string;
	};
	Errors: {
		ErrorQuerying: string;
		ErrorInitServices: string;
	};
}

declare module 'FlotadminFleetCardWebPartStrings' {
	const strings = IFleetCardWebPartStrings;
	export = strings;
}

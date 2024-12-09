declare interface IInterventionTypesWebPartStrings {
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

declare module 'FlotadminInterventionTypesListWebPartStrings' {
	const strings = IInterventionTypesWebPartStrings;
	export = strings;
}

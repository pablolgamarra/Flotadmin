import {
	FleetCard,
	Intervention,
	InterventionType,
	Vehicle,
} from '@vehiclesList/types';
import * as React from 'react';

//Types

interface DataProviderProps {
	fleetCardList: FleetCard[];
	interventionsList: Intervention[];
	interventionTypesList: InterventionType[];
	vehiclesList: Vehicle[];
}

export const DataContext = React.createContext<DataProviderProps>(
	{} as DataProviderProps,
);

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({
	children,
	vehiclesList,
	fleetCardList,
	interventionsList,
	interventionTypesList,
}: React.PropsWithChildren<DataProviderProps>) => {
	return (
		<DataContext.Provider
			value={{
				fleetCardList: fleetCardList,
				interventionsList: interventionsList,
				interventionTypesList: interventionTypesList,
				vehiclesList: vehiclesList,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

DataContext.displayName = 'DataContext';
DataProvider.displayName = 'DataProvider';

import {
	FleetCard,
	Intervention,
	InterventionType,
	Vehicle,
} from '@vehiclesList/types';
import * as React from 'react';

//Types

interface DataProviderProps {
	fleedCardList: FleetCard[];
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
	fleedCardList,
	interventionsList,
	interventionTypesList,
}: React.PropsWithChildren<DataProviderProps>) => {
	return (
		<DataContext.Provider
			value={{
				fleedCardList: fleedCardList,
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

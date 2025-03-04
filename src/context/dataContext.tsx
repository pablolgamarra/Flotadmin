import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import * as React from 'react';

//Types

interface DataProviderProps {
	fleetCardService: IFleetCardService;
	interventionsService: IInterventionService;
	interventionTypesService: IInterventionTypeService;
	vehiclesService: IVehicleService;
}

export const DataContext = React.createContext<DataProviderProps>({} as DataProviderProps);

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({
	children,
	fleetCardService,
	interventionsService,
	interventionTypesService,
	vehiclesService,
}: React.PropsWithChildren<DataProviderProps>) => {
	return (
		<DataContext.Provider
			value={{
				fleetCardService: fleetCardService,
				interventionsService: interventionsService,
				interventionTypesService: interventionTypesService,
				vehiclesService: vehiclesService,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

DataContext.displayName = 'DataContext';
DataProvider.displayName = 'DataProvider';

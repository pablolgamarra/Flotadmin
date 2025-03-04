import { DataContext } from '@/context/dataContext';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { IInterventionService } from '@/services/business/interfaces/IInterventionService';
import { IInterventionTypeService } from '@/services/business/interfaces/IInterventionTypeService';
import { IVehicleService } from '@/services/business/interfaces/IVehicleService';
import { useContext } from 'react';

export const useDataContext = (): {
	fleetCardService: IFleetCardService;
	interventionsService: IInterventionService;
	interventionTypesService: IInterventionTypeService;
	vehiclesService: IVehicleService;
} => {
	const context = useContext(DataContext);

	if (context === undefined) {
		throw new Error('useDataContext must be used within the DataProvider');
	}

	return context;
};

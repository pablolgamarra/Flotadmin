import { DataContext } from '@/context/dataContext';
import {
	FleetCard,
	Intervention,
	InterventionType,
	Vehicle,
} from '@vehiclesList/types';
import { useContext } from 'react';

export const useDataContext = (): {
	fleetCardList: FleetCard[];
	interventionsList: Intervention[];
	interventionTypesList: InterventionType[];
	vehiclesList: Vehicle[];
} => {
	const context = useContext(DataContext);

	if (context === undefined) {
		throw new Error('useDataContext must be used within the DataProvider');
	}

	return context;
};

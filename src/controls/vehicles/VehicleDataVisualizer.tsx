import * as React from 'react';

import { Divider } from '@fluentui/react-components';
import { Vehicle } from '@/models/Vehicle';
import { VehicleDataInteractions } from './VehicleDataInteractions';
import { Intervention } from '@/models/Intervention';
import { useDataContext } from '@/hooks/useDataContext';
import { VehicleDataFields } from './VehicleDataFields';
import { Currency } from '@/common/Currency';
import { FleetCard } from '@/models/FleetCard';

export interface VehicleDataFormProps {
	vehicle?: Vehicle;
}

export interface FormState {
	plate: string;
	brand: string;
	model: string;
	modelYear: number;
	adquisitionDate: Date;
	adquisitionCost: number;
	costCurrency: Currency;
	user: string;
	fleetCard: FleetCard;
}

export const VehicleDataVisualizer: React.FC<VehicleDataFormProps> = (props) => {
	const { vehicle } = props;

	// let initialProps;

	// if (vehicle) {
	// 	initialProps = {
	// 		plate: vehicle.Plate,
	// 		brand: vehicle.Brand,
	// 		model: vehicle.Model,
	// 		modelYear: parseInt(vehicle.ModelYear),
	// 		adquisitionDate: vehicle.BuyDate,
	// 		adquisitionCost: vehicle.Cost,
	// 		costCurrency: vehicle.CostCurrency as Currency,
	// 		user: vehicle.User,
	// 		fleetCard: vehicle.FleetCard ? vehicle.FleetCard : ({} as FleetCard),
	// 	};
	// } else {
	// 	initialProps = {} as FormState;
	// }

	// const [formState, setFormState] = React.useState<FormState>(initialProps);

	const { interventionsService } = useDataContext();

	const [vehicleInteractions, setVehicleInteractions] = React.useState<Intervention[]>([]);

	React.useEffect(() => {
		const getInterventions = async (): Promise<void> => {
			try {
				const interventions = await interventionsService.listAll();

				const currentVehicleInterventions = interventions.filter(
					(intervention: Intervention) => intervention.Vehicle.Id === vehicle?.Id,
				);

				setVehicleInteractions(currentVehicleInterventions);
			} catch (e) {
				console.log(`Error listando intervenciones ${e}`);
			}
		};

		getInterventions();
	}, [interventionsService, vehicle, setVehicleInteractions]);

	return (
		<>
			<VehicleDataFields vehicle={vehicle} />
			<Divider
				className='tw-mt-5 tw-min-h-1 tw-bg-slate-400'
				title='Intervenciones'
				alignContent='start'
			/>
			<VehicleDataInteractions interactions={vehicleInteractions} />
		</>
	);
};

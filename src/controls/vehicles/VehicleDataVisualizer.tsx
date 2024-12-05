import * as React from 'react';

import { Divider } from '@fluentui/react-components';
import { Vehicle } from '@/models/Vehicle';
import { VehicleDataInteractions } from './VehicleDataInteractions';
import { Intervention } from '@/models/Intervention';
import { useDataContext } from '@/hooks/useDataContext';
import { VehicleDataFields } from './VehicleDataFields';

export interface VehicleDataFormProps {
	vehicle: Vehicle | undefined;
}

export const VehicleDataVisualizer: React.FC<VehicleDataFormProps> = (
	props,
) => {
	const { vehicle } = props;
	const { interventionsService } = useDataContext();

	const [vehicleInteractions, setVehicleInteractions] = React.useState<
		Intervention[]
	>([]);

	React.useEffect(() => {
		const getInterventions = async (): Promise<void> => {
			try {
				const interventions = await interventionsService.listAll();

				const currentVehicleInterventions = interventions.filter(
					(intervention: Intervention) =>
						intervention.Vehicle.Id === vehicle?.Id,
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

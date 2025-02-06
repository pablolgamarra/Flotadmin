import * as React from 'react';

import { InputField } from '@/controls/InputField';
import { FleetCard } from '@/models/FleetCard';
import { Vehicle } from '@/models/Vehicle';
export interface FleetCardDataFieldsProps {
	fleetCard?: FleetCard;
	linkedVehicle: Vehicle | undefined;
}

export const FleetCardDataFields: React.FC<FleetCardDataFieldsProps> = (props) => {
	const { fleetCard, linkedVehicle } = props;

	return (
		<>
			<InputField
				label={'Número de Tarjeta'}
				value={fleetCard?.CardNumber}
			/>
			<InputField
				label={'Monto Asignado'}
				value={fleetCard?.AssignedValue.toString()}
			/>
			<InputField
				label={'Activo'}
				value={fleetCard?.IsActive ? 'Activo' : 'Inactivo'}
			/>
			<InputField
				label={'Asignado al Vehiculo'}
				value={
					linkedVehicle
						? `#${linkedVehicle.Id} - ${linkedVehicle.Model} - ${linkedVehicle.Plate}`
						: 'No asignado a ningún vehículo'
				}
			/>
		</>
	);
};

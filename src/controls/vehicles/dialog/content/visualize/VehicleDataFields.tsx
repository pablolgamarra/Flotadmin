import * as React from 'react';

import { Vehicle } from '@/models/Vehicle';

import { InputField } from '@/controls/InputField';
export interface VehicleDataFieldsProps {
	vehicle?: Vehicle;
}

export const VehicleDataFields: React.FC<VehicleDataFieldsProps> = (props) => {
	const { vehicle } = props;

	return (
		<>
			<InputField
				label={'Chapa'}
				value={vehicle?.Plate}
			/>
			<InputField
				label={'Marca'}
				value={vehicle?.Brand}
			/>
			<InputField
				label={'Modelo'}
				value={vehicle?.Model}
			/>
			<InputField
				label={'Año'}
				value={vehicle?.ModelYear}
			/>
			<InputField
				label={'Fecha de Adquisición'}
				value={vehicle?.BuyDate.toDateString()}
			/>
			<InputField
				label={'Costo de Adquisición'}
				value={vehicle?.Cost.toString()}
			/>
			<InputField
				label={'Moneda de Adquisición'}
				value={vehicle?.CostCurrency}
			/>
			<InputField
				label={'Usuario'}
				value={vehicle?.User}
			/>
			<InputField
				label={'Tarjeta Flota'}
				value={vehicle?.FleetCard ? vehicle?.FleetCard.CardNumber : 'Sin Asignar'}
			/>
		</>
	);
};

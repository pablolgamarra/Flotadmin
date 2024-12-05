import * as React from 'react';

import { Vehicle } from '@/models/Vehicle';

import {
	Combobox,
	Dropdown,
	Field,
	Input,
	Radio,
	RadioGroup,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react';
export interface VehicleDataFieldsProps {
	vehicle?: Vehicle;
}

export const VehicleDataFields: React.FC<VehicleDataFieldsProps> = (props) => {
	const { vehicle } = props;

	return (
		<>
			<Field label={'Chapa'}>
				<Input value={vehicle?.Plate} />
			</Field>
			<Field label={'Marca'}>
				<Input value={vehicle?.Brand} />
			</Field>
			<Field label={'Modelo'}>
				<Input value={vehicle?.Model} />
			</Field>
			<Field label={'Año'}>
				<Input value={vehicle?.ModelYear} />
			</Field>
			<Field label={'Fecha de Adquisición'}>
				<DatePicker value={vehicle?.BuyDate} />
			</Field>
			<Field label={'Costo de Adquisición'}>
				<Input value={vehicle?.Cost.toString()} />
			</Field>
			<Field label={'Moneda de Adquisición'}>
				<RadioGroup value={vehicle?.CostCurrency} />
				<Radio
					key='a-c-local-radio-group'
					value='Guaranies'
					label='Guaranies'
				/>
				<Radio
					key='a-c-exchange-radio-group'
					value='Dólar'
					label='Dólar'
				/>
				<RadioGroup />
			</Field>
			<Field label={'Usuario'}>
				<Combobox value={vehicle?.User} />
			</Field>
			<Field label={'Tarjeta Flota'}>
				<Dropdown
					value={
						vehicle?.FleetCard
							? vehicle?.FleetCard.CardNumber
							: 'Sin Asignar'
					}
				/>
			</Field>
		</>
	);
};

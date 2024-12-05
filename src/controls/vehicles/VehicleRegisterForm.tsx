import * as React from 'react';

import {
	Combobox,
	Dropdown,
	Field,
	Input,
	Radio,
	RadioGroup,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react';
import { Vehicle } from '@/models/Vehicle';

export interface VehicleDataFormProps {
	vehicle?: Vehicle;
}

export const VehicleRegisterForm: React.FC<VehicleDataFormProps> = (props) => {
	const { vehicle } = props;

	return (
		<>
			<Field
				label={'Chapa'}
				required
			>
				<Input
					placeholder='Insertar Número de Chapa'
					value={vehicle?.Plate}
				/>
			</Field>
			<Field
				label={'Marca'}
				required
			>
				<Input
					placeholder='Insertar Marca del Vehículo'
					value={vehicle?.Brand}
				/>
			</Field>
			<Field
				label={'Modelo'}
				required
			>
				<Input
					placeholder='Insertar Modelo del Vehículo'
					value={vehicle?.Model}
				/>
			</Field>
			<Field
				label={'Año'}
				required
			>
				<Input
					placeholder='Insertar Año de Fabricación del Vehículo'
					value={vehicle?.ModelYear}
				/>
			</Field>
			<Field label={'Fecha de Adquisición'}>
				<DatePicker
					placeholder='Insertar Fecha de Adquisición del Vehículo'
					value={vehicle?.BuyDate}
				/>
			</Field>
			<Field label={'Costo de Adquisición'}>
				<Input
					placeholder='Insertar Costo de Adquisición del Vehículo'
					value={vehicle?.CostCurrency}
				/>
			</Field>
			<Field label={'Moneda de Adquisición'}>
				<RadioGroup value={vehicle?.CostCurrency} />
				<Radio
					key='a-c-local-radio-group'
					value='Guaraní'
					label='Guaraní'
				/>
				<Radio
					key='a-c-exchange-radio-group'
					value='Dólar'
					label='Dólar'
				/>
				<RadioGroup />
			</Field>
			<Field
				label={'Usuario'}
				required
			>
				<Combobox
					placeholder='Inserte o Seleccione...'
					value={vehicle?.User}
				/>
			</Field>
			<Field label={'Tarjeta Flota'}>
				<Dropdown
					placeholder='Inserte o Seleccione...'
					value={vehicle?.FleetCard?.CardNumber}
				/>
			</Field>
		</>
	);
};

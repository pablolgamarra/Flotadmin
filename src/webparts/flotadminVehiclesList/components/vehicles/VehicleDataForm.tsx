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

export interface VehicleDataFormProps {}

export const VehicleDataForm: React.FC<VehicleDataFormProps> = (props) => {
	return (
		<>
			<Field
				label={'Chapa'}
				required
			>
				<Input placeholder='Insertar Número de Chapa' />
			</Field>
			<Field
				label={'Marca'}
				required
			>
				<Input placeholder='Insertar Marca del Vehículo' />
			</Field>
			<Field
				label={'Modelo'}
				required
			>
				<Input placeholder='Insertar Modelo del Vehículo' />
			</Field>
			<Field
				label={'Año'}
				required
			>
				<Input placeholder='Insertar Año de Fabricación del Vehículo' />
			</Field>
			<Field label={'Fecha de Adquisición'}>
				<DatePicker placeholder='Insertar Fecha de Adquisición del Vehículo' />
			</Field>
			<Field label={'Costo de Adquisición'}>
				<Input placeholder='Insertar Costo de Adquisición del Vehículo' />
			</Field>
			<Field label={'Moneda de Adquisición'}>
				<RadioGroup />
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
				<Combobox placeholder='Inserte o Seleccione...' />
			</Field>
			<Field label={'Tarjeta Flota'}>
				<Dropdown placeholder='Inserte o Seleccione...' />
			</Field>
		</>
	);
};

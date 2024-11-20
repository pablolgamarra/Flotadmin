import * as React from 'react';

import {
	Combobox,
	Dropdown,
	Field,
	Input,
	RadioGroup,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react';
export interface VehicleRegisterFormProps {}

export const VehicleRegisterForm: React.FC<VehicleRegisterFormProps> = (
	props,
) => {
	return (
		<>
			<Field
				label={'Chapa'}
				required
			>
				<Input />
			</Field>
			<Field
				label={'Marca'}
				required
			>
				<Input />
			</Field>
			<Field
				label={'Modelo'}
				required
			>
				<Input />
			</Field>
			<Field
				label={'Año'}
				required
			>
				<Input />
			</Field>
			<Field label={'Fecha de Adquisición'}>
				<DatePicker />
			</Field>
			<Field label={'Costo de Adquisición'}>
				<Input />
			</Field>
			<Field label={'Moneda de Adquisición'}>
				<RadioGroup />
			</Field>
			<Field
				label={'Usuario'}
				required
			>
				<Combobox />
			</Field>
			<Field label={'Tarjeta Flota'}>
				<Dropdown />
			</Field>
		</>
	);
};

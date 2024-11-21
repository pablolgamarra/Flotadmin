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

export interface InteractionRegisterFormProps {}

export const VehicleRegisterForm: React.FC<InteractionRegisterFormProps> = (
	props,
) => {
	return (
		<>
			<Field label={'Fecha de Realización'}>
				<DatePicker placeholder='Insertar Fecha de Realización' />
			</Field>
			<Field label={'Tipo de Interacción'}>
				<Dropdown placeholder='Seleccione...' />
			</Field>
			<Field
				label={'Kilometraje del Vehículo'}
				required
			>
				<Input placeholder='Insertar Kilometraje al momento de realización' />
			</Field>
			<Field label={'Costo de Realización'}>
				<Input placeholder='Insertar Costo de Realización' />
			</Field>
			<Field label={'Moneda'}>
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
				label={'Descripción'}
				required
			>
				<Input placeholder='Insertar Descripcion u Observaciones' />
			</Field>
			<Field label={'Presupuesto'}>
				<Input placeholder='Anexar Presupuesto' />
			</Field>
			<Field label={'Factura'}>
				<Input placeholder='Anexar Factura' />
			</Field>
		</>
	);
};

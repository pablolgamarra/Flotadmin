import * as React from 'react';

import { Dropdown, Field, Input, InputOnChangeData, Radio, RadioGroup, useId } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react';
import { Currency } from '@/common/Currency';
import { FleetCard } from '@/models/FleetCard';

export interface VehicleDataFormProps {
	formState: VehicleRegisterFormState;
	setFormState: (arg0: VehicleRegisterFormState) => void;
}

export interface VehicleRegisterFormState {
	id?: number;
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

export const VehicleRegisterForm: React.FC<VehicleDataFormProps> = (props) => {
	const { formState, setFormState } = props;
	const id = useId('flotadmin-vehicle-register-form');

	//Event Handlers
	const handleInputChanges = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
		if (!ev.target.getAttribute('name')) {
			return;
		}

		const name = ev.target.getAttribute('name');

		setFormState({ ...formState, [name!!]: data });
	};

	return (
		<>
			<Field
				id={`plate-${id}`}
				label={'Chapa'}
				required
			>
				<Input
					name='plate-input'
					placeholder='Insertar Número de Chapa'
					value={formState.plate}
					onChange={handleInputChanges}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Marca'}
				required
			>
				<Input
					name='brand-input'
					placeholder='Insertar Marca del Vehículo'
					value={formState.brand}
					onChange={handleInputChanges}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Modelo'}
				required
			>
				<Input
					name='model-input'
					placeholder='Insertar Modelo del Vehículo'
					value={formState.model}
					onChange={handleInputChanges}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Año'}
				required
			>
				<Input
					name='fabricationYear-input'
					placeholder='Insertar Año de Fabricación del Vehículo'
					value={formState.modelYear?.toString()}
					onChange={handleInputChanges}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Fecha de Adquisición'}
			>
				<DatePicker
					placeholder='Insertar Fecha de Adquisición del Vehículo'
					value={formState.adquisitionDate}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Costo de Adquisición'}
			>
				<Input
					name='cost-input'
					placeholder='Insertar Costo de Adquisición del Vehículo'
					value={formState.adquisitionCost?.toString()}
					onChange={handleInputChanges}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Moneda de Adquisición'}
			>
				<RadioGroup
					name='currency-select'
					value={formState.costCurrency}
				/>
				<Radio
					key='a-c-local-radio-group'
					value='Guaranies'
					label='Guaraní'
				/>
				<Radio
					key='a-c-exchange-radio-group'
					value='Dolar'
					label='Dólar'
				/>
				<RadioGroup />
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Usuario'}
				required
			>
				<Input
					name='user-cbx'
					placeholder='Inserte o Seleccione...'
					value={formState.user}
				/>
			</Field>
			<Field
				id={`plate-${id}`}
				label={'Tarjeta Flota'}
			>
				<Dropdown
					name='fleetCard-dropdown'
					placeholder='Inserte o Seleccione...'
					// value={formState.fleetCard.Id}
				/>
			</Field>
		</>
	);
};

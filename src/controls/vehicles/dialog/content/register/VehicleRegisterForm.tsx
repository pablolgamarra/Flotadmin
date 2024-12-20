import * as React from 'react';

import { Currency } from '@/common/Currency';
import { InputField } from '@/controls/InputField';
import { moneyFormat } from '@/helpers/moneyFormat';
import { useVehicleForm } from '@/hooks/forms/useVehicleForm';
import { useFleetCardList } from '@/hooks/useFleetCardList';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { DatePicker } from '@fluentui/react';
import { Dropdown, Field, Option, Radio, RadioGroup, Spinner, useId } from '@fluentui/react-components';

export interface VehicleDataFormProps {
	fleetCardService: IFleetCardService;
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
	fleetCard: FleetCard | undefined;
}

export const VehicleRegisterForm: React.FC<VehicleDataFormProps> = (props) => {
	const { formState, setFormState, fleetCardService } = props;
	const id = useId('flotadmin-vehicle-register-form');

	//Get list of fleetCards
	const { isLoading, fleetCardList } = useFleetCardList(fleetCardService);

	//Get event handlers from custom hook
	const { handleInputChanges, handleDropdownChanges, handleRadioChanges } = useVehicleForm({
		formState,
		setFormState,
		fleetCardList,
	});

	return (
		<>
			<InputField
				id={`plate-${id}`}
				label={'Chapa'}
				required
				name='plate-input'
				placeholder='Insertar Número de Chapa'
				value={formState.plate}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`brand-${id}`}
				label={'Marca'}
				required
				name='brand-input'
				placeholder='Insertar Marca del Vehículo'
				value={formState.brand}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`model-${id}`}
				label={'Modelo'}
				required
				name='model-input'
				placeholder='Insertar Modelo del Vehículo'
				value={formState.model}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`fabricationYear-${id}`}
				label={'Año'}
				required
				name='fabricationYear-input'
				type='number'
				placeholder='Insertar Año de Fabricación del Vehículo'
				value={formState.modelYear?.toString()}
				onChange={handleInputChanges}
			/>
			<Field
				id={`adquisitionDate-${id}`}
				label={'Fecha de Adquisición'}
			>
				<DatePicker
					placeholder='Insertar Fecha de Adquisición del Vehículo'
					value={formState.adquisitionDate}
				/>
			</Field>
			<InputField
				id={`adquisitionCost-${id}`}
				label={'Costo de Adquisición'}
				name='cost-input'
				type='number'
				placeholder='Insertar Costo de Adquisición del Vehículo'
				value={formState.adquisitionCost?.toString()}
				onChange={handleInputChanges}
			/>
			<Field
				id={`adquisitionCurrency-${id}`}
				label={'Moneda de Adquisición'}
			>
				<RadioGroup
					name='currency-select'
					onChange={handleRadioChanges}
					value={formState.costCurrency}
				>
					<Radio
						key='a-c-local-radio-group'
						value={Currency.Guaranies}
						label='Guaranies'
					/>
					<Radio
						key='a-c-exchange-radio-group'
						value={Currency.Dolar}
						label='Dolar'
					/>
				</RadioGroup>
			</Field>
			<InputField
				id={`user-${id}`}
				label={'Usuario'}
				required
				name='user-cbx'
				type='text'
				placeholder='Inserte nombre del usuario del vehículo'
				value={formState.user}
				onChange={handleInputChanges}
			/>
			<Field
				id={`fleetCard-${id}`}
				label={'Tarjeta Flota'}
			>
				{isLoading ? (
					<Spinner
						label='Cargando Tarjetas'
						size='tiny'
					/>
				) : (
					<Dropdown
						name='fleetCard-dropdown'
						placeholder='Inserte o Seleccione...'
						value={formState.fleetCard?.Id.toString()}
						onOptionSelect={handleDropdownChanges}
					>
						{fleetCardList.map((card) => (
							<Option
								key={card.Id}
								text={card.CardNumber}
								value={card.Id.toString()}
							>
								Tarjeta: {card.CardNumber} - Asignado: {moneyFormat('es-PY', card.AssignedValue, 'Gs')}
							</Option>
						))}
					</Dropdown>
				)}
			</Field>
		</>
	);
};

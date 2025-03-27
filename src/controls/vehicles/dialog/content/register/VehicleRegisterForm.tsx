import * as React from 'react';

import { Currency } from '@/common/Currency';
import { DatePickerField } from '@/controls/DatePickerField';
import { InputField } from '@/controls/InputField';
import { RadioGroupField } from '@/controls/RadioGroupField';
import { moneyFormat } from '@/helpers/moneyFormat';
import { useVehicleForm } from '@/hooks/forms/useVehicleForm';
import { useFleetCardList } from '@/hooks/useFleetCardList';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/interfaces/IFleetCardService';
import { Dropdown, Field, Option, Skeleton, Switch, useId } from '@fluentui/react-components';

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
	fireExtinguisherExpirationDate: Date;
	insuratedValue: number;
	insuratedValueCurrency: Currency;
	insuranceExpirationDate: Date;
	vehicleLicenseExpirationDate: Date;
	dinatranExpirationDate: Date;
	isActive: boolean;
}

export const VehicleRegisterForm: React.FC<VehicleDataFormProps> = (props) => {
	const { formState, setFormState, fleetCardService } = props;
	const id = useId('flotadmin-vehicle-register-form');

	//Get list of fleetCards
	const { isLoading, fleetCardList } = useFleetCardList(fleetCardService);

	//Get event handlers from custom hook
	const {
		handleInputChanges,
		handleDropdownChanges,
		handleRadioChanges,
		handleDatePickerChanges,
		handleSwitchChanges,
	} = useVehicleForm({
		formState,
		setFormState,
		fleetCardList,
	});

	return (
		<>
			<Switch
				id={`isActive-${id}`}
				checked={formState?.isActive}
				label={'Activo'}
				onChange={handleSwitchChanges}
			/>
			<InputField
				id={`plate-${id}`}
				label={'Chapa'}
				required
				name='plate'
				placeholder='Insertar Número de Chapa'
				value={formState.plate || ''}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`brand-${id}`}
				label={'Marca'}
				required
				name='brand'
				placeholder='Insertar Marca del Vehículo'
				value={formState.brand || ''}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`model-${id}`}
				label={'Modelo'}
				required
				name='model'
				placeholder='Insertar Modelo del Vehículo'
				value={formState.model || ''}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`fabricationYear-${id}`}
				label={'Año'}
				required
				name='modelYear'
				type='number'
				placeholder='Insertar Año de Fabricación del Vehículo'
				value={formState.modelYear || ''}
				onChange={handleInputChanges}
			/>
			<DatePickerField
				id={`adquisitionDate-${id}`}
				label={'Fecha de Adquisición'}
				name='adquisitionDate'
				placeholder='Insertar Fecha de Adquisición del Vehículo'
				value={formState.adquisitionDate ? new Date(formState.adquisitionDate) : undefined}
				onSelectDate={handleDatePickerChanges}
			/>
			<InputField
				id={`adquisitionCost-${id}`}
				label={'Costo de Adquisición'}
				name='adquisitionCost'
				type='number'
				placeholder='Insertar Costo de Adquisición del Vehículo'
				value={formState.adquisitionCost || ''}
				onChange={handleInputChanges}
			/>
			<RadioGroupField
				id={`adquisitionCurrency-${id}`}
				label={'Moneda de Adquisición'}
				name='costCurrency'
				options={[
					{
						value: Currency.Guaranies.toString(),
						label: 'Guaranies',
					},
					{
						value: Currency.Dolar.toString(),
						label: 'Dolar',
					},
				]}
				value={formState.insuratedValueCurrency || ''}
				onChange={handleRadioChanges}
			/>
			<InputField
				id={`user-${id}`}
				label={'Usuario'}
				required
				name='user'
				type='text'
				placeholder='Inserte nombre del usuario del vehículo'
				value={formState.user || ''}
				onChange={handleInputChanges}
			/>
			<Field
				id={`fleetCard-${id}`}
				label={'Tarjeta Flota'}
			>
				{isLoading ? (
					<>
						<Skeleton
							animation='pulse'
							appearance='opaque'
							className='tw-h-8 tw-w-full tw-mb-2 tw-bg-gray-300'
						/>
						<Skeleton
							animation='pulse'
							appearance='opaque'
							className='tw-h-8 tw-w-full tw-bg-gray-300'
						/>
					</>
				) : (
					<Dropdown
						name='fleetCard-dropdown'
						placeholder='Inserte o Seleccione...'
						value={
							formState.fleetCard
								? `Tarjeta ${formState.fleetCard?.Id} - ${
										formState.fleetCard?.CardNumber
								} - Monto Asignado: ${moneyFormat(
										'es-PY',
										formState.fleetCard?.AssignedValue ?? 0,
										'Gs',
								)} `
								: ''
						}
						onOptionSelect={handleDropdownChanges}
					>
						{fleetCardList.map((card) => (
							<Option
								key={card.Id}
								text={`Tarjeta ${card.Id} - ${card.CardNumber} - Monto Asignado: ${moneyFormat(
									'es-PY',
									card.AssignedValue,
									'Gs',
								)}`}
								value={card.Id.toString()}
							>
								Tarjeta {card.Id} - {card.CardNumber} - Monto Asignado:{' '}
								{moneyFormat('es-PY', card.AssignedValue, 'Gs')}
							</Option>
						))}
					</Dropdown>
				)}
			</Field>
			<InputField
				id={`insuratedValue-${id}`}
				label={'Valor Asegurado'}
				name='insuratedValue'
				type='number'
				placeholder='Insertar Valor Asegurado del Vehículo'
				value={formState.insuratedValue || ''}
				onChange={handleInputChanges}
			/>
			<RadioGroupField
				id={`insuratedValueCurrency-${id}`}
				label={'Moneda de Valor Asegurado'}
				name='insuratedValueCurrency'
				options={[
					{
						value: Currency.Guaranies.toString(),
						label: 'Guaranies',
					},
					{
						value: Currency.Dolar.toString(),
						label: 'Dolar',
					},
				]}
				value={formState.insuratedValueCurrency || ''}
				onChange={handleRadioChanges}
			/>
			<DatePickerField
				id={`dinatranExpirationDate-${id}`}
				label={'Fecha de Vencimiento Dinatran'}
				name='dinatranExpirationDate'
				placeholder='Insertar Fecha de Vencimiento Dinatran'
				value={formState.dinatranExpirationDate ? new Date(formState.dinatranExpirationDate) : undefined}
				onSelectDate={handleDatePickerChanges}
			/>
			<DatePickerField
				id={`fireExtinguisherExpirationDate-${id}`}
				label={'Fecha de Vencimiento Extintor'}
				name='fireExtinguisherExpirationDate'
				placeholder='Insertar Fecha de Vencimiento Dinatran'
				value={
					formState.fireExtinguisherExpirationDate
						? new Date(formState.fireExtinguisherExpirationDate)
						: undefined
				}
				onSelectDate={handleDatePickerChanges}
			/>
			<DatePickerField
				id={`vehicleLicenseExpirationDate-${id}`}
				label={'Fecha de Vencimiento de Habilitación'}
				name='vehicleLicenseExpirationDate'
				placeholder='Insertar Fecha de Vencimiento de Habilitación'
				value={
					formState.vehicleLicenseExpirationDate
						? new Date(formState.vehicleLicenseExpirationDate)
						: undefined
				}
				onSelectDate={handleDatePickerChanges}
			/>
			<DatePickerField
				id={`insuranceExpirationDate-${id}`}
				label={'Fecha de Vencimiento de Seguro'}
				name='insuranceExpirationDate'
				placeholder='Insertar Fecha de Vencimiento del Seguro'
				value={formState.insuranceExpirationDate ? new Date(formState.insuranceExpirationDate) : undefined}
				onSelectDate={handleDatePickerChanges}
			/>
		</>
	);
};

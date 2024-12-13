import * as React from 'react';

import { Currency } from '@/common/Currency';
import { InputField } from '@/controls/InputField';
import { moneyFormat } from '@/helpers/moneyFormat';
import { useFleetCardList } from '@/hooks/useFleetCardList';
import { FleetCard } from '@/models/FleetCard';
import { IFleetCardService } from '@/services/business/IFleetCardService';
import { DatePicker } from '@fluentui/react';
import {
	Dropdown,
	Field,
	InputOnChangeData,
	Option,
	OptionOnSelectData,
	Radio,
	RadioGroup,
	RadioGroupOnChangeData,
	SelectionEvents,
	Spinner,
	useId,
} from '@fluentui/react-components';

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

	//Event Handlers
	const handleInputChanges = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
		if (!ev.target.getAttribute('name')) {
			return;
		}

		const name = ev.target.getAttribute('name');

		setFormState({ ...formState, [name!!]: data });
	};

	const handleDropdownChanges = (event: SelectionEvents, data: OptionOnSelectData): void => {
		setFormState({
			...formState,
			fleetCard:
				fleetCardList.find((card) => card.Id === (data.optionValue ? Number.parseInt(data.optionValue) : -1)) ||
				undefined,
		});
	};

	const handleRadioChanges = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
		setFormState({
			...formState,
			costCurrency: data.value as Currency,
		});
	};

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
				id={`plate-${id}`}
				label={'Marca'}
				required
				name='brand-input'
				placeholder='Insertar Marca del Vehículo'
				value={formState.brand}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`plate-${id}`}
				label={'Modelo'}
				required
				name='model-input'
				placeholder='Insertar Modelo del Vehículo'
				value={formState.model}
				onChange={handleInputChanges}
			/>
			<InputField
				id={`plate-${id}`}
				label={'Año'}
				required
				name='fabricationYear-input'
				type='number'
				placeholder='Insertar Año de Fabricación del Vehículo'
				value={formState.modelYear?.toString()}
				onChange={handleInputChanges}
			/>
			<Field
				id={`plate-${id}`}
				label={'Fecha de Adquisición'}
			>
				<DatePicker
					placeholder='Insertar Fecha de Adquisición del Vehículo'
					value={formState.adquisitionDate}
				/>
			</Field>
			<InputField
				id={`plate-${id}`}
				label={'Costo de Adquisición'}
				name='cost-input'
				type='number'
				placeholder='Insertar Costo de Adquisición del Vehículo'
				value={formState.adquisitionCost?.toString()}
				onChange={handleInputChanges}
			/>
			<Field
				id={`plate-${id}`}
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
				id={`plate-${id}`}
				label={'Usuario'}
				required
				name='user-cbx'
				type='text'
				placeholder='Inserte nombre del usuario del vehículo'
				value={formState.user}
				onChange={handleInputChanges}
			/>
			<Field
				id={`plate-${id}`}
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

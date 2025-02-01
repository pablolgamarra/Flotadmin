import * as React from 'react';

import { Currency } from '@/common/Currency';
import { useInteractionForm } from '@/hooks/forms/useInteractionForm';
import { useInterventionTypesList } from '@/hooks/useInterventionTypesList';
import { InterventionType } from '@/models/InterventionType';
import { Vehicle } from '@/models/Vehicle';
import { IInterventionTypeService } from '@/services/business/IInterventionTypeService';
import { DatePicker } from '@fluentui/react';
import { Dropdown, Field, Option, Radio, RadioGroup, Spinner } from '@fluentui/react-components';
import { FilePickerField } from '../FilePickerField';
import { InputField } from '../InputField';

export interface InteractionRegisterFormProps {
	interventionTypesService: IInterventionTypeService;
	formState: InteractionRegisterFormState;
	setFormState: (arg0: InteractionRegisterFormState) => void;
}

export interface InteractionRegisterFormState {
	id?: number;
	vehicle: Vehicle;
	realizationDate: Date;
	interventionType: InterventionType | undefined;
	kilometers: number;
	cost: number;
	costCurrency: Currency;
	description: string;
	budget?: File;
	invoice?: File;
}

export const InteractionDataForm: React.FC<InteractionRegisterFormProps> = (props) => {
	const { interventionTypesService, formState, setFormState } = props;
	const { isLoading, interventionTypesList } = useInterventionTypesList(interventionTypesService);

	const {
		handleRadioChanges,
		handleInputChanges,
		handleDropdownChanges,
		handleFilePickerChanges,
		handleDatePickerChanges,
	} = useInteractionForm({
		interventionTypesList,
		formState,
		setFormState,
	});

	return (
		<>
			<Field label={'Fecha de Realización'}>
				<DatePicker
					placeholder='Insertar Fecha de Realización'
					value={formState.realizationDate}
					onSelectDate={handleDatePickerChanges}
				/>
			</Field>
			{isLoading ? (
				<Spinner
					label='Cargando Tipos de Intervencion...'
					size='tiny'
				/>
			) : (
				<Field label={'Tipo de Intervencion'}>
					<Dropdown
						name='interventionType'
						placeholder='Seleccione...'
						value={formState.interventionType?.Description || ''}
						onOptionSelect={handleDropdownChanges}
					>
						{interventionTypesList.map((type: InterventionType) => (
							<Option key={type.Id}>{type.Description}</Option>
						))}
					</Dropdown>
				</Field>
			)}
			<InputField
				name='kilometers'
				label={'Kilometraje del Vehículo'}
				type='number'
				required
				placeholder='Insertar Kilometraje al momento de realización'
				value={formState.kilometers || ''}
				onChange={handleInputChanges}
			/>
			<InputField
				name='cost'
				type='number'
				label={'Costo de Realización'}
				placeholder='Insertar Costo de Realización'
				value={formState.cost || ''}
				onChange={handleInputChanges}
			/>
			<Field label={'Moneda'}>
				<RadioGroup
					name='costCurrency'
					value={formState.costCurrency || ''}
					onChange={handleRadioChanges}
				>
					<Radio
						key='a-c-local-radio-group'
						value={Currency.Guaranies}
						label={Currency.Guaranies.toString()}
					/>
					<Radio
						key='a-c-exchange-radio-group'
						value={Currency.Dolar}
						label={Currency.Dolar.toString()}
					/>
				</RadioGroup>
			</Field>
			<InputField
				name='description'
				label={'Descripción'}
				type='text'
				required
				placeholder='Insertar Descripcion u Observaciones'
				value={formState.description || ''}
				onChange={handleInputChanges}
			/>
			<FilePickerField
				name='budget'
				label={'Presupuesto'}
				placeholder='Anexar Presupuesto'
				value={formState.budget}
				onChange={handleFilePickerChanges}
			/>
			<FilePickerField
				name='invoice'
				label={'Factura'}
				placeholder='Anexar Factura'
				value={formState.invoice}
				onChange={handleFilePickerChanges}
			/>
		</>
	);
};

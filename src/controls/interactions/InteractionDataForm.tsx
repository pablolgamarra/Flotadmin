import * as React from 'react';

import { Currency } from '@/common/Currency';
import { useInteractionForm } from '@/hooks/forms/useInteractionForm';
import { useInterventionTypesList } from '@/hooks/useInterventionTypesList';
import { InterventionType } from '@/models/InterventionType';
import { IInterventionTypeService } from '@/services/business/IInterventionTypeService';
import { DatePicker } from '@fluentui/react';
import { Dropdown, Field, Option, Radio, RadioGroup, Spinner } from '@fluentui/react-components';
import { InputField } from '../InputField';

export interface InteractionRegisterFormProps {
	interventionTypesService: IInterventionTypeService;
	formState: InteractionRegisterFormState;
	setFormState: (arg0: InteractionRegisterFormState) => void;
}

export interface InteractionRegisterFormState {
	realizationDate: Date;
	interventionType: InterventionType | undefined;
	kilometers: number;
	cost: number;
	costCurrency: Currency;
	description: string;
	budget: string;
	invoice: string;
}

export const InteractionDataForm: React.FC<InteractionRegisterFormProps> = (props) => {
	const { interventionTypesService, formState, setFormState } = props;
	const { isLoading, interventionTypesList } = useInterventionTypesList(interventionTypesService);

	const { handleRadioChanges, handleInputChanges, handleDropdownChanges } = useInteractionForm({
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
				/>
			</Field>
			{isLoading ? (
				<Spinner
					label='Cargando Tipos de Intervencion...'
					size='tiny'
				/>
			) : (
				<Field label={'Tipo de Interacción'}>
					<Dropdown
						name='interventionType'
						placeholder='Seleccione...'
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
				required
				placeholder='Insertar Kilometraje al momento de realización'
				value={formState.kilometers}
				onChange={handleInputChanges}
			/>
			<InputField
				name='cost'
				label={'Costo de Realización'}
				placeholder='Insertar Costo de Realización'
				value={formState.cost}
				onChange={handleInputChanges}
			/>
			<Field label={'Moneda'}>
				<RadioGroup
					name='costCurrency'
					value={formState.costCurrency}
					onChange={handleRadioChanges}
				>
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
				</RadioGroup>
			</Field>
			<InputField
				label={'Descripción'}
				required
				placeholder='Insertar Descripcion u Observaciones'
				value={formState.description}
				onChange={handleInputChanges}
			/>
			<InputField
				label={'Presupuesto'}
				placeholder='Anexar Presupuesto'
				value={formState.budget}
				onChange={handleInputChanges}
			/>
			<InputField
				label={'Factura'}
				placeholder='Anexar Factura'
				value={formState.invoice}
				onChange={handleInputChanges}
			/>
		</>
	);
};

import * as React from 'react';

import { InputField } from '@/controls/InputField';
import { useFleetCardForm } from '@/hooks/forms/useFleetCardForm';
import { useId } from '@fluentui/react-utilities';

export interface FleetCardDataFormProps {
	formState: FleetCardRegisterFormState;
	setFormState: (arg0: FleetCardRegisterFormState) => void;
}

export interface FleetCardRegisterFormState {
	id?: number;
	cardNumber: string;
	assignedValue: number;
}

export const FleetCardRegisterForm: React.FC<FleetCardDataFormProps> = (props) => {
	const { formState, setFormState } = props;
	const id = useId('flotadmin-fleetCard-register-form');
	const { handleInputChanges } = useFleetCardForm({ formState, setFormState });

	return (
		<>
			<InputField
				id={`${id}-cardNumber`}
				name='cardNumber'
				label='Número de Tarjeta'
				value={formState.cardNumber}
				type='number'
				onChange={handleInputChanges}
			/>
			<InputField
				id={`${id}-assignedValue`}
				name='assignedValue'
				label={'Monto Asignado'}
				value={formState.assignedValue?.toString()}
				type='number'
				onChange={handleInputChanges}
			/>
		</>
	);
};

import * as React from 'react';

import { InputField } from '@/controls/InputField';
import { useInterventionTypeForm } from '@/hooks/forms/useInterventionTypeForm';
import { Checkbox, Field, useId } from '@fluentui/react-components';

export interface InterventionTypeRegisterFormState {
	id: number;
	description: string;
	observations: string;
	//active:boolean;
}
export interface InterventionTypeRegisterFormProps {
	formState: InterventionTypeRegisterFormState;
	setFormState: (arg0: InterventionTypeRegisterFormState) => void;
}

export const InterventionTypeRegisterForm: React.FC<InterventionTypeRegisterFormProps> = (props) => {
	const { formState, setFormState } = props;
	const id = useId('interventionTypeRegisterForm');

	const { handleInputChanges } = useInterventionTypeForm({ formState, setFormState });

	return (
		<>
			<InputField
				id={`${id}-description`}
				name='description'
				label='Descripción'
				placeholder='Insertar Descripcion'
				value={formState?.description}
				type='text'
				onChange={handleInputChanges}
			/>
			<InputField
				id={`${id}-observations`}
				name='observation'
				label='Observaciones'
				placeholder='Insertar Observaciones'
				value={formState?.observations}
				type='text'
				onChange={handleInputChanges}
			/>
			<Field label={'Activo'}>
				<Checkbox name='active' /*checked={} label={interventionType?.Active}*/ />
			</Field>
		</>
	);
};

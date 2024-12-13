import * as React from 'react';

import { Checkbox, Field, Input } from '@fluentui/react-components';

export interface InterventionTypeRegisterFormProps {}

export const InterventionTypeRegisterForm: React.FC<InterventionTypeRegisterFormProps> = (props) => {
	return (
		<>
			<Field label={'Descripción'}>
				<Input placeholder='Insertar Descripcion' />
			</Field>
			<Field label={'Activo'}>
				<Checkbox /*checked={} label={interventionType?.Active}*/ />
			</Field>
		</>
	);
};

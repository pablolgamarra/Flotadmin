import * as React from 'react';
import { Checkbox, Field, Input } from '@fluentui/react-components';
import { InterventionType } from '@/models/InterventionType';
export interface IInterventionTypeDataFields {
	interventionType?: InterventionType;
}

export const InterventionTypeDataFields: React.FC<
	IInterventionTypeDataFields
> = (props) => {
	const { interventionType } = props;

	return (
		<>
			<Field label={'Descripción'}>
				<Input value={interventionType?.Description} />
			</Field>
			<Field label={'Activo'}>
				<Checkbox /*checked={} label={interventionType?.Active}*/ />
			</Field>
		</>
	);
};

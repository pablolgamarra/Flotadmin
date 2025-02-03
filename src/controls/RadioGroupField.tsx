import * as React from 'react';

import { Field, Radio, RadioGroup, RadioGroupOnChangeData } from '@fluentui/react-components';

export interface RadioGroupFieldProps {
	id: string;
	label: string;
	name: string;
	value: string;
	onChange: (name: string, value: RadioGroupOnChangeData) => void;
	options: { value: string; label: string }[];
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ id, label, name, value, onChange, options }) => {
	return (
		<Field
			id={id}
			label={label}
		>
			<RadioGroup
				name={name}
				onChange={(e, data) => onChange(name, data)}
				value={value || ''}
			>
				{options.map((option) => (
					<Radio
						key={option.value}
						value={option.value}
						label={option.label}
					/>
				))}
			</RadioGroup>
		</Field>
	);
};

import * as React from 'react';

import { DatePicker } from '@fluentui/react';
import { Field } from '@fluentui/react-components';

export interface DatePickerFieldProps {
	id: string;
	name: string;
	label: string;
	placeholder: string;
	value: Date | undefined;
	onSelectDate: (name: string, date: Date | null | undefined) => void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
	id,
	name,
	label,
	placeholder,
	value,
	onSelectDate,
}) => {
	return (
		<Field
			id={id}
			label={label}
		>
			<DatePicker
				onSelectDate={(date) => onSelectDate(name, date)}
				placeholder={placeholder}
				value={value ? new Date(value) : undefined}
			/>
		</Field>
	);
};

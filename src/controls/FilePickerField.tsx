import { Button, Field, Label } from '@fluentui/react-components';
import * as React from 'react';

export interface FilePickerProps {
	id?: string;
	name?: string;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	value?: File;
	classname?: string;
	label?: string | typeof Label;
}

export const FilePickerField: React.FC<FilePickerProps> = (props) => {
	const { id, placeholder, name, value, onChange, classname, label } = props;

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const triggerFileSelect = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			<Field className={`tw-space-y-1 ${classname}`}>
				{typeof label === 'string' ? <Label htmlFor={id}>{label}</Label> : label}
				<div className='tw-flex tw-items-center tw-space-x-3 tw-border tw-border-gray-300 tw-bg-white tw-rounded-md tw-px-3 tw-py-1 tw-shadow-sm focus-within:tw-ring-2 focus-within:tw-ring-blue-500'>
					<span className='tw-flex-grow tw-text-gray-600'>
						{value ? value.name : placeholder || 'Seleccione un archivo'}
					</span>
					<Button
						onClick={triggerFileSelect}
						className='tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700'
					>
						Seleccionar
					</Button>
				</div>
				<input
					id={id}
					name={name}
					type='file'
					ref={fileInputRef}
					onChange={onChange}
					className='tw-hidden'
				/>
			</Field>
		</>
	);
};

import * as React from 'react';

import { InputField } from '@/controls/InputField';
import { useFleetCardForm } from '@/hooks/forms/useFleetCardForm';
import { useDataContext } from '@/hooks/useDataContext';
import { useVehicleList } from '@/hooks/useVehicleList';
import { Vehicle } from '@/models/Vehicle';
import { Dropdown, Field, Option, Skeleton } from '@fluentui/react-components';
import { useId } from '@fluentui/react-utilities';

export interface FleetCardDataFormProps {
	formState: FleetCardRegisterFormState;
	setFormState: (arg0: FleetCardRegisterFormState) => void;
}

export interface FleetCardRegisterFormState {
	id?: number;
	cardNumber: string;
	assignedValue: number;
	isActive: boolean;
	assignedVehicle?: Vehicle;
}

export const FleetCardRegisterForm: React.FC<FleetCardDataFormProps> = (props) => {
	const { formState, setFormState } = props;

	const { vehiclesService } = useDataContext();

	const id = useId('flotadmin-fleetCard-register-form');
	const { isLoading, vehicleList } = useVehicleList(vehiclesService);
	const { handleInputChanges, handleDropdownChanges } = useFleetCardForm({ formState, setFormState, vehicleList });

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
			<Field
				id={`vehicle-${id}`}
				label={'Vehiculo Asignado'}
			>
				{isLoading ? (
					<>
						<Skeleton
							animation='pulse'
							appearance='opaque'
							className='tw-h-8 tw-w-full tw-mb-2 tw-bg-gray-300'
						/>
						<Skeleton
							animation='pulse'
							appearance='opaque'
							className='tw-h-8 tw-w-full tw-bg-gray-300'
						/>
					</>
				) : (
					<Dropdown
						name='vehicleAssigned-dropdown'
						placeholder='Inserte o Seleccione...'
						value={
							formState.assignedVehicle
								? `#${formState.assignedVehicle.Id} - ${formState.assignedVehicle.Model} - ${formState.assignedVehicle.Plate}`
								: ''
						}
						onOptionSelect={handleDropdownChanges}
					>
						{vehicleList.map((vehicle) => (
							<Option
								key={vehicle.Id}
								text={`#${vehicle.Id} - ${vehicle.Model} - ${vehicle.Plate}`}
								value={vehicle.Id.toString()}
							>
								{vehicle.Id} - {vehicle.Model} - {vehicle.Plate}
							</Option>
						))}
					</Dropdown>
				)}
			</Field>
		</>
	);
};

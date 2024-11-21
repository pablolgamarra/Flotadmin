import * as React from 'react';

import { VehicleRegisterForm } from '@vehiclesList/components/vehicles/VehicleRegisterForm';
import { CustomDialog } from '../common/CustomDialog';

export interface VehicleRegisterProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
}

export const VehicleRegister: React.FC<
	React.PropsWithChildren<VehicleRegisterProps>
> = (props: React.PropsWithChildren<VehicleRegisterProps>) => {
	const { open, setOpen, triggerButton, children } = props;

	return (
		<>
			{triggerButton}
			<CustomDialog
				open={open}
				setOpen={setOpen}
				title='Insertar Nuevo Vehículo'
				primaryButtonText='Guardar'
				secondaryButtonText='Cancelar'
				trigger={children as HTMLButtonElement}
			>
				<VehicleRegisterForm />
			</CustomDialog>
		</>
	);
};

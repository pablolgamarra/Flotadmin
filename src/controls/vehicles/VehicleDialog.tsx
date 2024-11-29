import * as React from 'react';

import { VehicleDataForm } from '@/controls/vehicles/VehicleDataForm';
import { CustomDialog } from '@/controls/CustomDialog';

export interface VehicleDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
}

export const VehicleDialog: React.FC<
	React.PropsWithChildren<VehicleDialogProps>
> = (props: React.PropsWithChildren<VehicleDialogProps>) => {
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
				<VehicleDataForm />
			</CustomDialog>
		</>
	);
};

import * as React from 'react';

import { Slot } from '@fluentui/react-components';
import { VehicleRegisterForm } from '@/controls/vehicles/VehicleRegisterForm';
import { CustomDialog } from '@/controls/CustomDialog';
import { DialogMode } from '@/common/DialogMode';
import { VehicleDataVisualizer } from './VehicleDataVisualizer';
import { Vehicle } from '@/models/Vehicle';

export interface VehicleDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	vehicle?: Vehicle;
	action?: Slot<'div'>;
}

export const VehicleDialog: React.FC<
	React.PropsWithChildren<VehicleDialogProps>
> = (props: React.PropsWithChildren<VehicleDialogProps>) => {
	const {
		open,
		setOpen,
		triggerButton,
		title,
		action,
		mode,
		vehicle,
		children,
	} = props;

	const switchForm = (mode: DialogMode, vehicle?: Vehicle) => {
		switch (mode) {
			case DialogMode.Show:
				return <VehicleDataVisualizer vehicle={vehicle} />;
			case DialogMode.Edit:
				return <VehicleRegisterForm vehicle={vehicle} />;
		}
	};

	return (
		<>
			{triggerButton}
			<CustomDialog
				open={open}
				setOpen={setOpen}
				title={title}
				action={action}
				primaryButtonText='Guardar'
				secondaryButtonText='Cancelar'
				trigger={children as HTMLButtonElement}
			>
				{switchForm(mode, vehicle)}
			</CustomDialog>
		</>
	);
};

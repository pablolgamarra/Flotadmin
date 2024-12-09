import * as React from 'react';

import { Slot } from '@fluentui/react-components';
import { CustomDialog } from '@/controls/CustomDialog';
import { DialogMode } from '@/common/DialogMode';
import { FleetCard } from '@/models/FleetCard';
import { FleetCardDataVisualizer } from './content/visualize/FleetCardDataVisualizer';
import { FleetCardRegisterForm } from './content/register/FleetCardRegisterForm';

export interface FleetCardDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	fleetCard?: FleetCard;
	action?: Slot<'div'>;
}

export const FleetCardDialog: React.FC<
	React.PropsWithChildren<FleetCardDialogProps>
> = (props: React.PropsWithChildren<FleetCardDialogProps>) => {
	const {
		open,
		setOpen,
		triggerButton,
		title,
		action,
		mode,
		fleetCard,
		children,
	} = props;

	const switchContent = (mode: DialogMode, fleetCard?: FleetCard) => {
		switch (mode) {
			case DialogMode.Show:
				return <FleetCardDataVisualizer fleetCard={fleetCard} />;
			case DialogMode.Edit:
				return <FleetCardRegisterForm fleetCard={fleetCard} />;
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
				{switchContent(mode, fleetCard)}
			</CustomDialog>
		</>
	);
};

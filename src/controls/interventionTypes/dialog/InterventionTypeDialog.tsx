import * as React from 'react';

import { DialogMode } from '@/common/DialogMode';
import { CustomDialog } from '@/controls/CustomDialog';
import { InterventionType } from '@/models/InterventionType';
import { Slot } from '@fluentui/react-components';
import { InterventionTypeRegisterForm } from './content/register/InterventionTypeRegisterForm';
import { InterventionTypeDataVisualizer } from './content/visualize/InterventionTypeDataVisualizer';

export interface InterventionTypeDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	interventionType?: InterventionType;
	action?: Slot<'div'>;
}

export const InterventionTypeDialog: React.FC<React.PropsWithChildren<InterventionTypeDialogProps>> = (
	props: React.PropsWithChildren<InterventionTypeDialogProps>,
) => {
	const { open, setOpen, triggerButton, title, action, mode, interventionType, children } = props;

	const switchContent = (mode: DialogMode, interventionType?: InterventionType) => {
		switch (mode) {
			case DialogMode.Show:
				return <InterventionTypeDataVisualizer interventionType={interventionType} />;
			case DialogMode.Edit:
				return <InterventionTypeRegisterForm />;
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
				{switchContent(mode, interventionType)}
			</CustomDialog>
		</>
	);
};

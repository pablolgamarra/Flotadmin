import * as React from 'react';

import { Slot } from '@fluentui/react-components';
import { CustomDialog } from '@/controls/CustomDialog';
import { DialogMode } from '@/common/DialogMode';
import { InterventionTypeRegisterForm } from './content/register/InterventionTypeRegisterForm';
import { InterventionType } from '@/models/InterventionType';
import { InterventionTypeDataVisualizer } from './content/visualize/InterventionTypeDataVisualizer';

export interface InterventionTypeProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
	title: string;
	mode: DialogMode;
	interventionType?: InterventionType;
	action?: Slot<'div'>;
}

export const InterventionTypeDialog: React.FC<
	React.PropsWithChildren<InterventionTypeProps>
> = (props: React.PropsWithChildren<InterventionTypeProps>) => {
	const {
		open,
		setOpen,
		triggerButton,
		title,
		action,
		mode,
		interventionType,
		children,
	} = props;

	const switchContent = (
		mode: DialogMode,
		interventionType?: InterventionType,
	) => {
		switch (mode) {
			case DialogMode.Show:
				return (
					<InterventionTypeDataVisualizer
						interventionType={interventionType}
					/>
				);
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

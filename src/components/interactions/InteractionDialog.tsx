import * as React from 'react';
import { CustomDialog } from '../common/CustomDialog';
import { InteractionDataForm } from './InteractionDataForm';

export interface InteractionDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	triggerButton: React.ReactElement;
}

export const InteractionDialog: React.FC<
	React.PropsWithChildren<InteractionDialogProps>
> = (props) => {
	const { open, setOpen, triggerButton, children } = props;

	return (
		<>
			{triggerButton}
			<CustomDialog
				open={open}
				setOpen={setOpen}
				primaryButtonText='Guardar'
				secondaryButtonText='Cancelar'
				title='Registrar Interacción'
				trigger={children as HTMLButtonElement}
			>
				<InteractionDataForm />
			</CustomDialog>
		</>
	);
};

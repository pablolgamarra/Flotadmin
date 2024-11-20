import * as React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	DialogTrigger,
} from '@fluentui/react-components';

import '../../../../assets/dist/tailwind.css';

export interface VehiclesDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	title: string;
	trigger: HTMLButtonElement;
	secondaryButtonText: string;
	primaryButtonText: string;
}

export const VehiclesDialog: React.FC<
	React.PropsWithChildren<VehiclesDialogProps>
> = (props: React.PropsWithChildren<VehiclesDialogProps>) => {
	const {
		children,
		open,
		setOpen,
		title,
		secondaryButtonText,
		primaryButtonText,
	} = props;

	return (
		<Dialog
			open={open}
			onOpenChange={(event, data) => setOpen(data.open)}
		>
			<DialogSurface className='tw-bg-slate-50'>
				<DialogBody>
					<DialogTitle>{title}</DialogTitle>
					<DialogContent>{children}</DialogContent>
					<DialogActions>
						<DialogTrigger>
							<Button appearance='secondary'>
								{secondaryButtonText}
							</Button>
						</DialogTrigger>
						<DialogTrigger>
							<Button appearance='primary'>
								{primaryButtonText}
							</Button>
						</DialogTrigger>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
};

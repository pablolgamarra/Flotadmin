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
	FluentProvider,
	Slot,
	webLightTheme,
} from '@fluentui/react-components';

import '../../assets/dist/tailwind.css';

export interface CustomDialogProps {
	open: boolean;
	setOpen(arg0: boolean): void;
	title: string;
	action?: Slot<'div'>;
	trigger: HTMLButtonElement;
	secondaryButtonText: string;
	primaryButtonText: string;
}

export const CustomDialog: React.FC<
	React.PropsWithChildren<CustomDialogProps>
> = (props: React.PropsWithChildren<CustomDialogProps>) => {
	const {
		children,
		open,
		setOpen,
		title,
		action,
		secondaryButtonText,
		primaryButtonText,
	} = props;

	return (
		<Dialog
			open={open}
			onOpenChange={(event, data) => setOpen(data.open)}
			modalType='alert'
		>
			<FluentProvider theme={webLightTheme}>
				<DialogSurface className='tw-bg-slate-50'>
					<DialogBody>
						<DialogTitle action={action}>{title}</DialogTitle>
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
			</FluentProvider>
		</Dialog>
	);
};

import * as React from 'react';

//Types
import { Vehicle } from '@vehiclesList/types';

//Components
import {
	Button,
	Title1,
	Field,
	IdPrefixProvider,
	SearchBox,
	useId,
} from '@fluentui/react-components';
import { AddCircle28Regular } from '@fluentui/react-icons';
import VehicleCard from '@vehiclesList/components/vehicles/VehicleCard';
import { VehicleDialog } from '@vehiclesList/components/vehicles/VehicleDialog';

//Styles
import '../../../../assets/dist/tailwind.css';

//TODO: Agregar queries a DB

export interface AppProps {
	vehicles: Vehicle[];
}

export const App: React.FC<AppProps> = (props) => {
	const id = useId('App');
	const { vehicles } = props;

	const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

	return (
		<IdPrefixProvider value='Flotadmin'>
			<div className='tw-w-8/12 tw-mx-auto'>
				<section className='tw-flex tw-flex-col tw-w-full tw-mb-2'>
					<Title1
						as='h2'
						align='center'
						className='tw-mt-8'
					>
						Todos los Vehículos
					</Title1>
					<Field className='tw-flex tw-mt-6'>
						<SearchBox
							className='tw-max-w-none tw-w-10/12 tw-mr-4'
							placeholder='Buscar Vehículos'
						/>
						<VehicleDialog
							open={dialogOpen}
							setOpen={setDialogOpen}
							triggerButton={
								<Button
									className='tw-w-2/12'
									appearance='primary'
									icon={<AddCircle28Regular />}
									onClick={() => {
										setDialogOpen(!dialogOpen);
									}}
								>
									Nuevo Vehiculo
								</Button>
							}
						/>
					</Field>
				</section>
				<div
					id='cards-container'
					className='tw-grid tw-grid-cols-3 tw-grid-flow-row tw-justify-around tw-justify-items-center tw-h-screen tw-overflow-auto tw-mt-6 tw-bg-[#E0F7FA] tw-py-4 tw-gap-4'
				>
					{vehicles.map((item: Vehicle) => (
						<VehicleCard
							key={`${id}-${item.Plate}`}
							vehicle={item}
							className='tw-w-fit hover:tw-shadow-sm tw-h-fit'
						/>
					))}
				</div>
			</div>
		</IdPrefixProvider>
	);
};

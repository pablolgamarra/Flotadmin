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
import VehicleCard from '@vehiclesList/components/VehicleCard';

//Styles
import '../../../../assets/dist/tailwind.css';

//TODO: Agregar queries a DB

export interface AppProps {
	vehicles: Vehicle[];
}

export const App: React.FC<AppProps> = (props) => {
	const id = useId('App');
	const { vehicles } = props;

	return (
		<IdPrefixProvider value='Flotadmin'>
			<div className='tw-flex tw-flex-col tw-w-10/12 tw-mx-auto'>
				<Title1 className='tw-mt-8 tw-self-center'>
					Todos los Vehículos
				</Title1>
				<Field className='tw-flex tw-mt-6'>
					<SearchBox
						className='tw-max-w-none tw-w-10/12 tw-mr-4'
						placeholder='Buscar Vehículos'
					/>
					<Button
						className='tw-w-2/12'
						appearance='primary'
						icon={<AddCircle28Regular />}
					>
						Nuevo Vehiculo
					</Button>
				</Field>
				<div
					id='cards-container'
					className='tw-grid tw-grid-cols-3 tw-grid-flow-col tw-gap-8 tw-justify-between tw-justify-items-center tw-mt-8 tw-bg'
				>
					{vehicles.map((item: Vehicle) => (
						<VehicleCard
							key={`${id}-${item.Plate}`}
							vehicle={item}
							className='tw-w-fit'
						/>
					))}
				</div>
			</div>
		</IdPrefixProvider>
	);
};

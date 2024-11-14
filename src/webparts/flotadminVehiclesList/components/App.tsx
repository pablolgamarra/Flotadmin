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
			<div className='flex flex-col w-10/12 mx-auto'>
				<Title1 className='mt-8 self-center'>
					Todos los Vehículos
				</Title1>
				<Field className='flex mt-6'>
					<SearchBox
						className='max-w-none w-10/12 mr-4'
						placeholder='Buscar Vehículos'
					/>
					<Button
						className='w-2/12'
						appearance='primary'
						icon={<AddCircle28Regular />}
					>
						Nuevo Vehiculo
					</Button>
				</Field>
				<div className='grid grid-cols-3 grid-flow-col gap-2'>
					{vehicles.map((item: Vehicle) => (
						<VehicleCard
							key={`${id}-${item.Plate}`}
							vehicle={item}
							className='w-fit'
						/>
					))}
				</div>
			</div>
		</IdPrefixProvider>
	);
};

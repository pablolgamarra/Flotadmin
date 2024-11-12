import * as React from 'react';

//Types
import { Vehicle } from '@vehiclesList/types';

//Components
import {
	Button,
	Title1,
	Field,
	FluentProvider,
	IdPrefixProvider,
	SearchBox,
	useId,
} from '@fluentui/react-components';
import { AddCircle28Regular } from '@fluentui/react-icons';
import VehicleCard from '@vehiclesList/components/VehicleCard';

//TODO: Agregar queries a DB

export interface AppProps {
	vehicles: Vehicle[];
}

export const App: React.FC<AppProps> = (props) => {
	const id = useId('App');
	const { vehicles } = props;

	return (
		<IdPrefixProvider value='Flotadmin'>
			<FluentProvider>
				<Title1>Todos los Vehículos</Title1>
				<Field>
					<SearchBox placeholder='Buscar Vehículos' />
				</Field>
				<Button
					appearance='primary'
					icon={<AddCircle28Regular />}
				>
					Nuevo Vehiculo
				</Button>
				{vehicles.map((item: Vehicle) => (
					<VehicleCard
						key={`${id}-${item.Plate}`}
						vehicle={item}
					/>
				))}
			</FluentProvider>
		</IdPrefixProvider>
	);
};

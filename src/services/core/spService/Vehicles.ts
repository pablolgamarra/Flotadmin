import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Vehicle, VehiclesResponse } from '@vehiclesList/types';
import { getAllFleetCards } from './FleetCards';

export const getAllVehicles = async (
	context: WebPartContext,
): Promise<Vehicle[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Vehiculos')/items?$select=Id,Title,Marca,Modelo,AnhoModelo,FechaAdquisicion,CostoAdquisicion,MonedaAquisicion,Usuario,TarjetaFlotaId`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, {
			headers: { Accept: 'application/json' },
		})
		.then((response: SPHttpClientResponse) => {
			if (!response.ok) {
				throw Error('Error on HTTP GET Vehicles');
			}
			return response.json();
		})
		.then(async (data: { value: VehiclesResponse[] }) => {
			const fleetCards = await getAllFleetCards(context);

			const vehicles: Vehicle[] = data.value.map(
				(item: VehiclesResponse) => {
					return {
						Id: item.Id,
						Plate: item.Title,
						Brand: item.Marca,
						Model: item.Modelo,
						ModelYear: item.AnhoModelo,
						BuyDate: item.FechaAdquisicion,
						Cost: item.CostoAdquisicion,
						CostCurrency: item.MonedaAdquisicion,
						User: item.Usuario,
						FleetCard: fleetCards.find(
							(card) => card.Id === item.TarjetaFlotaId,
						),
					};
				},
			);

			return vehicles;
		})
		.catch((e) => {
			throw Error(`Error on HTTP GET Vehicles ${e}`);
		});
};

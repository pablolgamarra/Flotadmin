import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Vehicle, VehiclesResponse } from '@vehiclesList/types';

export const getAllVehicles = (context: WebPartContext): Promise => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Vehiculos')/items?$select=Id,Title,Marca,Modelo,AnhoModelo,FechaAdquisicion,CostoAdquisicion,MonedaAdquisicion,Usuario,TarjetaFlotaId`;

	context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, {
			headers: { Accept: 'application/json; odata=nometadata' },
		})
		.then((response: SPHttpClientResponse) => {
			if (!response.ok) {
				throw Error('Error on HTTP GET Vehicles');
			}
			return response.json();
		})
		.then((data: VehiclesResponse[]) => {
			const vehicles: Vehicle[] = data.map((item: VehiclesResponse) => {
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
					FleetCard: item.TarjetaFlotaId,
				};
			});
		})
		.catch((e) => {
			throw Error(`Error on HTTP GET Vehicles ${e}`);
		});
};

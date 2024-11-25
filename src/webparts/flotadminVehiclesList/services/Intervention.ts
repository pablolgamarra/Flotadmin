import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	Currency,
	Intervention,
	InterventionsResponse,
	InterventionType,
	Vehicle,
} from '@vehiclesList/types';
import { getAllInterventionTypes } from './InterventionTypes';
import { getAllVehicles } from './Vehicles';

export const getAllIntervention = async (
	context: WebPartContext,
): Promise<Intervention[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/flotadmin/_api/getListByTitle('Intervenciones)/items?select=Id,Title,TipoIntervencionId,VehiculoId,MonedaIntervencion,Descripcion`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, {
			headers: { Accept: 'application/json' },
		})
		.then((response: SPHttpClientResponse) => {
			if (!response.ok) {
				throw Error(`Error on HTTP GET Interventions`);
			}
			return response.json();
		})
		.then(async (data: InterventionsResponse[]) => {
			let interventionTypes: InterventionType[];
			let vehicles: Vehicle[];
			try {
				interventionTypes = await getAllInterventionTypes(context);
				vehicles = await getAllVehicles(context);
			} catch (e) {
				console.log(`Error obteniendo datos de relleno: ${e}`);
			}

			const interventions: Intervention[] = data.map(
				(item: InterventionsResponse) => {
					return {
						Id: item.Id,
						Vehicle: vehicles.find(
							(vehicle: Vehicle) =>
								vehicle.Id === item.VehiculoId,
						)!,
						Kilometers: item.Title,
						Date: item.FechaIntervencion,
						IntervationType: interventionTypes.find(
							(type: InterventionType) =>
								type.Id === item.TipoIntervencionId,
						)!,
						Cost: item.CostoIntervencion,
						CostCurrency: item.MonedaIntervencion as Currency,
					};
				},
			);

			return interventions;
		})
		.catch((e) => {
			throw Error(`Error on HTTP GET Intervention Types ${e}`);
		});
};

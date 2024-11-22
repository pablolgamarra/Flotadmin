import { HttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FleetCard, FleetCardsResponse } from '@vehiclesList/types';

export const getAllCards = (
	context: WebPartContext,
): Promise<FleetCard[] | undefined | Error> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('TarjetasFlota)/items?$select=Id,Title,MontoAsignado&$top=5000`;

	context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, {
			headers: { Accept: 'application/json;odata=nometadata' },
		})
		.then((response: HttpClientResponse) => {
			if (!response.ok) {
				throw Error('Error on HTTP GET Vehicles');
			}
			return response.json();
		})
		.then((data: FleetCardsResponse[]) => {
			const card: FleetCard[] = data.map((item: FleetCardsResponse) => {
				return {
					Id: item.Id,
					CardNumber: item.Title,
					AssignedValue: item.MontoAsignado,
				};
			});

			return card;
		})
		.catch((e) => {
			throw Error('Error on HTTP GET Vehicles');
		});
};

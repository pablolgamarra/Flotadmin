import { HttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FleetCard, FleetCardsResponse } from '@vehiclesList/types';

export const getAllFleetCards = async (
	context: WebPartContext,
): Promise<FleetCard[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('TarjetasFlota')/items?$select=Id,Title,MontoAsignado`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, {
			headers: { Accept: 'application/json' },
		})
		.then((response: HttpClientResponse) => {
			if (!response.ok) {
				throw Error('Error on HTTP GET Fleet Cards');
			}
			return response.json();
		})
		.then((data: { value: FleetCardsResponse[] }) => {
			const cards: FleetCard[] = data.value.map(
				(item: FleetCardsResponse) => ({
					Id: item.Id,
					CardNumber: item.Title,
					AssignedValue: item.MontoAsignado,
				}),
			);

			return cards;
		})
		.catch((e) => {
			throw Error(`Error on HTTP GET Fleet Cards ${e}`);
		});
};

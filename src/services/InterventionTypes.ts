import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
	InterventionType,
	InterventionTypesResponse,
} from '@vehiclesList/types';

export const getAllInterventionTypes = async (
	context: WebPartContext,
): Promise<InterventionType[]> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('TiposIntervencion')/items?$select=Id, Title`;

	return context.spHttpClient
		.get(url, SPHttpClient.configurations.v1, {
			headers: { Accept: 'application/json' },
		})
		.then((response: SPHttpClientResponse) => {
			if (!response.ok) {
				throw Error(`Error on HTTP GET Intervention Types`);
			}
			return response.json();
		})
		.then((data: { value: InterventionTypesResponse[] }) => {
			const interventionTypes: InterventionType[] = data.value.map(
				(item: InterventionTypesResponse) => {
					return {
						Id: item.Id,
						Description: item.Title,
					};
				},
			);

			return interventionTypes;
		})
		.catch((e) => {
			throw Error(`Error on HTTP GET Intervention Types ${e}`);
		});
};

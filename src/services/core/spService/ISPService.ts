export interface ISPService {
	getListItems(listName: string): Promise<any[]>;
}

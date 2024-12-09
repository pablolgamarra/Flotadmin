export interface ISPService {
	getListItems(listName: string): Promise<any[]>;
	insertItem(listName: string, item: object): Promise<boolean>;
}

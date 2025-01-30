export interface ISPService {
	getListItems<T = any>(listName: string): Promise<T[]>;
	getListItem<T = any>(listName: string, id: number): Promise<T[]>;
	insertItem<T extends { Id?: number }>(listName: string, item: T): Promise<boolean>;
	updateItem<T extends { Id: number }>(listName: string, item: T): Promise<boolean>;
	deleteItem(listName: string, id: number): Promise<boolean>;
    insertDocument?:(libraryName:string, item:File)=>Promise<boolean>;
}

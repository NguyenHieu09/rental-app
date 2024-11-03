import { IPageInfo } from "./page";


export interface ITable<T> {
    data: T[];
    pageInfo: IPageInfo;
}

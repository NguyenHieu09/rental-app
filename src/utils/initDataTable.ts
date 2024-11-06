import { ITable } from "../types/table";

export const initDataTable = {
    data: [],
    pageInfo: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
} as ITable<any>;
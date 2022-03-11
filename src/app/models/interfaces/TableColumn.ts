export interface TableColumn {
    header: string;
    row: TableColumn| object;
    queryString?: string;
}

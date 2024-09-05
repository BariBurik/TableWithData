import TableResponse from "@/models/response/TableResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const tableAPI = createApi({
    reducerPath: 'tableAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test.v5.pryaniky.com' }),
    tagTypes: ['Table'],
    endpoints: (build) => ({
        // Получение записей из БД
        getTable: build.query<TableResponse, string>({
            query: (token) => ({
                url: '/ru/data/v3/testmethods/docs/userdocs/get',
                method: 'GET',
                headers: {
                    "x-auth": token
                }
            }),
            providesTags: result => ['Table']
        }),
        // Создание новой записи
        createRecord: build.mutation<TableResponse, TableResponse>({
            query: (record: TableResponse) => ({
                url: '/ru/data/v3/testmethods/docs/userdocs/create',
                method: 'POST',
                body: record,
                headers: {
                    "x-auth": localStorage.getItem('xToken')
                }
            }),
            invalidatesTags: ['Table']
        }),
        // Обновление записи 
        updateRecord: build.mutation<TableResponse, TableResponse>({
            query: (record: TableResponse) => ({
                url: `/ru/data/v3/testmethods/docs/userdocs/set/${record.id}`,
                method: 'POST',
                body: record,
                headers: {
                    "x-auth": localStorage.getItem('xToken')
                }
            }),
            invalidatesTags: ['Table']
        }),
        // Удаление записи
        deleteRecord: build.mutation<TableResponse, TableResponse>({
            query: (record: TableResponse) => ({
                url: `/ru/data/v3/testmethods/docs/userdocs/delete/${record.id}`,
                method: 'POST',
                headers: {
                    "x-auth": localStorage.getItem('xToken')
                }
            }),
            invalidatesTags: ['Table']
        })
    })
})
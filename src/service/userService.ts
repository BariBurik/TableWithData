import IUser from "@/models/IUser";
import AuthResponse from "@/models/response/AuthResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test.v5.pryaniky.com' }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        // Авторизация пользователя
        loginUser: build.mutation<AuthResponse, IUser>({
            query: (user) => ({
                url: '/ru/data/v3/testmethods/docs/login',
                method: 'POST',
                body: user
            })
        })
    })
})
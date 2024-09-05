import IRoutes from "@/models/IRoutes"
import Login from "@/pages/Login"
import Table from "@/pages/Table"

export const publicRoutes: IRoutes[] = [
        {
            path: '/login',
            element: Login
        }
]

export const privateRoutes: IRoutes[] = [
        {
            path: '/table',
            element: Table
        }
]
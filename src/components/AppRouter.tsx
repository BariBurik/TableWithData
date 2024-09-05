import { useAppSelector } from "@/hooks/useAppSelector";
import { privateRoutes, publicRoutes } from "@/routes";
import { Navigate, Route, Routes } from "react-router-dom";


function AppRouter() {

    const { isAuth } = useAppSelector(state => state.authReducer);
    console.log(isAuth)
    return ( 
        !isAuth 
        ? <Routes>
            {publicRoutes.map(({ path, element }) => 
                <Route key={path} path={path} Component={element} />
            )}
            <Route path="*" element={<Navigate to={publicRoutes[0].path} />} />
          </Routes>
        : <Routes>
            {privateRoutes.map(({ path, element }) => 
                <Route key={path} path={path} Component={element} />
            )}
            <Route path="*" element={<Navigate to={privateRoutes[0].path} />} />
          </Routes>
    );
}

export default AppRouter;
import { Button, TextField } from "@mui/material";
import classes from './LoginForm.module.css';
import { userAPI } from "@/service/userService";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authSlice } from "@/store/Auth/authSlice";

function LoginForm() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // Вызов функции для авторизации
    const [loginUser, {isSuccess}] = userAPI.useLoginUserMutation()
    const {userLogin, userLogout} = authSlice.actions

    const dispatch = useAppDispatch()

    // Повторная авторизация уже вошедшего пользователя, при обновлении пользователя
    useEffect(() => {
        const xToken = localStorage.getItem('xToken');
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if (xToken && username && password) {
            loginUser({ username, password });
        }
    }, [loginUser]);
    
    // Обновление состояний о пользователе
    useEffect(() => {
        if (isSuccess) {
            const xToken = localStorage.getItem('xToken');
            const username = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            if (xToken && username && password) {
                dispatch(userLogin({ user: { username, password }, xToken }));
            }
        }
    }, [isSuccess, dispatch]);


    // Функция входа 
    const loginingUser = async () => {
        const xToken = await (await loginUser({username, password})).data.data.token
        localStorage.setItem('xToken', xToken)
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        if (isSuccess) {
            dispatch(userLogin({user: {username, password}, xToken: xToken}))
        }
    }

    // Функция выхода
    const logoutUser = () => {
        localStorage.removeItem('xToken')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        dispatch(userLogout())
    }

    return ( 
        <div className={classes.form}>
            <div className={classes.container}>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Логин" variant="outlined" />
                <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Пароль" variant="outlined" />
                <Button onClick={loginingUser} variant="outlined">Войти</Button>
            </div>
        </div>
     );
}

export default LoginForm;
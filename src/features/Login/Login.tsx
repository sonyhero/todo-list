import React from 'react';
import {useFormik} from "formik";
import s from './Login.module.css'
import {Button} from "../../components/common/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {loginTC} from "./auth-reducer";
import {LoginParamsType} from "../../api/api";
import {validate} from "./validate";
import {Navigate} from "react-router-dom";

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            const params: LoginParamsType = {
                email: values.email,
                password: values.password,
                rememberMe: true,
                captcha: true
            }
            dispatch(loginTC(params))
            formik.resetForm()
        },
    })

    return isLoggedIn
        ? <Navigate to={'/'}/>
        :<div className={s.container}>
            <form onSubmit={formik.handleSubmit} className={s.formContainer}>

                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                <Button type="submit" name={'Login'}/>
            </form>
        </div>
}
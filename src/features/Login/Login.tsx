import React from 'react';
import {useFormik} from "formik";
import s from './Login.module.css'
import {Button} from "../../components/common/Button/Button";
import {useAppDispatch} from "../../hooks/hooks";
import {loginTC} from "./auth-reducer";
import {LoginParamsType} from "../../api/api";
type FormikErrorType = {
    email?: string
    password?: string
}

const validate = (values: FormikErrorType) => {
    const errors: FormikErrorType = {};
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export const Login = () => {

    const dispatch = useAppDispatch()

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
    });
    return (
        <div className={s.container}>
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

    )
}
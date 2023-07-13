import React from 'react';
import {useFormik} from 'formik';
import s from './Login.module.css'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom';
import {selectCaptchaUrl, selectIsLoggedIn} from './auth-selectors';
import {BasicFormSchema} from './BasicShema';

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const captcha = useAppSelector(selectCaptchaUrl)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        // validate,
        validationSchema: BasicFormSchema,
        onSubmit: values => {
            // const params: LoginParamsType = {
            //     email: values.email,
            //     password: values.password,
            //     rememberMe: values.rememberMe,
            //     captcha:  values.captcha
            // }
            dispatch(loginTC(values))
        },
    })

    return isLoggedIn
        ? <Navigate to={'/'}/>
        :<div className={s.container}>
            <form onSubmit={formik.handleSubmit} className={s.formContainer}>
                <h3>Login Here</h3>
                <label htmlFor="email">Email Address</label>
                <div className={s.input}><input
                          id="email"
                          type="email"
                          {...formik.getFieldProps('email')}
                /></div>
                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <label htmlFor="password">Password</label>
                <div  className={s.input}><input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                /></div>
                {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <><label htmlFor="rememberMe">Remember Me</label>
                    <input
                        id="rememberMe"
                        type="checkbox"
                        {...formik.getFieldProps('rememberMe')}
                    /></>

                {captcha && <><label htmlFor="captcha">Enter captcha</label>
                    <div className={s.input}><input
                        id="captcha"
                        {...formik.getFieldProps('captcha')}
                    /></div></>}
                {captcha && <img src={`${captcha}`} alt="captcha img"/>}
                <button disabled={Object.keys(formik.errors).length !== 0} type={'submit'}>Login</button>
                {/*<Button type="submit" name={'Login'}/>*/}
            </form>
        </div>
}
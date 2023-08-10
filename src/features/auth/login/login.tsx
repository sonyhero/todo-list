import React from 'react'
import { FormikHelpers, useFormik } from 'formik'
import s from './login.module.css'
import { useAppSelector } from '../../../common/hooks'
import { authThunks } from '../auth-reducer'
import { Navigate } from 'react-router-dom'
import { selectCaptchaUrl, selectIsLoggedIn } from '../auth-selectors'
import { BasicFormSchema } from '../BasicShema'
import { LoginParamsType } from '../../../api/api'
import { ResponseAppType } from '../../../common/types'
import { useActions } from '../../../common/hooks'

export const Login = () => {
  const { login } = useActions(authThunks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const captcha = useAppSelector(selectCaptchaUrl)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    validationSchema: BasicFormSchema,
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: ResponseAppType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
  })

  return isLoggedIn ? (
    <Navigate to={'/'} />
  ) : (
    <div className={s.container}>
      <form onSubmit={formik.handleSubmit} className={s.formContainer}>
        <div>
          <p>
            To log in get registered{' '}
            <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p> Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </div>
        <h3>Login Here</h3>
        <label htmlFor="email">Email Address</label>
        <div className={s.input}>
          <input id="email" type="email" {...formik.getFieldProps('email')} />
        </div>
        {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
        <label htmlFor="password">Password</label>
        <div className={s.input}>
          <input id="password" type="password" {...formik.getFieldProps('password')} />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        <>
          <label htmlFor="rememberMe">Remember Me</label>
          <input id="rememberMe" type="checkbox" {...formik.getFieldProps('rememberMe')} />
        </>

        {captcha && (
          <>
            <label htmlFor="captcha">Enter captcha</label>
            <div className={s.input}>
              <input id="captcha" {...formik.getFieldProps('captcha')} />
            </div>
          </>
        )}
        {captcha && <img src={`${captcha}`} alt="captcha img" />}
        <button disabled={Object.keys(formik.errors).length !== 0} type={'submit'}>
          Login
        </button>
      </form>
    </div>
  )
}
